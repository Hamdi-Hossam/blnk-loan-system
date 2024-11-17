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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface RequestedLoans {
  id: number;
  loan_fund: string;
  min_amount: number;
  max_amount: number;
  interest_rate: number;
  min_duration: number;
  max_duration: number;
  requested_amount: number;
  requested_duration: number;
  monthly_income: number;
  status: string;
  is_params_defined: boolean;
}

interface EditLoan {
  loan_id: number;
  requested_amount: number;
  requested_duration: number;
}

interface RequestedLoansTableProps {
  requestedLoans: RequestedLoans[];
  t: (key: string) => string;
  EditLoan: (loan: EditLoan) => void;
}

const RequestedLoansTable: React.FC<RequestedLoansTableProps> = ({
  requestedLoans,
  t,
  EditLoan,
}) => {
  const [fundsAmount, setFundsAmount] = useState<number>(0);
  const [fundsDuration, setFundsDuration] = useState<number>(0);
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
    <>
      {requestedLoans.length === 0 ? (
        <div className="flex items-center mt-6 text-gray-500 dark:text-gray-200">
          <Plus size={20} />
          <p>{t("noRequestedLoans")}</p>
        </div>
      ) : (
        <div className="overflow-y-scroll h-[80vh]">
          <Table>
            <TableHeader>
              <TableRow>
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
                  {t("reqAmount")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("reqDuration")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("monthlyIncome")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("status")}
                </TableHead>
                <TableHead className={`rtl:text-right`}>
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestedLoans.map((requestedLoan) => (
                <TableRow key={requestedLoan.id}>
                  <TableCell>{requestedLoan.loan_fund}</TableCell>
                  <TableCell>{requestedLoan.max_amount}</TableCell>
                  <TableCell>{requestedLoan.min_amount}</TableCell>
                  <TableCell>{requestedLoan.interest_rate}</TableCell>
                  <TableCell>{requestedLoan.min_duration}</TableCell>
                  <TableCell>{requestedLoan.max_duration}</TableCell>
                  <TableCell>{requestedLoan.requested_amount}</TableCell>
                  <TableCell>{requestedLoan.requested_duration}</TableCell>
                  <TableCell>{requestedLoan.monthly_income}</TableCell>
                  <TableCell>{requestedLoan.status}</TableCell>
                  <TableCell>
                    {/* Hold Button */}
                    {requestedLoan.is_params_defined === true ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            aria-label={`Hold`}
                            onClick={() => {
                              setFundsAmount(requestedLoan.requested_amount);
                              setFundsDuration(
                                requestedLoan.requested_duration
                              );
                            }}
                          >
                            {t("editBtn")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t("editTitle")}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            <Input
                              type="number"
                              defaultValue={requestedLoan.requested_amount}
                              onChange={(e) => {
                                setFundsAmount(Number(e.target.value));
                              }}
                              placeholder={t("reqAmount")}
                              className="bg-input mb-4 placeholder:text-primary"
                            />
                            <Select
                              onValueChange={(value) => {
                                setFundsDuration(Number(value));
                              }}
                              defaultValue={requestedLoan.requested_duration.toString()}
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
                            <Button
                              onClick={() => {
                                EditLoan({
                                  loan_id: requestedLoan.id,
                                  requested_amount: fundsAmount,
                                  requested_duration: fundsDuration,
                                });
                              }}
                            >
                              {t("confirm")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <></>
                    )}
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

export default RequestedLoansTable;
