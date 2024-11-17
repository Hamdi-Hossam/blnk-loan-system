"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const renameHdrID = searchParams.get("renameHdrID");

  try {
    const cookieStore = cookies(); // Access cookies from the request

    // Get the 'access_token' cookie
    const token = cookieStore.get("access_token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/renamed-images?renameHdrID=${renameHdrID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { success: false, error: errorData.message },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.data.images });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { success: false, error: "unexpectedError" },
      { status: 500 }
    );
  }
}
