import { useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { debounce } from "lodash";
import { toast } from "sonner";
import { loanFundsService } from "@/services/loanFundsService";
import { useTranslations } from "next-intl";

interface LoanFund {
  id: number;
  loan_type: string;
  min_amount: number;
  max_amount: number;
  interest_rate: number;
  min_duration: number;
  max_duration: number;
  bank: string;
}

interface Investment {
  loan_fund_id: number;
  fund_amount: number;
}

const useEditedLoans = () => {
  const t = useTranslations("LoanFunds");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loanFunds, setLoanFunds] = useState<LoanFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoanFunds = useCallback(async () => {
    setLoading(true);
    setError(null);
    const accessToken = Cookies.get("access_token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}loan-funds/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch loan funds");
      }

      const data = await response.json();

      // Dynamically determine the key mapping
      const keyMapping = data.length > 0 ? Object.keys(data[0]) : [];
      const [
        idKey,
        loanTypeKey,
        minAmountKey,
        maxAmountKey,
        interestRateKey,
        minDurationKey,
        maxDurationKey,
        bankKey,
      ] = keyMapping;

      // Normalize the data structure based on the dynamic key mapping
      const normalizedData: LoanFund[] = data.map((item: any) => ({
        id: item[idKey],
        loan_type: item[loanTypeKey],
        min_amount: item[minAmountKey],
        max_amount: item[maxAmountKey],
        interest_rate: item[interestRateKey],
        min_duration: item[minDurationKey],
        max_duration: item[maxDurationKey],
        bank: item[bankKey],
      }));

      setLoanFunds(normalizedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = debounce(async (investment: Investment) => {
    const token = Cookies.get("access_token");

    if (!token) {
      console.error("Access token not found in cookies");
      return;
    }

    try {
      const result = await loanFundsService(token, investment, t);
      if (result?.success && result?.message) {
        toast.success(result?.message);
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

  useEffect(() => {
    fetchLoanFunds();
  }, [fetchLoanFunds]);

  const sortedLoanFunds = useCallback(() => {
    return [...loanFunds].sort((a, b) => {
      return sortOrder === "asc"
        ? a.bank.localeCompare(b.bank)
        : b.bank.localeCompare(a.bank);
    });
  }, [loanFunds, sortOrder]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }, []);

  return {
    loanFunds: sortedLoanFunds(),
    toggleSortOrder,
    sortOrder,
    loading,
    error,
    refetch: fetchLoanFunds,
    onSubmit,
  };
};

export default useEditedLoans;
