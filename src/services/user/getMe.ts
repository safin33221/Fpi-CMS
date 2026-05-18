import { serverFetch } from "@/lib/serverFetch"

export const getMe = async () => {
    try {
        const res = await serverFetch.get("/user/me")
        console.log(res);
        if (!res.ok) {
            return null;
        }
        const result = await res.json()
        // console.log(result);
        return result
    } catch (err) {
        console.log(err);
    }
}