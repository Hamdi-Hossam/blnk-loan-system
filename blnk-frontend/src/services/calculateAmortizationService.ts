interface LoanFundsServiceResponse {
  success: boolean;
  data?: any;
  message?: string;
}

interface Amortization {
  interest_rate: number;
  requested_amount: number;
  requested_duration: number;
}

export const calculateAmortizationService = async (
  token: string | undefined,
  amortization: Amortization,
  t: (key: string) => string
): Promise<LoanFundsServiceResponse | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}calculate/amortization/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        interest_rate: amortization.interest_rate,
        requested_amount: amortization.requested_amount,
        requested_duration: amortization.requested_duration,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData);
    return { success: false, message: t("investmentError") };
  }
  const data = await response.json();

  return { success: true, data: data, message: t("investmentSuccess") };
};
