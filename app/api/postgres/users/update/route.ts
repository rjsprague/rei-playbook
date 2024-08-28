import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    const apiKey = authHeader?.replace('Bearer ', '');

    if (apiKey !== process.env.DB_API_KEY) {
        throw new Error('Unauthorized');
    }

    try {
        const body = await req.text();
        const data = JSON.parse(body);

        const { name, phone, email, course, source, campaign, term, one_free_course, client_id, ip, device, firstName, lastName } = data;

        const updates = [];
        const values = [];

        if (name) {
            updates.push('name = $' + (values.length + 1));
            values.push(name);
        }
        if (firstName) {
            updates.push('firstName = $' + (values.length + 1));
            values.push(firstName);
        }
        if (lastName) {
            updates.push('lastName = $' + (values.length + 1));
            values.push(lastName);
        }
        if (phone) {
            updates.push('phone = $' + (values.length + 1));
            values.push(phone);
        }
        if (course) {
            updates.push('course = $' + (values.length + 1));
            values.push(JSON.stringify(course));
        }
        if (source) {
            updates.push('source = $' + (values.length + 1));
            values.push(source);
        }
        if (campaign) {
            updates.push('campaign = $' + (values.length + 1));
            values.push(campaign);
        }
        if (term) {
            updates.push('utm_term = $' + (values.length + 1));
            values.push(term);
        }
        if (one_free_course !== undefined) {
            updates.push('one_free_course = $' + (values.length + 1));
            values.push(one_free_course);
        }
        if (client_id) {
            updates.push('client_id = $' + (values.length + 1));
            values.push(client_id);
        }
        if (ip) {
            updates.push('ip = $' + (values.length + 1));
            values.push(ip);
        }
        if (device) {
            updates.push('device = $' + (values.length + 1));
            values.push(JSON.stringify(device));
        }

        if (updates.length > 0) {
            const query = `
                UPDATE users
                SET ${updates.join(', ')}
                WHERE email = $${values.length + 1}
                RETURNING *;
            `;

            values.push(email);

            const updatedUser = await sql.query(query, values);

            console.log("Updated user: ", updatedUser.rows[0]);
            return NextResponse.json({ user: updatedUser.rows[0] }, { status: 200 });
        } else {
            return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error updating data: ", error);
        return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
    }
}
