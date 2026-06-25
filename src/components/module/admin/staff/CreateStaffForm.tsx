import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IDepartment } from "@/types/department";
export default function CreateStaffForm({ departments }: { departments: IDepartment[] }) {
 
    return (
        <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>
                        Full Name
                    </Label>
                    <Input placeholder="Enter full name" />
                </div>

                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="Enter email"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                    <Label>
                        Address
                    </Label>
                    <Input placeholder="Enter address" />
                </div >
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <Label>Gender</Label>

                        <Select>
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

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="TEACHER">
                                    Teacher
                                </SelectItem>

                                <SelectItem value="ACCOUNTANT">
                                    Accountant
                                </SelectItem>

                                <SelectItem value="REGISTRAR">
                                    Registrar
                                </SelectItem>

                                <SelectItem value="LIBRARIAN">
                                    Librarian
                                </SelectItem>

                                <SelectItem value="EXAM_CONTROLLER">
                                    Exam Controller
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Department
                        </Label>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>

                            <SelectContent>
                                {
                                    departments?.map(department => (
                                        <SelectItem key={department.id} value={department.code}>
                                            {department.name}
                                        </SelectItem>
                                    ))
                                }

                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Experience (Years)
                        </Label>
                        <Input
                            type="number"
                            placeholder="0"
                        />
                    </div>

                </div>

                <div className="space-y-2">
                    <Label>
                        Designation
                    </Label>
                    <Input placeholder="Lecturer, Junior Instructor etc." />
                </div>

                <div className="space-y-2">
                    <Label>
                        Qualification
                    </Label>
                    <Input placeholder="BSc, MSc, PhD" />
                </div>

                <div className="space-y-2">
                    <Label>
                        Joining Date
                    </Label>
                    <Input type="date" />
                </div>



            </div>

            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    type="button"
                >
                    Cancel
                </Button>

                <Button type="submit">
                    Create Staff
                </Button>
            </div>
        </form>
    );
};
