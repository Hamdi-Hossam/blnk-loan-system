"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFont } from "@/hooks/useFont";
import { useTranslations } from "next-intl";
import EditedLoansTable from "@/components/loans/edited loans/EditedLoansTable";
import { EditedLoansTableSkeleton } from "@/components/loans/edited loans/EditedLoansTableSkeleton";
import useEditedLoans from "@/hooks/useEditedLoans";

const EditedLoansPage = () => {
  const {
    loanFunds,
    toggleSortOrder,
    sortOrder,
    loading,
    error,
    refetch,
    onSubmit,
  } = useEditedLoans();
  const font = useFont();
  const t = useTranslations("LoanFunds");

  if (loading) {
    return (
      <section className="flex flex-col justify-start all-banks">
        <EditedLoansTableSkeleton />
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

      <EditedLoansTable
        loanFunds={loanFunds}
        toggleSortOrder={toggleSortOrder}
        sortOrder={sortOrder}
        t={t}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default React.memo(EditedLoansPage);
