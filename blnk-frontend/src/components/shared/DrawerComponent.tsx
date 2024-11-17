import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  CircleX,
  Database,
  GitCompareArrows,
  Home,
  LogOut,
  Menu,
  Upload,
} from "lucide-react";
import { useLogoSrc } from "@/hooks/useLogoSrc";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLogout } from "@/hooks/useLogout";
import { useTranslations } from "next-intl";

export const DrawerComponent: React.FC = () => {
  const logoSrc = useLogoSrc();
  const { logout } = useLogout();
  const t = useTranslations("Drawer");
  const t2 = useTranslations("Logout");

  return (
    <div className="block md:hidden header-drawer">
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Menu className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col justify-between items-center">
          <DrawerHeader>
            <DrawerTitle>
              <Image
                src={logoSrc}
                alt="Company Logo"
                width={150}
                height={150}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8OpmhHgAGFgIJ8jekLwAAAABJRU5ErkJggg=="
                className="object-contain"
              />
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {t("drawer-description")}
            </DrawerDescription>
          </DrawerHeader>
          <div className="drawer-links">
            <nav className="flex flex-col gap-4">
              <Link
                href="/home/loan-funds/all"
                className="flex items-center gap-2"
              >
                <Home size={20} />
                {t("allBanks")}
              </Link>
              <Link
                href="/home/loan-funds/header-upload"
                className="flex items-center gap-2"
              >
                <Upload size={20} />
                {t("headerUpload")}
              </Link>
              <Link
                href="/home/loan-funds/mapping"
                className="flex items-center gap-2"
              >
                <GitCompareArrows size={20} />
                {t("bankDataUpload")}
              </Link>
              <Link
                href="/home/data/data-upload"
                className="flex items-center gap-2"
              >
                <Upload size={20} />
                {t("dataUpload")}
              </Link>
              <Link href="/home/data/coded" className="flex items-center gap-2">
                <Database size={20} />
                {t("codedData")}
              </Link>
              <Link
                href="/home/data/uncoded"
                className="flex items-center gap-2"
              >
                <Database size={20} />
                {t("uncodedData")}
              </Link>
            </nav>
          </div>
          <DrawerFooter className="w-full">
            <Button
              onClick={logout}
              className="flex items-center gap-2 w-full"
              aria-label="Logout"
            >
              <LogOut size={20} /> {t2("logoutBtn")}
            </Button>
            <DrawerClose>
              <Button
                variant="destructive"
                className="flex items-center gap-2 w-full"
                aria-label="Close menu"
              >
                <CircleX size={20} />
                {t("closeMenu")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
