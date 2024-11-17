import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import type { NextRequest } from "next/server";

// Initialize `next-intl` middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // Apply next-intl middleware first for handling locales
  const response = intlMiddleware(request);

  // Check for the access token in cookies for authentication
  const token = request.cookies.get("access_token");
  const user = request.cookies.get("user")?.value;
  let roleId;

  if (user) {
    try {
      // Decode URI component if the cookie value is URI encoded
      const decodedState = decodeURIComponent(user);
      // Parse the JSON string
      const parsedState = JSON.parse(decodedState);
      // Access the role_id
      roleId = parsedState.role_id;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  } else {
    console.log("user cookie not found.");
  }

  // Get the current locale and the current path
  const locale = request.nextUrl.pathname.split("/")[1] || "en";
  const currentPath = request.nextUrl.pathname;
  // Prevent looping by checking if already on the login page
  const isLoginPage = currentPath.startsWith(`/${locale}/auth/login`);

  // Redirect to login if no role_id or if it's an unrecognized role_id
  if (!roleId || ![1, 2, 3].includes(roleId)) {
    if (!isLoginPage) {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login`, request.url)
      );
    }
    return response;
  }

  if (token && (roleId === 1 || roleId === 2 || roleId === 3) && !isLoginPage) {
    return response;
  }
  // Redirect to login page if token is not present and not on login page
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }
  // Redirect to home page if token is present and  on login page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }
  // Data Entry
  if (
    token &&
    roleId === 1 &&
    ![`/${locale}/home/loan-funds/all`].includes(currentPath)
  ) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }
  // Archives
  if (
    token &&
    roleId === 2 &&
    ![`/${locale}/home/loan-funds/customers`, `/${locale}/home/loans`].includes(
      currentPath
    )
  ) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  // Data Entry
  if (
    token &&
    roleId === 3 &&
    ![
      `/${locale}/home/loan-funds/create`,
      `/${locale}/home/loans/requested`,
    ].includes(currentPath)
  ) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  return response; // Continue to the next middleware or page
}

// Middleware config for matching routes
export const config = {
  matcher: ["/", "/(ar|en)/:path*"], // Adjust to your routes
};
