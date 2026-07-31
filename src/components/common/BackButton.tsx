"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted"
        >
            <ArrowLeft className="h-4 w-4" />
            Go Back
        </button>
    );
}