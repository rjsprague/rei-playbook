import twilio from 'twilio';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const bodyData = await req.text();
    const { phoneNumber } = JSON.parse(bodyData);

    if (!phoneNumber) {
        return NextResponse.json({ message: 'Phone number is required' });
    }

    const client = twilio(accountSid, authToken);

    try {
        const lookup = await client.lookups.v2.phoneNumbers(phoneNumber).fetch()
            
        if (!lookup.valid) {
            return NextResponse.json(404);
        }

        return NextResponse.json(200);
    } catch (error) {
        return NextResponse.json(400);
    }
}