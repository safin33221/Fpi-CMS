/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
    {
        label: "Home",
        href: "/",
    },

    {
        label: "About",
        href: "/about",
        children: [
            {
                label: "About FPI",
                href: "/about",
            },
            {
                label: "Principal's Message",
                href: "/about/principal-message",
            },
            {
                label: "History",
                href: "/about/history",
            },
            {
                label: "Mission & Vision",
                href: "/about/mission-vision",
            },
            {
                label: "Campus Facilities",
                href: "/about/facilities",
            },
        ],
    },

    {
        label: "Departments",
        href: "/departments",
        children: [
            {
                label: "Computer Technology",
                href: "/departments/computer",
            },
            {
                label: "Civil Technology",
                href: "/departments/civil",
            },
            {
                label: "Electrical Technology",
                href: "/departments/electrical",
            },
            {
                label: "Electronics Technology",
                href: "/departments/electronics",
            },
            {
                label: "Mechanical Technology",
                href: "/departments/mechanical",
            },
            {
                label: "Power Technology",
                href: "/departments/power",
            },
        ],
    },

    {
        label: "Academics",
        href: "/academics",
        children: [
            {
                label: "Programs",
                href: "/academics/programs",
            },
            {
                label: "Curriculum",
                href: "/academics/curriculum",
            },
            {
                label: "Academic Calendar",
                href: "/academics/calendar",
            },
            {
                label: "Class Routine",
                href: "/academics/routine",
            },
            {
                label: "Exam Schedule",
                href: "/academics/exams",
            },
        ],
    },

    {
        label: "Admission",
        href: "/admission",
        children: [
            {
                label: "Admission Information",
                href: "/admission",
            },
            {
                label: "Requirements",
                href: "/admission/requirements",
            },
            {
                label: "Apply Online",
                href: "/admission/apply",
            },
            {
                label: "Admission Result",
                href: "/admission/result",
            },
        ],
    },

    {
        label: "Notice",
        href: "/notices",
    },

    {
        label: "Contact",
        href: "/contact",
    },
];

export default function Navbar() {

    const [mobileOpen, setMobileOpen] = useState(false);

    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50">
            <div className="flex  h-14 items-center justify-between  border border-slate-200 px-4 shadow-lg bg-white sm:h-20 lg:px-6  ">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                            F
                        </span>
                    </div>

                    <div>
                        <h1 className="text-sm font-bold leading-none md:text-2xl">
                            Feni Polytechnic Institute
                        </h1>

                        <p className="hidden text-xs text-muted-foreground md:block">

                        </p>
                    </div>
                </Link>

                {/* Desktop Nav */}

                {/* Right Side */}
                <div className="flex items-end gap-2">
                    <div className="hidden items-center gap-2 md:flex lg:gap-3">
                        {NAV_ITEMS.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                item.children?.some((child) => pathname === child.href);

                            if (item.children?.length) {
                                return (
                                    <div key={item.label} className="group relative">
                                        <button
                                            className={cn(
                                                "flex items-center gap-1 rounded-xl px-4 py-2 text-lg transition",
                                                isActive
                                                    ? "bg-primary/10 font-medium text-blue-600"
                                                    : "text-slate-700 hover:bg-slate-100"
                                            )}
                                        >
                                            {item.label}
                                            <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
                                        </button>

                                        <div className="invisible absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className={cn(
                                                        "block rounded-lg px-3 py-2 text-sm transition",
                                                        pathname === child.href
                                                            ? "bg-primary/10 font-medium text-blue-600"
                                                            : "text-slate-700 hover:bg-slate-100"
                                                    )}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "rounded-xl px-4 py-2 text-lg transition",
                                        isActive
                                            ? "bg-primary/10 font-medium text-blue-600"
                                            : "text-slate-700 hover:bg-slate-100"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>


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

                </div>
            </div>
        </nav>
    );
}