'use client';

import { redirect, usePathname, useSearchParams } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@components/ui/pagination';
import { cn } from '@lib/utils';

import { generatePaginationNumbers } from './lib/generate-pagination-numbers';

interface PaginatorProps {
  totalPages: number;
}

export const Paginator: React.FC<PaginatorProps> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the current page from URL parameters or default to 1
  const pageFromParams = parseInt(searchParams.get('page') || '1', 10);
  // Ensure we have a valid page number, default to 1 if not
  const currentPage = isNaN(pageFromParams) ? 1 : pageFromParams;

  // Check if we're on the first or last page for navigation controls
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Redirect to the main page if the page parameter is invalid
  if (currentPage < 1 || isNaN(pageFromParams)) {
    redirect(pathname);
  }

  // Generate the array of page numbers to display, including ellipses if needed
  const pages: (string | number)[] = generatePaginationNumbers(currentPage, totalPages);

  /**
   * Creates a URL for a specified page number
   * @param newPage - The page number to navigate to
   * @returns URL string with updated page parameter
   */
  const createPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // If page is less than 1, return the base URL without page parameter
    if (newPage < 1) {
      return `${pathname}`;
    }

    // Set the page parameter and return the complete URL
    params.set('page', newPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            {...(!isFirstPage && {
              href: createPageUrl(currentPage - 1)
            })}
            className={cn({
              'opacity-50 cursor-not-allowed': isFirstPage,
              'cursor-pointer': !isFirstPage
            })}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={createPageUrl(page as number)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            {...(!isLastPage && {
              href: createPageUrl(currentPage + 1)
            })}
            className={cn({
              'opacity-50 cursor-not-allowed': isLastPage,
              'cursor-pointer': !isLastPage
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
