"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
    LayoutDashboard,
    Bell,
    User,
    Settings,
    Lock,
    Building2,
    Users,
    BarChart3,
    FileBarChart,
    ShieldCheck,
    GraduationCap,
    UserPlus,
    IdCard,
    ArrowUpCircle,
    FileText,
    BookOpen,
    CalendarDays,
    ClipboardCheck,
    Presentation,
    QrCode,
    PenSquare,
    Wallet,
    BadgeDollarSign,
    Receipt,
    FileSpreadsheet,
    Award,
    FileCheck,
    BookMarked,
    Undo2,
    Upload,
    DoorOpen,
    CalendarRange,
    ChevronDown,
    LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { NavSection } from "@/types/nav-menu";
import { IUser } from "@/types/user";
import LogoutButton from "@/components/shared/logoutButton";

interface Props {
    userInfo: IUser;
    navItems: NavSection[];
    dashboardHome: string;
}

const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    Bell,
    User,
    Settings,
    Lock,
    Building2,
    Users,
    BarChart3,
    FileBarChart,
    ShieldCheck,
    GraduationCap,
    UserPlus,
    IdCard,
    ArrowUpCircle,
    FileText,
    BookOpen,
    CalendarDays,
    ClipboardCheck,
    Presentation,
    QrCode,
    PenSquare,
    Wallet,
    BadgeDollarSign,
    Receipt,
    FileSpreadsheet,
    Award,
    FileCheck,
    BookMarked,
    Undo2,
    Upload,
    DoorOpen,
    CalendarRange,
};

export default function DashboardSidebarContent({
    userInfo,
    navItems,
    dashboardHome,
}: Props) {
    const pathname = usePathname();

    // Track open/collapsed state of each category section by title
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        navItems.forEach((section) => {
            if (section.title) {
                // By default, open all sections
                initial[section.title] = true;
            }
        });
        return initial;
    });

    // Ensure category containing the active route is automatically unfolded
    useEffect(() => {
        navItems.forEach((section) => {
            if (section.title) {
                const hasActive = section.items.some(
                    (item) =>
                        pathname === item.href ||
                        (item.href !== dashboardHome &&
                            pathname.startsWith(`${item.href}/`))
                );
                if (hasActive) {
                    setOpenSections((prev) => ({
                        ...prev,
                        [section.title as string]: true,
                    }));
                }
            }
        });
    }, [pathname, navItems, dashboardHome]);

    const toggleSection = (title: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <aside className="flex h-screen w-full flex-col border-r bg-card/60 backdrop-blur select-none">
            {/* Logo / Brand Header */}
            <div className="shrink-0 p-4 border-b flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-xs border border-primary/20">
                    FPI
                </div>
                <div className="min-w-0">
                    <h2 className="text-sm font-bold tracking-tight text-foreground truncate">
                        Feni Polytechnic
                    </h2>
                    <p className="text-[11px] font-medium text-muted-foreground truncate">
                        Smart Campus ERP
                    </p>
                </div>
            </div>

            {/* Scrollable Navigation Menu */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3.5">
                {navItems.map((section, sectionIndex) => {
                    // Check if section is standalone (no title, e.g. Dashboard / Notices)
                    if (!section.title) {
                        return (
                            <div key={sectionIndex} className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = iconMap[item.icon] ?? LayoutDashboard;
                                    const active =
                                        pathname === item.href ||
                                        (item.href !== dashboardHome &&
                                            pathname.startsWith(`${item.href}/`));

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                active
                                                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                                            )}
                                        >
                                            <Icon className="h-4 w-4 shrink-0" />
                                            <span className="truncate">{item.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        );
                    }

                    const isOpen = openSections[section.title] ?? true;
                    const hasActiveChild = section.items.some(
                        (item) =>
                            pathname === item.href ||
                            (item.href !== dashboardHome &&
                                pathname.startsWith(`${item.href}/`))
                    );

                    return (
                        <div key={section.title} className="rounded-lg">
                            {/* Accordion Category Header */}
                            <button
                                type="button"
                                onClick={() => toggleSection(section.title!)}
                                className={cn(
                                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group",
                                    hasActiveChild
                                        ? "text-primary hover:bg-primary/5"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                )}
                            >
                                <span className="truncate">{section.title}</span>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-muted text-muted-foreground group-hover:bg-muted/80">
                                        {section.items.length}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-3.5 w-3.5 transition-transform duration-200 text-muted-foreground group-hover:text-foreground",
                                            isOpen ? "rotate-0" : "-rotate-90"
                                        )}
                                    />
                                </div>
                            </button>

                            {/* Collapsible Content */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-1 pt-1 pl-1">
                                            {section.items.map((item) => {
                                                const Icon =
                                                    iconMap[item.icon] ?? LayoutDashboard;

                                                const active =
                                                    pathname === item.href ||
                                                    (item.href !== dashboardHome &&
                                                        pathname.startsWith(`${item.href}/`));

                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className={cn(
                                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                            active
                                                                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                                                        )}
                                                    >
                                                        <Icon className="h-4 w-4 shrink-0" />
                                                        <span className="truncate">{item.title}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* User Profile & Logout Footer */}
            <div className="shrink-0 p-3 border-t bg-card/80 backdrop-blur space-y-2">
                <div className="flex items-center gap-3 px-2.5 py-2 rounded-xl bg-muted/50 border border-border/40">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {userInfo?.name?.charAt(0)?.toUpperCase() ?? "U"}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground leading-tight">
                            {userInfo?.name}
                        </p>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">
                            {userInfo?.role?.replace("_", " ")}
                        </p>
                    </div>
                </div>

                <div className="px-1">
                    <LogoutButton />
                </div>
            </div>
        </aside>
    );
}
