import type { ReactNode } from "react";

import { Footer } from "@/components/common/Footer";
import NavbarWarper from "@/components/shared/NavbarWarper";
import Navbar from "@/components/shared/Navbar";

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({
    children,
}: PublicLayoutProps) {
    return (
        <>
            <NavbarWarper />

            <Navbar />
            <main>{children}</main>

            <Footer />
        </>
    );
}