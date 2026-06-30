"use client";

import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  User,
  UserCircle2,
} from "lucide-react";

import { IUser } from "@/types/user";
import InfoRow from "./InfoRow";

interface Props {
  user: IUser;
}

export default function AboutCard({ user }: Props) {
  const birthday = user.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const address = [
    user.address,
    user.city,
    user.district,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-900">
          About
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Personal and contact information.
        </p>
      </div>

      {/* Body */}
      <div className="space-y-1 p-4">
        <InfoRow
          icon={<Mail size={20} />}
          label="Email"
          value={user.email}
        />

        <InfoRow
          icon={<UserCircle2 size={20} />}
          label="Login ID"
          value={user.loginId}
        />

        <InfoRow
          icon={<Phone size={20} />}
          label="Phone"
          value={user.phone}
        />

        <InfoRow
          icon={<User size={20} />}
          label="Gender"
          value={user.gender}
        />

        <InfoRow
          icon={<CalendarDays size={20} />}
          label="Date of Birth"
          value={birthday}
        />

        <InfoRow
          icon={<MapPin size={20} />}
          label="Address"
          value={address}
        />
      </div>
    </div>
  );
}