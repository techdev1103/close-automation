// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { NextResponse } from "next/server";

interface CloseWebhookEvent {
  object_type: string;
  action: string;
  data: Record<string, any>;
}

export async function POST(req: Request,) {
  try {
    const body = await req.json(); // Parse JSON body
    console.log("Webhook received:", body);

    // Process the webhook data (e.g., update DB, trigger action, etc.)

    return NextResponse.json({ success: true, message: "Webhook received!" }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// export default async function handler() {
//   console.log("----req----", req.body);
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', 'POST');
//     return res.status(405).end('Method Not Allowed');
//   }

//   try {
//     const buf = await buffer(req);
//     const rawBody = buf.toString('utf8');

//     const event: CloseWebhookEvent = JSON.parse(rawBody);

//     console.log("-----event----", event);
//     if (event.object_type === 'activity.task_completed' && event.action === 'created') {
//       console.log('Task completed:', event.data);
//       // Perform any necessary actions, such as updating the database or notifying a user
//     }

//     // const eventData: CloseEventData = req.body;

//     // console.log('Received event:', eventData);
//     return res.status(200).send('Event received');
//   } catch (error) {
//     console.error('Error processing webhook:', error);
//     return res.status(400).json({ error: 'Invalid request' });
//   }
// }
