"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead
} from "@/components/ui/table"; // Corrected import path
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Corrected import path
// import { registerWebhook } from "@/app/api/taskTrigger/route";

export default function HomePage() {

  interface ResponseData {
    _type: string;
    id: string;
    text: string;
    assigned_to_name: string;
    created_by_name: string;
    lead_name: string;
    updated_by_name: string;
    date: string;
    is_completed: boolean;
  }

  const [responseData, setResponseData] = useState<ResponseData[]>([]);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/getFormData');
        console.log("---98798798798----", response.data.data);
        setResponseData(response.data.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
    // registerWebhook();  //call the register webhook function
  }, []);

  const openInGoogleSheets = async () => {
    try {
      const response = await fetch('/api/writeToSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: responseData }),
      });

      if (!response.ok) {
        throw new Error('Failed to write to Google Sheets');
      }

      const result = await response.json();
      if (result.success) {
        // Open the Google Sheet in a new tab
        window.open('https://docs.google.com/spreadsheets/d/1dpUxOPsFsUoDQ7rV9aqI0uBFZYNbTGXBA6Ze3aKxIGY', '_blank');
      }
    } catch (error) {
      console.error('Error writing to sheet:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="homepage-container">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">There are {responseData.length} tasks</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
        <Button onClick={openInGoogleSheets} variant="outline">View more on sheet</Button>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Task_ID</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Asign</TableHead>
              <TableHead>CreatedByName</TableHead>
              <TableHead>LeadName</TableHead>
              <TableHead>UpdatedByName</TableHead>
              <TableHead>Created_Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responseData && responseData.map((data: ResponseData, index: number) => (
              <TableRow key={data._type + data.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data._type}</TableCell> {/* Changed from data.type to data._type */}
                <TableCell>{data.text}</TableCell>
                <TableCell>{data.assigned_to_name}</TableCell>
                <TableCell>{data.created_by_name}</TableCell>
                <TableCell>{data.lead_name}</TableCell>
                <TableCell>{data.updated_by_name}</TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell className="text-right">{data.is_complete ? 'Completed' : 'Not Completed'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {sheetUrl && (
        <a
          href={sheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm hover:underline"
        >
          View sheet data
        </a>
      )}
    </div>
  )
}
