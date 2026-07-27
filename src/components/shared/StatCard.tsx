"use client";

import CountUp from "./CountUp";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
  active: boolean;
}

export default function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  active,
}: Props) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
      <Icon className="h-5 w-5 text-yellow-300" />

      <h3 className="mt-3 text-3xl font-bold text-white">
        <CountUp target={value} active={active} />
        {suffix}
      </h3>

      <p className="mt-1 text-sm text-slate-200">
        {label}
      </p>
    </div>
  );
}