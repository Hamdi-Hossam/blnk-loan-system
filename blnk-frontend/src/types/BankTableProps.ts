export interface BankTableProps {
  banks: string[];
  onRemoveBank: (bank: string) => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  t: (key: string) => string;
  fontClassName: string;
}
