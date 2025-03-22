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
import { ITask } from "@/types/task";
import { syncSheet } from "@/actions/home";
import { DataTable } from "@/components/pages/home/data-table";
import { columns } from "@/components/pages/home/columns";

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

  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<ITask[]>([]);

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
          const taskPerPage = 100;
          const page = 1;
          let tempTasks = [];

          const { hasMore, totalResults, data } = await getTasks({
            apiKey: tempUser?.closeApiKey || "",
            limit: taskPerPage,
            page: page,
          });

          tempTasks.push(...data);

          if (hasMore) {
            const numberOfPages = totalResults / 100 + 1;
            const arr = Array.from({ length: numberOfPages }, (_, i) => i);

            for (var index = 1; index <= arr.length; index++) {
              const { data } = await getTasks({
                apiKey: tempUser?.closeApiKey || "",
                limit: taskPerPage,
                page: index + 1,
              });

              tempTasks.push(...data);
            }
          }

          setTasks(tempTasks);
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

  const initSyncSheet = async () => {
    try {
      const { data, error: syncSheetError } = await syncSheet({
        sheetId: userData?.sheetId || "",
        data: tasks,
        googleAuthKey: userData?.googleAuthKey || "",
      });
      if (syncSheetError) {
        console.log("syncSheetError->", syncSheetError);
      }
      if (data) {
        window.open(
          `https://docs.google.com/spreadsheets/d/${userData?.sheetId}`,
          "_blank"
        );
      }
    } catch {
      console.log("-----unsuccessful----");
    }
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
        <DataTable columns={columns} data={tasks} syncSheet={initSyncSheet} />
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
