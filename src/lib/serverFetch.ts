
import { cookies } from "next/headers"
const BackendURL =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL

const buildRequestUrl = (endpoint: string): string | null => {
    if (!BackendURL) {
        return null
    }

    try {
        const normalizedBase = BackendURL.endsWith("/")
            ? BackendURL
            : `${BackendURL}/`

        const normalizedEndpoint = endpoint.startsWith("/")
            ? endpoint.slice(1)
            : endpoint

        return new URL(normalizedEndpoint, normalizedBase).toString()
    } catch {
        return null
    }
}


const serverFetchHelper = async (
    endpoint: string,
    options: RequestInit,
    allowRetry = true
): Promise<Response> => {
    const requestUrl = buildRequestUrl(endpoint)

    if (!requestUrl) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Backend URL is missing or invalid",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }

    try {
        const cookieStore = await cookies();

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 15000);

        const headers = new Headers(options.headers);

        headers.set("Cookie", cookieStore.toString());

        if (!(options.body instanceof FormData)) {
            headers.set(
                "Content-Type",
                "application/json"
            );
        }

        const response = await fetch(requestUrl, {
            ...options,
            signal: controller.signal,
            headers,
            cache: "no-store",
        });

        clearTimeout(timeout)

        if (allowRetry && response.status >= 500) {
            return serverFetchHelper(endpoint, options, false)
        }

        return response
    } catch (error) {
        console.error("Server fetch failed:", error)

        if (allowRetry) {
            return serverFetchHelper(endpoint, options, false)
        }

        return new Response(
            JSON.stringify({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown fetch error",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }
}

export const serverFetch = {
    get: async (
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> =>
        serverFetchHelper(endpoint, {
            ...options,
            method: "GET",
        }),

    post: async (
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> =>
        serverFetchHelper(endpoint, {
            ...options,
            method: "POST",
        }),

    put: async (
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> =>
        serverFetchHelper(endpoint, {
            ...options,
            method: "PUT",
        }),

    patch: async (
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> =>
        serverFetchHelper(endpoint, {
            ...options,
            method: "PATCH",
        }),

    delete: async (
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> =>
        serverFetchHelper(endpoint, {
            ...options,
            method: "DELETE",
        }),
}