import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const data = JSON.parse(body);

        const { name, phone, email, course, utm_source, utm_campaign, utm_term, oneFreeCourse, client_id, ip, device, firstName, lastName } = data;

        const courseString = JSON.stringify(course);
        const deviceString = JSON.stringify(device);

        await sql`
            INSERT INTO users (name, firstName, lastName, email, phone, course, utm_source, utm_campaign, utm_term, oneFreeCourse, client_id, ip, device)
            VALUES (
                ${name},
                ${firstName},
                ${lastName},
                ${email},
                ${phone},
                ${courseString},
                ${utm_source},
                ${utm_campaign},
                ${utm_term},
                ${oneFreeCourse},
                ${client_id},
                ${ip},
                ${deviceString}
            );
        `;

        const user = await sql`SELECT * FROM users WHERE email = ${email};`;
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error inserting data: ", error);
        return NextResponse.json({ error: "Failed to insert user data" }, { status: 500 });
    }
}
