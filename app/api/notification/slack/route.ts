import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.text();
    const data = JSON.parse(body);

    const messageType = data.messageType;

    let slackMessage: any;

    // Define the templates
    switch (messageType) {
        case 'FreeCourseRequest':
            slackMessage = {
                text: `New Free Course Request from ${data.firstName} ${data.lastName}`,
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Name:* ${data.firstName} ${data.lastName}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n*Requested Course:* ${data.course.name}`
                        }
                    }
                ]
            };
            break;
        
        case 'ThinkificOrder':
            slackMessage = {
                text: `New Thinkific Order by ${data.payload.billing_name}`,
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Customer:* ${data.payload.billing_name}\n*Email:* ${data.payload.user.email}\n*Product:* ${data.payload.product_name}\n*Order Number:* ${data.payload.order_number}\n*Amount:* $${data.items.amount_dollars}`
                        }
                    }
                ]
            };
            break;

        case 'NewLead':
            slackMessage = {
                text: `New Lead from ${data.firstName} ${data.lastName}`,
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Name:* ${data.firstName} ${data.lastName}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n*Source:* ${data.source}`
                        }
                    }
                ]
            };
            break;

        // Add more cases for different message types as needed

        default:
            return NextResponse.json({ error: 'Invalid message type' }, { status: 400 });
    }

    try {
        const response = await fetch('https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackMessage),
        });

        if (response.ok) {
            return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        console.error('Slack Webhook Failed:', error);
        return NextResponse.error();
    }
}
