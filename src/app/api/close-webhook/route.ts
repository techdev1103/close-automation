import { NextResponse } from "next/server";
import axios from "axios";
import { supabase } from "@/lib/supabase";
import { syncSheet } from "@/actions/home";

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
    const result = replaceWithPreviousData(body, response.data);
    const { data: users, error: getUsersError } = await supabase
      .from("users")
      .select("*")
      .like("close_api_key", `%${body.event.api_key_id}%`);

    if (users?.length === 0) {
      return NextResponse.json({ message: "no user found" }, { status: 404 });
    }

    if (getUsersError) {
      console.log("getUsersError->", getUsersError);
      return NextResponse.json(
        { message: "getuser info error" },
        { status: 500 }
      );
    }

    users.forEach(async (user) => {
      try {
        const { data } = await syncSheet({
          sheetId: user?.sheet_id || "",
          data: result.data,
          googleAuthKey: user?.google_auth_key || "",
        });

        console.log(
          "user?.email, user?.sheet_id->",
          user?.email,
          user?.sheet_id
        );
      } catch (error) {
        console.error("Error handling webhook:", error);
        return NextResponse.json(
          { message: "Error processing webhook", error: error.message },
          { status: 500 }
        );
      }
    });

    // Process the webhook data (e.g., update DB, trigger action, etc.)
    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { message: "Error processing webhook", error: error.message },
      { status: 500 }
    );
  }
}
