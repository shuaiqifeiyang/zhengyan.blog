import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function MyPagination({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  goToPage,
}: {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
}) {
  if (totalPages === 1) {
    return null; // No pages to display
  }
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage !== 1 && (
              <PaginationPrevious onClick={goToPreviousPage} />
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                //href="#"
                isActive={currentPage === idx + 1}
                onClick={() => goToPage(idx + 1)}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage !== totalPages && (
              <PaginationNext onClick={goToNextPage} />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* <p>
        Page {currentPage} of {totalPages}
      </p> */}
    </div>
  );
}
