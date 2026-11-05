"use client";

import { useEffect, useState, useTransition } from "react";
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
import { updateAcademicSession } from "@/services/academicSession/updateAcademicSession";
import { IAcademicSession } from "@/types/academicSession";

interface Props {
    session: IAcademicSession | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditAcademicSessionDialog({
    session,
    open,
    onOpenChange,
}: Props) {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCurrent, setIsCurrent] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (session) {
            setName(session.name);
            setStartDate(
                session.startDate ? session.startDate.split("T")[0] : ""
            );
            setEndDate(session.endDate ? session.endDate.split("T")[0] : "");
            setIsCurrent(session.isCurrent);
            setIsActive(session.isActive);
            setError(null);
        }
    }, [session]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return;
        setError(null);

        if (!name.trim()) {
            setError("শিক্ষাবর্ষের নাম প্রদান করুন");
            return;
        }

        if (new Date(endDate) <= new Date(startDate)) {
            setError("সমাপ্তির তারিখ অবশ্যই শুরুর তারিখের পরবর্তী হতে হবে");
            return;
        }

        startTransition(async () => {
            const res = await updateAcademicSession(session.id, {
                name: name.trim(),
                startDate,
                endDate,
                isCurrent,
                isActive,
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

    if (!session) return null;

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
                                শিক্ষাবর্ষ সম্পাদনা (Edit Academic Session)
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                                শিক্ষাবর্ষের নাম, মেয়াদ বা সক্রিয়তার স্ট্যাটাস পরিবর্তন করুন।
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

                    <div className="space-y-1.5">
                        <Label htmlFor="edit-session-name" className="text-xs font-semibold">
                            শিক্ষাবর্ষের নাম (Session Name)
                        </Label>
                        <Input
                            id="edit-session-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-10 text-sm"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="edit-start-date" className="text-xs font-semibold">
                                শুরুর তারিখ (Start Date)
                            </Label>
                            <Input
                                id="edit-start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-10 text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="edit-end-date" className="text-xs font-semibold">
                                সমাপ্তির তারিখ (End Date)
                            </Label>
                            <Input
                                id="edit-end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-10 text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3 pt-1">
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/20">
                            <input
                                type="checkbox"
                                id="edit-is-current"
                                checked={isCurrent}
                                onChange={(e) => setIsCurrent(e.target.checked)}
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <Label
                                htmlFor="edit-is-current"
                                className="text-xs cursor-pointer select-none font-medium text-foreground"
                            >
                                <span className="font-semibold block">চলমান শিক্ষাবর্ষ (Current Session)</span>
                                <span className="text-muted-foreground text-[11px]">
                                    এই শিক্ষাবর্ষটিকে পুরো ক্যাম্পাসের চলমান প্রধান শিক্ষাবর্ষ হিসেবে গণ্য করা হবে।
                                </span>
                            </Label>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/20">
                            <input
                                type="checkbox"
                                id="edit-is-active"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <Label
                                htmlFor="edit-is-active"
                                className="text-xs cursor-pointer select-none font-medium text-foreground"
                            >
                                <span className="font-semibold block">সক্রিয় স্ট্যাটাস (Active Status)</span>
                                <span className="text-muted-foreground text-[11px]">
                                    নিষ্ক্রিয় থাকলে এই সেশনের অধীনে নতুন ক্লাস রুটিন বা সাবজেক্ট অ্যাসাইন করা যাবে না।
                                </span>
                            </Label>
                        </div>
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
                            আপডেট করুন (Save Changes)
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

