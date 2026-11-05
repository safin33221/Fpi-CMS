"use client";

import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { CalendarRange, Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAcademicSession } from "@/services/academicSession/createAcademicSession";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddAcademicSessionDialog({ open, onOpenChange }: Props) {
    const currentYear = new Date().getFullYear();
    const defaultName = `${currentYear}-${currentYear + 1}`;

    const [name, setName] = useState(defaultName);
    const [isActive, setIsActive] = useState(true);
    const [isLatestAdmission, setIsLatestAdmission] = useState(false);

    // Advanced optional dates
    const [showAdvancedDates, setShowAdvancedDates] = useState(false);
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const presets = [
        { label: `${currentYear + 1}-${currentYear + 2}`, note: "আগামী শিক্ষাবর্ষ" },
        { label: `${currentYear}-${currentYear + 1}`, note: "১ম ও ২য় পর্ব (১ম বর্ষ)" },
        { label: `${currentYear - 1}-${currentYear}`, note: "৩য় ও ৪র্থ পর্ব (২য় বর্ষ)" },
        { label: `${currentYear - 2}-${currentYear - 1}`, note: "৫ম ও ৬ষ্ঠ পর্ব (৩য় বর্ষ)" },
        { label: `${currentYear - 3}-${currentYear - 2}`, note: "৭ম ও ৮ম পর্ব (৪র্থ বর্ষ)" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError("শিক্ষাবর্ষের নাম প্রদান করুন (e.g. 2024-2025)");
            return;
        }

        startTransition(async () => {
            const res = await createAcademicSession({
                name: name.trim(),
                startDate: customStartDate || undefined,
                endDate: customEndDate || undefined,
                isActive,
                isCurrent: isLatestAdmission,
            });

            if (res.success) {
                toast.success(res.message);
                onOpenChange(false);
            } else {
                setError(res.message);
                toast.error(res.message);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl md:max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <CalendarRange className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">
                                শিক্ষাবর্ষ যুক্ত করুন (Add Academic Session)
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                                পলিটেকনিকে একই সাথে ৪টি ব্যাচ চলমান থাকে। শুধু সেশনের নাম দিয়ে দ্রুত শিক্ষাবর্ষ সক্রিয় করুন।
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {error && (
                        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive font-medium">
                            {error}
                        </div>
                    )}

                    {/* Quick Batch Presets */}
                    <div className="rounded-xl bg-muted/40 p-3.5 border border-border/50 space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                পলিটেকনিক রানিং সেশন প্রিসেট (Quick Batches):
                            </p>
                            <span className="text-[10px] text-muted-foreground">১ ক্লিকে সিলেক্ট করুন</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {presets.map((p) => {
                                const isSelected = name === p.label;
                                return (
                                    <button
                                        key={p.label}
                                        type="button"
                                        onClick={() => setName(p.label)}
                                        className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-all border text-left cursor-pointer ${
                                            isSelected
                                                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                                : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted/60 border-border"
                                        }`}
                                    >
                                        <span className="font-bold">{p.label}</span>
                                        <span
                                            className={`text-[10px] ${
                                                isSelected ? "text-primary-foreground/90" : "text-muted-foreground"
                                            }`}
                                        >
                                            {p.note}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Session Name Input */}
                    <div className="space-y-1.5">
                        <Label htmlFor="session-name" className="text-xs font-semibold text-foreground">
                            শিক্ষাবর্ষের নাম (Session Name) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="session-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. 2024-2025 বা 2023-2024"
                            className="h-10 text-sm font-semibold"
                            required
                        />
                        <p className="text-[11px] text-muted-foreground">
                            💡 বিটিইবি (BTEB) ৪-বছর মেয়াদী ডিপ্লোমা শিক্ষাবর্ষের মেয়াদ (জুলাই — জুন) স্বয়ংক্রিয়ভাবে যুক্ত হবে। আলাদাভাবে তারিখ ইনপুট দেওয়ার প্রয়োজন নেই।
                        </p>
                    </div>

                    {/* Status Toggles */}
                    <div className="space-y-2.5 pt-1">
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                            <input
                                type="checkbox"
                                id="is-active-running"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="h-4 w-4 rounded border-border text-emerald-600 focus:ring-emerald-500"
                            />
                            <Label
                                htmlFor="is-active-running"
                                className="text-xs cursor-pointer select-none text-foreground"
                            >
                                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                                    চলমান শিক্ষাবর্ষ (Currently Running on Campus)
                                </span>
                                <span className="text-muted-foreground text-[11px]">
                                    ক্যাম্পাসে একই সাথে ৪টি পর্ব/বর্ষের ক্লাস চলে। টিক দেওয়া থাকলে এই সেশনের শিক্ষার্থীরা নিয়মিত ক্লাস ও রুটিনে অন্তর্ভুক্ত থাকবে।
                                </span>
                            </Label>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/20">
                            <input
                                type="checkbox"
                                id="is-latest-admission"
                                checked={isLatestAdmission}
                                onChange={(e) => setIsLatestAdmission(e.target.checked)}
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <Label
                                htmlFor="is-latest-admission"
                                className="text-xs cursor-pointer select-none text-foreground"
                            >
                                <span className="font-semibold block">সর্বশেষ নবাগত ভর্তি সেশন (Latest Admission Batch)</span>
                                <span className="text-muted-foreground text-[11px]">
                                    সদ্য ভর্তি হওয়া ১ম সেমিস্টার শিক্ষার্থীদের প্রধান শিক্ষাবর্ষ নির্দেশ করতে টিক দিন।
                                </span>
                            </Label>
                        </div>
                    </div>

                    {/* Advanced Optional Custom Dates Accordion */}
                    <div className="border border-border/50 rounded-xl overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setShowAdvancedDates(!showAdvancedDates)}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                        >
                            <span>ঐচ্ছিক: কাস্টম শুরুর ও সমাপ্তির তারিখ দিন (Advanced Custom Dates)</span>
                            {showAdvancedDates ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>

                        {showAdvancedDates && (
                            <div className="p-3 border-t bg-muted/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-[11px] font-medium text-muted-foreground">
                                        শুরুর তারিখ (Start Date)
                                    </Label>
                                    <Input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                        className="h-9 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[11px] font-medium text-muted-foreground">
                                        সমাপ্তির তারিখ (End Date)
                                    </Label>
                                    <Input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                        className="h-9 text-xs"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="pt-2 gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            বাতিল (Cancel)
                        </Button>
                        <Button type="submit" disabled={isPending} className="gap-2">
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            শিক্ষাবর্ষ যুক্ত করুন (Save Session)
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
