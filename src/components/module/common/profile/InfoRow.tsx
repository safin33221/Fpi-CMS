import { ReactNode } from "react";

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value?: string | number | null;
}

export default function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-gray-50">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-500">{label}</p>

        <p className="mt-1 break-words font-medium text-gray-900">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}