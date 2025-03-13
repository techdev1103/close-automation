import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = 'api_2r7XEIzH108gXnIOSxl2fo.7gEiGBa8Nfj9Qo4hC81jSQ';
    const basicAuth = btoa(`${apiKey}`);
    
    const response = await axios.get('https://api.close.com/api/v1/activity/task_completed', {
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json'
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 