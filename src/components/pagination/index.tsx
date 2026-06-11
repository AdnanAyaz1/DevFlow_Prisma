"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const PaginationComponent = ({ noOfPages }: { noOfPages: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current page from URL, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // Function to navigate to a specific page
  const handlePageChange = (page: number) => {
    if (page < 1 || page > noOfPages) return; // Prevent invalid navigation
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Determine pagination range
  const pageGroupSize = 10; // Show 10 pages per row

  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  // For example, if currentPage = 13:
  // (13 - 1) / 10 = 12 / 10 = 1.2 => Math.floor(1.2) = 1
  // So currentGroup = 1

  const startPage = currentGroup * pageGroupSize + 1;
  // startPage = 1 * 10 + 1 = 11

  const endPage = Math.min(startPage + pageGroupSize - 1, noOfPages);
  // endPage = Math.min(11 + 10 - 1, noOfPages)
  // => Math.min(20, noOfPages)
  // If noOfPages = 23, endPage = 20
  // If noOfPages = 18, endPage = 18

  // Create page numbers for the current row
  const pagesArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  // pagesArray = array from startPage to endPage inclusive
  // If startPage = 11 and endPage = 20
  // => length = 20 - 11 + 1 = 10
  // => pagesArray = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  return (
    <Pagination className="mt-4 flex justify-center">
      <PaginationContent className="flex gap-2">
        {/* Always show First Page when beyond page 10 */}
        {startPage > 10 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pagesArray.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer ${currentPage === noOfPages ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>

        {/* Always show Last Page link until reaching last group */}
        {endPage < noOfPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(noOfPages)}
              className="cursor-pointer"
            >
              {noOfPages}
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
