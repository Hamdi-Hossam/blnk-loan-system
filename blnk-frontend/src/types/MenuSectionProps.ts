import { MenuItem } from "./MenuItem";

export interface MenuSectionProps {
  items: MenuItem[];
  isCollapsed: boolean;
  font: { className: string };
}
