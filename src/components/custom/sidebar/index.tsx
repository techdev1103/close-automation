"use client";

import * as React from "react";
import { navData } from "@/config-nav-main";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { TenantSwitcher } from "./tenant-switcher";

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarHeader>
          <TenantSwitcher />
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        {navData.map((nav) => (
          <NavMain key={nav.subheader} subheader={nav.subheader} items={nav.items} />
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
