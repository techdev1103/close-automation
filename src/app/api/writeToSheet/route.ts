// src/app/api/google-sheets/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(
        process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_KEY
      ), // Load credentials from environment
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Spreadsheet ID and range (replace with your own Google Sheet's ID)
    const spreadsheetId = "1dpUxOPsFsUoDQ7rV9aqI0uBFZYNbTGXBA6Ze3aKxIGY"; // Replace with your Google Sheet ID
    const range = "Sheet1!A1"; // Specify the range where data will be written

    console.log("------234-23---");
    // Get data from the request body
    const { data } = await request.json(); // Add await here to properly parse the JSON body
    console.log("----data----", data.data);
    const values = data && data.data.map((row) => Object.values(row)); // Convert objects to arrays
    console.log("----values----", values);
    // Append data to Google Sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW", // RAW or USER_ENTERED
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Google Sheets API error:", error);
    return NextResponse.json(
      {
        error: "Failed to update Google Sheet",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
