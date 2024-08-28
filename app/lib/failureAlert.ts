import axios from 'axios';

export async function alertFailure(apiEndpoint: string, status: string, failedData: any) {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://playbook.reiautomated.io' : 'http://localhost:3000';

    console.log(apiEndpoint);
    console.log(status);
    console.log(failedData);

    // Parse the incoming failedData
    const parsedData = JSON.parse(failedData);

    // create a message object with the parsed data
    const message = {
        apiEndpoint: apiEndpoint,
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        course: parsedData.course,
        source: parsedData.source,
        campaign: parsedData.campaign,
        term: parsedData.term,
        one_free_course: parsedData.one_free_course,
        client_id: parsedData.client_id,
        ip: parsedData.ip,
        device: parsedData.device
    };

    const headers = { 'Content-Type': 'application/json' };
    const payload = {
        fromName: "REIA Info",
        fromEmail: "info@reiautomated.io",
        toName: "Ryan Sprague",
        toEmail: "ryan@reiautomated.io",
        subject: "Webhook Notification Failure",
        message: message,
        key: process.env.RESEND_API_KEY,
    };

    try {
        await axios.post(baseURL+'/api/resend/alert', payload, { headers });
        console.log("Alert email sent successfully!");
    } catch (error) {
        console.error("Failed to send alert email:", error);
    }
}
