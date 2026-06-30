"use client";

import Image from "next/image";
import {
    BadgeCheck,
    CalendarDays,
    GraduationCap,
    ShieldCheck,
    UserCircle2,
} from "lucide-react";

import { IUser } from "@/types/user";

interface Props {
    user: IUser;
}

export default function ProfileHero({ user }: Props) {
    const initials = user.name
        ?.split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const formatRole = (role?: string) =>
        role
            ?.replace("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="
            relative
            overflow-hidden
             border
            bg-linear-to-br
            from-primary/10
            via-background
            to-primary/5
            p-2 md:p-4
            shadow-sm">
            {/* Decorative */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-white/5 blur-3xl" />

            <div className="relative p-8 lg:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    {/* Left */}
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="relative h-32 w-32 overflow-hidden rounded-full border-[5px] border-white/30 bg-white/20 shadow-2xl backdrop-blur">
                            {user.profileImage ? (
                                <Image
                                    src={user.profileImage}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-5xl font-bold">
                                    {initials}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">
                                    {formatRole(user.role)}
                                </span>

                                {user.isVerified && (
                                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-black">
                                        <BadgeCheck size={15} />
                                        Verified
                                    </span>
                                )}

                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${user.isActive
                                        ? "bg-green-500/20 text-black-100"
                                        : "bg-red-500/20 text-red-100"
                                        }`}
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight">
                                {user.name}
                            </h1>

                            <p className="mt-2 text-white/80">
                                {user.student?.department?.name ||
                                    user.teacher?.department?.name ||
                                    "Administration"}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-6 text-sm text-white/90">
                                {user.student && (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <GraduationCap size={18} />
                                            Semester {user.student.semester?.name}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <UserCircle2 size={18} />
                                            Roll {user.student.roll}
                                        </div>
                                    </>
                                )}

                                {user.teacher && (
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={18} />
                                        {user.teacher.designation}
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <CalendarDays size={18} />
                                    Joined{" "}
                                    {new Date(user.createdAt).toLocaleDateString("en-BD", {
                                        year: "numeric",
                                        month: "short",
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="grid grid-cols-2 gap-4 lg:w-[320px]">
                        <MiniCard
                            title="Department"
                            value={
                                user.student?.department?.name ||
                                user.teacher?.department?.name ||
                                "-"
                            }
                        />

                        <MiniCard
                            title={user.student ? "Semester" : "Experience"}
                            value={
                                user.student?.semester?.name ||
                                `${user.teacher?.experienceYears ?? 0} Years`
                            }
                        />

                        <MiniCard
                            title={user.student ? "Session" : "Teacher ID"}
                            value={user.student?.session || user.teacher?.teacherId || "-"}
                        />

                        <MiniCard
                            title="Login ID"
                            value={user.loginId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MiniCard({
    title,
    value,
}: {
    title: string;
    value?: string | number | null;
}) {
    return (
        <div className="rounded-2xl border bg-muted/30 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-background hover:shadow-md">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {title}
            </p>

            <p className="mt-3 line-clamp-1 text-lg font-semibold text-foreground">
                {value || "-"}
            </p>
        </div>
    );
}