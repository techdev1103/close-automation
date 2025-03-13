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
        console.log("---response----", response.data);
        setResponseData(response.data.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const openInGoogleSheets = async () => {
    try {
      const response = await fetch('/api/viewInSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responseData }),
      });

      console.log("-----1111111-----", response);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to export to Google Sheets');
      }

      setSheetUrl(result.sheetUrl);

      // Open the sheet in a new tab
      window.open(result.sheetUrl, '_blank');

    } catch (err: any) {
      console.error('Error exporting to Google Sheets:', err);
    }
  };

  return (
    <div className="homepage-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">There are {responseData.length} tasks</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
        <Button onClick={openInGoogleSheets} variant="outline">View on sheet</Button>
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
                <TableCell className="text-right">{data.is_completed ? 'Completed' : 'Not Completed'}</TableCell>
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
