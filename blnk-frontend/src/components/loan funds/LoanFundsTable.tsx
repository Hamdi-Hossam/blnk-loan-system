import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LoanFunds {
  id: number;
  loan_type: string;
  min_amount: number;
  max_amount: number;
  interest_rate: number;
  min_duration: number;
  max_duration: number;
  bank: string;
}

interface Investment {
  loan_fund_id: number;
  fund_amount: number;
}

interface LoanFundsTableProps {
  loanFunds: LoanFunds[];
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  t: (key: string) => string;
  onSubmit: (investment: Investment) => void;
}

const LoanFundsTable: React.FC<LoanFundsTableProps> = ({
  loanFunds,
  toggleSortOrder,
  sortOrder,
  t,
  onSubmit,
}) => {
  const [fundsAmount, setFundsAmount] = useState<number>(0);

  return (
    <>
      {loanFunds.length === 0 ? (
        <div className="flex items-center mt-6 text-gray-500 dark:text-gray-200">
          <Plus size={20} />
          <p>{t("noBanks")}</p>
        </div>
      ) : (
        <div className="overflow-y-scroll h-[80vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={`flex items-center gap-4 rtl:text-right`}>
                  {t("bankName")}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSortOrder}
                    aria-label="Sort banks"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </Button>
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("loanType")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("minAmount")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("maxAmount")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("interestRate")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("minDuration")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("maxDuration")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanFunds.map((loanFund) => (
                <TableRow key={loanFund.id}>
                  <TableCell>{loanFund.bank}</TableCell>
                  <TableCell>{loanFund.loan_type}</TableCell>
                  <TableCell>{loanFund.min_amount}</TableCell>
                  <TableCell>{loanFund.max_amount}</TableCell>
                  <TableCell>{loanFund.interest_rate}</TableCell>
                  <TableCell>{loanFund.min_duration}</TableCell>
                  <TableCell>{loanFund.max_duration}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          aria-label={`Invest in ${loanFund.bank}`}
                        >
                          {t("investBtn")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("investAmountTitle")}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          {" "}
                          <Input
                            type="number"
                            onChange={(e) => {
                              setFundsAmount(Number(e.target.value));
                            }}
                            placeholder={t("amountPlaceholder")}
                            className="bg-input mb-4 placeholder:text-primary"
                          />
                        </DialogDescription>
                        <DialogFooter>
                          <Button
                            onClick={() => {
                              onSubmit({
                                loan_fund_id: loanFund.id,
                                fund_amount: fundsAmount,
                              });
                            }}
                          >
                            {t("confirmInvestBtn")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default LoanFundsTable;
