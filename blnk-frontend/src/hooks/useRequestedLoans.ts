import { useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { debounce } from "lodash";
import { toast } from "sonner";
import { loanFundsService } from "@/services/loanFundsService";
import { useTranslations } from "next-intl";

interface RequestedLoans {
  id: number;
  loan_fund: string;
  min_amount: number;
  max_amount: number;
  interest_rate: number;
  min_duration: number;
  max_duration: number;
  requested_amount: number;
  requested_duration: number;
  monthly_income: number;
}

const useRequestedLoans = () => {
  const t = useTranslations("LoanFunds");
  const [requestedLoans, setRequestedLoans] = useState<RequestedLoans[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = Cookies.get("access_token");
  const [isUpdated, setIsUpdated] = useState(false);

  const fetchLoanFunds = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}retrieve-requested-loans/`,
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

      // Normalize the data structure based on the dynamic key mapping
      const normalizedData: RequestedLoans[] = data.map((item: any) => ({
        id: item.id,
        loan_fund: item.loan_fund,
        min_amount: parseFloat(item.min_amount),
        max_amount: parseFloat(item.max_amount),
        interest_rate: item.interest_rate,
        min_duration: item.min_duration,
        max_duration: item.max_duration,
        requested_amount: parseFloat(item.requested_amount),
        requested_duration: item.requested_duration,
        status: item.status,
        monthly_income: item.monthly_income,
        is_params_defined: item.is_params_defined,
      }));

      setRequestedLoans(normalizedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoanFunds();
  }, [fetchLoanFunds, isUpdated]);

  interface Action {
    loan_id: number;
    action: string;
  }

  const StatusAction = async (action: Action): Promise<void | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bank-personnel/status-action-loan/${action.loan_id}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: action.action,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      toast.error("An error occurred while updating status");
    }
    setIsUpdated(!isUpdated);
    toast.success("Status updated successfully");
  };

  interface EditLoan {
    loan_id?: number;
    min_amount: number;
    max_amount: number;
    interest_rate: number;
    min_duration: number;
    max_duration: number;
  }

  const EditLoan = async (editLoan: EditLoan): Promise<void | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}define-loan-details/${editLoan.loan_id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          min_amount: parseInt(editLoan.min_amount.toString()),
          max_amount: parseInt(editLoan.max_amount.toString()),
          interest_rate: parseInt(editLoan.interest_rate.toString()),
          min_duration: parseInt(editLoan.min_duration.toString()),
          max_duration: parseInt(editLoan.max_duration.toString()),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      toast.error("An error occurred while updating status");
    }
    setIsUpdated(!isUpdated);
    toast.success("Loan updated successfully");
  };

  return {
    requestedLoans,
    loading,
    error,
    refetch: fetchLoanFunds,
    StatusAction,
    EditLoan,
  };
};

export default useRequestedLoans;
