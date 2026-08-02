import Link from "next/link";
import { Construction, Home, ArrowLeft } from "lucide-react";
import BackButton from "@/components/common/BackButton";

export default function NotFound() {
    return (
        <main className="flex  items-center justify-center bg-background px-6">
            <div className="max-w-xl text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/10">
                    <Construction className="h-12 w-12 text-yellow-600" />
                </div>

                <span className="mt-8 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-600">
                    Development Stage
                </span>

                <h1 className="mt-6 text-4xl font-bold tracking-tight">
                    This Page Isn&apos;t Ready Yet
                </h1>

                <p className="mt-4 text-muted-foreground">
                    You&apos;re trying to access a page that hasn&apos;t been developed or
                    isn&apos;t available yet. This feature is currently under
                    development and will be available in a future update.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <BackButton />
                </div>

                <p className="mt-8 text-sm text-muted-foreground">
                    If you believe this page should already exist, please contact
                    the system administrator.
                </p>
            </div>
        </main>
    );
}