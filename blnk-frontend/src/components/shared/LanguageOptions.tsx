import { useTranslations } from "next-intl";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LanguageOption } from "@/types/LanguageOption";

interface LanguageOptionsProps {
  options: LanguageOption[];
  onSelect: (code: string) => void;
}

export const LanguageOptions: React.FC<LanguageOptionsProps> = ({
  options,
  onSelect,
}) => {
  const t = useTranslations("LanguageSwitcher");

  return (
    <DropdownMenuContent>
      {options.map((option) => (
        <DropdownMenuItem
          key={option.code}
          onClick={() => onSelect(option.code)}
        >
          {t(option.label)}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
