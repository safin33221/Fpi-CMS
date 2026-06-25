import DashboardSidebar from "@/components/module/dashboard/DashboardSidebar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar />

            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}