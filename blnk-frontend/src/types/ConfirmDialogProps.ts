export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  textInButtonLeft: string;
  textInButtonRight: string;
  icon: React.ReactNode;
  bgButtonRight: string;
  hoverButtonRight: string;
  onClose: () => void;
  onConfirm: () => void;
}
