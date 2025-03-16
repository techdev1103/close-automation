"use client";

import { useState, useEffect } from "react";
import { EditFormPage } from "./edit-form/page";
import { IUser } from "@/types/user";
import { useAuthContext } from "@/auth/hooks";
import { getUser } from "@/actions/user";
import { toast } from "sonner";

// ----------------------------------------------------------------------

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [setting, setSetting] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: tempUser, error: getUserError } = await getUser(
        user?.id || ""
      );

      if (getUserError) {
        toast("Update User Error.");
      }

      if (tempUser) {
        setSetting(tempUser);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col overflow-auto mx-auto p-6 gap-4">
      <div>{setting && <EditFormPage setting={setting} />}</div>
    </div>
  );
}
