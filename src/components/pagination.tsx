import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationUI
} from "@/components/ui/pagination"

interface PaginationProps {
  handlePaginate: (pageIndex: number) => void
  pageIndex: number,
}
export function Pagination({ handlePaginate, pageIndex }: PaginationProps) {
  return (
    <PaginationUI>
      <PaginationContent className="flex justify-between w-full">
        <PaginationItem>
          <button onClick={() => handlePaginate(pageIndex - 1)} disabled={pageIndex === 1}>
            <PaginationPrevious />
          </button>
        </PaginationItem>
        {/* <PaginationItem> */}
        {/*   <PaginationLink onClick={() => handlePaginate(pageIndex++)}>1</PaginationLink> */}
        {/* </PaginationItem> */}
        {/* <PaginationItem> */}
        {/*   <PaginationEllipsis /> */}
        {/* </PaginationItem> */}
        <PaginationItem>
          <PaginationNext onClick={() => handlePaginate(pageIndex + 1)} />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  )
}
