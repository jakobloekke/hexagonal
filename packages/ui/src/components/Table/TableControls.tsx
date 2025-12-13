import React from 'react';
import { cn } from '../../utils/cn';

export interface TableControlsProps {
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;

  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  rowCount?: number;

  onPrevPage?: () => void;
  onNextPage?: () => void;
  onPageSizeChange?: (pageSize: number) => void;

  isLoading?: boolean;
  className?: string;
}

export const TableControls: React.FC<TableControlsProps> = ({
  globalFilter,
  onGlobalFilterChange,
  pageIndex = 0,
  pageSize = 10,
  pageCount = 1,
  rowCount,
  onPrevPage,
  onNextPage,
  onPageSizeChange,
  isLoading,
  className,
}) => {
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pageCount - 1;

  return (
    <div className={cn('flex flex-col gap-2 md:flex-row md:items-center md:justify-between', className)}>
      <div className="flex items-center gap-2">
        {onGlobalFilterChange ? (
          <input
            className="h-9 w-64 max-w-full rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search…"
            value={globalFilter ?? ''}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            disabled={isLoading}
            aria-label="Global search"
          />
        ) : null}
        {typeof rowCount === 'number' ? (
          <span className="text-sm text-gray-500">{rowCount} rows</span>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        {onPageSizeChange ? (
          <select
            className="h-9 rounded-md border border-gray-200 bg-white px-2 text-sm"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={isLoading}
            aria-label="Rows per page"
          >
            {[5, 10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        ) : null}

        <button
          type="button"
          className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm disabled:opacity-50"
          onClick={onPrevPage}
          disabled={!onPrevPage || !canPrev || isLoading}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600 tabular-nums">
          {pageIndex + 1} / {pageCount}
        </span>
        <button
          type="button"
          className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm disabled:opacity-50"
          onClick={onNextPage}
          disabled={!onNextPage || !canNext || isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
};


