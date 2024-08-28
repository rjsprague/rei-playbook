import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

// Updated function for posting to webhook with retry and alerting
async function patchToBerserkerMail(bm_api_key: string, bm_api_url: string, data: any): Promise<boolean> {

    const payload = {
        "firstName": data.payload.user.first_name,
        "lastName": data.payload.user.last_name,
        "email": data.payload.user.email,
        "tagNames": [data.payload.product_name],
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bm_api_key}`
    }

    try {
        const response = await axios.patch(bm_api_url, payload, { headers });
        if (response.status === 200) {
            console.log(`Data sent to ${bm_api_url} successfully!`);
            return true;
        }
    } catch (error) {
        console.error(`Failed to send to webhook: `, error);
    }
    return false;
}

// POST request handler
export async function POST(req: NextRequest) {
    const bm_api_key = process.env.BM_API_KEY as string;
    if (!bm_api_key) {
        console.error('BerserkerMail API Key not found');
        return NextResponse.error();
    }
    const thinkificApiKey = process.env.THINKIFIC_API_KEY as string;
    if (!thinkificApiKey) {
        console.error('Thinkific API Key not found');
        return NextResponse.error();
    }
    const bm_api_url = process.env.BM_API_URL as string;
    const thinkificHash = req.headers.get('x-thinkific-hmac-sha256') as string;
    const body = await req.text();
    
    const validateHmac = (data: any , hash: string) => {
        const hmac = crypto.createHmac('sha256', thinkificApiKey).update(data).digest('hex');
        console.log('HMAC:', hmac);
        return hmac === hash;
    };

    if (!validateHmac(body, thinkificHash)) {
        console.error('Unauthorized request');
        return NextResponse.error();
    }

    const data = JSON.parse(body) as any;
    
    data.slackUrl = process.env.SLACK_WEBHOOK_URL as string;
    data.messageType = 'ThinkificOrder';

    try {
        const bmResponse = await patchToBerserkerMail(bm_api_key, bm_api_url, data);
        if(!bmResponse) {
            throw new Error('Failed to send data to BerserkerMail');
        }
        const slackResponse = await axios.post('/api/notification/slack', {data});
        if (slackResponse.status !== 200) {
            throw new Error('Failed to send data to Slack');
        }
        
    } catch (error) {
        console.error('Thinkific Order to BerserkerMail Webhook Failed:', error);
        return NextResponse.error();
    }
}
