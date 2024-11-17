export interface AddBankDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (bankName: string) => void;
}
