

import Navbar from "./Navbar";
import { myProfile } from "@/services/user/my-profile";
import { getDefaultDashboard } from "@/lib/auth-utils";
import { IUser } from "@/types/user";



export default async function NavbarWarper() {
    const user: IUser = await myProfile()



    const hasAuthCookie = !!user;
    const defaultDashboard = getDefaultDashboard(user?.role)


    return (
        <div>
            <Navbar
                user={user}
                hasAuthCookie={hasAuthCookie}
                defaultDashboard={defaultDashboard}
            />
        </div>
    );
};
