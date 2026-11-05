import { serverFetch } from "@/lib/serverFetch"

const isNextInternalError = (err: unknown): boolean => {
    if (typeof err !== "object" || err === null || !("digest" in err)) {
        return false;
    }
    const digest = (err as { digest?: unknown }).digest;
    return (
        typeof digest === "string" &&
        (digest === "DYNAMIC_SERVER_USAGE" || digest.startsWith("NEXT_"))
    );
};

export const myProfile = async () => {
    try {
        const res = await serverFetch.get("/user/my-profile")

        if (!res.ok) {
            return null;
        }
        const result = await res.json()
        return result.data
    } catch (err) {
        if (isNextInternalError(err)) {
            throw err;
        }
        console.log(err);
        return null;
    }
}
