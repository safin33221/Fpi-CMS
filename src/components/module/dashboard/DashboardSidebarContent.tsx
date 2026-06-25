"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { NavSection } from "@/types/nav-menu";
import { IUser } from "@/types/user";

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
};

export default function DashboardSidebarContent({
    userInfo,
    navItems,
}: Props) {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-62 flex-col border-r bg-background">
            {/* Logo */}
            <div className="border-b p-2">
                <h2 className="text-lg font-bold">
                    Feni Polytechnic
                </h2>

                <p className="text-muted-foreground text-sm">
                    Smart Campus ERP
                </p>
            </div>



            {/* Menu */}
            <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((section, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className="mb-6 px-3"
                    >
                        {section.title && (
                            <h4 className="text-muted-foreground mb-2 px-3 text-xs font-semibold uppercase tracking-wider">
                                {section.title}
                            </h4>
                        )}

                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon =
                                    iconMap[item.icon] ??
                                    LayoutDashboard;

                                const active =
                                    pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                            active
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />

                                        <span>{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            {/* User */}
            <div className="border-b p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold">
                        {userInfo?.name?.charAt(0) ?? "U"}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-medium">
                            {userInfo?.name}
                        </p>

                        <p className="text-muted-foreground truncate text-xs">
                            {userInfo?.role}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}