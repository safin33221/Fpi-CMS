"use client";

import { logoutUser } from "@/services/auth/logout";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();

        router.push("/login");
        router.refresh();
    };

    return (
        <button onClick={handleLogout}>
            Logout 
        </button>
    );
}

