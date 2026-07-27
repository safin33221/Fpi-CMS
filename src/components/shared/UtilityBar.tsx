import Link from "next/link";
import { LockKeyholeIcon, MailIcon, PhoneCallIcon } from "lucide-react";

interface UtilityBarProps {
  user?: {
    name?: string;
    role?: string;
  } | null;
  hasAuthCookie?: boolean;
  defaultDashboard?: string;
}

export default function UtilityBar({
  user,
  hasAuthCookie = false,
  defaultDashboard = "/dashboard",
}: UtilityBarProps) {
  return (
    <div className="w-full bg-blue-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Left */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <Link
            href="tel:+8801700000000"
            className="inline-flex items-center gap-2 transition-colors hover:text-blue-200"
          >
            <PhoneCallIcon className="h-4 w-4 shrink-0" />

            <span>
              <span className="text-blue-200">Emergency Helpline:</span>{" "}
              +880 1700-000 000
            </span>
          </Link>

          <Link
            href="mailto:info@fpi.edu.bd"
            className="inline-flex items-center gap-2 transition-colors hover:text-blue-200"
          >
            <MailIcon className="h-4 w-4 shrink-0" />
            <span>info@fpi.edu.bd</span>
          </Link>
        </div>

        {/* Right */}
        {hasAuthCookie && user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-blue-100 md:block">
              Welcome,{" "}
              <span className="font-semibold text-white">
                {user.name}
              </span>
            </span>

            <Link
              href={defaultDashboard}
              className="inline-flex items-center justify-center rounded-md bg-white px-3.5 py-1.5 text-[13px] font-semibold text-blue-900 transition-colors hover:bg-blue-100"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3.5 py-1.5 text-[13px] font-semibold text-blue-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
          >
            <LockKeyholeIcon className="h-4 w-4" />
            Smart Student / Teacher ERP Login
          </Link>
        )}
      </div>
    </div>
  );
}