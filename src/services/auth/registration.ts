"use server"

import { serverFetch } from "@/lib/serverFetch"

export const registerStudent = async (
    _prevState: unknown,
    formData: FormData
): Promise<{
    success: boolean
    message: string
}> => {
    const payload = {
        studentId: String(formData.get("studentId")),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
    }
    console.log({ payload });

    try {
        const response = await serverFetch.post(
            "/auth/student/register",
            {
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        const contentType =
            response.headers.get("content-type")

        if (!contentType?.includes("application/json")) {
            const raw = await response.text()

            console.error("Non-JSON response:", raw)

            return {
                success: false,
                message:
                    "Server returned an invalid response",
            }
        }

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                message:
                    data?.message ??
                    "Registration failed",
            }
        }

        return {
            success: true,
            message:
                data?.message ??
                "Student registered successfully",
        }
    } catch (error) {
        console.error("Registration error:", error)

        return {
            success: false,
            message:
                "Something went wrong during registration",
        }
    }
}