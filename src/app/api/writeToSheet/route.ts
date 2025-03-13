// src/app/api/google-sheets/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

// Google OAuth2 credentials
// const credentials = {
//   client_email: process.env.GOOGLE_CLIENT_EMAIL,
//   private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
// };

// console.log("----rererer-----", credentials);
// // Configure Google Auth
// const auth = new google.auth.JWT(
//   credentials.client_email,
//   undefined,
//   credentials.private_key,
//   ['https://www.googleapis.com/auth/spreadsheets']
// );

export async function POST(request: Request) {
  try {
    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY), // Load credentials from environment
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Spreadsheet ID and range (replace with your own Google Sheet's ID)
    const spreadsheetId = "1YDy62NyLDlE8ma6ai8OTusQVD_zro3kuMba5exZgCCs"; // Replace with your Google Sheet ID
    const range = "Sheet1!A1"; // Specify the range where data will be written

    // Get data from the request body
    const { data } = await request.json(); // Add await here to properly parse the JSON body
    const values = data.map((row) => Object.values(row)); // Convert objects to arrays

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
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
