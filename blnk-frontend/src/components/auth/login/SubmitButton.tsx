import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, label }) => {
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? <Loader2 className="mr-2 animate-spin size-4" /> : null}
      {label}
    </Button>
  );
};

export default SubmitButton;
