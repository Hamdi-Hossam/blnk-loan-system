import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const EditedLoansTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          <Skeleton className="w-[100px] h-4" />
        </TableHead>
        <TableHead>
          <Skeleton className="w-[100px] h-4" />
        </TableHead>
        <TableHead>
          <Skeleton className="w-[100px] h-4" />
        </TableHead>
        <TableHead>
          <Skeleton className="w-[100px] h-4" />
        </TableHead>
        <TableHead>
          <Skeleton className="w-[50px] h-4" />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="w-[150px] h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[100px] h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[100px] h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[80px] h-8" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
