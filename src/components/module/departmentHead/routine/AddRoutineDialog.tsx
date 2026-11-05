"use client";

import { useMemo, useState, useEffect, useTransition } from "react";
import { toast } from "react-hot-toast";
import {
    AlertCircle,
    CalendarClock,
    Clock,
    Loader2,
    MapPin,
    User,
    BookOpen,
    GraduationCap,
    Sun,
    Sunset,
    FlaskConical,
    CalendarRange,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createRoutine } from "@/services/routine/createRoutine";
import { ISemester } from "@/types/semester";
import { ISubjectAssignment } from "@/types/assignment";
import { ITeacher } from "@/types/teacher";
import { IRoom, Weekday } from "@/types/routine";
import { IAcademicSession } from "@/types/academicSession";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    semesters: ISemester[];
    assignments: ISubjectAssignment[];
    teachers: ITeacher[];
    rooms: IRoom[];
    defaultSemesterId?: string;
    sessions?: IAcademicSession[];
}

const WEEKDAYS: { label: string; value: Weekday }[] = [
    { label: "শনিবার (Saturday)", value: "SATURDAY" },
    { label: "রবিবার (Sunday)", value: "SUNDAY" },
    { label: "সোমবার (Monday)", value: "MONDAY" },
    { label: "মঙ্গলবার (Tuesday)", value: "TUESDAY" },
    { label: "বুধবার (Wednesday)", value: "WEDNESDAY" },
    { label: "বৃহস্পতিবার (Thursday)", value: "THURSDAY" },
    { label: "শুক্রবার (Friday)", value: "FRIDAY" },
];

const SHIFT1_PERIODS = [
    { label: "১ম পিরিয়ড", time: "08:00 - 08:45", start: "08:00", end: "08:45" },
    { label: "২য় পিরিয়ড", time: "08:45 - 09:30", start: "08:45", end: "09:30" },
    { label: "৩য় পিরিয়ড", time: "09:30 - 10:15", start: "09:30", end: "10:15" },
    { label: "৪র্থ পিরিয়ড", time: "10:15 - 11:00", start: "10:15", end: "11:00" },
    { label: "৫ম পিরিয়ড", time: "11:00 - 11:45", start: "11:00", end: "11:45" },
    { label: "৬ষ্ঠ পিরিয়ড", time: "11:45 - 12:30", start: "11:45", end: "12:30" },
    { label: "৭ম পিরিয়ড", time: "12:30 - 01:15", start: "12:30", end: "13:15" },
];

const SHIFT2_PERIODS = [
    { label: "২য় শিফট ১ম", time: "01:30 - 02:15", start: "13:30", end: "14:15" },
    { label: "২য় শিফট ২য়", time: "02:15 - 03:00", start: "14:15", end: "15:00" },
    { label: "২য় শিফট ৩য়", time: "03:00 - 03:45", start: "15:00", end: "15:45" },
    { label: "২য় শিফট ৪র্থ", time: "03:45 - 04:30", start: "15:45", end: "16:30" },
];

const LAB_PERIODS = [
    { label: "সকাল ল্যাব ১", time: "08:00 - 10:15", start: "08:00", end: "10:15" },
    { label: "সকাল ল্যাব ২", time: "10:15 - 12:30", start: "10:15", end: "12:30" },
    { label: "বিকাল ল্যাব", time: "01:30 - 03:45", start: "13:30", end: "15:45" },
];

