import { useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
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
  status: string;
  is_params_defined: boolean;
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
        `${process.env.NEXT_PUBLIC_API_URL}customer-loans/`,
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
        min_amount: item.min_amount,
        max_amount: item.max_amount,
        min_duration: item.min_duration,
        max_duration: item.max_duration,
        requested_amount: item.requested_amount,
        requested_duration: item.requested_duration,
        status: item.status,
        interest_rate: item.interest_rate,
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

  interface EditLoan {
    loan_id: number;
    requested_amount: number;
    requested_duration: number;
  }

  const EditLoan = async (loan: EditLoan): Promise<void | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}edit-loan/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loan_id: loan.loan_id,
          requested_amount: parseInt(loan.requested_amount.toString()),
          requested_duration: parseInt(loan.requested_duration.toString()),
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

  return {
    requestedLoans,
    loading,
    error,
    refetch: fetchLoanFunds,
    EditLoan,
  };
};

export default useRequestedLoans;
