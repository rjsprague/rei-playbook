import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Updated function for posting to webhook with retry and alerting
async function patchToBerserkerMail(bm_api_key: string, bm_api_url: string, data: any): Promise<boolean> {

    // remove all spaces and characters that are not numbers
    let phone = data.phone.replace(/\D/g, '');

    const payload = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "phone": phone,
        "tagNames": data.tags,
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bm_api_key}`
    }

    try {
        const response = await axios.patch(bm_api_url, payload, { headers });
        if (response.status === 200) {
            // console.log(`Data sent to ${bm_api_url} successfully!`);
            return true;
        }
    } catch (error) {
        console.error(`Failed to send to webhook: `, error);
    }
    return false;
}

// POST request handler
export async function POST(req: NextRequest) {
    const bm_api_key = process.env.BM_API_KEY;
    const bm_api_url = process.env.BM_API_URL;

    if (!bm_api_key || !bm_api_url) {
        return NextResponse.error();
    }

    try {
        const body = await req.text();
        const data = JSON.parse(body);

        const response = await patchToBerserkerMail(bm_api_key, bm_api_url, data);

        if (response) {
            return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        console.error('BerserkerMail Webhook Failed:', error);
        return NextResponse.error();
    }
}
