"use client";

import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { DoorOpen, Building, Users, AlertCircle, Loader2 } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { createRoom } from "@/services/room/createRoom";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const COMMON_BUILDINGS = [
    "একাডেমিক ভবন (Academic Building)",
    "মূল প্রশাসনিক ভবন (Admin Building)",
    "কম্পিউটার ল্যাব ভবন (Computer Lab Complex)",
    "ইলেকট্রিক্যাল ও ইলেকট্রনিক্স ল্যাব",
    "সিভিল অ্যান্ড কনস্ট্রাকশন ওয়ার্কশপ",
    "মেকানিক্যাল অ্যান্ড পাওয়ার ওয়ার্কশপ",
    "বিজ্ঞান ও সাধারণ ভবন (Science Building)",
];

export default function AddRoomDialog({ open, onOpenChange }: Props) {
    const [buildingName, setBuildingName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [capacity, setCapacity] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();

    const handleSubmit = () => {
        setErrorMessage(null);

        if (!buildingName.trim()) {
            setErrorMessage("অনুগ্রহ করে ভবনের নাম প্রদান করুন (Building Name is required)");
            return;
        }

        if (!roomCode.trim()) {
            setErrorMessage("অনুগ্রহ করে রুম কোড বা নম্বর প্রদান করুন (Room Code is required)");
            return;
        }

        startTransition(async () => {
            const res = await createRoom({
                buildingName: buildingName.trim(),
                roomCode: roomCode.trim().toUpperCase(),
                capacity: capacity ? Number(capacity) : undefined,
            });

            if (!res.success) {
                setErrorMessage(res.message);
                toast.error(res.message);
            } else {
                toast.success("নতুন রুম সফলভাবে যুক্ত হয়েছে!");
                onOpenChange(false);
                setBuildingName("");
                setRoomCode("");
                setCapacity("");
                setErrorMessage(null);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-xl md:max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <DoorOpen className="h-5 w-5" />
                        </div>
                        <div>
                            <span>নতুন ক্লাসরুম / ল্যাব যুক্ত করুন</span>
                            <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                                Add Classroom, Laboratory or Workshop to Campus
                            </span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-2">
                        ক্যাম্পাস অবকাঠামো অনুযায়ী ভবনের নাম, রুম কোড ও ধারণক্ষমতা এন্ট্রি দিন।
                    </DialogDescription>
                </DialogHeader>

                {errorMessage && (
                    <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive my-1">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-sm">ত্রুটি (Error)</p>
                            <p className="mt-1 text-xs leading-relaxed">{errorMessage}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-5 py-2">
                    {/* Room Code & Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="roomCode" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                                <DoorOpen className="h-4 w-4 text-primary" />
                                রুম কোড / নম্বর (Room Code) *
                            </Label>
                            <Input
                                id="roomCode"
                                placeholder="যেমন: 304, LAB-01, CAD-LAB"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                                className="h-10 font-mono uppercase"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="capacity" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                                <Users className="h-4 w-4 text-primary" />
                                আসন ধারণক্ষমতা (Seating Capacity)
                            </Label>
                            <Input
                                id="capacity"
                                type="number"
                                placeholder="যেমন: 60"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                className="h-10"
                            />
                        </div>
                    </div>

                    {/* Building Name Input */}
                    <div className="space-y-2">
                        <Label htmlFor="buildingName" className="flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-300">
                            <Building className="h-4 w-4 text-primary" />
                            ভবনের নাম (Building / Complex Name) *
                        </Label>
                        <Input
                            id="buildingName"
                            placeholder="যেমন: একাডেমিক ভবন (Academic Building)"
                            value={buildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                            className="h-10"
                        />
                    </div>

                    {/* Common Building Suggestions */}
                    <div className="space-y-2 rounded-xl border bg-slate-50/70 dark:bg-slate-900/50 p-3.5">
                        <Label className="text-xs text-muted-foreground font-semibold">
                            কমন ভবন সাজেশন (Click to autofill):
                        </Label>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {COMMON_BUILDINGS.map((b) => (
                                <button
                                    key={b}
                                    type="button"
                                    onClick={() => setBuildingName(b)}
                                    className="text-[11px] rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors cursor-pointer"
                                >
                                    {b}
                                </button>
                            ))}
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
                        বাতিল
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="w-full sm:w-auto h-10 px-6 font-semibold"
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        রুম সংরক্ষণ করুন
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

