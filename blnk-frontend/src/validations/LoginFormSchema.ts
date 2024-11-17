import { z } from "zod";

// Define a regex to check for potential script content
const SCRIPT_REGEX = /<script|javascript:|data:/i;

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .max(50, { message: t("MaxLength") })
      .refine((value) => !SCRIPT_REGEX.test(value), {
        message: t("noScriptsAllowed"),
      }),
    password: z
      .string()
      .max(50, { message: t("MaxLength") })
      .refine((value) => !SCRIPT_REGEX.test(value), {
        message: t("noScriptsAllowed"),
      }),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
