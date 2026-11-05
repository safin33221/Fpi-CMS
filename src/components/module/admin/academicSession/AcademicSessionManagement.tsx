"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import {
    CalendarRange,
    CheckCircle2,
    Plus,
    Search,
    Edit2,
    Trash2,
    Star,
    Layers,
    Loader2,
    Power,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

import { IAcademicSession } from "@/types/academicSession";
import AddAcademicSessionDialog from "./AddAcademicSessionDialog";
import EditAcademicSessionDialog from "./EditAcademicSessionDialog";
import { toggleSessionStatus } from "@/services/academicSession/toggleSessionStatus";
import { setCurrentAcademicSession } from "@/services/academicSession/setCurrentAcademicSession";
import { deleteAcademicSession } from "@/services/academicSession/deleteAcademicSession";

interface Props {
    sessions: IAcademicSession[];
}

export default function AcademicSessionManagement({ sessions }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "RUNNING" | "COMPLETED">("ALL");
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<IAcademicSession | null>(null);
    const [sessionToDelete, setSessionToDelete] = useState<IAcademicSession | null>(null);

    const [isActionPending, startTransition] = useTransition();

    const runningSessions = useMemo(() => {
        return sessions.filter((s) => s.isActive);
    }, [sessions]);

    const latestAdmissionSession = useMemo(() => {
        return sessions.find((s) => s.isCurrent && s.isActive);
    }, [sessions]);

    const filteredSessions = useMemo(() => {
        return sessions.filter((s) => {
            const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase());
            let matchesStatus = true;
            if (statusFilter === "RUNNING") {
                matchesStatus = s.isActive;
            } else if (statusFilter === "COMPLETED") {
                matchesStatus = !s.isActive;
            }
            return matchesQuery && matchesStatus;
        });
    }, [sessions, searchQuery, statusFilter]);

    const handleToggleRunning = (session: IAcademicSession) => {
        startTransition(async () => {
            const res = await toggleSessionStatus(session.id);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    const handleSetLatestAdmission = (session: IAcademicSession) => {
        startTransition(async () => {
            const res = await setCurrentAcademicSession(session.id);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    const handleDelete = () => {
        if (!sessionToDelete) return;
        startTransition(async () => {
            const res = await deleteAcademicSession(sessionToDelete.id);
            if (res.success) {
                toast.success(res.message);
                setSessionToDelete(null);
            } else {
                toast.error(res.message);
            }
        });
    };

    // Helper to calculate BTEB batch label
    const getBatchSemesterHint = (name: string) => {
        const match = name.match(/(\d{4})/);
        if (!match) return "";
        const startYear = parseInt(match[1], 10);
        const currentYear = new Date().getFullYear();
        const diff = currentYear - startYear;

        if (diff === 0) return "১ম ও ২য় পর্ব (১ম বর্ষ)";
        if (diff === 1) return "৩য় ও ৪র্থ পর্ব (২য় বর্ষ)";
        if (diff === 2) return "৫ম ও ৬ষ্ঠ পর্ব (৩য় বর্ষ)";
        if (diff === 3) return "৭ম ও ৮ম পর্ব (৪র্থ বর্ষ)";
        if (diff > 3) return "উত্তীর্ণ / পাসড আউট ব্যাচ";
        return "ভবিষ্যৎ শিক্ষাবর্ষ";
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                        <CalendarRange className="h-6 w-6 text-primary" />
                        শিক্ষাবর্ষ ও রানিং ব্যাচসমূহ (Academic Sessions)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        পলিটেকনিকের ১ম থেকে ৮ম পর্ব পর্যন্ত একই সাথে চলমান সকল শিক্ষাবর্ষ পরিচালনা করুন।
                    </p>
                </div>
                <Button
                    onClick={() => setAddDialogOpen(true)}
                    className="gap-2 shadow-xs shrink-0"
                >
                    <Plus className="h-4 w-4" />
                    শিক্ষাবর্ষ যুক্ত করুন (Add Session)
                </Button>
            </div>

            {/* Polytechnic Real-World Context Notice */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                    <p className="font-bold text-foreground">
                        পলিটেকনিক মাল্টি-সেশন স্ট্রাকচার (BTEB Multi-Session):
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        ক্যাম্পাসে যেকোনো সময়ে একসাথে ৪টি আলাদা সেশন ক্লাস করে থাকে (১ম/২য় পর্ব, ৩য়/৪র্থ পর্ব, ৫ম/৬ষ্ঠ পর্ব এবং ৭ম/৮ম পর্ব)। প্রতিটি ব্যাচকে <strong>&quot;চলমান (Running)&quot;</strong> রাখা হয়েছে যাতে সব ব্যাচের ক্লাস রুটিন ও হাজিরা যুগপৎভাবে সক্রিয় থাকে।
                    </p>
                </div>
            </div>

            {/* Metric / Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/20 p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                            একসাথে চলমান সেশন
                        </p>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mt-2">
                        {runningSessions.length} টি ব্যাচ
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        বর্তমানে ক্যাম্পাসে ক্লাস ও রুটিনে সক্রিয়
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                            সর্বশেষ নবাগত সেশন
                        </p>
                        <Star className="h-4 w-4 text-primary fill-primary/30" />
                    </div>
                    <p className="text-2xl font-bold text-primary mt-2">
                        {latestAdmissionSession ? latestAdmissionSession.name : "নির্ধারিত নেই"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        সর্বশেষ ভর্তি হওয়া ১ম সেমিস্টার ব্যাচ
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            মোট সংরক্ষিত শিক্ষাবর্ষ
                        </p>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold mt-2">{sessions.length} টি</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        অতীত ও বর্তমান সকল ব্যাচের ডাটাবেজ রেকর্ড
                    </p>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-muted/30 p-3 rounded-xl border border-border/40">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="শিক্ষাবর্ষ খুঁজুন (e.g. 2024)..."
                        className="pl-9 h-9 text-xs bg-background"
                    />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {(
                        [
                            { key: "ALL", label: "সকল সেশন" },
                            { key: "RUNNING", label: "চলমান ব্যাচসমূহ (Running)" },
                            { key: "COMPLETED", label: "উত্তীর্ণ / পাসড আউট" },
                        ] as const
                    ).map((f) => (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setStatusFilter(f.key)}
                            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors shrink-0 cursor-pointer ${
                                statusFilter === f.key
                                    ? "bg-primary text-primary-foreground shadow-xs"
                                    : "bg-background text-muted-foreground hover:text-foreground border border-border/60"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sessions Table */}
            <div className="rounded-xl border bg-card shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            <tr>
                                <th className="px-5 py-3.5">শিক্ষাবর্ষ (Session Name)</th>
                                <th className="px-5 py-3.5">আনুমানিক পর্ব / বর্ষ (Semester Range)</th>
                                <th className="px-5 py-3.5 text-center">ক্যাম্পাস স্ট্যাটাস (Status)</th>
                                <th className="px-5 py-3.5 text-center">রুটিন ও সেকশন</th>
                                <th className="px-5 py-3.5 text-right">পদক্ষেপ (Actions)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {filteredSessions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-12 text-center text-muted-foreground"
                                    >
                                        <CalendarRange className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
                                        <p className="font-semibold text-foreground">
                                            কোনো শিক্ষাবর্ষ পাওয়া যায়নি
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            উপরে &quot;শিক্ষাবর্ষ যুক্ত করুন&quot; বাটনে চাপ দিয়ে সেশন তৈরি করুন।
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSessions.map((s) => (
                                    <tr
                                        key={s.id}
                                        className={`hover:bg-muted/30 transition-colors ${
                                            s.isActive ? "bg-emerald-500/[0.02]" : ""
                                        }`}
                                    >
                                        {/* Name & Indicators */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                                                        s.isActive
                                                            ? "bg-primary text-primary-foreground shadow-xs"
                                                            : "bg-muted text-muted-foreground"
                                                    }`}
                                                >
                                                    {s.name.slice(2, 4) || "S"}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-foreground text-sm">
                                                            Session {s.name}
                                                        </span>
                                                        {s.isCurrent && (
                                                            <Badge
                                                                variant="outline"
                                                                className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold gap-1"
                                                            >
                                                                <Star className="h-2.5 w-2.5 fill-primary" />
                                                                নবাগত ভর্তি ব্যাচ
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-muted-foreground mt-0.5">
                                                        আইডি: {s.id.slice(0, 8)}...
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Semester / Year Hint */}
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-semibold text-foreground/80 bg-muted/60 px-2.5 py-1 rounded-md border border-border/40">
                                                {getBatchSemesterHint(s.name)}
                                            </span>
                                        </td>

                                        {/* Running Status Toggle */}
                                        <td className="px-5 py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleRunning(s)}
                                                disabled={isActionPending}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                                    s.isActive
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                                                        : "bg-muted text-muted-foreground border border-border hover:bg-muted/80"
                                                }`}
                                            >
                                                <Power className="h-3 w-3" />
                                                {s.isActive ? "চলমান (Running)" : "নিষ্ক্রিয় (Archived)"}
                                            </button>
                                        </td>

                                        {/* Routine & Section Count */}
                                        <td className="px-5 py-4 text-center">
                                            <span className="text-xs text-muted-foreground">
                                                {s._count?.routines ?? 0} রুটিন · {s._count?.sections ?? 0} সেকশন
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {!s.isCurrent && s.isActive && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleSetLatestAdmission(s)}
                                                        disabled={isActionPending}
                                                        className="text-[11px] h-7 px-2 text-muted-foreground hover:text-foreground"
                                                        title="১ম পর্বের প্রধান ভর্তি সেশন হিসেবে চিহ্নিত করুন"
                                                    >
                                                        <Star className="h-3 w-3 mr-1" />
                                                        নবাগত সেশন
                                                    </Button>
                                                )}

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setEditingSession(s)}
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </Button>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setSessionToDelete(s)}
                                                    className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Session Dialog */}
            <AddAcademicSessionDialog
                open={addDialogOpen}
                onOpenChange={setAddDialogOpen}
            />

            {/* Edit Session Dialog */}
            <EditAcademicSessionDialog
                session={editingSession}
                open={!!editingSession}
                onOpenChange={(open) => !open && setEditingSession(null)}
            />

            {/* Delete Confirmation Alert Dialog */}
            <AlertDialog
                open={!!sessionToDelete}
                onOpenChange={(open) => !open && setSessionToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold">
                            শিক্ষাবর্ষ মুছতে চান? (Delete Session)
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                            আপনি কি নিশ্চিত যে আপনি{" "}
                            <span className="font-semibold text-foreground">
                                &quot;Session {sessionToDelete?.name}&quot;
                            </span>{" "}
                            মুছতে চান?
                            <br />
                            <span className="text-xs text-muted-foreground mt-2 block">
                                দ্রষ্টব্য: যদি এই সেশনের অধীনে কোনো ক্লাস রুটিন বা সেকশন সক্রিয় থাকে, তবে ডাটার সুরক্ষার জন্য এটি ডিলিট না হয়ে স্বয়ংক্রিয়ভাবে নিষ্ক্রিয় (Deactivated) হয়ে যাবে।
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isActionPending}>
                            বাতিল (Cancel)
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isActionPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isActionPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "হ্যাঁ, মুছে ফেলুন"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
