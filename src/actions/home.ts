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

export async function getTasks({
  apiKey,
  limit,
  page,
}: {
  apiKey: string;
  limit: number;
  page: number;
}) {
  try {
    if (!apiKey) {
      return { error: "API key not configured" };
    }

    const basicAuth = btoa(`${apiKey}`);

    const { data } = await axios.get("https://api.close.com/api/v1/task/", {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
      params: {
        _limit: limit,
        _skip: (page - 1) * limit,
      },
    });
    const tempTasks = data.data.map((task: any) => {
      return {
        id: task.id,
        assignedTo: task.assigned_to,
        assignedToName: task.assigned_to_name,
        contactId: task.contact_id,
        contactName: task.contact_name,
        createdBy: task.created_by,
        createdByName: task.created_by_name,
        date: task.date,
        dateCreated: task.date_created,
        dateUpdated: task.date_updated,
        deduplicationKey: task.deduplication_key,
        dueDate: task.due_date,
        isComplete: task.is_complete,
        isDateLess: task.is_dateless,
        isPrimiaryLeadNotification: task.is_primary_lead_notification,
        leadId: task.lead_id,
        leadName: task.lead_name,
        objectId: task.object_id,
        objectType: task.object_type,
        organizationId: task.organization_id,
        text: task.text,
        updatedBy: task.updated_by,
        updatedByName: task.updated_by_name,
        view: task.view,
        type: task._type,
      };
    });

    return {
      hasMore: data.has_more,
      totalResults: data.total_results,
      data: tempTasks,
    };
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
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(googleAuthKey),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const range = "Sheet1!A1"; // Specify the range where data will be written

    const sortedDataByFielddata = data.map((item: any) => {
      return {
        leadName: item.leadName,
        text: item.text,
        type: item.type,
        view: item.view,
        dueDate: item.dueDate,
        createdByName: item.createdByName,
        updatedByName: item.updatedByName,
        isComplete: item.isComplete,
        assignedToName: item.assignedToName,
        date: item.date,
        dateCreated: item.dateCreated,
        dateUpdated: item.dateUpdated,
        id: item.id,
      };
    });

    const values =
      sortedDataByFielddata &&
      sortedDataByFielddata.map((row: any) => Object.values(row)); // Convert objects to arrays
    const sheetHeader = [
      // "Lead Id",
      "Lead Name",
      "Text",
      "Type",
      "View",
      "Due Date",
      "Created By Name",
      "Updated By Name",
      "Is Complete",
      // "Assigned To",
      "Assigned To Name",
      "Date",
      "Date Created",
      "Date Updated",
      "Id",
      // "Contact Id",
      // "Contact Name",
      // "Created By",
      // "Deduplication Key",
      // "Is DateLess",
      // "Is Primary Lead Notification",
      // "Object Id",
      // "Object Type",
      // "Organization Id",
      // "Updated By",
    ];

    values.unshift(sheetHeader);

    // Append data to Google Sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW", // RAW or USER_ENTERED
      requestBody: {
        values,
      },
    });

    return { data: "success" };
  } catch (error: any) {
    console.error("Google Sheets API error:", error);
    return {
      error: "Failed to update Google Sheet",
      details: error.message,
    };
  }
}
