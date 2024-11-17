"use server";

import { cookies } from "next/headers";
// Handles user login action
export async function uploadImagesService(files: File[]) {
  try {
    const cookieStore = cookies(); // Access cookies from the request

    // Get the 'access_token' cookie
    const token = cookieStore.get("access_token")?.value;
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "unexpectedError" };
  }
}
