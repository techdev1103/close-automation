"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

const trigged_Data = [
  {
    task_id: "Task001",
    task_name: "Figma",
    status: "Active",
    updateByName: "John",
    createdByName: "simon",
    date_created: "2025-01-01",
  },
  {
    task_id: "Task002",
    task_name: "Unreal Engine",
    status: "None",
    updateByName: "David",
    createdByName: "simon",
    date_created: "2025-01-01",
  },
  {
    task_id: "Task003",
    task_name: "Kotlin",
    status: "None",
    updateByName: "Jackson",
    createdByName: "simon",
    date_created: "2025-01-01",
  },
  {
    task_id: "Task004",
    task_name: "Figma",
    status: "Active",
    updateByName: "John",
    createdByName: "simon",
    date_created: "2025-01-01",
  },
  {
    task_id: "Task005",
    task_name: "Figma",
    status: "None",
    updateByName: "David",
    createdByName: "simon",
    date_created: "2025-01-01",
  },
  {
    task_id: "Task006",
    task_name: "Unreal Engine",
    status: "Active",
    updateByName: "Jackson",
    createdByName: "simon",
    date_created: "2025-01-01",
  },
  {
    task_id: "Task007",
    task_name: "Kotlin",
    status: "Active",
    updateByName: "John",
    createdByName: "simon",
    date_created: "2025-01-01",
  }
]





export default function HomePage() {

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/getFormData');
        console.log("---response----", response.data);
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="homepage-container">
      <div>Welcome to here!</div>
      <div>
        <Table>
          <TableCaption>A list of your recent tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Task_ID</TableHead>
              <TableHead className="w-[100px]">Task_Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>UpdateByName</TableHead>
              <TableHead>CreatedByName</TableHead>
              <TableHead className="text-right">Date_Created</TableHead>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {trigged_Data.map((data, index) => (
              <TableRow key={data.task_id + data.task_name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{data.task_id}</TableCell>
                <TableCell>{data.task_name}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>{data.updateByName}</TableCell>
                <TableCell>{data.createdByName}</TableCell>
                <TableCell className="text-right">{data.date_created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">There are {trigged_Data.length} tasks</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
    </div>
  )
}
