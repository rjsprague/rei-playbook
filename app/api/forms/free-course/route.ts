// A server action that handles all of the form submissions in the app. It sends the form data to the appropriate webhook
// and sends an alert email if the webhook fails to respond after several retries.
import { NextRequest, NextResponse } from 'next/server';
import { splitName } from "@/app/lib/splitName";
import { sql } from '@vercel/postgres';
import UAParser from 'ua-parser-js';
import { Fetcher } from "@/app/lib/retryFetch";

interface CustomNextRequest extends NextRequest {
    clientIp?: string;
}

export async function POST(req: CustomNextRequest) {
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.clientIp;
    const ua = new UAParser(req.headers.get('user-agent') || '');
    const deviceInfo = ua.getResult();

    const body = await req.text();
    let data = JSON.parse(body);

    if (data.campaign !== 'one-free-course') {
        return NextResponse.json({ status: 400, message: 'Invalid request' });
    }

    data.ip = ip;
    data.device = deviceInfo;

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
        if (user.rows[0].one_free_course) {
            // If the user.one_free_course is true, return a message that the user has received a free course
            return NextResponse.json({ status: 401, message: 'You have already received a free course' });
        }
    }

    // Split the name into first and last name
    const [firstName, lastName] = splitName(data.name);
    data.firstName = firstName;
    data.lastName = lastName;

    // create tags array for BerserkerMail
    data.tags = [data.course.name, `${data.source}-${data.course.id}-ENROLL`]

    // load BerserkerMail API key and URL
    data.bm_api_key = process.env.BM_API_KEY;
    data.bm_api_url = process.env.BM_API_URL;

    // set messageType for slack notification
    data.messageType = 'FreeCourseRequest';

    // Define the API endpoints
    const apiEndpoints = [
        '/api/berserker-mail',
        '/api/podio',
        '/api/notification/slack',
        dbURL,
    ] as any;

    // Define the API data
    const allFulfilled = await Fetcher(apiEndpoints, data);

    console.log('All Fulfilled:', allFulfilled);

    if (allFulfilled) {
        return NextResponse.json({ status: 200, message: 'Data sent successfully' });
    } else {
        return NextResponse.error();
    }
}
