"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFont } from "@/hooks/useFont";
import { useTranslations } from "next-intl";
import LoanFundsTable from "@/components/loan funds/LoanFundsTable";
import useLoanFunds from "@/hooks/useLoanFunds";
import { LoanFundsTableSkeleton } from "@/components/loan funds/LoanFundsTableSkeleton";

const LoanFundsPage = () => {
  const {
    loanFunds,
    toggleSortOrder,
    sortOrder,
    loading,
    error,
    refetch,
    onSubmit,
  } = useLoanFunds();
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
        toggleSortOrder={toggleSortOrder}
        sortOrder={sortOrder}
        t={t}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default React.memo(LoanFundsPage);
