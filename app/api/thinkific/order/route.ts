import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Fetcher } from '@/app/lib/retryFetch'

// POST request handler
export async function POST(req: NextRequest) {
    try {
        const thinkificApiKey = process.env.THINKIFIC_API_KEY as string;
        if (!thinkificApiKey) {
            console.error('Thinkific API Key not found');
            return NextResponse.error();
        }
        const thinkificHash = req.headers.get('x-thinkific-hmac-sha256') as string;
        const body = await req.text();

        const validateHmac = (data: any, hash: string) => {
            const hmac = crypto.createHmac('sha256', thinkificApiKey).update(data).digest('hex');
            console.log('HMAC:', hmac);
            return hmac === hash;
        };

        if (!validateHmac(body, thinkificHash)) {
            console.error('Unauthorized request');
            return NextResponse.error();
        }

        const data = JSON.parse(body) as any;

        data.bm_api_key = process.env.BM_API_KEY as string;
        data.bm_api_url = process.env.BM_API_URL as string;
        data.slackNewLeadsUrl = process.env.SLACK_NEW_LEADS_URL as string;
        data.messageType = 'ThinkificOrder';

        console.log('Thinkific Order Data:', data);

        // Define the API endpoints
        const apiEndpoints = [
            '/api/berserker-mail',
            '/api/podio',
            '/api/notification/slack',
        ] as any;

        // Define the API data
        const allFulfilled = await Fetcher(apiEndpoints, data);

        if (allFulfilled) {
            return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
        } else {
            return NextResponse.error();
        }

    } catch (error) {
        console.error('Thinkific Order to BerserkerMail Webhook Failed:', error);
        return NextResponse.error();
    }
}
