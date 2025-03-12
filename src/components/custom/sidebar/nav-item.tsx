import React from "react";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActiveLink } from "@/routes/hooks";

export const NavItem = (item: { name: string; url: string; icon: React.ReactElement }) => {
  const active = useActiveLink(item.url);

  return (
    <>
      {
        <SidebarMenuItem key={item.name}>
          <Link key={item.url} href={item.url}>
            <SidebarMenuButton
              tooltip={item.name}
              className={cn("", active ? "bg-zinc-100 dark:bg-zinc-800" : "")}
            >
              {item.icon} <span> {item.name} </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      }
    </>
  );
};
