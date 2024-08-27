import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.text();
    try {
        const response = await fetch('https://webhook.reiautomated.io/pwa/peye081wr408618', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        })

        if (response) {
            return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        console.error('Podio Webhook Failed:', error);
        return NextResponse.error();
    }
}