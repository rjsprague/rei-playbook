import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const slackNewLeadsWebhook = process.env.SLACK_NEW_LEADS_URL;
        if(!slackNewLeadsWebhook) {
            return NextResponse.json({ error: 'Slack Webhook URL not found' }, { status: 500 });
        }
        
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
                                text: `*Requested Course:* ${data.course.name}\n*Name:* ${data.firstName} ${data.lastName}\n*Email:* ${data.email}\n*Phone:* ${data.phone}`
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
                                text: `*Customer:* ${data.payload.billing_name}\n*Email:* ${data.payload.user.email}\n*Product:* ${data.payload.product_name}\n*Order Number:* ${data.payload.order_number}\n*Amount:* $${data.payload.amount_dollars}`
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

        const response = await fetch(slackNewLeadsWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackMessage),
        });

        if (response.ok) {
            return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
        } else {
            const errorText = await response.text();
            console.error(`Slack Webhook failed with status: ${response.status}, message: ${errorText}`);
            return NextResponse.json({ error: 'Failed to send data to Slack', details: errorText }, { status: response.status });
        }
    } catch (error) {
        console.error('Slack Webhook Failed:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
    }
}