export default function AddRoutineDialog({
    open,
    onOpenChange,
    semesters,
    assignments,
    teachers,
    rooms,
    defaultSemesterId,
    sessions = [],
}: Props) {
    const [semesterId, setSemesterId] = useState(defaultSemesterId ?? semesters[0]?.id ?? "");
    const [academicSessionId, setAcademicSessionId] = useState<string>("");
    const [subjectAssignmentId, setSubjectAssignmentId] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [roomId, setRoomId] = useState("");
    const [day, setDay] = useState<Weekday>("SATURDAY");
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("08:45");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();

    // Auto-select session matching semester batch
    useEffect(() => {
        if (!sessions || sessions.length === 0) return;
        const sem = semesters.find((s) => s.id === semesterId);
        if (sem) {
            const semNum = sem.number || 1;
            const batchIdx = Math.floor((semNum - 1) / 2);
            if (sessions[batchIdx]) {
                setAcademicSessionId(sessions[batchIdx].id);
                return;
            }
        }
        if (sessions[0]) {
            setAcademicSessionId(sessions[0].id);
        }
    }, [semesterId, semesters, sessions]);

    // Human readable selected objects (prevents raw UUIDs from ever displaying)
    const selectedSession = useMemo(
        () => sessions.find((s) => s.id === academicSessionId),
        [sessions, academicSessionId]
    );

    const selectedSemester = useMemo(
        () => semesters.find((s) => s.id === semesterId),
        [semesters, semesterId]
    );

    const availableAssignments = useMemo(() => {
        return assignments.filter((a) => a.semesterId === semesterId);
    }, [assignments, semesterId]);

    const selectedAssignment = useMemo(
        () => assignments.find((a) => a.id === subjectAssignmentId),
        [assignments, subjectAssignmentId]
    );

    const selectedTeacher = useMemo(
        () => teachers.find((t) => t.id === teacherId),
        [teachers, teacherId]
    );

    const selectedRoom = useMemo(
        () => rooms.find((r) => r.id === roomId),
        [rooms, roomId]
    );

    const selectedDay = useMemo(
        () => WEEKDAYS.find((w) => w.value === day),
        [day]
    );

    const handleAssignmentChange = (assignmentId: string) => {
        setSubjectAssignmentId(assignmentId);
        setErrorMessage(null);
        const selected = assignments.find((a) => a.id === assignmentId);
        if (selected?.teachingAssignments && selected.teachingAssignments.length > 0) {
            setTeacherId(selected.teachingAssignments[0].teacherId);
        }
    };

    const handleApplyPreset = (start: string, end: string) => {
        setStartTime(start);
        setEndTime(end);
        setErrorMessage(null);
    };

    const handleSubmit = () => {
        setErrorMessage(null);

        if (!subjectAssignmentId) {
            setErrorMessage("অনুগ্রহ করে বিষয় নির্বাচন করুন (Select a subject)");
            return;
        }
        if (!teacherId) {
            setErrorMessage("অনুগ্রহ করে শিক্ষক নির্বাচন করুন (Select a teacher)");
            return;
        }
        if (!roomId) {
            setErrorMessage("অনুগ্রহ করে ক্লাসরুম নির্বাচন করুন (Select a room)");
            return;
        }
        if (!startTime || !endTime) {
            setErrorMessage("শুরুর ও শেষ সময় প্রদান করুন (Enter start & end time)");
            return;
        }
        if (startTime >= endTime) {
            setErrorMessage("শেষ সময় অবশ্যই শুরুর সময়ের চেয়ে বেশি হতে হবে");
            return;
        }

        startTransition(async () => {
            const res = await createRoutine({
                subjectAssignmentId,
                teacherId,
                roomId,
                academicSessionId: academicSessionId || undefined,
                day,
                startTime,
                endTime,
            });

            if (!res.success) {
                setErrorMessage(res.message);
                toast.error(res.message);
            } else {
                toast.success("ক্লাস রুটিন সফলভাবে যুক্ত হয়েছে!");
                onOpenChange(false);
                setSubjectAssignmentId("");
                setErrorMessage(null);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[92vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <CalendarClock className="h-5 w-5" />
                        </div>
                        <div>
                            <span>নতুন ক্লাস শিডিউল যুক্ত করুন</span>
                            <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                                Add Class Slot to Timetable
                            </span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-2">
                        সেমিস্টার, বিষয়, শিক্ষক, ক্লাসরুম ও সময় নির্ধারণ করে রুটিনে যোগ করুন।
                        সিস্টেম স্বয়ংক্রিয়ভাবে শিক্ষক ও রুমের সময়ের সংঘর্ষ (Conflict) পরীক্ষা করবে।
                    </DialogDescription>
                </DialogHeader>

                {errorMessage && (
                    <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive my-1">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-sm">
                                {errorMessage.toLowerCase().includes("conflict") || errorMessage.includes("সংঘর্ষ")
                                    ? "সময় সংঘর্ষ (Scheduling Conflict)"
                                    : "সতর্কতা বা ত্রুটি (Alert / Error)"}
                            </p>
                            <p className="mt-1 text-xs sm:text-sm leading-relaxed">{errorMessage}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-5 py-2">
                    {/* Row 1: Semester, Session & Subject */}
                    <div className={`grid grid-cols-1 ${sessions.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
                        <div className="space-y-2">
                            <Label htmlFor="semester" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                সেমিস্টার (Semester)
                            </Label>
                            <Select
                                value={semesterId}
                                onValueChange={(val) => {
                                    setSemesterId(val ?? "");
                                    setSubjectAssignmentId("");
                                    setErrorMessage(null);
                                }}
                            >
                                <SelectTrigger id="semester" className="w-full h-10">
                                    <SelectValue placeholder="সেমিস্টার নির্বাচন করুন">
                                        {selectedSemester
                                            ? `${selectedSemester.name} (${selectedSemester.number}th Semester)`
                                            : undefined}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {semesters.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.name} ({s.number}th Semester)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {sessions.length > 0 && (
                            <div className="space-y-2">
                                <Label htmlFor="academic-session" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                                    <CalendarRange className="h-4 w-4 text-primary" />
                                    শিক্ষাবর্ষ (Session)
                                </Label>
                                <Select
                                    value={academicSessionId}
                                    onValueChange={(val) => {
                                        setAcademicSessionId(val ?? "");
                                        setErrorMessage(null);
                                    }}
                                >
                                    <SelectTrigger id="academic-session" className="w-full h-10">
                                        <SelectValue placeholder="সেশন নির্বাচন">
                                            {selectedSession ? `Session ${selectedSession.name}` : undefined}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sessions.map((s) => (
                                            <SelectItem key={s.id} value={s.id}>
                                                Session {s.name} {s.isCurrent ? "· নবাগত" : ""}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="subject" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                                <BookOpen className="h-4 w-4 text-primary" />
                                বিষয় (Subject)
                            </Label>
                            <Select
                                value={subjectAssignmentId}
                                onValueChange={(val) => handleAssignmentChange(val ?? "")}
                                disabled={availableAssignments.length === 0}
                            >
                                <SelectTrigger id="subject" className="w-full h-10">
                                    <SelectValue
                                        placeholder={
                                            availableAssignments.length === 0
                                                ? "প্রথমে কারিকুলামে বিষয় যুক্ত করুন"
                                                : "বিষয় নির্বাচন করুন"
                                        }
                                    >
                                        {selectedAssignment
                                            ? `${selectedAssignment.subject.name} (${selectedAssignment.subject.code})`
                                            : undefined}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {availableAssignments.map((a) => (
                                        <SelectItem key={a.id} value={a.id}>
                                            {a.subject.name} ({a.subject.code})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 2: Teacher & Room (2 Columns on Desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="teacher" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                                <User className="h-4 w-4 text-primary" />
                                শিক্ষক (Assigned Teacher)
                            </Label>
                            <Select
                                value={teacherId}
                                onValueChange={(val) => setTeacherId(val ?? "")}
                            >
                                <SelectTrigger id="teacher" className="w-full h-10">
                                    <SelectValue placeholder="শিক্ষক নির্বাচন করুন">
                                        {selectedTeacher
                                            ? `${selectedTeacher.user.name} (${selectedTeacher.designation})`
                                            : undefined}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.map((t) => (
                                        <SelectItem key={t.id} value={t.id}>
                                            {t.user.name} ({t.designation})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="room" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                                <MapPin className="h-4 w-4 text-primary" />
                                ক্লাসরুম / ল্যাব (Room)
                            </Label>
                            <Select
                                value={roomId}
                                onValueChange={(val) => setRoomId(val ?? "")}
                            >
                                <SelectTrigger id="room" className="w-full h-10">
                                    <SelectValue placeholder="রুম নির্বাচন করুন">
                                        {selectedRoom
                                            ? `রুম ${selectedRoom.roomCode || selectedRoom.code} — ${selectedRoom.buildingName || "মেইন ভবন"} ${selectedRoom.capacity ? `(${selectedRoom.capacity} seats)` : ""}`
                                            : undefined}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {rooms.map((r) => (
                                        <SelectItem key={r.id} value={r.id}>
                                            রুম {r.roomCode || r.code} — {r.buildingName || "Main Building"}{" "}
                                            {r.capacity ? `(${r.capacity} seats)` : ""}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 3: Day & Time Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="day" className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                                বার / দিন (Weekday)
                            </Label>
                            <Select
                                value={day}
                                onValueChange={(val) => setDay((val ?? "SATURDAY") as Weekday)}
                            >
                                <SelectTrigger id="day" className="w-full h-10">
                                    <SelectValue placeholder="দিন নির্বাচন করুন">
                                        {selectedDay?.label}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {WEEKDAYS.map((w) => (
                                        <SelectItem key={w.value} value={w.value}>
                                            {w.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="startTime" className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                                শুরুর সময় (Start Time)
                            </Label>
                            <Input
                                id="startTime"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="h-10"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endTime" className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                                শেষ সময় (End Time)
                            </Label>
                            <Input
                                id="endTime"
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="h-10"
                            />
                        </div>
                    </div>

                    {/* Quick Preset Period Selection Cards */}
                    <div className="rounded-xl border bg-slate-50/70 dark:bg-slate-900/50 p-4 space-y-3.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                <Clock className="h-4 w-4 text-primary" />
                                পলিটেকনিক শিডিউল প্রিসেট (Quick Period Selection)
                            </div>
                            <span className="text-[11px] text-muted-foreground hidden sm:inline">
                                এক ক্লিকে সময় সেট করতে নিচের বাটনে চাপ দিন
                            </span>
                        </div>

                        {/* 1st Shift Periods */}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                                <Sun className="h-3.5 w-3.5" />
                                ১ম শিফট পিরিয়ডসমূহ (08:00 AM - 01:15 PM):
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1.5">
                                {SHIFT1_PERIODS.map((period) => {
                                    const isSelected =
                                        startTime === period.start && endTime === period.end;
                                    return (
                                        <button
                                            key={period.label}
                                            type="button"
                                            onClick={() => handleApplyPreset(period.start, period.end)}
                                            className={`flex flex-col items-center justify-center rounded-lg border p-1.5 text-center transition-all cursor-pointer ${
                                                isSelected
                                                    ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                                                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-primary/50 text-slate-700 dark:text-slate-300"
                                            }`}
                                        >
                                            <span className="text-[11px] font-medium leading-tight">{period.label}</span>
                                            <span className="text-[9.5px] opacity-80 mt-0.5">{period.time}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2nd Shift & Lab Periods */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-200/80 dark:border-slate-800">
                            {/* 2nd Shift */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                                    <Sunset className="h-3.5 w-3.5" />
                                    ২য় শিফট পিরিয়ডসমূহ (01:30 PM - 04:30 PM):
                                </div>
                                <div className="grid grid-cols-2 gap-1.5">
                                    {SHIFT2_PERIODS.map((period) => {
                                        const isSelected =
                                            startTime === period.start && endTime === period.end;
                                        return (
                                            <button
                                                key={period.label}
                                                type="button"
                                                onClick={() => handleApplyPreset(period.start, period.end)}
                                                className={`flex flex-col items-center justify-center rounded-lg border p-1.5 text-center transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-primary/50 text-slate-700 dark:text-slate-300"
                                                }`}
                                            >
                                                <span className="text-[11px] font-medium leading-tight">{period.label}</span>
                                                <span className="text-[9.5px] opacity-80 mt-0.5">{period.time}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Lab Sessions */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                                    <FlaskConical className="h-3.5 w-3.5" />
                                    প্র্যাকটিক্যাল ল্যাব সেশন (২+ ঘণ্টা):
                                </div>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {LAB_PERIODS.map((period) => {
                                        const isSelected =
                                            startTime === period.start && endTime === period.end;
                                        return (
                                            <button
                                                key={period.label}
                                                type="button"
                                                onClick={() => handleApplyPreset(period.start, period.end)}
                                                className={`flex flex-col items-center justify-center rounded-lg border p-1.5 text-center transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs"
                                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-primary/50 text-slate-700 dark:text-slate-300"
                                                }`}
                                            >
                                                <span className="text-[11px] font-medium leading-tight">{period.label}</span>
                                                <span className="text-[9.5px] opacity-80 mt-0.5">{period.time}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="border-t pt-4 mt-2 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                        className="w-full sm:w-auto h-10 px-5"
                    >
                        বাতিল (Cancel)
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="w-full sm:w-auto h-10 px-6 font-semibold"
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        রুটিনে যুক্ত করুন (Save Slot)
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
