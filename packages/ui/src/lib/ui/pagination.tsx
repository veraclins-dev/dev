import { useEffect, useMemo, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import Box from './box';
import { Button, type ButtonProps } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Icon } from './icon';
import { Typography } from './typography';

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  className?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  color?: ButtonProps['color'];
}

const MIN_VISIBLE_PAGES = 3;
const MAX_VISIBLE_PAGES = 9;
const MOBILE_VISIBLE_PAGES = 3;
const TABLET_VISIBLE_PAGES = 5;

type PageItem = number | 'ellipsis';

function generatePageItems(
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

  if (pagesForMiddle % 2 === 0) {
    middleEnd = Math.min(
      showLast ? totalPages - 1 : totalPages,
      currentPage + halfMiddle - 1,
    );
  }

  const actualMiddlePages = middleEnd - middleStart + 1;
  const neededPages = pagesForMiddle - actualMiddlePages;

  if (neededPages > 0) {
    if (middleStart === (showFirst ? 2 : 1)) {
      middleEnd = Math.min(
        showLast ? totalPages - 1 : totalPages,
        middleEnd + neededPages,
      );
    } else if (middleEnd === (showLast ? totalPages - 1 : totalPages)) {
      middleStart = Math.max(showFirst ? 2 : 1, middleStart - neededPages);
    } else {
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
    if (middleStart > 2) {
      items.push('ellipsis');
    }
  }

  for (let i = middleStart; i <= middleEnd; i++) {
    items.push(i);
  }

  if (showLast) {
    if (middleEnd < totalPages - 1) {
      items.push('ellipsis');
    }
    items.push(totalPages);
  }

  return items;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPageNumbers = true,
  maxVisiblePages = 7,
  className,
  buttonSize = 'md',
  ariaLabel = 'Pagination',
  color = 'neutral',
  ...props
}: PaginationProps) {
  const validatedMaxVisiblePages = Math.max(
    MIN_VISIBLE_PAGES,
    Math.min(MAX_VISIBLE_PAGES, maxVisiblePages),
  );

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const canGoPrevious = safeCurrentPage > 1;
  const canGoNext = safeCurrentPage < totalPages;

  const desktopPageItems = useMemo(
    () =>
      generatePageItems(safeCurrentPage, totalPages, validatedMaxVisiblePages),
    [safeCurrentPage, totalPages, validatedMaxVisiblePages],
  );

  const tabletPageItems = useMemo(
    () => generatePageItems(safeCurrentPage, totalPages, TABLET_VISIBLE_PAGES),
    [safeCurrentPage, totalPages],
  );

  const mobilePageItems = useMemo(
    () => generatePageItems(safeCurrentPage, totalPages, MOBILE_VISIBLE_PAGES),
    [safeCurrentPage, totalPages],
  );

  const [openEllipsis, setOpenEllipsis] = useState<'start' | 'end' | null>(
    null,
  );

  const allPages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  useEffect(() => {
    if (!openEllipsis) {
      return;
    }

    const scrollToActivePage = () => {
      const dropdownContent = document.querySelector(
        '[data-slot="dropdown-menu-content"]',
      ) as HTMLElement;
      if (dropdownContent) {
        const activeItem = dropdownContent.querySelector(
          `[data-active-page="true"]`,
        ) as HTMLElement;
        if (activeItem) {
          activeItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    };

    const timeoutId = setTimeout(scrollToActivePage, 150);
    return () => clearTimeout(timeoutId);
  }, [openEllipsis]);

  if (totalPages <= 0) {
    return null;
  }

  const handleFirstPage = () => {
    if (canGoPrevious) {
      onPageChange(1);
    }
  };

  const handlePreviousPage = () => {
    if (canGoPrevious) {
      onPageChange(safeCurrentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (canGoNext) {
      onPageChange(safeCurrentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (canGoNext) {
      onPageChange(totalPages);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== safeCurrentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Box
      component="nav"
      data-slot="pagination"
      aria-label={ariaLabel}
      display="flex"
      items="center"
      gap={1}
      className={cn(className)}
      {...props}
    >
      {showFirstLast && (
        <Button
          variant="soft"
          className="hidden lg:flex h-full"
          px={2}
          onClick={handleFirstPage}
          disabled={!canGoPrevious}
          aria-label="Go to first page"
          buttonSize={buttonSize}
          color={color}
        >
          <Typography variant="caption" className="sr-only">
            Go to first page
          </Typography>
          <Icon name="chevron-double-left" />
        </Button>
      )}
      <Button
        variant="soft"
        buttonSize={buttonSize}
        onClick={handlePreviousPage}
        disabled={!canGoPrevious}
        aria-label="Go to previous page"
        className="h-full"
        px={2}
        color={color}
      >
        <Typography variant="caption" className="sr-only">
          Go to previous page
        </Typography>
        <Icon name="chevron-left" />
      </Button>

      {showPageNumbers && (
        <>
          {desktopPageItems.map((item, index) => {
            if (item === 'ellipsis') {
              const prevItem = desktopPageItems[index - 1];
              const nextItem = desktopPageItems[index + 1];
              const isStartEllipsis =
                typeof prevItem === 'number' && prevItem === 1;
              const ellipsisKey = isStartEllipsis ? 'start' : 'end';
              const isOpen = openEllipsis === ellipsisKey;

              const getEllipsisAriaLabel = () => {
                if (isStartEllipsis && typeof nextItem === 'number') {
                  return `Jump to page (pages 2-${nextItem - 1} available)`;
                }
                if (!isStartEllipsis && typeof prevItem === 'number') {
                  return `Jump to page (pages ${prevItem + 1}-${totalPages - 1} available)`;
                }
                return 'Jump to page';
              };

              return (
                <DropdownMenu
                  key={`ellipsis-${index}`}
                  open={isOpen}
                  onOpenChange={(open) =>
                    setOpenEllipsis(open ? ellipsisKey : null)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="text"
                      buttonSize={buttonSize}
                      aria-label={getEllipsisAriaLabel()}
                      className="h-full text-xs"
                      px={2}
                      color={color}
                    >
                      <Icon name="dots-horizontal" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="max-h-[200px] overflow-y-auto"
                    align="center"
                  >
                    {allPages.map((page) => {
                      const isActive = safeCurrentPage === page;
                      return (
                        <DropdownMenuItem
                          key={`page-${page}`}
                          onClick={() => {
                            if (page >= 1 && page <= totalPages) {
                              onPageChange(page);
                              setOpenEllipsis(null);
                            }
                          }}
                          data-selected={isActive ? 'true' : undefined}
                          data-active-page={isActive ? 'true' : undefined}
                          aria-selected={isActive}
                          className={cn(isActive && 'font-medium')}
                        >
                          Page {page}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            const isCurrentPage = item === safeCurrentPage;
            const isVisibleOnMobile = mobilePageItems.includes(item);
            const isVisibleOnTablet = tabletPageItems.includes(item);

            return (
              <Button
                key={item}
                variant={isCurrentPage ? 'solid' : 'soft'}
                buttonSize={buttonSize}
                px={3}
                className={cn(
                  !isVisibleOnMobile && 'hidden',
                  !isVisibleOnTablet && 'hidden md:flex',
                  'lg:flex h-full text-xs h-8 transition-colors duration-200 ease-in-out',
                )}
                onClick={() => handlePageClick(item)}
                aria-label={
                  isCurrentPage
                    ? `Current page, page ${item}`
                    : `Go to page ${item}`
                }
                aria-current={isCurrentPage ? 'page' : undefined}
                color={color}
              >
                {item}
              </Button>
            );
          })}
        </>
      )}

      <Button
        variant="soft"
        buttonSize={buttonSize}
        onClick={handleNextPage}
        disabled={!canGoNext}
        aria-label="Go to next page"
        px={2}
        color={color}
      >
        <Typography variant="caption" className="sr-only">
          Go to next page
        </Typography>
        <Icon name="chevron-right" />
      </Button>
      {showFirstLast && (
        <Button
          variant="soft"
          buttonSize={buttonSize}
          className="hidden lg:flex"
          onClick={handleLastPage}
          disabled={!canGoNext}
          aria-label="Go to last page"
          px={2}
          color={color}
        >
          <Typography variant="caption" className="sr-only">
            Go to last page
          </Typography>
          <Icon name="chevron-double-right" />
        </Button>
      )}
    </Box>
  );
}
