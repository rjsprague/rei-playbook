import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {

    const body = await req.text();
    const data = await JSON.parse(body);

    console.log(data);

    try {
        const { name,  phone, email, course, utm_source, utm_campaign, utm_term, oneFreeCourse, firstName, lastName, } = data;

        console.log(name, firstName, lastName, phone, email, course, utm_source, utm_campaign, utm_term, oneFreeCourse);
        
        await sql`INSERT INTO users(name, firstName, lastName, phone, email, course, utm_source, utm_campaign, utm_term, oneFreeCourse) VALUES(${name}, ${firstName}, ${lastName}, ${phone}, ${email}, ${utm_source}, ${utm_campaign}, ${utm_term}, ${oneFreeCourse});`;

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const user = await sql`SELECT * FROM users WHERE email = ${data.email};`;
    console.log(user);
    return NextResponse.json({ user }, { status: 200 });
}