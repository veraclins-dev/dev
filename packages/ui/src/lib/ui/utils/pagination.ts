export type PageItem = number | 'ellipsis';

/**
 * Generates an array of page items for pagination display, including page numbers and ellipsis markers.
 *
 * The algorithm creates a pagination structure that shows:
 * - First page (if current page is far from start)
 * - Ellipsis (when there's a gap)
 * - Middle pages centered around current page
 * - Ellipsis (when there's a gap)
 * - Last page (if current page is far from end)
 *
 * @param currentPage - The currently active page number (1-indexed)
 * @param totalPages - The total number of pages available
 * @param maxVisiblePages - Maximum number of page buttons to display (excluding ellipsis)
 * @returns Array of page items, where each item is either a page number or 'ellipsis'
 *
 * @example
 * ```ts
 * // With 20 total pages, current page 10, max 7 visible:
 * // Returns: [1, 'ellipsis', 8, 9, 10, 11, 12, 'ellipsis', 20]
 *
 * // With 5 total pages, current page 3, max 7 visible:
 * // Returns: [1, 2, 3, 4, 5] (all pages shown, no ellipsis needed)
 * ```
 */
export function generatePageItems(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
): PageItem[] {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: PageItem[] = [];
  const showFirst = currentPage > 2;
  const showLast = currentPage < totalPages - 1;

  let pagesForMiddle = maxVisiblePages;
  if (showFirst) pagesForMiddle--;
  if (showLast) pagesForMiddle--;

  const halfMiddle = Math.floor((pagesForMiddle - 1) / 2);
  let middleStart = Math.max(showFirst ? 2 : 1, currentPage - halfMiddle);
  let middleEnd = Math.min(
    showLast ? totalPages - 1 : totalPages,
    currentPage + halfMiddle,
  );

  // Adjust for even number of middle pages to keep current page centered
  if (pagesForMiddle % 2 === 0) {
    middleEnd = Math.min(
      showLast ? totalPages - 1 : totalPages,
      currentPage + halfMiddle - 1,
    );
  }

  const actualMiddlePages = middleEnd - middleStart + 1;
  const neededPages = pagesForMiddle - actualMiddlePages;

  // Fill gaps when we have fewer pages than slots available
  if (neededPages > 0) {
    if (middleStart === (showFirst ? 2 : 1)) {
      // Pinned to start, expand end
      middleEnd = Math.min(
        showLast ? totalPages - 1 : totalPages,
        middleEnd + neededPages,
      );
    } else if (middleEnd === (showLast ? totalPages - 1 : totalPages)) {
      // Pinned to end, expand start
      middleStart = Math.max(showFirst ? 2 : 1, middleStart - neededPages);
    } else {
      // Centered, expand both sides proportionally
      const addToStart = Math.floor(neededPages / 2);
      const addToEnd = neededPages - addToStart;
      middleStart = Math.max(showFirst ? 2 : 1, middleStart - addToStart);
      middleEnd = Math.min(
        showLast ? totalPages - 1 : totalPages,
        middleEnd + addToEnd,
      );
    }
  }

  if (showFirst) {
    items.push(1);
    // Add ellipsis if there's a gap between first page and middle section
    if (middleStart > 2) {
      items.push('ellipsis');
    }
  }

  for (let i = middleStart; i <= middleEnd; i++) {
    items.push(i);
  }

  if (showLast) {
    // Add ellipsis if there's a gap between middle section and last page
    if (middleEnd < totalPages - 1) {
      items.push('ellipsis');
    }
    items.push(totalPages);
  }

  return items;
}

