"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/actions/home";
import { useAuthContext } from "@/auth/hooks";
import { getUser } from "@/actions/user";
import { toast } from "sonner";
import { IUser } from "@/types/user";
import { syncSheet } from "@/actions/home";

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
  const [userData, setUserData] = useState<IUser | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: tempUser, error: getUserError } = await getUser(
        user?.id || ""
      );

      if (getUserError) {
        toast("Update User Error.");
      }

      if (tempUser) {
        setUserData(tempUser);
        try {
          // const response = await axios.get("/api/getFormData");
          const response = await getTasks({ apiKey: tempUser?.closeApiKey });
          setResponseData(response.data);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      }
    };
    // const fetchActivities = async () => {
    //   try {
    //     // const response = await axios.get("/api/getFormData");
    //     console.log("---userData----", userData);
    //     const response = await getTasks({ apiKey: userData?.closeApiKey });
    //     console.log("---response----", response);
    //     setResponseData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching activities:", error);
    //   }
    // };

    fetchUserData();
    // fetchActivities();
  }, []);

  const openInGoogleSheets = async () => {
    // try {
    try {
      console.log("------responseData-----", responseData);
      // const response = await fetch("/api/writeToSheet", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ data: responseData }),
      // });
      // const reqData = {
      //   data: responseData,
      //   googleAuthKey: userData?.googleAuthKey,
      // };
      const { data, error } = await syncSheet({
        sheetId: userData?.sheetId || "",
        data: responseData,
        googleAuthKey: userData?.googleAuthKey || "",
      });
      if (error) {
        console.log("writeToSheet error");
      }
      if (data) {
        // Open the Google Sheet in a new tab
        // if (!response.ok) {
        //   console.log("------error---");
        // } else {
        console.log("------success----");
        window.open(
          `https://docs.google.com/spreadsheets/d/${userData?.sheetId}`,
          "_blank"
        );
      }
    } catch {
      console.log("-----unsuccessful----");
    }
    //   }
    // } catch (error) {
    //   console.error("Error writing to sheet:", error);
    //   // You might want to show an error message to the user here
    // }
    // }
  };

  return (
    <div className="homepage-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                There are {responseData.length} tasks
              </TableCell>
            </TableRow>
          </TableHeader>
        </Table>
        <Button
          onClick={() => {
            openInGoogleSheets();
          }}
          variant="outline"
        >
          View more on sheet
        </Button>
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
            {responseData &&
              responseData.map((data: ResponseData, index: number) => (
                <TableRow key={data._type + data.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell>{data._type}</TableCell>{" "}
                  {/* Changed from data.type to data._type */}
                  <TableCell>{data.text}</TableCell>
                  <TableCell>{data.assigned_to_name}</TableCell>
                  <TableCell>{data.created_by_name}</TableCell>
                  <TableCell>{data.lead_name}</TableCell>
                  <TableCell>{data.updated_by_name}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell className="text-right">
                    {/* {data.is_complete ? "Completed" : "Not Completed"} */}
                  </TableCell>
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
  );
}
