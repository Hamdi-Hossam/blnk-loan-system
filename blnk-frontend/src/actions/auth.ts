"use server";

import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { loginService } from "@/services/loginService";
import { createLoginSchema } from "@/validations/LoginFormSchema";
import { clearUser } from "@/slices/userSlice";
import { store } from "@/store/store";

const ACCESS_TOKEN_COOKIE = "access_token";

// Handles user login action
export async function loginAction(formData: FormData) {
  try {
    const t = await getTranslations("Login");
    const { username, password } = createLoginSchema(t).parse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    const result = await loginService(username, password);
    if (!result.success) {
      return {
        success: false,
        error: result.error || t("loginError"),
      };
    }
    // Set the access token in the cookies
    cookies().set(ACCESS_TOKEN_COOKIE, result.data.access_token);

    return {
      success: true,
      data: {
        user: result.data.user,
        access_token: result.data.access_token,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    const t = await getTranslations("Login");
    return {
      success: false,
      error: t("unexpectedError"),
    };
  }
}

// Handles user logout action
export async function logoutAction() {
  cookies().delete(ACCESS_TOKEN_COOKIE);
  store.dispatch(clearUser());
  return { success: true };
}
