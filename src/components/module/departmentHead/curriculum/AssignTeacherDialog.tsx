"use client";

import { useState, useTransition, type ReactNode } from "react";
import {
    BookOpen,
    CalendarClock,
    Loader2,
    MapPin,
    UserRoundPlus,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { assignTeacher } from "@/services/subject/assign-teacher";
import { createRoutine } from "@/services/routine/createRoutine";
import { ISubjectAssignment } from "@/types/assignment";
import { ITeacher } from "@/types/teacher";
import { IClassRoutine, IRoom, Weekday } from "@/types/routine";

type Props = {
    assignment: ISubjectAssignment | null;
    teachers: ITeacher[];
    rooms: IRoom[];
    routines: IClassRoutine[];
    onOpenChange: (open: boolean) => void;
};

export default function AssignTeacherDialog({
    assignment,
    teachers,
    rooms,
    routines,
    onOpenChange,
}: Props) {
    return (
        <Dialog
            open={Boolean(assignment)}
            onOpenChange={onOpenChange}
        >
            {assignment && (
                <AssignTeacherForm
                    key={assignment.id}
                    assignment={assignment}
                    teachers={teachers}
                    rooms={rooms}
                    routines={routines}
                    onOpenChange={onOpenChange}
                />
            )}
        </Dialog>
    );
}

type AssignTeacherFormProps = {
    assignment: ISubjectAssignment;
    teachers: ITeacher[];
    rooms: IRoom[];
    routines: IClassRoutine[];
    onOpenChange: (open: boolean) => void;
};

function AssignTeacherForm({
    assignment,
    teachers,
    rooms,
    routines,
    onOpenChange,
}: AssignTeacherFormProps) {
    const [teacherId, setTeacherId] = useState(
        assignment.teachingAssignments[0]?.teacherId ?? ""
    );
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();
    const [roomId, setRoomId] = useState("");
    const [day, setDay] = useState<Weekday>("SATURDAY");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const assignmentRoutines = routines.filter(
        (routine) => routine.subjectAssignment.id === assignment.id
    );

    const handleSubmit = () => {
        if (!assignment || !teacherId) {
            return;
        }

        startTransition(async () => {
            const result = await assignTeacher(
                assignment.subjectId,
                teacherId,
                assignment.id
            );

            if (result.success) {
                onOpenChange(false);
                return;
            }

            setMessage(result.message);
        });
    };

    const selectedAssignedTeacher = teachers.find((t) => t.id === teacherId);
    const selectedAssignedRoom = rooms.find((r) => r.id === roomId);

    const handleSchedule = () => {
        if (!teacherId || !roomId || !startTime || !endTime) return;
        setMessage("");
        startTransition(async () => {
            const result = await createRoutine({ subjectAssignmentId: assignment.id, teacherId, roomId, day, startTime, endTime });
            if (result.success) {
                onOpenChange(false);
                return;
            }

            setMessage(result.message);
        });
    };

    return (
        <>
            <DialogContent className="sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Subject Details</DialogTitle>
                    <DialogDescription>
                        Manage the academic details for {assignment.semester.name}.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-md bg-primary/10 p-2 text-primary">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold">{assignment.subject.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {assignment.subject.code}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <DetailItem label="Semester" value={assignment.semester.name} />
                        <DetailItem label="Credit" value={`${assignment.subject.credit} credit`} />
                        <DetailItem label="Department" value={assignment.department.name} />
                        <DetailItem
                            label="Status"
                            value={
                                <Badge variant={assignment.isActive ? "default" : "secondary"}>
                                    {assignment.isActive ? "Active" : "Inactive"}
                                </Badge>
                            }
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <CalendarClock className="h-4 w-4" /> Class schedule
                    </div>
                    {assignmentRoutines.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No class has been scheduled yet.</p>
                    ) : assignmentRoutines.map((routine) => (
                        <InfoCard key={routine.id} icon={<MapPin className="h-4 w-4" />} label={`${routine.day} · ${routine.startTime}–${routine.endTime}`} value={`${routine.room.code} — ${routine.room.name}`} />
                    ))}
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label htmlFor="teacher">Assigned Teacher</Label>
                    <Select
                        value={teacherId}
                        onValueChange={(value) => setTeacherId(value ?? "")}
                    >
                        <SelectTrigger id="teacher" className="w-full">
                            <SelectValue placeholder="Select a teacher">
                                {selectedAssignedTeacher
                                    ? `${selectedAssignedTeacher.user.name} (${selectedAssignedTeacher.designation})`
                                    : undefined}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {teachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                    {teacher.user.name} ({teacher.designation})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                    <Label>Add class schedule</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Select value={roomId} onValueChange={(value) => setRoomId(value ?? "")}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select room">
                                    {selectedAssignedRoom
                                        ? `${selectedAssignedRoom.roomCode || selectedAssignedRoom.code} — ${selectedAssignedRoom.buildingName || selectedAssignedRoom.name}`
                                        : undefined}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>{rooms.map((room) => <SelectItem key={room.id} value={room.id}>{room.roomCode || room.code} — {room.buildingName || room.name}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={day} onValueChange={(value) => setDay((value ?? "SATURDAY") as Weekday)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select day">{day}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>{["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                        </Select>
                        <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" />
                        <input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" />
                    </div>
                    <Button type="button" variant="outline" onClick={handleSchedule} disabled={!teacherId || !roomId || !startTime || !endTime || isPending}>
                        <CalendarClock className="mr-2 h-4 w-4" /> Save schedule
                    </Button>
                </div>

                {message && (
                    <p className="text-sm text-destructive">{message}</p>
                )}

                <DialogFooter showCloseButton>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!teacherId || isPending || teachers.length === 0}
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <UserRoundPlus className="mr-2 h-4 w-4" />
                        )}
                        {isPending ? "Saving..." : "Save Teacher"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </>
    );
}

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
    return (
        <div>
            <p className="text-muted-foreground">{label}</p>
            <div className="mt-1 font-medium">{value}</div>
        </div>
    );
}

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <span className="text-sm">{label}</span>
            </div>
            <p className="mt-2 font-medium">{value}</p>
        </div>
    );
}
