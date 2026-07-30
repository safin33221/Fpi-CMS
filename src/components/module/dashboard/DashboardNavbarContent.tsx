"use client";

import { IUser } from "@/types/user";
import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardNavbarContent({
  user,
}: {
  user: IUser;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* Left */}
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back 👋
        </p>

        <h1 className="text-xl font-semibold">
          {user.name}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden w-72 lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="pl-9"
          />
        </div>

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
        >
          <Settings className="h-5 w-5" />
        </Button>

  
      </div>
    </header>
  );
}