"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ManagementPageHeaderProps {
    title: string;
    description?: string;

    action?: {
        icon: LucideIcon;
        label: string;
        onClick: () => void;
    };

    children?: React.ReactNode;
}

export default function ManagementPageHeader({
    title,
    description,
    action,
    children,
}: ManagementPageHeaderProps) {
    const Icon = action?.icon;

    return (
        <div
            className="
            relative overflow-hidden
             border
            bg-linear-to-br
            from-primary/10
            via-background
            to-primary/5
            p-2 md:p-4
            shadow-sm
        "
        >
            {/* Background Glow */}
            <div
                className="
                absolute -right-20 -top-20
                h-64 w-64 rounded-full
                bg-primary/10 blur-3xl
            "
            />

            <div
                className="
                absolute -bottom-20 -left-20
                h-46 w-56 rounded-full
                bg-primary/5 blur-3xl
            "
            />

            <div className="relative z-10">
                <div
                    className="
                    flex flex-col gap-5
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
                >
                    {/* Left */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                h-3 w-3 rounded-full
                                bg-green-500
                                animate-pulse
                            "
                            />

                            <span
                                className="
                                text-xs font-medium
                                uppercase tracking-wider
                                text-muted-foreground
                            "
                            >
                                Management Dashboard
                            </span>
                        </div>

                        <h1
                            className="
                            mt-3
                            text-3xl font-bold
                            tracking-tight
                            md:text-4xl
                        "
                        >
                            {title}
                        </h1>

                        {description && (
                            <p
                                className="
                                mt-3 max-w-2xl
                                text-sm leading-6
                                text-muted-foreground
                                md:text-base
                            "
                            >
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Right */}
                    {action && (
                        <Button
                            onClick={action.onClick}
                            size="lg"
                            className="
                            h-12 rounded-2xl
                            px-6 shadow-lg
                            shadow-primary/20
                        "
                        >
                            {Icon && (
                                <Icon className="mr-2 h-4 w-4" />
                            )}

                            {action.label}
                        </Button>
                    )}
                </div>

                {/* Filters / Search / Extra Content */}
                {children && (
                    <div
                        className="
                        mt-6 border-t
                        pt-5
                    "
                    >
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}