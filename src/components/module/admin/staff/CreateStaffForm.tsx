"use client";

import { startTransition, useActionState, useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Copy, CheckCircle2 } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { IDepartment } from "@/types/department";
import { Gender, UserRole } from "@/types/enum";
import { createStaff, CreateStaffResponse } from "@/services/staff/createStaff";

const initialState: CreateStaffResponse = {
    success: false,
    message: "",

};

export default function CreateStaffForm({
    departments,
}: {
    departments: IDepartment[];
}) {
    const [open, setOpen] = useState(false);
    const [state, formAction, pending] =
        useActionState(createStaff, initialState);

    const [gender, setGender] =
        useState<Gender>();

    const [role, setRole] =
        useState<UserRole>();

    const [departmentId, setDepartmentId] =
        useState<string | null>(null);

    useEffect(() => {
        if (state.success && state.data) {
            startTransition(() => {
                setOpen(true);
            });
        }
    }, [state.success, state.data]);


    const copyCredentials = async () => {
        if (!state.data) return;

        await navigator.clipboard.writeText(
            `Login ID: ${state.data.loginId} ,
Password: ${state.data.password}`
        );
    };

    return (
        <div>

            <form
                action={formAction}
                className="space-y-6"
            >
                <input
                    type="hidden"
                    name="gender"
                    value={gender || ""}
                />

                <input
                    type="hidden"
                    name="role"
                    value={role || ""}
                />

                <input
                    type="hidden"
                    name="departmentId"
                    value={departmentId || ""}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Full Name</Label>

                        <Input
                            name="name"
                            placeholder="Enter full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone</Label>

                        <Input
                            name="phone"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Address</Label>

                        <Input
                            name="address"
                            placeholder="Enter address"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Gender</Label>

                        <Select
                            value={gender}
                            onValueChange={(value) =>
                                setGender(
                                    value as Gender
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="MALE">
                                    Male
                                </SelectItem>

                                <SelectItem value="FEMALE">
                                    Female
                                </SelectItem>

                                <SelectItem value="OTHER">
                                    Other
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>

                        <Select
                            value={role}
                            onValueChange={(value) =>
                                setRole(
                                    value as UserRole
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>

                            <SelectContent>
                                {Object.values(
                                    UserRole
                                ).map((role) => (
                                    <SelectItem
                                        key={role}
                                        value={role}
                                    >
                                        {role
                                            .split("_")
                                            .map(
                                                (
                                                    word
                                                ) =>
                                                    word.charAt(
                                                        0
                                                    ) +
                                                    word
                                                        .slice(
                                                            1
                                                        )
                                                        .toLowerCase()
                                            )
                                            .join(
                                                " "
                                            )}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Department</Label>

                        <Select
                            value={departmentId}
                            onValueChange={
                                setDepartmentId
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>

                            <SelectContent>
                                {departments?.map(
                                    (
                                        department
                                    ) => (
                                        <SelectItem
                                            key={
                                                department.id
                                            }
                                            value={
                                                department.id
                                            }
                                        >
                                            {
                                                department.name
                                            }
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Experience
                            (Years)
                        </Label>

                        <Input
                            name="experienceYears"
                            type="number"
                            placeholder="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Designation
                        </Label>

                        <Input
                            name="designation"
                            placeholder="Lecturer, Junior Instructor etc."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Qualification
                        </Label>

                        <Input
                            name="qualification"
                            placeholder="BSc, MSc, PhD"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Joining Date
                        </Label>

                        <Input
                            name="joiningDate"
                            type="date"
                        />
                    </div>
                </div>

                {state.message && (
                    <p
                        className={`text-sm ${state.success
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >
                        {state.message}
                    </p>
                )}

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        type="button"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={pending}
                    >
                        {pending
                            ? "Creating..."
                            : "Create Staff"}
                    </Button>
                </div>
            </form>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>

                        <DialogTitle className="text-center text-xl">
                            Staff Created Successfully
                        </DialogTitle>

                        <DialogDescription className="text-center">
                            Save these credentials. The temporary password
                            will not be shown again.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="rounded-xl border p-4">
                            <p className="text-xs text-muted-foreground">
                                Login ID
                            </p>

                            <p className="mt-1 font-mono text-lg font-semibold">
                                {state.data?.loginId}
                            </p>
                        </div>

                        <div className="rounded-xl border p-4">
                            <p className="text-xs text-muted-foreground">
                                Temporary Password
                            </p>

                            <p className="mt-1 font-mono text-lg font-semibold">
                                {state.data?.password}
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={copyCredentials}
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Credentials
                        </Button>

                        <Button onClick={() => setOpen(false)}>
                            Done
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    );
}