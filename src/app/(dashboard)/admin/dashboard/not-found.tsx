import Link from "next/link";
import { AlertCircle, ArrowLeft, LayoutDashboard } from "lucide-react";
import BackButton from "@/components/common/BackButton";

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
            <div className="max-w-md text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <AlertCircle className="h-10 w-10 text-primary" />
                </div>

                <h1 className="mt-6 text-3xl font-bold">
                    Page Not Found
                </h1>

                <p className="mt-3 text-muted-foreground">
                    The page you are looking for doesn&apos;t exist, has been moved,
                    or is not available in this version of the system.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <BackButton />

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                </div>

                <p className="mt-8 text-xs text-muted-foreground">
                    If this page should exist, it may still be under development
                    or you may not have permission to access it.
                </p>
            </div>
        </main>
    );
}