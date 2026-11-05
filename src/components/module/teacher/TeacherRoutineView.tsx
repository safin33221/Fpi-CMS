"use client";

import { useMemo, useRef, useState } from "react";
import {
    CalendarDays,
    Clock,
    MapPin,
    Printer,
    GraduationCap,
    BookOpen,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IClassRoutine, Weekday } from "@/types/routine";

interface Props {
    routines: IClassRoutine[];
    teacherName: string;
    designation: string;
    departmentName: string;
}

const WEEKDAYS: { key: Weekday; label: string; short: string }[] = [
    { key: "SATURDAY", label: "শনিবার (Saturday)", short: "শনি" },
    { key: "SUNDAY", label: "রবিবার (Sunday)", short: "রবি" },
    { key: "MONDAY", label: "সোমবার (Monday)", short: "সোম" },
    { key: "TUESDAY", label: "মঙ্গলবার (Tuesday)", short: "মঙ্গল" },
    { key: "WEDNESDAY", label: "বুধবার (Wednesday)", short: "বুধ" },
    { key: "THURSDAY", label: "বৃহস্পতিবার (Thursday)", short: "বৃহস্পতি" },
    { key: "FRIDAY", label: "শুক্রবার (Friday)", short: "শুক্র" },
];

export default function TeacherRoutineView({
    routines,
    teacherName,
    designation,
    departmentName,
}: Props) {
    const [activeDay, setActiveDay] = useState<Weekday | "ALL">("ALL");
    const printAreaRef = useRef<HTMLDivElement>(null);

    const filteredRoutines = useMemo(() => {
        if (activeDay === "ALL") {
            return [...routines].sort((a, b) => a.startTime.localeCompare(b.startTime));
        }
        return routines
            .filter((r) => r.day === activeDay)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
    }, [routines, activeDay]);

    const handlePrint = () => {
        const content = printAreaRef.current;
        if (!content) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Teacher Class Routine - ${teacherName}</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; padding: 20px; font-size: 12px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
        .title { font-size: 18px; font-weight: bold; margin: 0; }
        .sub { font-size: 13px; margin: 3px 0; color: #444; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #444; padding: 8px; text-align: left; vertical-align: top; }
        th { background: #f0f0f0; }
        .badge { background: #eee; padding: 3px 6px; border-radius: 4px; font-size: 11px; margin-bottom: 4px; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="title">ফেনী পলিটেকনিক ইনস্টিটিউট, ফেনী</h1>
        <p class="sub">শিক্ষকের ব্যক্তিগত ক্লাস রুটিন (Faculty Routine Schedule)</p>
        <p><strong>শিক্ষক:</strong> ${teacherName} (${designation}) | <strong>ডিপার্টমেন্ট:</strong> ${departmentName}</p>
    </div>
    ${content.innerHTML}
    <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); } }</script>
</body>
</html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-primary font-semibold">
                            {departmentName}
                        </Badge>
                        <span className="text-xs text-muted-foreground">• শিক্ষক রুটিন</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                        আমার ক্লাস রুটিন (My Schedule)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {teacherName} ({designation}) — সাপ্তাহিক ক্লাস ও ল্যাব শিডিউল
                    </p>
                </div>

                <Button onClick={handlePrint} variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    রুটিন প্রিন্ট / PDF
                </Button>
            </div>

            {/* Day Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b pb-4">
                <Button
                    type="button"
                    variant={activeDay === "ALL" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDay("ALL")}
                >
                    পুরো সপ্তাহ ({routines.length} ক্লাস)
                </Button>
                {WEEKDAYS.map((day) => {
                    const count = routines.filter((r) => r.day === day.key).length;
                    return (
                        <Button
                            key={day.key}
                            type="button"
                            variant={activeDay === day.key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveDay(day.key)}
                            className="gap-1.5"
                        >
                            <span>{day.short}</span>
                            {count > 0 && (
                                <Badge
                                    variant={activeDay === day.key ? "secondary" : "default"}
                                    className="h-5 px-1.5 text-[11px]"
                                >
                                    {count}
                                </Badge>
                            )}
                        </Button>
                    );
                })}
            </div>

            {/* Printable content wrapper */}
            <div ref={printAreaRef} className="space-y-6">
                {activeDay === "ALL" ? (
                    WEEKDAYS.map((day) => {
                        const dayClasses = routines
                            .filter((r) => r.day === day.key)
                            .sort((a, b) => a.startTime.localeCompare(b.startTime));

                        if (dayClasses.length === 0) return null;

                        return (
                            <div key={day.key} className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    <span>{day.label}</span>
                                    <Badge variant="outline" className="text-xs">
                                        {dayClasses.length} টি ক্লাস
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dayClasses.map((item) => (
                                        <TeacherClassCard key={item.id} routine={item} />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredRoutines.map((item) => (
                            <TeacherClassCard key={item.id} routine={item} />
                        ))}
                    </div>
                )}

                {filteredRoutines.length === 0 && (
                    <div className="rounded-xl border border-dashed p-10 text-center bg-slate-50/50">
                        <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
                        <h3 className="mt-3 text-base font-semibold">কোনো ক্লাস নেই</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            এই দিনে আপনার কোনো ক্লাস নির্ধারিত নেই।
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function TeacherClassCard({ routine }: { routine: IClassRoutine }) {
    return (
        <Card className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <Badge variant="outline" className="text-xs font-mono mb-1">
                            {routine.subjectAssignment.subject.code}
                        </Badge>
                        <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                            {routine.subjectAssignment.subject.name}
                        </h4>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                        সেমিস্টার {routine.subjectAssignment.semester.number}
                    </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            {routine.startTime} - {routine.endTime}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-blue-700 dark:text-blue-400">
                            রুম {routine.room.roomCode || routine.room.code}{" "}
                            {routine.room.buildingName ? `(${routine.room.buildingName})` : ""}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span>ডিপার্টমেন্ট: {routine.subjectAssignment.department.name}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

