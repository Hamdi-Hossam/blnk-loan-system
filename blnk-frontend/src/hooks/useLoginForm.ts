import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLoginSchema,
  LoginFormData,
} from "@/validations/LoginFormSchema";
import { loginAction } from "@/actions/auth";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { debounce } from "lodash";
import Cookies from "js-cookie";

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Login");

  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = debounce(async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const result = await loginAction(formData);
      if (result.success && result.data?.user) {
        const { first_name, last_name, username } = result.data.user;

        const accessToken = result.data.access_token;

        // Save the serialized user object in cookies
        Cookies.set("first_name", result.data.user.first_name);
        Cookies.set("last_name", result.data.user.last_name);
        Cookies.set("user", JSON.stringify(result.data.user));
        Cookies.set("access_token", accessToken);
        dispatch(
          setUser({
            first_name,
            last_name,
            username,
            isLoggedIn: true,
          })
        );

        toast.success(t("loginSuccess"));
        reset();

        router.push(`/${locale}/home`);
      } else {
        toast.error(result.error || t("loginFailed"));
      }
    } catch (error: unknown) {
      toast.error(
        `${t("unexpectedError")}: ${
          error instanceof Error ? error.message : ""
        }`
      );
    }
  }, 300);

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
