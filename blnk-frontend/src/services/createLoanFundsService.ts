interface LoanFundsServiceResponse {
  success: boolean;
  message?: string;
}

interface loanFund {
  loan_type: string;
  min_amount: number;
  max_amount: number;
  interest_rate: number;
  min_duration: number;
  max_duration: number;
}

export const createLoanFundsService = async (
  token: string | undefined,
  loanFund: loanFund,
  t: (key: string) => string
): Promise<LoanFundsServiceResponse | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}bank-personnel/create-loan-fund/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loan_type: loanFund.loan_type,
        min_amount: loanFund.min_amount,
        max_amount: loanFund.max_amount,
        interest_rate: loanFund.interest_rate,
        min_duration: loanFund.min_duration,
        max_duration: loanFund.max_duration,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData);
    return { success: false, message: t("investmentError") };
  }

  return { success: true, message: t("investmentSuccess") };
};
