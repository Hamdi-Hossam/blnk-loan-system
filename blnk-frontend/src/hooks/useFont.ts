import { Almarai, Montserrat } from "next/font/google";
import { useLocale } from "next-intl";

const montserrat = Montserrat({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

const almarai = Almarai({
  weight: "800",
  subsets: ["arabic"],
  display: "swap",
});

export const useFont = () => {
  const locale = useLocale();
  return locale === "ar" ? almarai : montserrat;
};
