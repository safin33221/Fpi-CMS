/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Bell,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    User,
    X,
} from "lucide-react";

import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "./logoutButton";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Attendance", href: "/attendance" },
    { label: "Departments", href: "/departments" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar({
    user,
    hasAuthCookie = false,
}: {
    user: any;
    hasAuthCookie?: boolean;
}) {
    console.log({ user, hasAuthCookie });
    const [mobileOpen, setMobileOpen] = useState(false);

    const pathname = usePathname();

    return (
        <nav className="fixed left-1/2 top-3 z-50 w-full max-w-7xl -translate-x-1/2 px-3 sm:top-4 sm:px-4 lg:px-6">
            <div className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 shadow-lg backdrop-blur-xl sm:h-16 lg:px-6  ">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                            F
                        </span>
                    </div>

                    <div>
                        <h1 className="text-sm font-bold leading-none lg:text-base">
                            FPI CMS
                        </h1>

                        <p className="hidden text-xs text-muted-foreground md:block">
                            Feni Polytechnic Institute
                        </p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-2 md:flex lg:gap-3">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "rounded-xl px-4 py-2 text-sm font-medium transition",
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                    {hasAuthCookie && user ? (
                        <>
                            {/* Notification */}
                            <Button
                                size="icon"
                                variant="outline"
                                className="hidden rounded-xl border-slate-200 md:flex "
                            >
                                <Bell size={18} />
                            </Button>

                            {/* User Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="h-11 rounded-xl border border-slate-200 bg-background px-3  ">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full ">
                                                <span className="text-sm font-semibold text-black">
                                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                                </span>
                                            </div>

                                            <div className="hidden text-left md:block">
                                                <h3 className="max-w-30 truncate text-sm  text-black font-semibold">
                                                    {user?.name || "User"}
                                                </h3>

                                                <p className="text-xs capitalize text-muted-foreground">
                                                    {user?.role || "Student"}
                                                </p>
                                            </div>

                                            <ChevronDown className="text-black" size={16} />
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-60 rounded-2xl p-2 bg-white text-black hover:text-black"
                                >
                                    {/* User Info */}
                                    <div className="mb-2 rounded-xl bg-muted/5 p-3">
                                        <h3 className="truncate text-sm font-semibold">
                                            {user?.name}
                                        </h3>

                                        <p className="truncate text-xs ">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <DropdownMenuSeparator />

                                    {/* Dashboard */}
                                    <Link href="/dashboard">
                                        <DropdownMenuItem className="mt-1 flex cursor-pointer  items-center gap-2 rounded-xl">
                                            <LayoutDashboard className="" size={16} />
                                            Dashboard
                                        </DropdownMenuItem>
                                    </Link>

                                    {/* Profile */}
                                    <Link href="/profile">
                                        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-xl">
                                            <User size={16} />
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>

                                    {/* Settings */}
                                    <Link href="/settings">
                                        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-xl">
                                            <Settings size={16} />
                                            Settings
                                        </DropdownMenuItem>
                                    </Link>

                                    <DropdownMenuSeparator />


                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-xl text-red-500 focus:text-red-500">
                                        <LogOut size={16} />
                                        <LogoutButton />
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "rounded-xl border border-slate-200 bg-background px-4 py-2 text-black dark:border-white/10 dark:bg-transparent dark:text-white"
                                )}
                            >
                                Login
                            </Link>

                            <Link
                                href="/get-start"
                                className={cn(
                                    buttonVariants(),
                                    "rounded-xl px-4 py-2 text-sm"
                                )}
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                    {/* Mobile Toggle */}
                    <Button
                        size="icon"
                        variant="outline"
                        className="rounded-xl text-black md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "overflow-hidden transition-all duration-500 md:hidden",
                    mobileOpen
                        ? "mt-3 max-h-150 opacity-100"
                        : "max-h-0 opacity-0"
                )}
            >
                <div className="space-y-2 rounded-2xl border border-slate-200/60  p-4 shadow-xl backdrop-blur-xl">


                    {/* Mobile Nav */}
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "block rounded-xl px-4 py-3 text-sm font-medium transition",
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Mobile Actions */}
                    <div className="flex flex-col gap-3 pt-3">
                        {hasAuthCookie && user ? (
                            <>



                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={cn(
                                        buttonVariants({
                                            variant: "outline",
                                        }),
                                        "w-full rounded-xl"
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/get-start"
                                    className={cn(
                                        buttonVariants(),
                                        "w-full rounded-xl"
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}