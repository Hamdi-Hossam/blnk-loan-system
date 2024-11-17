import Cookies from "js-cookie";
import { debounce } from "lodash";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { createLoanFundsService } from "@/services/createLoanFundsService";
import { useState } from "react";

interface LoanFund {
  loan_type: string;
  min_amount: number;
  max_amount: number;
  interest_rate: number;
  min_duration: number;
  max_duration: number;
}

const useLoanFundsCreate = () => {
  const t = useTranslations("LoanFunds");
  const initialLoanFund = {
    loan_type: "",
    min_amount: 0,
    max_amount: 0,
    interest_rate: 0,
    min_duration: 0,
    max_duration: 0,
  };
  const [loanFund, setLoanFund] = useState<LoanFund>(initialLoanFund);

  const resetLoanFund = () => setLoanFund(initialLoanFund);

  const onSubmit = debounce(async () => {
    const token = Cookies.get("access_token");

    if (!token) {
      console.error("Access token not found in cookies");
      return;
    }

    try {
      const result = await createLoanFundsService(token, loanFund, t);
      if (result?.success && result?.message) {
        toast.success(result?.message);
        resetLoanFund();
      } else {
        toast.error(result?.message);
      }
    } catch (error: unknown) {
      toast.error(
        `${t("unexpectedError")}: ${
          error instanceof Error ? error.message : ""
        }`
      );
    }
  }, 300);

  return {
    onSubmit,
    setLoanFund,
    loanFund,
  };
};

export default useLoanFundsCreate;
