

/**
 * Generates an array of pagination numbers with ellipsis for large number of pages.
 * 
 * This function creates a pagination array that includes:
 * - Boundary pages at the start and end (controlled by boundaryCount)
 * - Sibling pages around the current page (controlled by siblingCount)
 * - Ellipsis indicators ('ellipsis') for skipped page ranges
 * 
 * The algorithm ensures a balanced display with proper ellipsis placement when
 * there are too many pages to show at once.
 * 
 * @param currentPage - The current active page (1-based index)
 * @param totalPages - The total number of pages available
 * @returns An array containing page numbers and 'ellipsis' strings where page numbers are skipped
 * 
 * @example
 * // Returns [1, 2, 3, 4, 5, 'ellipsis', 10]
 * generatePaginationNumbers(3, 10);
 * 
 * @example
 * // Returns [1, 'ellipsis', 7, 8, 9, 10]
 * generatePaginationNumbers(8, 10);
 */
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    const boundaryCount = 1;
    const siblingCount = 1;

    const range = (start: number, end: number): number[] => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i)
    }

    const startPages = range(1, Math.min(boundaryCount, totalPages))
    const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages)

    const siblingsStart = Math.max(
        Math.min(
            currentPage - siblingCount,
            totalPages - boundaryCount - siblingCount * 2 - 1
        ),
        boundaryCount + 2
    )

    const siblingsEnd = Math.min(
        Math.max(
            currentPage + siblingCount,
            boundaryCount + siblingCount * 2 + 2
        ),
        endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
    );

    return [
        ...startPages,

        ...(siblingsStart > boundaryCount + 2
            ? ['ellipsis']
            : boundaryCount + 1 < totalPages - boundaryCount ? [boundaryCount + 1] : []
        ),

        ...range(siblingsStart, siblingsEnd),

        ...(siblingsEnd < totalPages - boundaryCount - 1
            ? ['ellipsis']
            : totalPages - boundaryCount > boundaryCount ? [totalPages - boundaryCount] : []
        ),

        ...endPages
    ];

}