import { serverFetch } from "@/lib/serverFetch"

export const getAllSemester = async () => {
    try {
        const res = await serverFetch.get("/semester")

        if (!res.ok) {
            return null;
        }
        const result = await res.json()
        console.log(result);        return result.data
    } catch (err) {
        console.log(err);
    }
}