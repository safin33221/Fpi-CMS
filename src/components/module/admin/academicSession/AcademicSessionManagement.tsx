"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import {
    CalendarRange,
    CheckCircle2,
    Clock,
    Plus,
    Search,
    Edit2,
    Trash2,
    Star,
    Layers,
    Loader2,
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
import { setCurrentAcademicSession } from "@/services/academicSession/setCurrentAcademicSession";
import { deleteAcademicSession } from "@/services/academicSession/deleteAcademicSession";

interface Props {
    sessions: IAcademicSession[];
}

export default function AcademicSessionManagement({ sessions }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "CURRENT" | "ACTIVE" | "INACTIVE">("ALL");
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<IAcademicSession | null>(null);
    const [sessionToDelete, setSessionToDelete] = useState<IAcademicSession | null>(null);

    const [isActionPending, startTransition] = useTransition();

    const currentSession = useMemo(() => {
        return sessions.find((s) => s.isCurrent && s.isActive);
    }, [sessions]);

    const filteredSessions = useMemo(() => {
        return sessions.filter((s) => {
            const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase());
            let matchesStatus = true;
            if (statusFilter === "CURRENT") {
                matchesStatus = s.isCurrent;
            } else if (statusFilter === "ACTIVE") {
                matchesStatus = s.isActive;
            } else if (statusFilter === "INACTIVE") {
                matchesStatus = !s.isActive;
            }
            return matchesQuery && matchesStatus;
        });
    }, [sessions, searchQuery, statusFilter]);

    const handleSetCurrent = (session: IAcademicSession) => {
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

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                        <CalendarRange className="h-6 w-6 text-primary" />
                        শিক্ষাবর্ষ ব্যবস্থাপনা (Academic Sessions)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        ক্যাম্পাসের সকল অ্যাকাডেমিক সেশন তৈরি, চলমান সেশন নির্ধারণ এবং ক্লাস রুটিনের শিডিউলিং সাইকেল পরিচালনা করুন।
                    </p>
                </div>
                <Button
                    onClick={() => setAddDialogOpen(true)}
                    className="gap-2 shadow-xs shrink-0"
                >
                    <Plus className="h-4 w-4" />
                    নতুন শিক্ষাবর্ষ (Add Session)
                </Button>
            </div>

            {/* Metric / Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border bg-card p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            মোট শিক্ষাবর্ষ
                        </p>
                        <CalendarRange className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold mt-2">{sessions.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        নিবন্ধিত মোট শিক্ষাবর্ষ সংখ্যা
                    </p>
                </div>

                <div className="rounded-xl border bg-primary/5 border-primary/20 p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                            চলমান সক্রিয় সেশন
                        </p>
                        <Star className="h-4 w-4 text-primary fill-primary/30" />
                    </div>
                    <p className="text-2xl font-bold text-primary mt-2">
                        {currentSession ? currentSession.name : "কোনোটি সক্রিয় নেই"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {currentSession
                            ? `${formatDate(currentSession.startDate)} — ${formatDate(currentSession.endDate)}`
                            : "একটি শিক্ষাবর্ষ তৈরি করে 'চলমান' করুন"}
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            ক্লাস রুটিন সাইকেল
                        </p>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold mt-2">
                        {sessions.reduce(
                            (acc, s) => acc + (s._count?.routines ?? 0),
                            0
                        )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        বিভিন্ন সেশনের অধীনে সক্রিয় ক্লাস শিডিউল
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
                        placeholder="শিক্ষাবর্ষের নাম দিয়ে খুঁজুন (e.g. 2025)..."
                        className="pl-9 h-9 text-xs bg-background"
                    />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {(
                        [
                            { key: "ALL", label: "সকল সেশন" },
                            { key: "CURRENT", label: "চলমান (Current)" },
                            { key: "ACTIVE", label: "সক্রিয় (Active)" },
                            { key: "INACTIVE", label: "নিষ্ক্রিয়" },
                        ] as const
                    ).map((f) => (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setStatusFilter(f.key)}
                            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors shrink-0 ${
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
                                <th className="px-5 py-3.5">মেয়াদ (Duration)</th>
                                <th className="px-5 py-3.5 text-center">স্ট্যাটাস (Status)</th>
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
                                            উপরে &quot;নতুন শিক্ষাবর্ষ&quot; বাটনে চাপ দিয়ে শিক্ষাবর্ষ যোগ করুন।
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSessions.map((s) => (
                                    <tr
                                        key={s.id}
                                        className={`hover:bg-muted/30 transition-colors ${
                                            s.isCurrent ? "bg-primary/[0.03]" : ""
                                        }`}
                                    >
                                        {/* Name & Current Indicator */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                                                        s.isCurrent
                                                            ? "bg-primary text-primary-foreground shadow-xs"
                                                            : "bg-muted text-muted-foreground"
                                                    }`}
                                                >
                                                    {s.name.slice(2, 4) || "S"}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-foreground text-sm">
                                                            {s.name}
                                                        </span>
                                                        {s.isCurrent && (
                                                            <Badge
                                                                variant="outline"
                                                                className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[10px] font-semibold gap-1 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                                                            >
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                চলমান (Current)
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-muted-foreground mt-0.5">
                                                        শিক্ষাবর্ষ আইডি: {s.id.slice(0, 8)}...
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Duration */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                                                <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                                <span>
                                                    {formatDate(s.startDate)} — {formatDate(s.endDate)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4 text-center">
                                            {s.isActive ? (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-muted text-foreground text-xs"
                                                >
                                                    সক্রিয় (Active)
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="text-muted-foreground border-border text-xs"
                                                >
                                                    নিষ্ক্রিয় (Inactive)
                                                </Badge>
                                            )}
                                        </td>

                                        {/* Routine & Section Count */}
                                        <td className="px-5 py-4 text-center">
                                            <span className="text-xs text-muted-foreground">
                                                {s._count?.routines ?? 0} রুটিন · {s._count?.sections ?? 0} সেকশন
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {!s.isCurrent && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleSetCurrent(s)}
                                                        disabled={isActionPending}
                                                        className="text-xs h-8 gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                                                    >
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        চলমান করুন
                                                    </Button>
                                                )}

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setEditingSession(s)}
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </Button>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setSessionToDelete(s)}
                                                    className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
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
                                &quot;{sessionToDelete?.name}&quot;
                            </span>{" "}
                            শিক্ষাবর্ষটি মুছতে চান?
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

