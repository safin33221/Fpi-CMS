"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/serverFetch"
import type { StudentInfo } from "@/types/registration"

export const verifyStudent = async (
  _prevState: unknown,
  formData: FormData
): Promise<{
  success: boolean
  message: string
  data?: StudentInfo
  redirectTo?: string
}> => {
  const payload = {
    roll: String(formData.get("roll")),
    registrationNo: String(formData.get("registrationNo")),
    dob: String(formData.get("dob")),
    phone: String(formData.get("phone")),
  }

  console.log({ payload })

  try {
    const response = await serverFetch.post(
      "/students/verify-student",
      {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const data = await response.json()

    console.log({ data })

    if (!response.ok) {
      return {
        success: false,
        message:
          data?.message ??
          "Verification failed. Please try again.",
      }
    }

    return {
      success: true,
      message:
        data?.message ??
        "Student verified successfully",
      data: data?.data ?? data,
    }
  } catch (error) {
    console.error("verification error:", error)

    return {
      success: false,
      message:
        "Verification failed. Please check your information and try again.",
    }
  }
}