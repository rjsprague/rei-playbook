// Utility function for sending an alert email
import axios from 'axios';

export async function alertFailure(failedData: any) {
    const headers = { 'Content-Type': 'application/json' };
    const payload = {
        fromName: "REIA Info",
        fromEmail: "info@reiautomated.io",
        toName: "Ryan Sprague",
        toEmail: "ryan@reiautomated.io",
        subject: "Webhook Notification Failure",
        message: `Failed to post data after several retries. Data: ${JSON.stringify(failedData)}`,
        key: process.env.RESEND_API_KEY,
    };
    try {
        await axios.post('http://localhost:3000'+"/api/resend/send", payload, { headers });
        console.log("Alert email sent successfully!");
    } catch (error) {
        console.error("Failed to send alert email:", error);
    }
}