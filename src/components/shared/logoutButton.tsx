"use client";


import { logoutUser } from "@/services/auth/logout";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LogoutButton() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        setIsPending(true);
        try {
            const result = await logoutUser();
            if (result.success) {
                // Redirect to login or home page
                router.replace("/login");
                // Optionally clear client-side auth state (e.g., context, localStorage)
            } else {
                console.error("Logout failed");
                // Show error toast/notification
            }
        } catch (error) {
            console.error("Unexpected error during logout:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button

            className="flex items-center gap-2 rounded-xl px-4 py-3 text-red-500 hover:bg-red-500/5"
            onClick={handleLogout}
            disabled={isPending}
        >
            <LogOut className="h-5 w-5" />
            {isPending ? "Logging out..." : "Logout"}
        </button>
    );
}

