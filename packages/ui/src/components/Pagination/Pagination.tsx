import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    if (leftSibling > 2) pages.push(1, '...');
    else if (leftSibling > 1) pages.push(1);

    for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);

    if (rightSibling < totalPages - 1) pages.push('...', totalPages);
    else if (rightSibling < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
          FOCUS_RING
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={cn(
              'px-3 py-2 rounded border',
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-100',
              FOCUS_RING
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
          FOCUS_RING
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

