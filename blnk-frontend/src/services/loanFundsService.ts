interface LoanFundsServiceResponse {
  success: boolean;
  message?: string;
}

interface Investment {
  loan_fund_id: number;
  fund_amount: number;
}

export const loanFundsService = async (
  token: string | undefined,
  investment: Investment,
  t: (key: string) => string
): Promise<LoanFundsServiceResponse | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}loan-provider/fund-loan/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loan_fund_id: investment.loan_fund_id,
        fund_amount: investment.fund_amount,
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
