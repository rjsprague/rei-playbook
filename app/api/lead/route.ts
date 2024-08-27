import { NextRequest, NextResponse } from 'next/server';
// import { createPool } from '@vercel/postgres';

import axios from 'axios';
import twilio from 'twilio';

// const pool = createPool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// async function saveLeadToDatabase(leadData: any) {
//     const { businessName, name, phone, email, address, zipCode, lat, lng, timeframe, ownership, motivation, acceptableOffer, utmSource, utmCampaign, utmTerm } = leadData;
//     const query = `INSERT INTO leads(business_name, name, phone, email, address, zip_code, latitude, longitude, timeframe, ownership, motivation, acceptable_offer, utm_source, utm_campaign, utm_term) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
//     const values = [businessName, name, phone, email, address, zipCode, lat, lng, timeframe, ownership, motivation, acceptableOffer, utmSource, utmCampaign, utmTerm];
//     try {
//         await pool.query(query, values);
//     } catch (error) {
//         console.error('Failed to save lead to database:', error);
//     }
// }

// Utility function for sending an alert email
async function alertFailure(emailWebhookUrl: string, failedData: any) {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
        businessName: "Ryan Sprague",
        businessEmail: "ryan@reiautomated.io",
        subject: "Webhook Notification Failure",
        message: `Failed to post data after several retries. Data: ${JSON.stringify(failedData)}`
    };
    try {
        await axios.post(emailWebhookUrl, body, { headers });
        console.log("Alert email sent successfully!");
    } catch (error) {
        console.error("Failed to send alert email:", error);
    }
}

// Updated function for posting to webhook with retry and alerting
async function postToWebhook(url: string, payload: any, headers = { 'Content-Type': 'application/json' }) {
    const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL as string; // Ensure this environment variable is set
    for (let i = 0; i < 3; i++) {
        try {
            const response = await axios.post(url, payload, { headers });
            if (response.status === 200) {
                console.log(`Data sent to ${url} successfully!`);
                return true;
            }
        } catch (error) {
            console.error(`Attempt ${i + 1}: Failed to send webhook, retrying...`, error);
            await new Promise(resolve => setTimeout(resolve, 5000 * (i ** 2))); // Exponential back-off
        }
    }
    // After all retries failed
    console.error(`All attempts to send data to ${url} failed.`);
    await alertFailure(emailWebhookUrl, payload);
    return false;
}

// Utility function for retrying SMS sending
async function sendSmsWithRetry(client: any, message: string, from: string, to: string, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await client.messages.create({
                body: message,
                from: from,
                to: to
            });
            console.log(`SMS sent successfully to ${to}: ${response.sid}`);
            return true;
        } catch (error) {
            console.error(`Attempt ${i + 1}: Failed to send SMS to ${to}, retrying...`, error);
            await new Promise(resolve => setTimeout(resolve, 5000 * (i ** 2))); // Exponential back-off
        }
    }
    console.error(`All attempts to send SMS to ${to} failed.`);
    return false;
}

// Function to handle Twilio SMS sending with retries
async function handleTwilioSms(client: any, accountSid: string, message: string, fromPhoneNumber: string, toPhoneNumbers: string[], emailWebhookUrl: string) {
    const account = await client.api.accounts(accountSid).fetch();
    const active = account?.status === 'active' ? true : false;

    if (!active) {
        console.error("Twilio account is not active!");
        const alertPayload = {
            businessName: "Ryan Sprague",
            businessEmail: "ryan@reiautomated.io",
            subject: 'ALERT!!! TWILIO ERROR!!!',
            body: `Twilio account is not active! Check Twilio account immediately!`
        };
        await alertFailure(emailWebhookUrl, alertPayload);
        return;
    }

    if (toPhoneNumbers && toPhoneNumbers.length) {
        for (const number of toPhoneNumbers) {
            const success = await sendSmsWithRetry(client, message, fromPhoneNumber, number.trim());
            if (!success) {
                const alertPayload = {
                    businessName: "Ryan Sprague",
                    businessEmail: "ryan@reiautomated.io",
                    subject: 'SMS Delivery Failure',
                    body: `Failed to deliver SMS to ${number} after several retries.`
                };
                await alertFailure(emailWebhookUrl, alertPayload);
            }
        }
    } else {
        console.error("No phone numbers provided to send SMS.");
    }
}


export async function POST(req: NextRequest) {
    const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL as string;
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL as string;
    const sendToEmails = process.env.SEND_TO_EMAILS?.split(",") as string[]
    const bodyData = await req.text();
    const leadData = JSON.parse(bodyData);
    const { name, phone, email, course, utmSource, utmCampaign, utmTerm } = leadData;

    const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
    const authToken = process.env.TWILIO_AUTH_TOKEN as string;
    const twilioFromPhoneNumber = process.env.TWILIO_FROM_PHONE_NUMBER as string;
    const twilioToPhoneNumbers = process.env.TWILIO_TO_PHONE_NUMBERS?.split(",") as string[];

    // format the phone number to look like (123) 456-7890
    const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

    const trackingData = utmSource && utmCampaign && utmTerm ?
        `UTM Source: ${utmSource}` + "<br>" +
        `UTM Campaign: ${utmCampaign}` + "<br>" +
        `UTM Term: ${utmTerm}` : '';

    const message = "⚡New Lead⚡: \n" +
        "Name: " + name + "\n" +
        "Phone: " + formattedPhone + "\n" +
        "Email: " + email + "\n" +
        "Course: " + course + "\n" +
        trackingData;

    const subject = "New Lead: " + utmCampaign + " " + name;

    const body = `Name: ${name}` + "<br>" +
        `Phone: ${formattedPhone}` + "<br>" +
        `Email: ${email}` + "<br>" +
        `Course: ${course}` + "<br>" +
        trackingData;

    try {
        // if sendToEmails exists then parse and send notification email to each address in the list
        if (sendToEmails && sendToEmails.length > 0) {
            for (const email of sendToEmails) {
                let businessEmail = email;
                let payload = JSON.stringify({ businessEmail, subject, body });
                // Send email to each address
                await postToWebhook(emailWebhookUrl, payload);
            }
        } else {
            let payload = JSON.stringify({ subject, body });
            // Default case: send the original bodyData
            await postToWebhook(emailWebhookUrl, payload);
        }

        // If a CRM webhook URL is provided, send the data to the CRM
        if (crmWebhookUrl && crmWebhookUrl !== '') {
            // Send the data to the CRM webhook
            let payload = JSON.stringify({ name, phone, email, utmSource, utmCampaign, utmTerm });
            await postToWebhook(crmWebhookUrl, payload);
        }

        // Send a text message to the business phone number
        const client = twilio(accountSid, authToken);
        await handleTwilioSms(client, accountSid, message, twilioFromPhoneNumber, twilioToPhoneNumbers, emailWebhookUrl);

        // redirect('/Thank-You/')
        return NextResponse.json({ message: 'All notifications sent successfully?' });

    } catch (error) {
        console.error('Error sending text message:', error);
        return NextResponse.json({ error: 'Failed to send text message' }, { status: 500 });
    }

}
