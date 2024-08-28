import { NextRequest, NextResponse } from 'next/server';
import { FailureAlert } from '@/app/components/email-templates/email-template';
import { Resend } from 'resend';



export async function POST(req: NextRequest) {

    const body = await req.text();
    const data = JSON.parse(body);
    const { fromName, fromEmail, toName, toEmail, subject, message, key } = data;
    const { apiEndpoint, name, email, phone, course, source, campaign, term, one_free_course, client_id, ip, device } = message;

    const courseString = JSON.stringify(course);
    const deviceString = JSON.stringify(device);

    if (!data) {
        return NextResponse.json({ status: 500, message: 'No data provided' });
    } else if (!toName) {
        return NextResponse.json({ status: 500, message: 'toName is required' });
    } else if (!toEmail) {
        return NextResponse.json({ status: 500, message: 'toEmail is required' });
    } else if (!subject) {
        return NextResponse.json({ status: 500, message: 'subject is required' });
    } else if (!message) {
        return NextResponse.json({ status: 500, message: 'message is required' });
    } else if (!fromName) {
        return NextResponse.json({ status: 500, message: 'fromName is required' });
    } else if (!fromEmail) {
        return NextResponse.json({ status: 500, message: 'fromEmail is required' });
    } else if (!key) {
        return NextResponse.json({ status: 500, message: 'key is required' });
    }

    const resend = new Resend(key);

    try {
        const { data, error } = await resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            to: [`${toName} <${toEmail}>`],
            subject: subject,
            react: FailureAlert({
                firstName: toName,
                apiEndpoint: apiEndpoint,
                name: name,
                email: email,
                phone: phone,
                course: courseString,
                source: source,
                campaign: campaign,
                term: term,
                one_free_course: one_free_course,
                client_id: client_id,
                ip: ip,
                device: deviceString,
            }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
