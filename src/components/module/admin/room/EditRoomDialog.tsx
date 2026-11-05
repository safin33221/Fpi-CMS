"use client";

import { useEffect, useState, useTransition } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { updateRoom } from "@/services/room/updateRoom";
import { IRoom } from "@/types/routine";

interface Props {
    room: IRoom | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditRoomDialog({ room, open, onOpenChange }: Props) {
    const [buildingName, setBuildingName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [capacity, setCapacity] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (room) {
            setBuildingName(room.buildingName || room.name || "");
            setRoomCode(room.roomCode || room.code || "");
            setCapacity(room.capacity ? String(room.capacity) : "");
            setIsActive(room.isActive ?? true);
            setErrorMessage(null);
        }
    }, [room]);

    const handleSubmit = () => {
        if (!room) return;
        setErrorMessage(null);

        if (!buildingName.trim()) {
            setErrorMessage("ভবনের নাম প্রদান করুন");
            return;
        }

        if (!roomCode.trim()) {
            setErrorMessage("রুম কোড বা নম্বর প্রদান করুন");
            return;
        }

        startTransition(async () => {
            const res = await updateRoom(room.id, {
                buildingName: buildingName.trim(),
                roomCode: roomCode.trim().toUpperCase(),
                capacity: capacity ? Number(capacity) : undefined,
                isActive,
            });

            if (!res.success) {
                setErrorMessage(res.message);
                toast.error(res.message);
            } else {
                toast.success("রুম তথ্য সফলভাবে আপডেট হয়েছে!");
                onOpenChange(false);
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
                            <span>রুম ও ল্যাব এডিট করুন</span>
                            <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                                Edit Classroom or Laboratory Information
                            </span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-2">
                        রুম নম্বর, ভবন ও আসন সংখ্যা আপডেট করুন।
                    </DialogDescription>
                </DialogHeader>

                {errorMessage && (
                    <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive my-1">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-sm">ত্রুটি</p>
                            <p className="mt-1 text-xs leading-relaxed">{errorMessage}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-5 py-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="editRoomCode" className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                                রুম কোড / নম্বর *
                            </Label>
                            <Input
                                id="editRoomCode"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                                className="h-10 font-mono uppercase"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="editCapacity" className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                                আসন ধারণক্ষমতা (Seats)
                            </Label>
                            <Input
                                id="editCapacity"
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                className="h-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="editBuildingName" className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                            ভবনের নাম *
                        </Label>
                        <Input
                            id="editBuildingName"
                            value={buildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                            className="h-10"
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="isActive"
                            checked={isActive}
                            onCheckedChange={(checked) => setIsActive(Boolean(checked))}
                        />
                        <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                            রুমটি ক্লাসের জন্য সক্রিয় (Active for Scheduling)
                        </Label>
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
                        আপডেট সংরক্ষণ করুন
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

