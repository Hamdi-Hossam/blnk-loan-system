interface LoanFundsServiceResponse {
  success: boolean;
  message?: string;
}

interface Loan {
  loan_fund_id: number;
  requested_amount: number;
  requested_duration: number;
}

export const loanFundsCustomerService = async (
  token: string | undefined,
  loan: Loan,
  t: (key: string) => string
): Promise<LoanFundsServiceResponse | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}request-loan/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        loan_fund_id: loan.loan_fund_id,
        requested_amount: loan.requested_amount,
        requested_duration: loan.requested_duration,
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
