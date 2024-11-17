"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFont } from "@/hooks/useFont";
import { useTranslations } from "next-intl";
import LoanFundsTable from "@/components/loan funds customer/LoanFundsTable";
import useLoanFundsCustomer from "@/hooks/useLoanFundsCustomer";
import { LoanFundsTableSkeleton } from "@/components/loan funds/LoanFundsTableSkeleton";

const LoanFundsPage = () => {
  const {
    loanFunds,
    loading,
    error,
    refetch,
    calculateAmortization,
    onSubmit,
    amortizationSchedule,
  } = useLoanFundsCustomer();
  const font = useFont();
  const t = useTranslations("LoanFunds");

  if (loading) {
    return (
      <section className="flex flex-col justify-start all-banks">
        <LoanFundsTableSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-start all-banks">
      <div className="flex justify-between items-center all-banks-header">
        <h1 className={`${font.className}`}>{t("title")}</h1>
      </div>

      <LoanFundsTable
        loanFunds={loanFunds}
        t={t}
        calculateAmortization={calculateAmortization}
        onSubmit={onSubmit}
        amortizationSchedule={amortizationSchedule}
      />
    </section>
  );
};

export default React.memo(LoanFundsPage);
