
import { getCookies } from "@/services/auth/tokenHandler";

import Navbar from "./Navbar";
import { myProfile } from "@/services/user/my-profile";
import { getDefaultDashboard } from "@/lib/auth-utils";
import { IUser } from "@/types/user";



export default async function NavbarWarper() {
    const user: IUser = await myProfile()



    const accessToken = await getCookies("accessToken")
    const refreshToken = await getCookies("refreshToken")
    const hasAuthCookie = Boolean(accessToken || refreshToken)
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
