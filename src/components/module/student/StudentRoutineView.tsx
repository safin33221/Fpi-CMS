"use client";

import { useMemo, useRef, useState } from "react";
import {
    CalendarDays,
    Clock,
    MapPin,
    Printer,
    User,
    BookOpen,
    Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IClassRoutine, Weekday } from "@/types/routine";

interface Props {
    routines: IClassRoutine[];
    studentName: string;
    roll: string;
    registrationNo: string;
    departmentName: string;
    semesterName: string;
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

export default function StudentRoutineView({
    routines,
    studentName,
    roll,
    registrationNo,
    departmentName,
    semesterName,
}: Props) {
    const [activeDay, setActiveDay] = useState<Weekday | "ALL">("ALL");
    const printAreaRef = useRef<HTMLDivElement>(null);

    // Current day in Weekday format
    const currentWeekday = useMemo(() => {
        const days: Weekday[] = [
            "SUNDAY",
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
        ];
        return days[new Date().getDay()];
    }, []);

    const todaysClasses = useMemo(() => {
        return routines
            .filter((r) => r.day === currentWeekday)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
    }, [routines, currentWeekday]);

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
    <title>Student Routine - ${studentName}</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; padding: 20px; font-size: 12px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
        .inst { font-size: 18px; font-weight: bold; margin: 0; }
        .dept { font-size: 13px; font-weight: bold; margin: 4px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #444; padding: 6px 8px; text-align: left; vertical-align: top; }
        th { background: #f0f0f0; }
        .badge { background: #eee; padding: 2px 5px; border-radius: 3px; font-size: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="inst">ফেনী পলিটেকনিক ইনস্টিটিউট, ফেনী</h1>
        <p class="dept">ডিপার্টমেন্ট: ${departmentName} | সেমিস্টার: ${semesterName}</p>
        <p><strong>শিক্ষার্থী:</strong> ${studentName} | রোল: ${roll || "N/A"} | রেজিস্ট্রেশন: ${registrationNo || "N/A"}</p>
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
                        <Badge variant="secondary">{semesterName}</Badge>
                        <span className="text-xs text-muted-foreground">• ক্লাস রুটিন</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                        আমার ক্লাস রুটিন (Class Routine)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {studentName} {roll ? `(রোল: ${roll})` : ""} — সাপ্তাহিক ক্লাস শিডিউল
                    </p>
                </div>

                <Button onClick={handlePrint} variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    রুটিন প্রিন্ট / PDF
                </Button>
            </div>

            {/* Today's Classes Spotlight */}
            {todaysClasses.length > 0 && (
                <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/5 via-sky-50/50 to-transparent p-4 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                        <Sparkles className="h-4 w-4" />
                        <span>আজকের ক্লাসের সময়সূচী (Today's Classes)</span>
                        <Badge variant="default" className="text-xs">
                            {todaysClasses.length} টি ক্লাস
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {todaysClasses.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-lg border bg-card p-3 shadow-2xs space-y-2"
                            >
                                <div className="flex items-start justify-between">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                                        {item.subjectAssignment.subject.name}
                                    </h4>
                                    <Badge variant="outline" className="text-[10px] font-mono">
                                        {item.subjectAssignment.subject.code}
                                    </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground space-y-1">
                                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                                        <Clock className="h-3.5 w-3.5 text-primary" />
                                        <span>{item.startTime} - {item.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>রুম {item.room.roomCode || item.room.code}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5 text-slate-500" />
                                        <span>{item.teacher.user.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                                        <StudentClassCard key={item.id} routine={item} />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {routines
                            .filter((r) => r.day === activeDay)
                            .sort((a, b) => a.startTime.localeCompare(b.startTime))
                            .map((item) => (
                                <StudentClassCard key={item.id} routine={item} />
                            ))}
                    </div>
                )}

                {routines.length === 0 && (
                    <div className="rounded-xl border border-dashed p-10 text-center bg-slate-50/50">
                        <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
                        <h3 className="mt-3 text-base font-semibold">কোনো ক্লাস রুটিন পাওয়া যায়নি</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            আপনার সেমিস্টার ও ডিপার্টমেন্টের জন্য এখনো কোনো ক্লাস নির্ধারণ করা হয়নি। বিভাগীয় প্রধানের সাথে যোগাযোগ করুন।
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function StudentClassCard({ routine }: { routine: IClassRoutine }) {
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
                        <User className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span>শিক্ষক: {routine.teacher.user.name}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

