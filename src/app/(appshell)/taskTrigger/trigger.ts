import axios from 'axios';

const CLOSE_API_KEY = process.env.CLOSE_API_KEY;
const WEBHOOK_URL = 'http://localhost:300/api/webhook';

interface CloseWebhookResponse {
  id: string;
  url: string;
  events: { object_type: string; action: string }[];
}

export const registerWebhook = async () => {
  try {
    const response = await axios.post<CloseWebhookResponse>(
      'https://api.close.com/api/v1/webhook/',
      {
        url: WEBHOOK_URL,
        events: [{ object_type: 'activity.task_completed', action: 'created' }],
      },
      {
        auth: {
          username: CLOSE_API_KEY,
          password: '',
        },
      }
    );

    console.log('Webhook registered:', response.data);
  } catch (error) {
    console.error('Webhook registration failed:', error);
  }
};

