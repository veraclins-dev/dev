import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '@veraclins-dev/utils';

import { generatePageItems, type PageItem } from './utils/pagination';
import Box from './box';
import { Button, type ButtonProps } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Icon } from './icon';

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
const DROPDOWN_SCROLL_DELAY = 150;

interface PaginationNavigationButtonProps {
  icon:
    | 'chevron-left'
    | 'chevron-right'
    | 'chevron-double-left'
    | 'chevron-double-right';
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  buttonSize: 'sm' | 'md' | 'lg';
  color: ButtonProps['color'];
  className?: string;
}

/**
 * Navigation button component for pagination (first, previous, next, last).
 * Renders an icon-only button with proper accessibility labels.
 */
const PaginationNavigationButton = memo(function PaginationNavigationButton({
  icon,
  onClick,
  disabled,
  ariaLabel,
  buttonSize,
  color,
  className,
}: PaginationNavigationButtonProps) {
  return (
    <Button
      variant="soft"
      buttonSize={buttonSize}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn('h-full', className)}
      color={color}
    >
      <Icon name={icon} />
    </Button>
  );
});

interface PaginationPageButtonProps {
  page: number;
  isCurrentPage: boolean;
  isVisibleOnMobile: boolean;
  isVisibleOnTablet: boolean;
  onClick: (page: number) => void;
  buttonSize: 'sm' | 'md' | 'lg';
  color: ButtonProps['color'];
}

/**
 * Individual page number button component.
 * Handles responsive visibility and current page styling.
 */
const PaginationPageButton = memo(function PaginationPageButton({
  page,
  isCurrentPage,
  isVisibleOnMobile,
  isVisibleOnTablet,
  onClick,
  buttonSize,
  color,
}: PaginationPageButtonProps) {
  return (
    <Button
      variant={isCurrentPage ? 'solid' : 'soft'}
      buttonSize={buttonSize}
      className={cn(
        !isVisibleOnMobile && 'hidden',
        !isVisibleOnTablet && 'hidden md:flex',
        'lg:flex text-xs h-full transition-colors duration-200 ease-in-out border-none',
      )}
      onClick={() => onClick(page)}
      aria-label={
        isCurrentPage ? `Current page, page ${page}` : `Go to page ${page}`
      }
      aria-current={isCurrentPage ? 'page' : undefined}
      color={color}
    >
      {page}
    </Button>
  );
});

