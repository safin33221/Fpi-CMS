import { myProfile } from "@/services/user/my-profile";
import { IUser } from "@/types/user";
import DashboardNavbarContent from "./DashboardNavbarContent";

export default async function DashboardNavbar() {
    const user: IUser = await myProfile()
    return (
        <div>
            <DashboardNavbarContent user={user} />
        </div>
    );
};
