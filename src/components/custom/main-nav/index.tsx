"use client";

import { UserNav } from "../user-nav";
import { ModeToggle } from "../theme-mode";

export function MainNav({}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex gap-4 items-center px-4 lg:px-6 py-1">
      <ModeToggle />
      <UserNav />
    </div>
  );
}
