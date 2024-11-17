import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="flex flex-col justify-center items-center bg-background p-4 min-h-screen text-foreground not-found">
      <div className="mb-8 text-primary">
        <AlertCircle size={64} />
      </div>
      <h1 className="mb-4 font-bold text-4xl text-center">{t("title")}</h1>
      <p className="mb-8 max-w-md text-center text-xl">{t("description")}</p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg text-primary-foreground"
        title={t("homeBtn")}
        aria-label={t("homeBtn")}
      >
        {t("homeBtn")}
      </Link>
    </section>
  );
}
