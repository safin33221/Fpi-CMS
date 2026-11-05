"use client";

import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { CalendarRange, Loader2 } from "lucide-react";

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
    const defaultStart = `${currentYear}-01-01`;
    const defaultEnd = `${currentYear}-12-31`;

    const [name, setName] = useState(defaultName);
    const [startDate, setStartDate] = useState(defaultStart);
    const [endDate, setEndDate] = useState(defaultEnd);
    const [isCurrent, setIsCurrent] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();

    const handleQuickPreset = (presetName: string, startYear: number) => {
        setName(presetName);
        setStartDate(`${startYear}-01-01`);
        setEndDate(`${startYear}-12-31`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError("শিক্ষাবর্ষের নাম প্রদান করুন (e.g., 2025-2026)");
            return;
        }

        if (!startDate || !endDate) {
            setError("শুরু ও শেষ তারিখ নির্ধারণ করুন");
            return;
        }

        if (new Date(endDate) <= new Date(startDate)) {
            setError("শেষ তারিখ অবশ্যই শুরুর তারিখের পরবর্তী হতে হবে");
            return;
        }

        startTransition(async () => {
            const res = await createAcademicSession({
                name: name.trim(),
                startDate,
                endDate,
                isCurrent,
                isActive: true,
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
                                নতুন শিক্ষাবর্ষ যুক্ত করুন (Add Academic Session)
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                                পলিটেকনিকের কারিকুলাম, ক্লাস রুটিন ও শিক্ষার্থী ভর্তির জন্য শিক্ষাবর্ষ নির্ধারণ করুন।
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

                    {/* Quick Presets */}
                    <div className="rounded-lg bg-muted/40 p-3 border border-border/40">
                        <p className="text-[11px] font-medium text-muted-foreground mb-2">
                            ⚡ দ্রুত শিক্ষাবর্ষ সিলেক্ট করুন (Quick Presets):
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: `${currentYear - 1}-${currentYear}`, year: currentYear - 1 },
                                { label: `${currentYear}-${currentYear + 1}`, year: currentYear },
                                { label: `${currentYear + 1}-${currentYear + 2}`, year: currentYear + 1 },
                            ].map((preset) => (
                                <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => handleQuickPreset(preset.label, preset.year)}
                                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors border ${
                                        name === preset.label
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background text-muted-foreground hover:text-foreground border-border"
                                    }`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Session Name */}
                    <div className="space-y-1.5">
                        <Label htmlFor="session-name" className="text-xs font-semibold">
                            শিক্ষাবর্ষের নাম (Session Name) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="session-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. 2025-2026 বা 2026-2027"
                            className="h-10 text-sm"
                            required
                        />
                    </div>

                    {/* Start Date & End Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="start-date" className="text-xs font-semibold">
                                শুরুর তারিখ (Start Date) <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-10 text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="end-date" className="text-xs font-semibold">
                                সমাপ্তির তারিখ (End Date) <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-10 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Set as current session checkbox */}
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/20">
                        <input
                            type="checkbox"
                            id="is-current-checkbox"
                            checked={isCurrent}
                            onChange={(e) => setIsCurrent(e.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <Label
                            htmlFor="is-current-checkbox"
                            className="text-xs cursor-pointer select-none font-medium text-foreground"
                        >
                            <span className="font-semibold block">চলমান শিক্ষাবর্ষ (Set as Current Active Session)</span>
                            <span className="text-muted-foreground text-[11px]">
                                টিক দিলে এই শিক্ষাবর্ষটি পুরো ক্যাম্পাসের ক্লাস রুটিন ও নিয়মিত কার্যক্রমে স্বয়ংক্রিয়ভাবে সক্রিয় থাকবে।
                            </span>
                        </Label>
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
                            সংরক্ষণ করুন (Create Session)
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

