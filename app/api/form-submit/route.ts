// A server action that handles all of the form submissions in the app. It sends the form data to the appropriate webhook
// and sends an alert email if the webhook fails to respond after several retries.
import { NextRequest, NextResponse } from 'next/server';
import { retryFetch } from "@/app/lib/retryFetch";
import { alertFailure } from "@/app/lib/failureAlert";
import { splitName } from "@/app/lib/splitName";

export async function POST(req: NextRequest) {

    const body = await req.text();
    let data = JSON.parse(body);

    // Split the name into first and last name
    const [firstName, lastName] = splitName(data.name);
    data.firstName = firstName;
    data.lastName = lastName;


    // Define the API endpoints
    const apiEndpoints = [
        '/api/berserker-mail',
        '/api/podio',
        '/api/notification/slack',
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
                body: JSON.stringify(data),
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

    const allFulfilled = responses.every((response) => response.status === 'fulfilled' && response.value.status === 'fulfilled');

    // Check and log requests
    responses.forEach((response, index) => {
        // console.log('Response:', response);
        if (response.status === 'fulfilled' && response.value.status === 'fulfilled') {
            console.log(`Data sent to ${apiEndpoints[index]} successfully: `, response.value);
        } else {
            console.error(`Failed to send data to ${apiEndpoints[index]}: `, response);
            alertFailure(body);
        }
    });

    if (allFulfilled) {
        return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
    } else {
        return NextResponse.error();
    }
}
