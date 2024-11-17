import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslations } from "next-intl";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationComponentProps) => {
  const pageRange = 3;
  const t = useTranslations("Pagination");
  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  const pagesToShow = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="flex justify-center mt-4 space-y-2 items-center flex-col">
      <Pagination>
        <PaginationContent>
          {/* زر السابق */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                if (currentPage === 1) {
                  e.preventDefault();
                  return;
                }
                handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* أرقام الصفحات */}
          {pagesToShow.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (currentPage === totalPages) {
                  e.preventDefault();
                  return;
                }
                handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="mb-4 font-bold  ms-10 ">
        {t("page")}
        <span className="text-secondary "> {currentPage}</span> {t("of")}{" "}
        {totalPages}
      </div>
    </div>
  );
};

export default PaginationComponent;
