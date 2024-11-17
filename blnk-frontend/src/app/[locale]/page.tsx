"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useLocale } from "next-intl";

const Page = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!user.isLoggedIn) {
      router.push(`${locale}/auth/login`);
    } else {
      router.push(`${locale}/home`);
    }
  }, [user.isLoggedIn, router, locale]);

  // No content to display
  return null;
};

export default Page;
