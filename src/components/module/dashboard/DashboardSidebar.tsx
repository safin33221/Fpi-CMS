import { redirect, unstable_rethrow } from "next/navigation";
import { getDefaultDashboard } from "@/lib/auth-utils";
import { UserRole } from "@/types/enum";
import { NavSection } from "@/types/nav-menu";
import { myProfile } from "@/services/user/my-profile";
import { getNavItemsByRole } from "@/lib/nav.config";
import { IUser } from "@/types/user";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
    let userInfo: IUser | null = null;

    try {
        userInfo = await myProfile();
    } catch (error) {
        unstable_rethrow(error);

        console.error(
            "[DashboardSidebar] Failed to load user profile:",
            error
        );

        redirect("/login");
    }

    if (!userInfo) {
        redirect("/login");
    }

    const currentRole = userInfo.role as UserRole;

    const [navItems, dashboardHome] =
        await Promise.all([
            getNavItemsByRole(currentRole),
            Promise.resolve(
                getDefaultDashboard(currentRole)
            ),
        ]);


    return (
        <DashboardSidebarContent
            userInfo={userInfo}
            navItems={navItems as NavSection[]}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardSidebar;