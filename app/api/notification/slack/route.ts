import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    const body = await req.text();
    const data = JSON.parse(body);

    console.log('Slack Webhook Data:', data);

    // Format the slack message
    const slackMessage = {
        text: `New form submission from ${data.firstName} ${data.lastName}`,
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Name:* ${data.firstName} ${data.lastName}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n*Requested Course:* ${data.course.name}`
                }
            }
        ]
    }

    try {
        const response = await fetch('https://hooks.slack.com/services/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', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackMessage),
        })

        if (response) {
            return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        console.error('Slack Webhook Failed:', error);
        return NextResponse.error();
    }
}