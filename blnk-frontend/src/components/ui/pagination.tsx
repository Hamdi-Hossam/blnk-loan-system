import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations("Pagination");
  return (
    <PaginationLink
      aria-label={t("previous")}
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
      <span>{t("previous")}</span>
    </PaginationLink>
  );
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations("Pagination");
  return (
    <PaginationLink
      aria-label={t("next")}
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>{t("next")}</span>
      <ChevronRight className="h-4 w-4 rtl:rotate-180" />
    </PaginationLink>
  );
};
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

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
      <div className="mb-4 font-bold ms-10">
        {t("page")} <span className="text-secondary"> {currentPage}</span>{" "}
        {t("of")} {totalPages}
      </div>
    </div>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
export default PaginationComponent;
