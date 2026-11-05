"use client";

import { useMemo, useState } from "react";
import {
    CalendarDays,
    Plus,
    Printer,
    BookOpen,
    Users,
    Building2,
    CalendarCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AddRoutineDialog from "./AddRoutineDialog";
import PrintableRoutineModal from "./PrintableRoutineModal";
import RoutineWeeklyGrid from "./RoutineWeeklyGrid";

import { ISemester } from "@/types/semester";
import { ISubjectAssignment } from "@/types/assignment";
import { ITeacher } from "@/types/teacher";
import { IClassRoutine, IRoom } from "@/types/routine";
import { IAcademicSession } from "@/types/academicSession";

interface Props {
    semesters: ISemester[];
    assignments: ISubjectAssignment[];
    teachers: ITeacher[];
    rooms: IRoom[];
    routines: IClassRoutine[];
    departmentName: string;
    sessions?: IAcademicSession[];
}

export default function RoutineManagement({
    semesters,
    assignments,
    teachers,
    rooms,
    routines,
    departmentName,
    sessions = [],
}: Props) {
    const [selectedSemesterId, setSelectedSemesterId] = useState<string>(
        semesters[0]?.id ?? ""
    );
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [printModalOpen, setPrintModalOpen] = useState(false);

    const selectedSemester = useMemo(
        () => semesters.find((s) => s.id === selectedSemesterId) ?? null,
        [semesters, selectedSemesterId]
    );

    // Quick Stats Calculation
    const stats = useMemo(() => {
        const semesterRoutines = routines.filter(
            (r) => !selectedSemesterId || r.subjectAssignment.semesterId === selectedSemesterId
        );
        const uniqueRooms = new Set(semesterRoutines.map((r) => r.room.id)).size;
        const uniqueTeachers = new Set(semesterRoutines.map((r) => r.teacher.id)).size;
        const uniqueSubjects = new Set(
            semesterRoutines.map((r) => r.subjectAssignment.subject.id)
        ).size;

        return {
            totalClasses: semesterRoutines.length,
            uniqueRooms,
            uniqueTeachers,
            uniqueSubjects,
        };
    }, [routines, selectedSemesterId]);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-primary font-semibold">
                            {departmentName || "Department"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">• স্মার্ট ক্যাম্পাস ইআরপি</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                        ক্লাস রুটিন ম্যানেজমেন্ট (Routine Schedule)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        সাপ্তাহিক ক্লাস শিডিউল পরিচালনা, কনফ্লিক্ট মুক্ত টাইম-টেবিল ও অফিসিয়াল প্রিন্ট
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <Button
                        variant="outline"
                        onClick={() => setPrintModalOpen(true)}
                        className="gap-2 font-medium"
                    >
                        <Printer className="h-4 w-4" />
                        অফিসিয়াল রুটিন প্রিন্ট
                    </Button>

                    <Button
                        onClick={() => setAddDialogOpen(true)}
                        className="gap-2 font-medium"
                    >
                        <Plus className="h-4 w-4" />
                        নতুন ক্লাস শিডিউল
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <CalendarCheck className="h-4 w-4 text-primary" />
                        মোট নির্ধারিত ক্লাস
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.totalClasses} <span className="text-xs font-normal text-muted-foreground">টি</span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        ব্যবহৃত ক্লাসরুম/ল্যাব
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.uniqueRooms} <span className="text-xs font-normal text-muted-foreground">টি রুম</span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <Users className="h-4 w-4 text-emerald-600" />
                        অ্যাসাইনকৃত শিক্ষক
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.uniqueTeachers} <span className="text-xs font-normal text-muted-foreground">জন</span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <BookOpen className="h-4 w-4 text-violet-600" />
                        রুটিনভুক্ত বিষয়
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.uniqueSubjects} <span className="text-xs font-normal text-muted-foreground">টি বিষয়</span>
                    </div>
                </div>
            </div>

            {/* Semester Tabs Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/40 p-2.5 rounded-xl border">
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        সেমিস্টার নির্বাচন:
                    </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {semesters.map((s) => {
                        const isSelected = selectedSemesterId === s.id;
                        const semesterCount = routines.filter(
                            (r) => r.subjectAssignment.semesterId === s.id
                        ).length;

                        return (
                            <Button
                                key={s.id}
                                variant={isSelected ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setSelectedSemesterId(s.id)}
                                className="h-8 text-xs font-semibold gap-1.5"
                            >
                                <span>{s.name}</span>
                                {semesterCount > 0 && (
                                    <Badge
                                        variant={isSelected ? "secondary" : "outline"}
                                        className="h-4 px-1 text-[10px]"
                                    >
                                        {semesterCount}
                                    </Badge>
                                )}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Weekly Routine Grid */}
            <RoutineWeeklyGrid
                routines={routines}
                selectedSemesterId={selectedSemesterId}
            />

            {/* Add Routine Slot Dialog */}
            <AddRoutineDialog
                open={addDialogOpen}
                onOpenChange={setAddDialogOpen}
                semesters={semesters}
                assignments={assignments}
                teachers={teachers}
                rooms={rooms}
                defaultSemesterId={selectedSemesterId}
                sessions={sessions}
            />

            {/* Official Print Modal */}
            <PrintableRoutineModal
                open={printModalOpen}
                onOpenChange={setPrintModalOpen}
                routines={routines.filter(
                    (r) => !selectedSemesterId || r.subjectAssignment.semesterId === selectedSemesterId
                )}
                departmentName={departmentName}
                semester={selectedSemester}
            />
        </div>
    );
}

