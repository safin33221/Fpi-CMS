import {
  User,
  Phone,
  CalendarDays,
  GraduationCap,
  Building2,
  Hash,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IStudent } from "@/types/student";

export default function StudentInformationCard({
  student,
}: {
  student: IStudent;
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Basic */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Basic Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem icon={<User size={18} />} label="Full Name" value={student.name} />
            <InfoItem icon={<Phone size={18} />} label="Phone" value={student.phone || "-"} />
            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Date of Birth"
              value={student.dob ? new Date(student.dob).toLocaleDateString() : "-"}
            />
            <InfoItem
              icon={<Hash size={18} />}
              label="Status"
              value={student.status}
            />
          </div>
        </section>

        {/* Academic */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Academic Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={<Building2 size={18} />}
              label="Department"
              value={student.department.name}
            />

            <InfoItem
              icon={<GraduationCap size={18} />}
              label="Semester"
              value={student.semester.name}
            />

            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Session"
              value={student.session}
            />

            <InfoItem
              icon={<Hash size={18} />}
              label="Roll"
              value={student.roll || "Not Assigned"}
            />

            <InfoItem
              icon={<Hash size={18} />}
              label="Registration"
              value={student.registrationNo || "Not Assigned"}
            />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
      </div>
    </div>
  );
}