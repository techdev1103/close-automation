"use client";

import { AuthGuard } from "@/auth/guard";
import { MainNav } from "@/components/custom/main-nav";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/custom/sidebar";
import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useState } from "react";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>();

  const handleOpenChange = (open: boolean) => {
    setSidebarOpen(open);
  };

  return (
    <AuthGuard>
      <section className="w-full flex flex-col overflow-hidden">
        <SidebarProvider open={sidebarOpen} onOpenChange={handleOpenChange}>
          <AppSidebar />
          <SidebarInset>
            <header className="flex sticky top-0 bg-background h-12 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex-1 min-w-0"></div>
              <div className="flex justify-end">
                <MainNav />
              </div>
            </header>
            <div className="flex-grow max-h-[calc(100vh-3rem)] overflow-auto p-6">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </AuthGuard>
  );
}
