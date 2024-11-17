import { Roboto, Almarai } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { StoreProvider } from "@/providers/StoreProvider";
import "../globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const almarai = Almarai({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";
  const font = locale === "ar" ? almarai : roboto;

  return (
    <html lang={locale} dir={dir}>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <StoreProvider>{children}</StoreProvider>
            <Toaster position="top-center" richColors />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
