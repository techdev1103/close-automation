"use client";

import { useEffect, useState } from "react";
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
  const [userData, setUserData] = useState<IUser | null>(null);
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          setIsLoading(true);
          const taskPerPage = 500;
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
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const initSyncSheet = async () => {
    try {
      const { error: syncSheetError } = await syncSheet({
        sheetId: userData?.sheetId || "",
        data: tasks,
        googleAuthKey: userData?.googleAuthKey || "",
      });
      if (syncSheetError) {
        console.log("syncSheetError->", syncSheetError);
        return;
      }

      toast("Google Sheet is synchronized successfully.");
      // if (data) {
      //   window.open(
      //     `https://docs.google.com/spreadsheets/d/${userData?.sheetId}`,
      //     "_blank"
      //   );
      // }
    } catch {
      console.log("-----unsuccessful----");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    </div>
  );
}
