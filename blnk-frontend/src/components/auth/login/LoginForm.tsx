"use client";

import { useLoginForm } from "@/hooks/useLoginForm";
import { useFont } from "@/hooks/useFont";
import { useTranslations } from "next-intl";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const t = useTranslations("Login");
  const font = useFont();
  const { handleSubmit, register, errors, isSubmitting, onSubmit } =
    useLoginForm();

  return (
    <div className="px-4 md:px-0 w-full md:w-96 login-form">
      <h1 className={`${font.className} mb-4 font-bold text-4xl`}>
        {t("title")} &#128075;
      </h1>
      <p className="mb-6 text-gray-600 text-sm dark:text-gray-400">
        {t("description")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username field with validation */}
        <FormField
          name="username"
          label={t("username")}
          register={register}
          errors={errors}
          placeholder={t("usernamePlaceholder")}
        />
        {/* Password field with validation */}
        <FormField
          name="password"
          label={t("password")}
          register={register}
          errors={errors}
          placeholder={t("passwordPlaceholder")}
          type="password"
        />
        {/* Submit button */}
        <SubmitButton isSubmitting={isSubmitting} label={t("loginBtn")} />
      </form>
    </div>
  );
}
