"use server"
import { serverFetch } from "@/lib/serverFetch";

export const importStudentPreview = async (
    file: File
) => {

    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    const res =
        await serverFetch.post(
            "/student-import/preview",
            {
                body: formData,
            }
        );

    const result = await res.json();
    console.log(result)
    return result
};