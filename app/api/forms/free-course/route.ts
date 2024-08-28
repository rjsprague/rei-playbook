// A server action that handles all of the form submissions in the app. It sends the form data to the appropriate webhook
// and sends an alert email if the webhook fails to respond after several retries.
import { NextRequest, NextResponse } from 'next/server';
import { retryFetch } from "@/app/lib/retryFetch";
import { alertFailure } from "@/app/lib/failureAlert";
import { splitName } from "@/app/lib/splitName";
import { sql } from '@vercel/postgres';
import UAParser from 'ua-parser-js';

interface CustomNextRequest extends NextRequest {
    clientIp?: string;
}

export async function POST(req: CustomNextRequest) {
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.clientIp;

    const ua = new UAParser(req.headers.get('user-agent') || '');
    const deviceInfo = ua.getResult();

    const body = await req.text();
    let data = JSON.parse(body);

    if (data.utm_campaign !== 'one-free-course') {
        return NextResponse.json({ status: 400, message: 'Invalid request' });
    }

    data.ip = ip;
    data.device = deviceInfo;

    console.log('Data:', data);

    let user = null;
    // Search for the user based on the data.email
    const userByEmail = await sql`SELECT * FROM users WHERE email = ${data.email};`;
    // Search for the user based on the data.client_id
    const userByClientId = await sql`SELECT * FROM users WHERE client_id = ${data.client_id};`;
    // Search for the user based on the data.phone
    const userByPhone = await sql`SELECT * FROM users WHERE phone = ${data.phone};`;

    // If userByEmail has a row, set user to userByEmail
    if (userByEmail.rows.length > 0) {
        user = userByEmail;
        console.log('User by email:', user);
    } else if (userByPhone.rows.length > 0) {
        // If userByPhone has a row, set user to userByPhone
        user = userByPhone;
        console.log('User by phone:', user);
    } else if (userByClientId.rows.length > 0) {
        // If userByClientId has a row, set user to userByClientId
        user = userByClientId;
        console.log('User by client ID:', user);
    }
    console.log(user);

    let dbURL = '/api/postgres/users/create';

    if (user && user.rows.length > 0) {
        // If the user already exists, set dbURL to update the user
        dbURL = '/api/postgres/users/update';
        data.id = user.rows[0]?.id || null;
        if (user.rows[0].onefreecourse) {
            // If the user.oneFreeCourse is true, return a message that the user has received a free course
            return NextResponse.json({ status: 401, message: 'You have already received a free course' });
        }
    }

    // Split the name into first and last name
    const [firstName, lastName] = splitName(data.name);
    data.firstName = firstName;
    data.lastName = lastName;


    // Define the API endpoints
    const apiEndpoints = [
        '/api/berserker-mail',
        '/api/podio',
        '/api/notification/slack',
        dbURL,
        '/api/notification/email'
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
            alertFailure(apiEndpoints[index], response.status, body);
        }
    });

    if (allFulfilled) {
        // If all requests are successful, update the user's oneFreeCourse value to true in the database, and return a success message
        await sql`UPDATE users SET onefreecourse = true WHERE email = ${data.email};`;
        return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
    } else {
        return NextResponse.error();
    }
}
