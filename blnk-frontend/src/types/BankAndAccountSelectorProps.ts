export interface BankAndAccountSelectorProps {
  bank: number | null | undefined;
  setBank: (value: number | null) => void;
  subAccount: number | null | undefined;
  setSubAccount: (value: number | null) => void;
}
