"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import {
    CalendarDays,
    Clock,
    MapPin,
    Trash2,
    User,
    BookOpen,
    AlertCircle,
    Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteRoutine } from "@/services/routine/deleteRoutine";
import { IClassRoutine, Weekday } from "@/types/routine";

interface Props {
    routines: IClassRoutine[];
    selectedSemesterId?: string;
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

export default function RoutineWeeklyGrid({
    routines,
    selectedSemesterId,
}: Props) {
    const [activeDay, setActiveDay] = useState<Weekday | "ALL">("ALL");
    const [routineToDelete, setRoutineToDelete] = useState<IClassRoutine | null>(null);
    const [isPending, startTransition] = useTransition();

    // Filter routines by selected semester and active day
    const filteredRoutines = useMemo(() => {
        let list = routines;
        if (selectedSemesterId) {
            list = list.filter(
                (r) => r.subjectAssignment.semesterId === selectedSemesterId
            );
        }
        if (activeDay !== "ALL") {
            list = list.filter((r) => r.day === activeDay);
        }
        return [...list].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }, [routines, selectedSemesterId, activeDay]);

    // Grouping by day for "ALL" view
    const groupedByDay = useMemo(() => {
        const map = new Map<Weekday, IClassRoutine[]>();
        for (const item of WEEKDAYS) {
            const dayList = routines
                .filter(
                    (r) =>
                        r.day === item.key &&
                        (!selectedSemesterId ||
                            r.subjectAssignment.semesterId === selectedSemesterId)
                )
                .sort((a, b) => a.startTime.localeCompare(b.startTime));
            map.set(item.key, dayList);
        }
        return map;
    }, [routines, selectedSemesterId]);

    const handleDelete = () => {
        if (!routineToDelete) return;

        startTransition(async () => {
            const res = await deleteRoutine(routineToDelete.id);
            if (res.success) {
                toast.success("ক্লাস শিডিউল সফলভাবে মুছে ফেলা হয়েছে");
                setRoutineToDelete(null);
            } else {
                toast.error(res.message);
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Day Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b pb-4">
                <Button
                    type="button"
                    variant={activeDay === "ALL" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveDay("ALL")}
                    className="font-medium"
                >
                    পুরো সপ্তাহ (Full Week)
                </Button>
                {WEEKDAYS.map((day) => {
                    const count = routines.filter(
                        (r) =>
                            r.day === day.key &&
                            (!selectedSemesterId ||
                                r.subjectAssignment.semesterId === selectedSemesterId)
                    ).length;
                    return (
                        <Button
                            key={day.key}
                            type="button"
                            variant={activeDay === day.key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveDay(day.key)}
                            className="font-medium gap-1.5"
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

            {/* List / Grid Display */}
            {activeDay === "ALL" ? (
                <div className="grid gap-6">
                    {WEEKDAYS.map((day) => {
                        const dayRoutines = groupedByDay.get(day.key) ?? [];
                        if (dayRoutines.length === 0) return null;

                        return (
                            <div key={day.key} className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                    <span>{day.label}</span>
                                    <Badge variant="outline" className="text-xs ml-1">
                                        {dayRoutines.length} টি ক্লাস
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dayRoutines.map((routine) => (
                                        <ClassRoutineCard
                                            key={routine.id}
                                            routine={routine}
                                            onDelete={() => setRoutineToDelete(routine)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {filteredRoutines.length === 0 && (
                        <EmptyRoutineState selectedSemesterId={selectedSemesterId} />
                    )}
                </div>
            ) : (
                <div>
                    {filteredRoutines.length === 0 ? (
                        <EmptyRoutineState selectedSemesterId={selectedSemesterId} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredRoutines.map((routine) => (
                                <ClassRoutineCard
                                    key={routine.id}
                                    routine={routine}
                                    onDelete={() => setRoutineToDelete(routine)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Alert */}
            <AlertDialog
                open={Boolean(routineToDelete)}
                onOpenChange={(isOpen) => !isOpen && setRoutineToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                        <AlertDialogDescription>
                            আপনি{" "}
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {routineToDelete?.subjectAssignment.subject.name}
                            </span>{" "}
                            ক্লাস শিডিউলটি রুটিন থেকে মুছে ফেলতে চাচ্ছেন। এই ক্লাসটি আর তালিকায় থাকবে না।
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>বাতিল</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            মুছে ফেলুন
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function ClassRoutineCard({
    routine,
    onDelete,
}: {
    routine: IClassRoutine;
    onDelete: () => void;
}) {
    return (
        <Card className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <Badge variant="outline" className="text-xs font-mono mb-1">
                            {routine.subjectAssignment.subject.code}
                        </Badge>
                        <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug">
                            {routine.subjectAssignment.subject.name}
                        </h4>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive shrink-0 h-8 w-8"
                        onClick={onDelete}
                        title="রুটিন থেকে সরান"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {routine.startTime} - {routine.endTime}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span>শিক্ষক: {routine.teacher.user.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                        <span className="font-medium text-blue-700 dark:text-blue-400">
                            রুম {routine.room.roomCode || routine.room.code}{" "}
                            {routine.room.buildingName ? `(${routine.room.buildingName})` : ""}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                    <Badge variant="secondary" className="text-[11px]">
                        সেমিস্টার {routine.subjectAssignment.semester.number}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">
                        {routine.day}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

function EmptyRoutineState({
    selectedSemesterId,
}: {
    selectedSemesterId?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
            <BookOpen className="h-10 w-10 text-muted-foreground/60" />
            <h3 className="mt-3 text-base font-semibold">কোনো ক্লাস শিডিউল নেই</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                এই সেমিস্টার বা দিনে এখনো কোনো ক্লাস নির্ধারণ করা হয়নি। উপরে "নতুন ক্লাস শিডিউল যুক্ত করুন" বাটনে ক্লিক করে ক্লাস যোগ করুন।
            </p>
        </div>
    );
}

