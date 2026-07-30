import DashboardBottomNav from "@/components/module/dashboard/DashboardBottomNav";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <div>

                {children}
            </div>
            <DashboardBottomNav />
        </div>
    );
};
