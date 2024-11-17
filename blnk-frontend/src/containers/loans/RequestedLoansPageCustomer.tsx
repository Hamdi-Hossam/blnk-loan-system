"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFont } from "@/hooks/useFont";
import { useTranslations } from "next-intl";
import RequestedLoansTable from "@/components/loans/requested loans customer/RequestedLoansTable";
import { RequestedLoansTableSkeleton } from "@/components/loans/requested loans customer/RequestedLoansTableSkeleton";
import useRequestedLoansCustomer from "@/hooks/useRequestedLoansCustomer";

const RequestedLoansPageCustomer = () => {
  const { requestedLoans, loading, error, refetch, EditLoan } =
    useRequestedLoansCustomer();
  const font = useFont();
  const t = useTranslations("RequestedLoans");

  if (loading) {
    return (
      <section className="flex flex-col justify-start all-banks">
        <RequestedLoansTableSkeleton />
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

      <RequestedLoansTable
        requestedLoans={requestedLoans}
        t={t}
        EditLoan={EditLoan}
      />
    </section>
  );
};

export default React.memo(RequestedLoansPageCustomer);
