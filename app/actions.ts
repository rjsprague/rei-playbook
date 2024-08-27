// A server action that handles all of the form submissions in the app. It sends the form data to the appropriate webhook
// and sends an alert email if the webhook fails to respond after several retries.
'use server';
import { retryFetch } from "./lib/retryFetch";
import { alertFailure } from "./lib/failureAlert";

export async function handleFormSubmit(formData: FormData) {

    // console.log('Form submitted:', formData);

    const courseString = formData.get('course') as string;
    let courseObject = {} as { [key: string]: string };

    try {
        courseObject = JSON.parse(courseString);
    } catch (error) {
        console.error('Failed to parse course:', error);
    }

    // Extract the form data
    const payload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        course: courseObject,
        utm_source: formData.get('utm_source') as string,
        utm_campaign: formData.get('utm_campaign') as string,
    };

    // console.log('Payload:', payload);

    // Define the API endpoints
    const apiEndpoints = [
        // '/api/resend/send',
        '/api/berserker-mail',
        // '/api/podio',
        // '/api/notification/slack',
        // '/api/notification/email'
    ];

    const retries = 3;
    const delay = 2000;

    // Send request to all API endpoints concurrently
    const responses = await Promise.allSettled(apiEndpoints.map(async (endpoint) => {
        try {
            const response = await retryFetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }, retries, delay);

            const json = await response.json();

            // Validate the response for success criteria
            if (response.ok) {
                return json;
            } else {
                throw new Error(`Failed to call ${endpoint}: ${json.message}`);
            }

        } catch (error) {
            console.error(`Failed to call ${endpoint} after retries:`, error);
            throw error;
        }
    }));

    // Check and log requests
    responses.forEach((response, index) => {
        // console.log('Response:', response);
        if (response.status === 'fulfilled' && response.value.status === 'fulfilled') {
            console.log(`Data sent to ${apiEndpoints[index]} successfully: `, response.value);
        } else {
            console.error(`Failed to send data to ${apiEndpoints[index]}: `, response);
            alertFailure(payload);
            return { status: 'failed', message: 'Form submission failed' };
        }
    });
}
