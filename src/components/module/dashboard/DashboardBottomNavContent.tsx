
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    Users,
    CalendarDays,
    User,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
    {
        title: "Home",
        href: "/student/dashboard",
        icon: House,
    },
    {
        title: "Attendance",
        href: "/student/dashboard/attendance",
        icon: CalendarDays,
    },
    {
        title: "Students",
        href: "/student/dashboard/students",
        icon: Users,
    },
    {
        title: "Profile",
        href: "/student/dashboard/profile",
        icon: User,
    },
];

export default function DashboardBottomNavContent() {
    const pathname = usePathname();

    return (
        <nav className="grid h-full grid-cols-4  md:hidden bottom-0">
            {navItems.map(({ title, href, icon: Icon }) => {
                const active =
                    pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Link
                        key={href}
                        href={href}
                        className={clsx(
                            "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
                            active
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon className="size-5" />
                        <span>{title}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
