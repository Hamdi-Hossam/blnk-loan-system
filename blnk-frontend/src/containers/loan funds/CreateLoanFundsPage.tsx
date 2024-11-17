"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFont } from "@/hooks/useFont";
import { useTranslations } from "next-intl";
import LoanFundsTable from "@/components/loan funds/LoanFundsTable";
import useLoanFundsCreate from "@/hooks/useLoanFundsCreate";
import { LoanFundsTableSkeleton } from "@/components/loan funds/LoanFundsTableSkeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateLoanFundsPage = () => {
  const { onSubmit, setLoanFund, loanFund } = useLoanFundsCreate();
  const font = useFont();
  const t = useTranslations("CreateLoanFunds");

  const durations: any = [
    { id: 1, value: "1 year" },
    { id: 2, value: "2 years" },
    { id: 3, value: "3 years" },
    { id: 4, value: "4 years" },
    { id: 5, value: "5 years" },
    { id: 6, value: "6 years" },
    { id: 7, value: "7 years" },
  ];

  return (
    <section className="flex flex-col justify-start all-banks">
      <div className="flex justify-between items-center all-banks-header">
        <h1 className={`${font.className}`}>{t("title")}</h1>
      </div>

      <Input
        type="text"
        value={loanFund.loan_type}
        onChange={(e) =>
          setLoanFund({ ...loanFund, loan_type: e.target.value })
        }
        placeholder={t("loanTypePlaceholder")}
        className="bg-input mb-4 placeholder:text-primary"
      />
      <Input
        type="number"
        value={loanFund.min_amount || ""}
        onChange={(e) =>
          setLoanFund({ ...loanFund, min_amount: Number(e.target.value) })
        }
        min={0}
        placeholder={t("minAmountPlaceholder")}
        className="bg-input mb-4 placeholder:text-primary"
      />
      <Input
        type="number"
        value={loanFund.max_amount || ""}
        onChange={(e) =>
          setLoanFund({ ...loanFund, max_amount: Number(e.target.value) })
        }
        min={0}
        placeholder={t("maxAmountPlaceholder")}
        className="bg-input mb-4 placeholder:text-primary"
      />
      <Input
        type="number"
        value={loanFund.interest_rate || ""}
        onChange={(e) =>
          setLoanFund({ ...loanFund, interest_rate: Number(e.target.value) })
        }
        placeholder={t("interestRatePlaceholder")}
        className="bg-input mb-4 placeholder:text-primary"
        min={0}
      />
      <Select
        value={loanFund.min_duration ? loanFund.min_duration.toString() : ""}
        onValueChange={(value) =>
          setLoanFund({ ...loanFund, min_duration: Number(value) })
        }
      >
        <SelectTrigger className="bg-input mb-4">
          <SelectValue placeholder={t("selectMinDuration")} />
        </SelectTrigger>
        <SelectContent>
          {durations.map((duration: any) => (
            <SelectItem key={duration.id} value={duration.id.toString()}>
              {duration.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={loanFund.max_duration ? loanFund.max_duration.toString() : ""}
        onValueChange={(value) =>
          setLoanFund({ ...loanFund, max_duration: Number(value) })
        }
      >
        <SelectTrigger className="bg-input mb-4">
          <SelectValue placeholder={t("selectMaxDuration")} />
        </SelectTrigger>
        <SelectContent>
          {durations.map((duration: any) => (
            <SelectItem key={duration.id} value={duration.id.toString()}>
              {duration.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-end">
        <Button onClick={onSubmit} className="w-full">
          {t("addBtn")}
        </Button>
      </div>
    </section>
  );
};

export default React.memo(CreateLoanFundsPage);
