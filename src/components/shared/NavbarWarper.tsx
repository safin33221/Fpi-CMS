
import { getCookies } from "@/services/auth/tokenHandler";

import Navbar from "./Navbar";
import { getMe } from "@/services/user/getMe";


export default async function NavbarWarper() {
    const res = await getMe()


    const user = res?.data ?? null
    const accessToken = await getCookies("accessToken")
    const refreshToken = await getCookies("refreshToken")
    const hasAuthCookie = Boolean(accessToken || refreshToken)



    return (
        <div>
            <Navbar user={user} hasAuthCookie={hasAuthCookie} />
        </div>
    );
};
