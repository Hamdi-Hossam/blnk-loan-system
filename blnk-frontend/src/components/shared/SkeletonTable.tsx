import { Skeleton } from "../ui/skeleton";

interface SkeletonTableProps {
  arrOfRows: number[]; // Assuming arrOfRows is an array of numbers
}

const SkeletonTable = ({ arrOfRows }: SkeletonTableProps) => (
  <table className="w-full">
    <thead className="bg-transparent">
      <tr>
        {arrOfRows.map((num) => (
          <div key={num}>
            <Skeleton className="h-14 my-2 rounded-xl" />
          </div>
        ))}
      </tr>
    </thead>
  </table>
);
export default SkeletonTable;
