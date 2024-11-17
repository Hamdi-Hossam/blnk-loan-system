import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CodedData } from "@/types/CodedData ";

interface TableComponentProps {
  data: CodedData[];
  handleSort: (column: keyof CodedData) => void;
  sortColumn: keyof CodedData | null; // Allow null as a valid type
  sortOrder: "asc" | "desc";
  cols: string[];
  headers: (keyof CodedData)[]; // Ensure headers are of type keyof CodedData
}

const TableComponent = ({
  data,
  handleSort,
  sortColumn,
  sortOrder,
  cols,
  headers,
}: TableComponentProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {cols.map((col, index) => (
            <TableHead
              key={col}
              className="rtl:text-right text-primary-foreground"
            >
              <div className="flex gap-x-1 items-center">
                <p>{col}</p>
                <Button
                  onClick={() => handleSort(headers[index])} // Use the index to reference the correct header
                  size="sm"
                  variant="ghost"
                >
                  {sortColumn === headers[index] && sortOrder === "asc"
                    ? "↑"
                    : "↓"}
                </Button>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {headers.map((header) => (
              <TableCell key={header}>
                {row[header]}{" "}
                {/* This accesses the data based on the header keys */}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
