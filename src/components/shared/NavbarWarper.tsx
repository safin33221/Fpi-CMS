
import { getCookies } from "@/services/auth/tokenHandler";

import Navbar from "./Navbar";
import { myProfile } from "@/services/user/my-profile";



export default async function NavbarWarper() {
    const res = await myProfile()


    const user = res ?? null
    const accessToken = await getCookies("accessToken")
    const refreshToken = await getCookies("refreshToken")
    const hasAuthCookie = Boolean(accessToken || refreshToken)



    return (
        <div>
            <Navbar user={res} hasAuthCookie={hasAuthCookie} />
        </div>
    );
};
