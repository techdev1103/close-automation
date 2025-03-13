import { paths } from "@/routes/paths";

import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  auth: {
    redirectPath: string;
  };
  supabase: { url: string; key: string };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "Alpha Automation",
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
  /**
   * Auth
   */
  auth: {
    redirectPath: paths.home,
  },
  /**
   * Supabase
   */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://zkemuninggyvbqxgtzwy.supabase.co",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZW11bmluZ2d5dmJxeGd0end5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTM1MjksImV4cCI6MjA1NzM2OTUyOX0.g6fFy-QNBUxG3hDQ2A4IwcOTZ36Q6A0hkw2wVVnubjE",
  },
};
