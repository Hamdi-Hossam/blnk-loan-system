import { z } from "zod";

export const createUploadImagesSchema = (t: (key: string) => string) =>
  z.object({
    files: z
      .array(
        z
          .any()
          .refine(
            (file) => file instanceof File && file.type.startsWith("image/"),
            {
              message: t("must-image"),
            }
          )
      )
      .nonempty({ message: t("least-one-image") }),
  });

export type UploadImagesFormData = z.infer<
  ReturnType<typeof createUploadImagesSchema>
>;
