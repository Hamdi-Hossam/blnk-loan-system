import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = useCallback(
    (newLocale: string) => {
      if (newLocale === locale) {
        return; // No need to change if the new locale is the same as the current one
      }

      const currentLocalePath = `/${locale}/`;
      const newLocalePath = `/${newLocale}/`;

      if (pathname.startsWith(currentLocalePath)) {
        const newPathname = pathname.replace(currentLocalePath, newLocalePath);
        router.push(newPathname);
      } else {
        // If the current locale is not in the pathname, add the new locale at the beginning
        const newPathname = `${newLocalePath}${pathname.replace(/^\//, "")}`;
        router.push(newPathname);
      }
    },
    [locale, pathname, router]
  );

  return { changeLanguage };
};
