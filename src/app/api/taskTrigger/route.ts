import axios from 'axios';
import { NextResponse } from "next/server";

const WEBHOOK_URL = 'https://59f2-89-187-161-220.ngrok-free.app';

interface CloseWebhookResponse {
  id: string;
  url: string;
  events: { object_type: string; action: string }[];
}

export const registerWebhook = async () => {
  console.log("----registerWebbook function is called----");

  const apiKey = process.env.CLOSE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const basicAuth = btoa(`${apiKey}`);

  try {
    const response = await axios.post<CloseWebhookResponse>(
      'https://api.close.com/api/v1/webhook/',

      {
        url: WEBHOOK_URL,
        events: [{ object_type: 'is_completed', action: 'true' },
        { object_type: 'is_completed', action: 'false' }]
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("=----response----", response);
    console.log('Webhook registered:', response.data);
  } catch (error) {
    console.error('Webhook registration failed:', error);
  }
};

