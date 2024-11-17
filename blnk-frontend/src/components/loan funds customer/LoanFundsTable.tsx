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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface loanRequest {
  loan_fund_id: number;
  requested_amount: number;
  requested_duration: number;
}

interface Amortization {
  interest_rate: number;
  requested_amount: number;
  requested_duration: number;
}

interface LoanFundsTableProps {
  loanFunds: LoanFunds[];
  t: (key: string) => string;
  calculateAmortization: (amortization: Amortization) => void;
  onSubmit: (loanRequest: loanRequest) => void;
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    interest_payment: number;
    principal_payment: number;
    remaining_balance: number;
  }>;
}

const LoanFundsTable: React.FC<LoanFundsTableProps> = ({
  loanFunds,
  t,
  calculateAmortization,
  onSubmit,
  amortizationSchedule,
}) => {
  const durations: any = [
    { id: 1, value: "1 year" },
    { id: 2, value: "2 years" },
    { id: 3, value: "3 years" },
    { id: 4, value: "4 years" },
    { id: 5, value: "5 years" },
    { id: 6, value: "6 years" },
    { id: 7, value: "7 years" },
  ];

  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [requestedDuration, setRequestedDuration] = useState<number>(0);
  const [isAmortizationDialogOpen, setIsAmortizationDialogOpen] =
    useState(false);

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
                          {t("reqBtn")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("reqLoanTitle")}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <Input
                            type="number"
                            onChange={(e) => {
                              setRequestedAmount(parseInt(e.target.value));
                            }}
                            placeholder={t("reqAmount")}
                            className="bg-input mb-4 placeholder:text-primary"
                          />
                          <Select
                            onValueChange={(value) => {
                              setRequestedDuration(parseInt(value));
                            }}
                          >
                            <SelectTrigger className="bg-input mb-4">
                              <SelectValue placeholder={t("reqDuration")} />
                            </SelectTrigger>
                            <SelectContent>
                              {durations.map((duration: any) => (
                                <SelectItem
                                  key={duration.id}
                                  value={duration.id.toString()}
                                >
                                  {duration.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </DialogDescription>
                        <DialogFooter>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => {
                                  calculateAmortization({
                                    interest_rate: loanFund.interest_rate,
                                    requested_amount: requestedAmount,
                                    requested_duration: requestedDuration,
                                  });
                                  setIsAmortizationDialogOpen(true);
                                }}
                              >
                                {t("amortizationBtn")}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[800px] h-[70vh] overflow-hidden bg-background p-6">
                              <DialogHeader>
                                <DialogTitle>Amortization Schedule</DialogTitle>
                              </DialogHeader>
                              <DialogDescription>
                                <div className="overflow-y-auto h-[60vh]">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Month</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Interest Payment</TableHead>
                                        <TableHead>Principle Payment</TableHead>
                                        <TableHead>Remaining Balance</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {amortizationSchedule.map(
                                        (schedule, index) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              {schedule.month}
                                            </TableCell>
                                            <TableCell>
                                              {schedule.payment}
                                            </TableCell>
                                            <TableCell>
                                              {schedule.interest_payment}
                                            </TableCell>
                                            <TableCell>
                                              {schedule.principal_payment}
                                            </TableCell>
                                            <TableCell>
                                              {schedule.remaining_balance}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </DialogDescription>
                              <DialogFooter>
                                <Button
                                  onClick={() =>
                                    setIsAmortizationDialogOpen(false)
                                  }
                                >
                                  {t("close")}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Button
                            onClick={() => {
                              onSubmit({
                                loan_fund_id: loanFund.id,
                                requested_amount: requestedAmount,
                                requested_duration: requestedDuration,
                              });
                            }}
                          >
                            {t("confirmRequestBtn")}
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
