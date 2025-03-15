// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { NextResponse } from "next/server";
import axios from "axios";
interface CloseWebhookEvent {
  object_type: string;
  action: string;
  data: Record<string, any>;
}
type DataObject = Record<string, any>;

type WebhookEvent = {
  event: {
    previous_data: DataObject;
  };
};

function replaceWithPreviousData(
  webhookData: WebhookEvent,
  secondData: DataObject
): DataObject {
  const previousData = webhookData.event.previous_data;

  // Create a new object with updated values
  const updatedData = { ...secondData };

  for (const key in previousData) {
    if (previousData[key] !== null && previousData[key] !== undefined) {
      updatedData[key] = previousData[key];
    }
  }

  return updatedData;
}

export async function POST(req: Request) {
  const apiKey = process.env.NEXT_PUBLIC_CLOSE_API_KEY;

  const basicAuth = btoa(`${apiKey}`);
  const response = await axios.get("https://api.close.com/api/v1/task/", {
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
  });
  try {
    const body = await req.json(); // Parse JSON body
    console.log("Webhook received:", body);
    const result = replaceWithPreviousData(body, response.data);
    await fetch("http://localhost:3000/api/writeToSheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: result }),
    });

    // Process the webhook data (e.g., update DB, trigger action, etc.)

    return NextResponse.json(
      { success: true, message: "Webhook received!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
