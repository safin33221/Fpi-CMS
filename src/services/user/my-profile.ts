import { serverFetch } from "@/lib/serverFetch"

export const myProfile = async () => {
    try {
        const res = await serverFetch.get("/user/my-profile")
    
        if (!res.ok) {
            return null;
        }
        const result = await res.json()
        console.log(result);
        return result.data
    } catch (err) {
        console.log(err);
    }
}