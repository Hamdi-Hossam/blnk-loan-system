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
}

interface Action {
  loan_id: number;
  action: string;
}

interface EditLoan {
  loan_id: number;
  min_amount: number;
  max_amount: number;
  interest_rate: number;
  min_duration: number;
  max_duration: number;
}

interface RequestedLoansTableProps {
  requestedLoans: RequestedLoans[];
  t: (key: string) => string;
  StatusAction: (action: Action) => void;
  EditLoan: (loan: EditLoan) => void;
}

const RequestedLoansTable: React.FC<RequestedLoansTableProps> = ({
  requestedLoans,
  t,
  StatusAction,
  EditLoan,
}) => {
  const [editedLoan, setEditedLoan] = useState<any | null>(null);
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
                  <TableCell>
                    <div className="flex space-x-2">
                      {/* Approve Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="default" aria-label={`Approve`}>
                            {t("approveBtn")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t("approveTitle")}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            <p>{t("approveDescription")}</p>
                          </DialogDescription>
                          <DialogFooter>
                            <Button
                              variant="default"
                              onClick={() => {
                                StatusAction({
                                  loan_id: requestedLoan.id,
                                  action: "approve",
                                });
                              }}
                            >
                              {t("confirm")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Decline Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" aria-label={`Decline`}>
                            {t("rejectBtn")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t("rejectTitle")}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            <p>{t("rejectDescription")}</p>
                          </DialogDescription>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                StatusAction({
                                  loan_id: requestedLoan.id,
                                  action: "decline",
                                });
                              }}
                            >
                              {t("confirm")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Hold Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            aria-label={`Hold`}
                            onClick={() => {
                              setEditedLoan({
                                id: requestedLoan.id,
                                max_amount: requestedLoan.max_amount,
                                min_amount: requestedLoan.min_amount,
                                interest_rate: requestedLoan.interest_rate,
                                min_duration: requestedLoan.min_duration,
                                max_duration: requestedLoan.max_duration,
                              });
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
                              defaultValue={requestedLoan.min_amount}
                              onChange={(e) => {
                                setEditedLoan({
                                  ...editedLoan,
                                  min_amount: Number(e.target.value),
                                });
                              }}
                              placeholder={t("minAmount")}
                              className="bg-input mb-4 placeholder:text-primary"
                            />
                            <Input
                              type="number"
                              defaultValue={requestedLoan.max_amount}
                              onChange={(e) => {
                                setEditedLoan({
                                  ...editedLoan,
                                  max_amount: Number(e.target.value),
                                });
                              }}
                              placeholder={t("maxAmount")}
                              className="bg-input mb-4 placeholder:text-primary"
                            />
                            <Input
                              type="number"
                              defaultValue={requestedLoan.interest_rate}
                              onChange={(e) => {
                                setEditedLoan({
                                  ...editedLoan,
                                  interest_rate: Number(e.target.value),
                                });
                              }}
                              placeholder={t("interestRate")}
                              className="bg-input mb-4 placeholder:text-primary"
                            />
                            <Select
                              onValueChange={(value) => {
                                setEditedLoan({
                                  ...editedLoan,
                                  min_duration: value,
                                });
                              }}
                              defaultValue={requestedLoan.min_duration.toString()}
                            >
                              <SelectTrigger className="bg-input mb-4">
                                <SelectValue placeholder={t("minDuration")} />
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
                            <Select
                              onValueChange={(value) => {
                                setEditedLoan({
                                  ...editedLoan,
                                  max_duration: value,
                                });
                              }}
                              defaultValue={requestedLoan.max_duration.toString()}
                            >
                              <SelectTrigger className="bg-input mb-4">
                                <SelectValue placeholder={t("maxDuration")} />
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
                                  min_amount: editedLoan.min_amount,
                                  max_amount: editedLoan.max_amount,
                                  interest_rate: editedLoan.interest_rate,
                                  min_duration: editedLoan.min_duration,
                                  max_duration: editedLoan.max_duration,
                                });
                              }}
                            >
                              {t("confirm")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
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
