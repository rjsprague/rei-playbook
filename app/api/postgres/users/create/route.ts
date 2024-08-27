import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {

    const body = await req.text();
    const data = await JSON.parse(body);

    try {
        const { name, firstName, lastName, phone, email, utmSource, utmCampaign, utmTerm, oneFreeCourse } = data;
        
        await sql`INSERT INTO users(name, firstName, lastName, phone, email, utm_source, utm_campaign, utm_term, oneFreeCourse) VALUES(${name}, ${firstName}, ${lastName}, ${phone}, ${email}, ${utmSource}, ${utmCampaign}, ${utmTerm}, ${oneFreeCourse});`;

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const user = await sql`SELECT * FROM users WHERE email = ${data.email};`;
    return NextResponse.json({ user }, { status: 200 });
}