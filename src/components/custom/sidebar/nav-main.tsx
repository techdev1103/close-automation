"use client";

import { SidebarMenu, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { NavItem } from "./nav-item";

export function NavMain({
  subheader,
  items,
}: {
  subheader: string;
  items: Array<{ name: string; url: string; icon: React.ReactElement }>;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{subheader}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <NavItem key={index} name={item.name} url={item.url} icon={item.icon} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
