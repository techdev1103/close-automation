import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Spinner } from "@/components/custom/loading";
import { ThemeProvider } from "../providers/theme-provider";
import { AuthProvider } from "@/auth/context";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Close.com Automation",
  description: "Close.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Suspense fallback={<Spinner />}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
