"use server";

import axios from "axios";
import { google } from "googleapis";

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

export async function getTasks({ apiKey }: { apiKey: any }) {
  try {
    if (!apiKey) {
      return { error: "API key not configured" };
    }

    const basicAuth = btoa(`${apiKey}`);

    const response = await axios.get("https://api.close.com/api/v1/task/", {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch data" };
  }
}

export async function syncSheet({
  sheetId,
  data,
  googleAuthKey,
}: {
  sheetId: string;
  data: any;
  googleAuthKey: string;
}) {
  try {
    // Authenticate with Google Sheets API
    // const auth = new google.auth.GoogleAuth({
    //   credentials: JSON.parse(
    //     // process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_KEY
    //     googleAuthKey
    //   ), // Load credentials from environment
    //   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    // });
    // const sheets = google.sheets({ version: "v4", auth });

    // // Spreadsheet ID and range (replace with your own Google Sheet's ID)
    // // const spreadsheetId = "1dpUxOPsFsUoDQ7rV9aqI0uBFZYNbTGXBA6Ze3aKxIGY"; // Replace with your Google Sheet ID
    // const range = "Sheet1!A1"; // Specify the range where data will be written

    // // Get data from the request body
    // // const { data } = await data.json(); // Add await here to properly parse the JSON body

    // const values = data && data.map((row: any) => Object.values(row)); // Convert objects to arrays
    // console.log("------auth success----", values);
    // // Append data to Google Sheet
    // await sheets.spreadsheets.values.update({
    //   spreadsheetId: sheetId,
    //   range,
    //   valueInputOption: "RAW", // RAW or USER_ENTERED
    //   requestBody: {
    //     values,
    //   },
    // });

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(
        // process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_KEY
        googleAuthKey
      ), // Load credentials from environment
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Spreadsheet ID and range (replace with your own Google Sheet's ID)
    const spreadsheetId = "1dpUxOPsFsUoDQ7rV9aqI0uBFZYNbTGXBA6Ze3aKxIGY"; // Replace with your Google Sheet ID
    const range = "Sheet1!A1"; // Specify the range where data will be written

    // Get data from the request body
    // const real_data = await data.json(); // Add await here to properly parse the JSON body
    const values = data && data.map((row) => Object.values(row)); // Convert objects to arrays
    // Append data to Google Sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW", // RAW or USER_ENTERED
      requestBody: {
        values,
      },
    });

    console.log("----update success----");
    return { data: "success" };
  } catch (error: any) {
    console.error("Google Sheets API error:", error);
    return {
      error: "Failed to update Google Sheet",
      details: error.message,
    };
  }
}
