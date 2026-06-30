"use client";

import { IUser } from "@/types/user";
import {
  BadgeCheck,
  CalendarClock,
  Clock3,
  KeyRound,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";

interface Props {
  user: IUser;
}

export default function SecurityCard({ user }: Props) {
  const formatDate = (date?: string | Date | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Account & Security
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Account status and security information.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        {/* Active Status */}
        <Row
          icon={
            user.isActive ? (
              <UserCheck className="h-5 w-5 text-green-600" />
            ) : (
              <UserX className="h-5 w-5 text-red-600" />
            )
          }
          title="Account Status"
          value={
            <Badge
              color={
                user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          }
        />

        {/* Verification */}
        <Row
          icon={<BadgeCheck className="h-5 w-5 text-blue-600" />}
          title="Verification"
          value={
            <Badge
              color={
                user.isVerified
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {user.isVerified ? "Verified" : "Pending"}
            </Badge>
          }
        />

        {/* Password */}
        <Row
          icon={<KeyRound className="h-5 w-5 text-orange-600" />}
          title="Password"
          value={
            <Badge
              color={
                user.mustChangePassword
                  ? "bg-orange-100 text-orange-700"
                  : "bg-emerald-100 text-emerald-700"
              }
            >
              {user.mustChangePassword
                ? "Change Required"
                : "Up to Date"}
            </Badge>
          }
        />

        {/* Last Login */}
        <Row
          icon={<Clock3 className="h-5 w-5 text-indigo-600" />}
          title="Last Login"
          value={
            <span className="font-medium text-gray-900">
              {formatDate(user.lastLogin)}
            </span>
          }
        />

        {/* Created */}
        <Row
          icon={<CalendarClock className="h-5 w-5 text-purple-600" />}
          title="Account Created"
          value={
            <span className="font-medium text-gray-900">
              {formatDate(user.createdAt)}
            </span>
          }
        />

        {/* Role */}
        <Row
          icon={<ShieldCheck className="h-5 w-5 text-sky-600" />}
          title="Role"
          value={
            <Badge color="bg-sky-100 text-sky-700">
              {user.role
                ?.replace("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </Badge>
          }
        />
      </div>
    </div>
  );
}

function Row({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>

      {value}
    </div>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${color}`}
    >
      {children}
    </span>
  );
}