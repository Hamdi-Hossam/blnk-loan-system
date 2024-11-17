import { getLocale, getTranslations } from "next-intl/server";
const AUTH_LOGIN_ENDPOINT = "login/";
export async function loginService(username: string, password: string) {
  let t: (key: string) => string;

  try {
    const [locale, translations] = await Promise.all([
      getLocale(),
      getTranslations("Login"),
    ]);

    t = translations;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return { success: false, error: t("unexpectedError") };
    }

    const response = await fetch(`${apiUrl}${AUTH_LOGIN_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || t("loginError") };
    }

    const data = await response.json();

    return { success: true, data: data };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