interface PaginationEllipsisProps {
  prevItem: PageItem | undefined;
  nextItem: PageItem | undefined;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  buttonSize: 'sm' | 'md' | 'lg';
  color: ButtonProps['color'];
  ellipsisKey: 'start' | 'end';
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Ellipsis dropdown component that shows hidden pages in a menu.
 * Handles scroll-to-active-page behavior and validates page ranges.
 */
const PaginationEllipsis = memo(function PaginationEllipsis({
  prevItem,
  nextItem,
  totalPages,
  currentPage,
  onPageChange,
  buttonSize,
  color,
  ellipsisKey,
  isOpen,
  onOpenChange,
}: PaginationEllipsisProps) {
  const isStartEllipsis = typeof prevItem === 'number' && prevItem === 1;
  const ellipsisId = useMemo(
    () => `pagination-ellipsis-${ellipsisKey}`,
    [ellipsisKey],
  );

  const ellipsisPages = useMemo(() => {
    if (isStartEllipsis && typeof nextItem === 'number' && nextItem > 2) {
      const length = nextItem - 2;
      if (length > 0) {
        return Array.from({ length }, (_, i) => i + 2);
      }
    }
    if (
      !isStartEllipsis &&
      typeof prevItem === 'number' &&
      prevItem < totalPages - 1
    ) {
      const length = totalPages - prevItem - 1;
      if (length > 0) {
        return Array.from({ length }, (_, i) => prevItem + i + 1);
      }
    }
    return [];
  }, [isStartEllipsis, prevItem, nextItem, totalPages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollToActivePage = () => {
      const content = document.querySelector(
        `[data-ellipsis-id="${ellipsisId}"]`,
      ) as HTMLElement;
      if (content) {
        const activeItem = content.querySelector(
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

    const timeoutId = setTimeout(scrollToActivePage, DROPDOWN_SCROLL_DELAY);
    return () => clearTimeout(timeoutId);
  }, [isOpen, ellipsisId]);

  const getEllipsisAriaLabel = useCallback(() => {
    if (isStartEllipsis && typeof nextItem === 'number' && nextItem > 2) {
      const endPage = nextItem - 1;
      if (endPage >= 2) {
        return `Jump to page (pages 2-${endPage} available)`;
      }
    }
    if (
      !isStartEllipsis &&
      typeof prevItem === 'number' &&
      prevItem < totalPages - 1
    ) {
      const startPage = prevItem + 1;
      const endPage = totalPages - 1;
      if (startPage <= endPage) {
        return `Jump to page (pages ${startPage}-${endPage} available)`;
      }
    }
    return 'Jump to page';
  }, [isStartEllipsis, prevItem, nextItem, totalPages]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild className="h-full">
        <Button
          variant="text"
          buttonSize={buttonSize}
          aria-label={getEllipsisAriaLabel()}
          className="h-full text-xs"
          color={color}
        >
          <Icon name="dots-horizontal" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        data-ellipsis-id={ellipsisId}
        className="max-h-[200px] overflow-y-auto"
        align="center"
      >
        {ellipsisPages.length === 0 ? (
          <DropdownMenuItem disabled>No pages available</DropdownMenuItem>
        ) : (
          ellipsisPages.map((page) => {
            const isActive = currentPage === page;
            return (
              <DropdownMenuItem
                key={`page-${page}`}
                onClick={() => {
                  if (page >= 1 && page <= totalPages) {
                    onPageChange(page);
                    onOpenChange(false);
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
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

/**
 * Pagination component that provides a flexible and accessible way to navigate through paginated content.
 * It supports responsive design with different visible page counts for mobile, tablet, and desktop views.
 * @param {PaginationProps} props - The props for the Pagination component.
 * @returns {JSX.Element} A rendered HTML element with applied styles and children.
 * @example
 * ```tsx
 * <Pagination currentPage={1} totalPages={10} onPageChange={(page) => console.log(page)} />
 */
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

  const mobilePageSet = useMemo(
    () => new Set(mobilePageItems),
    [mobilePageItems],
  );
  const tabletPageSet = useMemo(
    () => new Set(tabletPageItems),
    [tabletPageItems],
  );

  const [openEllipsis, setOpenEllipsis] = useState<'start' | 'end' | null>(
    null,
  );

  const handleFirstPage = useCallback(() => {
    if (canGoPrevious) {
      onPageChange(1);
    }
  }, [canGoPrevious, onPageChange]);

  const handlePreviousPage = useCallback(() => {
    if (canGoPrevious) {
      onPageChange(safeCurrentPage - 1);
    }
  }, [canGoPrevious, safeCurrentPage, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (canGoNext) {
      onPageChange(safeCurrentPage + 1);
    }
  }, [canGoNext, safeCurrentPage, onPageChange]);

  const handleLastPage = useCallback(() => {
    if (canGoNext) {
      onPageChange(totalPages);
    }
  }, [canGoNext, totalPages, onPageChange]);

  const handlePageClick = useCallback(
    (page: number) => {
      if (page !== safeCurrentPage && page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [safeCurrentPage, totalPages, onPageChange],
  );
  if (totalPages <= 0) {
    return null;
  }

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
        <PaginationNavigationButton
          icon="chevron-double-left"
          onClick={handleFirstPage}
          disabled={!canGoPrevious}
          ariaLabel="Go to first page"
          buttonSize={buttonSize}
          color={color}
          className="hidden lg:flex"
        />
      )}
      <PaginationNavigationButton
        icon="chevron-left"
        onClick={handlePreviousPage}
        disabled={!canGoPrevious}
        ariaLabel="Go to previous page"
        buttonSize={buttonSize}
        color={color}
      />

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

              return (
                <PaginationEllipsis
                  key={`ellipsis-${index}`}
                  prevItem={prevItem}
                  nextItem={nextItem}
                  totalPages={totalPages}
                  currentPage={safeCurrentPage}
                  onPageChange={onPageChange}
                  buttonSize={buttonSize}
                  color={color}
                  ellipsisKey={ellipsisKey}
                  isOpen={isOpen}
                  onOpenChange={(open) =>
                    setOpenEllipsis(open ? ellipsisKey : null)
                  }
                />
              );
            }

            const isCurrentPage = item === safeCurrentPage;
            const isVisibleOnMobile = mobilePageSet.has(item);
            const isVisibleOnTablet = tabletPageSet.has(item);

            return (
              <PaginationPageButton
                key={item}
                page={item}
                isCurrentPage={isCurrentPage}
                isVisibleOnMobile={isVisibleOnMobile}
                isVisibleOnTablet={isVisibleOnTablet}
                onClick={handlePageClick}
                buttonSize={buttonSize}
                color={color}
              />
            );
          })}
        </>
      )}

      <PaginationNavigationButton
        icon="chevron-right"
        onClick={handleNextPage}
        disabled={!canGoNext}
        ariaLabel="Go to next page"
        buttonSize={buttonSize}
        color={color}
      />
      {showFirstLast && (
        <PaginationNavigationButton
          icon="chevron-double-right"
          onClick={handleLastPage}
          disabled={!canGoNext}
          ariaLabel="Go to last page"
          buttonSize={buttonSize}
          color={color}
          className="hidden lg:flex"
        />
      )}
    </Box>
  );
}
