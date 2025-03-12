"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/auth/hooks";
import { signOut } from "@/auth/context/action";
import { useLoadingCallback } from "react-loading-hook";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserNav() {
  const router = useRouter();
  const { user, checkUserSession } = useAuthContext();
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    await signOut();
    await checkUserSession?.();

    setHasLoggedOut(true);
    router.refresh();
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full text-xl antialiased select:none drop-shadow-sm"
          style={{ width: '30px', height: '30px' }}
        >
          <Avatar
            style={{ width: '15px', height: '15px' }}
          >
            {user?.photoURL && <AvatarImage src={user?.photoURL} />}
            <AvatarFallback>{user?.displayName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLogoutLoading || hasLoggedOut}
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
