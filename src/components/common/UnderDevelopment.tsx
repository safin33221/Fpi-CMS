"use client"
import Link from "next/link";
import { Construction, ArrowLeft, LayoutDashboard } from "lucide-react";

interface UnderDevelopmentProps {
    title?: string;
    description?: string;
    dashboardUrl?: string;
}

export default function UnderDevelopment({
    title = "Module Under Development",
    description = "This module is currently under development and will be available in a future update. Please check back later.",
    dashboardUrl = "/admin/dashboard",
}: UnderDevelopmentProps) {
    return (
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6">
            <div className="w-full max-w-xl text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
                    <Construction className="h-10 w-10 text-amber-600" />
                </div>

                <span className="mt-6 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600">
                    Coming Soon
                </span>

                <h1 className="mt-6 text-3xl font-bold tracking-tight">
                    {title}
                </h1>

                <p className="mt-4 text-muted-foreground">
                    {description}
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        onClick={() => history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>

                    <Link
                        href={dashboardUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}