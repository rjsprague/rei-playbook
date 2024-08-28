import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';


// POST request handler
export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const data = JSON.parse(body);

        // Validate the request
        if (data.bm_api_key !== process.env.BM_API_KEY) {
            console.error('Unauthorized request');
            return NextResponse.error();
        }

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
            'Authorization': `Bearer ${data.bm_api_key}`
        }

        const response = await axios.patch(data.bm_api_url, payload, { headers });

        if (response.status === 200) {
            // console.log(`Data sent to ${bm_api_url} successfully!`);
            return NextResponse.json({status: 'fulfilled', message: 'Data sent to BerserkerMail successfully!' });
        } else {
            return NextResponse.error();
        }

    } catch (error) {
        console.error('BerserkerMail Webhook Failed:', error);
        return NextResponse.error();
    }
}
