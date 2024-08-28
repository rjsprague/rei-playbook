import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const data = JSON.parse(body);

        const { id, name, phone, email, course, utm_source, utm_campaign, utm_term, oneFreeCourse, client_id, ip, device, firstName, lastName } = data;

        const courseString = course ? JSON.stringify(course) : null;
        const deviceString = device ? JSON.stringify(device) : null;

        await sql`
            UPDATE users
            SET
                name = ${name},
                firstName = ${firstName},
                lastName = ${lastName},
                email = ${email},
                phone = ${phone},
                course = ${courseString},
                utm_source = ${utm_source},
                utm_campaign = ${utm_campaign},
                utm_term = ${utm_term},
                oneFreeCourse = ${oneFreeCourse},
                client_id = ${client_id},
                ip = ${ip},
                device = ${deviceString}
            WHERE id = ${id};
        `;

        const updatedUser = await sql`SELECT * FROM users WHERE id = ${id};`;
        console.log("Updated user: ", updatedUser.rows[0]);
        return NextResponse.json({ user: updatedUser.rows[0] }, { status: 200 });
    } catch (error) {
        console.error("Error updating data: ", error);
        return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
    }
}
