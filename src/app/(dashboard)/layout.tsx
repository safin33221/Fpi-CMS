export const dynamic = "force-dynamic";


import DashboardNavbar from "@/components/module/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/module/dashboard/DashboardSidebar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-dvh">
                <DashboardSidebar />
            </aside>

            {/* Right Content */}
            <div className="relative">
                {/* Navbar */}
                <header className="fixed top-0 right-0 left-0 lg:left-72 z-40 h-16 border-b bg-background/90 backdrop-blur">
                    <DashboardNavbar />
                </header>

                {/* Page */}
                <main className="mt-16 md:mt-20 p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}