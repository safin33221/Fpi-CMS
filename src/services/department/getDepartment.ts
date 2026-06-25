import { serverFetch } from "@/lib/serverFetch"

export const getAllDepartment = async () => {
    try {
        const res = await serverFetch.get("/department")
    
        if (!res.ok) {
            return null;
        }
        const result = await res.json()
      
        return result.data
    } catch (err) {
        console.log(err);
    }
}