// /lib/retryFetch.ts
import { alertFailure } from './failureAlert';


async function retryFetch(url: string, options: RequestInit, retries: number, delay: number): Promise<Response> {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://playbook.reiautomated.io' : 'http://localhost:3000';

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(baseURL + url, options);
            if (response.ok) {
                return response;
            }
            console.error(`Attempt ${i + 1} failed: ${response.statusText}`);
        } catch (error) {
            console.error(`Attempt ${i + 1} encountered an error: ${error}`);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

export async function Fetcher(apiEndpoints: [], data: {}): Promise<Boolean> {

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
        if (response.status === 'fulfilled' && response.value.status === 'fulfilled') {
            console.log(`Data sent to ${apiEndpoints[index]} successfully: `, response.value);
        } else {
            console.error(`Failed to send data to ${apiEndpoints[index]}: `, response);
            alertFailure(apiEndpoints[index], response.status, data);
        }
    });

    if (allFulfilled) {
        return true;
    } else {
        return false;
    }
}
