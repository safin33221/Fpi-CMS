"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Attendance", href: "/attendance" },
    { label: "Departments", href: "/departments" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-3 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 px-3 sm:top-4 sm:px-4 lg:px-6">
            <div className="flex h-14 items-center justify-between rounded-2xl border border-slate-200/60 bg-white/80 px-4 shadow-lg backdrop-blur-xl sm:h-16 lg:px-6 dark:border-white/10 ">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">

                    <div className="hidden sm:block">
                        <h1 className="text-sm font-bold leading-none lg:text-base">
                            FPI CMS
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Campus Management System
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-7 md:flex lg:gap-9">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-lg font-medium text-slate-700 transition hover:text-primary dark:text-slate-300 dark:hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100 md:block dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20">
                        Login
                    </button>

                    <button className="rounded-xl px-4 py-2 text-sm  transition  bg-primary text-white ">
                        Get Started
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden dark:hover:bg-white/10"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-500 md:hidden ${mobileOpen
                    ? "mt-3 max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-1 rounded-2xl border border-slate-200/60 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/80">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-black dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="flex gap-3 pt-3">
                        <button className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-medium dark:border-white/10">
                            Login
                        </button>

                        <button className="flex-1 rounded-xl bg-blue py-2 text-sm font-medium ">
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
