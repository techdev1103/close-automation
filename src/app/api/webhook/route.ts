// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false, // Close.com sends raw JSON, so we disable body parsing
  },
};

interface CloseWebhookEvent {
  object_type: string;
  action: string;
  data: Record<string, any>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const buf = await buffer(req);
    const rawBody = buf.toString('utf8');

    const event: CloseWebhookEvent = JSON.parse(rawBody);

    if (event.object_type === 'activity.task_completed' && event.action === 'created') {
      console.log('Task completed:', event.data);
      // Perform any necessary actions, such as updating the database or notifying a user
    }

    return res.status(200).send('Event received');
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
