"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import {
    DoorOpen,
    Building2,
    Users,
    Plus,
    Search,
    Edit2,
    Trash2,
    CheckCircle2,
    XCircle,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import AddRoomDialog from "./AddRoomDialog";
import EditRoomDialog from "./EditRoomDialog";
import { deleteRoom } from "@/services/room/updateRoom";
import { IRoom } from "@/types/routine";

interface Props {
    rooms: IRoom[];
}

export default function RoomManagement({ rooms }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState<string>("ALL");
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<IRoom | null>(null);
    const [roomToDelete, setRoomToDelete] = useState<IRoom | null>(null);

    const [isDeleting, startDeleteTransition] = useTransition();

    // Unique buildings for filter
    const buildings = useMemo(() => {
        const set = new Set<string>();
        for (const r of rooms) {
            const b = r.buildingName || r.name;
            if (b) set.add(b);
        }
        return Array.from(set).sort();
    }, [rooms]);

    // Filtered rooms
    const filteredRooms = useMemo(() => {
        return rooms.filter((r) => {
            const code = (r.roomCode || r.code || "").toLowerCase();
            const bldg = (r.buildingName || r.name || "").toLowerCase();
            const query = searchQuery.toLowerCase().trim();

            const matchesQuery = !query || code.includes(query) || bldg.includes(query);
            const matchesBuilding =
                selectedBuilding === "ALL" ||
                (r.buildingName || r.name) === selectedBuilding;

            return matchesQuery && matchesBuilding;
        });
    }, [rooms, searchQuery, selectedBuilding]);

    // Quick Stats
    const stats = useMemo(() => {
        const totalRooms = rooms.length;
        const totalCapacity = rooms.reduce((acc, r) => acc + (r.capacity || 0), 0);
        const activeRooms = rooms.filter((r) => r.isActive).length;
        return {
            totalRooms,
            totalCapacity,
            totalBuildings: buildings.length,
            activeRooms,
        };
    }, [rooms, buildings]);

    const handleDelete = () => {
        if (!roomToDelete) return;

        startDeleteTransition(async () => {
            const res = await deleteRoom(roomToDelete.id);
            if (res.success) {
                toast.success(res.message);
                setRoomToDelete(null);
            } else {
                toast.error(res.message);
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-primary font-semibold">
                            ক্যাম্পাস অবকাঠামো
                        </Badge>
                        <span className="text-xs text-muted-foreground">• রুম ও ল্যাব তালিকা</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                        ক্লাসরুম ও ল্যাব ব্যবস্থাপনা (Rooms & Labs)
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        ফেনী পলিটেকনিক ইনস্টিটিউটের সকল ক্লাসরুম, কম্পিউটার ল্যাব ও ওয়ার্কশপ নিয়ন্ত্রণ
                    </p>
                </div>

                <Button
                    onClick={() => setAddDialogOpen(true)}
                    className="gap-2 font-medium"
                >
                    <Plus className="h-4 w-4" />
                    নতুন রুম যুক্ত করুন
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <DoorOpen className="h-4 w-4 text-primary" />
                        মোট ক্লাসরুম ও ল্যাব
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.totalRooms} <span className="text-xs font-normal text-muted-foreground">টি</span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <Users className="h-4 w-4 text-emerald-600" />
                        মোট আসন সংখ্যা
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.totalCapacity.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">সিট</span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        ক্যাম্পাস ভবন সংখ্যা
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.totalBuildings} <span className="text-xs font-normal text-muted-foreground">টি ভবন</span>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-4 shadow-xs">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                        <CheckCircle2 className="h-4 w-4 text-violet-600" />
                        সক্রিয় ক্লাসরুম
                    </div>
                    <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">
                        {stats.activeRooms} <span className="text-xs font-normal text-muted-foreground">টি সক্রিয়</span>
                    </div>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="রুম নম্বর বা ভবনের নাম দিয়ে খুঁজুন..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-10"
                    />
                </div>

                <div className="w-full sm:w-64">
                    <Select
                        value={selectedBuilding}
                        onValueChange={(val) => setSelectedBuilding(val ?? "ALL")}
                    >
                        <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="সব ভবন (All Buildings)">
                                {selectedBuilding === "ALL" ? "সব ভবন (All Buildings)" : selectedBuilding}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">সব ভবন (All Buildings)</SelectItem>
                            {buildings.map((b) => (
                                <SelectItem key={b} value={b}>
                                    {b}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border bg-card overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-b text-xs font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="p-3.5 pl-4">রুম নম্বর / কোড</th>
                                <th className="p-3.5">ভবন / কমপ্লেক্সের নাম</th>
                                <th className="p-3.5">ধারণক্ষমতা (Capacity)</th>
                                <th className="p-3.5">অবস্থা (Status)</th>
                                <th className="p-3.5 pr-4 text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredRooms.map((room) => (
                                <tr
                                    key={room.id}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                                >
                                    <td className="p-3.5 pl-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                                                <DoorOpen className="h-4 w-4" />
                                            </div>
                                            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">
                                                {room.roomCode || room.code}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                                        {room.buildingName || room.name}
                                    </td>
                                    <td className="p-3.5">
                                        {room.capacity ? (
                                            <Badge variant="outline" className="font-mono text-xs">
                                                {room.capacity} সিট
                                            </Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">অনির্দিষ্ট</span>
                                        )}
                                    </td>
                                    <td className="p-3.5">
                                        {room.isActive ? (
                                            <Badge variant="default" className="text-[11px] gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                সক্রিয়
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="text-[11px] gap-1">
                                                <XCircle className="h-3 w-3" />
                                                নিষ্ক্রিয়
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="p-3.5 pr-4 text-right space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-2.5 text-slate-700 hover:text-primary"
                                            onClick={() => setEditingRoom(room)}
                                        >
                                            <Edit2 className="h-3.5 w-3.5 mr-1" />
                                            এডিট
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-2.5 text-destructive hover:bg-destructive/10"
                                            onClick={() => setRoomToDelete(room)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                                            মুছুন
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                            {filteredRooms.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                        <DoorOpen className="h-10 w-10 mx-auto opacity-40 mb-2" />
                                        <p className="font-semibold text-sm">কোনো ক্লাসরুম বা ল্যাব পাওয়া যায়নি</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            উপরে "নতুন রুম যুক্ত করুন" বাটনে ক্লিক করে ক্যাম্পাস রুম এন্ট্রি দিন।
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Room Dialog */}
            <AddRoomDialog
                open={addDialogOpen}
                onOpenChange={setAddDialogOpen}
            />

            {/* Edit Room Dialog */}
            <EditRoomDialog
                room={editingRoom}
                open={Boolean(editingRoom)}
                onOpenChange={(isOpen) => !isOpen && setEditingRoom(null)}
            />

            {/* Delete Confirmation Alert */}
            <AlertDialog
                open={Boolean(roomToDelete)}
                onOpenChange={(isOpen) => !isOpen && setRoomToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>রুম মুছে ফেলতে চান?</AlertDialogTitle>
                        <AlertDialogDescription>
                            আপনি{" "}
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                                রুম {roomToDelete?.roomCode || roomToDelete?.code} (
                                {roomToDelete?.buildingName || roomToDelete?.name})
                            </span>{" "}
                            মুছে ফেলতে চাচ্ছেন। যদি কোনো রুটিনে এই রুমটি ইতিমধ্যে ব্যবহৃত হয়ে থাকে,
                            তবে এটি ডাটা সুরক্ষার স্বার্থে স্বয়ংক্রিয়ভাবে নিষ্ক্রিয় (Inactive) হিসেবে সংরক্ষিত থাকবে।
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>বাতিল</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            নিশ্চিত করুন
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

