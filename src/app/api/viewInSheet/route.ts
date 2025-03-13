// src/app/api/google-sheets/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Google OAuth2 credentials
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

console.log("----rererer-----", credentials);
// Configure Google Auth
const auth = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

export async function POST(request: Request) {
  try {
    const { data, spreadsheetId = process.env.GOOGLE_SHEET_ID } = await request.json();

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: 'Valid data array is required' }, { status: 400 });
    }

    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID is required' }, { status: 400 });
    }

    // Initialize the Sheets API
    const sheets = google.sheets({ version: 'v4', auth });

    // Extract headers from the first object if available
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    // Prepare values array starting with headers
    const values = [
      headers,
      ...data.map((row: any) =>
        headers.map(header => {
          const value = row[header];
          return value === null || value === undefined
            ? ''
            : typeof value === 'object'
              ? JSON.stringify(value)
              : value;
        })
      )
    ];

    // Clear existing data and update with new data
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Sheet1!A:Z', // Clear a wide range
    });

    // Insert the new data
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1', // Start from A1
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    // Create a direct URL to the sheet
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    return NextResponse.json({
      success: true,
      updatedRows: response.data.updatedRows,
      sheetUrl
    });

  } catch (error: any) {
    console.error('Google Sheets API error:', error);
    return NextResponse.json({
      error: 'Failed to update Google Sheet',
      details: error.message
    }, { status: 500 });
  }
}