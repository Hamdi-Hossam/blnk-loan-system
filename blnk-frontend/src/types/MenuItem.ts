import { LucideIcon } from "lucide-react";

export interface MenuItem {
  href: string;
  icon: React.ReactElement<LucideIcon>;
  label: string;
}
