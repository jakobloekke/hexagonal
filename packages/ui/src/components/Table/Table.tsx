import { useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnSizingState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '../../utils/cn';
import { TableControls } from './TableControls';
import { ColumnCustomizer } from './ColumnCustomizer';

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];

  // Controlled state
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  globalFilter?: string;
  onGlobalFilterChange?: OnChangeFn<string>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  columnSizing?: ColumnSizingState;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  columnOrder?: ColumnOrderState;
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>;

  rowCount?: number;
  isLoading?: boolean;
  emptyMessage?: string;

  /** Show built-in controls row */
  showControls?: boolean;
  /** Show column customizer panel */
  showColumnCustomizer?: boolean;
}

export function Table<TData>({
  data,
  columns,
  sorting,
  onSortingChange,
  columnFilters,
  onColumnFiltersChange,
  globalFilter,
  onGlobalFilterChange,
  pagination,
  onPaginationChange,
  rowSelection,
  onRowSelectionChange,
  columnVisibility,
  onColumnVisibilityChange,
  columnSizing,
  onColumnSizingChange,
  columnOrder,
  onColumnOrderChange,
  rowCount,
  isLoading,
  emptyMessage = 'No results.',
  showControls,
  showColumnCustomizer,
}: TableProps<TData>) {
  const hasAnyControls =
    Boolean(onGlobalFilterChange) ||
    Boolean(onPaginationChange) ||
    Boolean(onColumnVisibilityChange) ||
    Boolean(onColumnOrderChange);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      rowSelection,
      columnVisibility,
      columnSizing,
      columnOrder,
    },
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
    onRowSelectionChange,
    onColumnVisibilityChange,
    onColumnSizingChange,
    onColumnOrderChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    manualPagination: Boolean(rowCount),
    rowCount,
  });

  const pageCount = table.getPageCount();

  const customizerColumns = useMemo(() => {
    return table.getAllLeafColumns().map((c) => ({
      id: c.id,
      label: c.columnDef.header && typeof c.columnDef.header === 'string' ? c.columnDef.header : c.id,
      canHide: c.getCanHide(),
      isVisible: c.getIsVisible(),
    }));
  }, [table]);

  return (
    <div className="w-full space-y-3">
      {(showControls ?? hasAnyControls) ? (
        <TableControls
          globalFilter={globalFilter}
          onGlobalFilterChange={onGlobalFilterChange}
          pageIndex={pagination?.pageIndex ?? 0}
          pageSize={pagination?.pageSize ?? 10}
          pageCount={pageCount}
          rowCount={rowCount ?? data.length}
          onPrevPage={onPaginationChange ? () => table.previousPage() : undefined}
          onNextPage={onPaginationChange ? () => table.nextPage() : undefined}
          onPageSizeChange={onPaginationChange ? (s) => table.setPageSize(s) : undefined}
          isLoading={isLoading}
        />
      ) : null}

      {(showColumnCustomizer ?? Boolean(onColumnVisibilityChange || onColumnOrderChange)) ? (
        <ColumnCustomizer
          columns={customizerColumns}
          onToggleColumn={(id, visible) => {
            table.getColumn(id)?.toggleVisibility(visible);
          }}
          onMoveColumn={
            onColumnOrderChange
              ? (id, direction) => {
                  const current = table.getState().columnOrder ?? table.getAllLeafColumns().map((c) => c.id);
                  const idx = current.indexOf(id);
                  if (idx === -1) return;
                  const next = [...current];
                  const swapWith = direction === 'up' ? idx - 1 : idx + 1;
                  if (swapWith < 0 || swapWith >= next.length) return;
                  [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
                  table.setColumnOrder(next);
                }
              : undefined
          }
        />
      ) : null}

      <div className="overflow-x-auto md:overflow-visible">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'relative border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700',
                        canSort ? 'cursor-pointer select-none' : '',
                      )}
                      style={{ width: header.getSize() }}
                      aria-sort={
                        sortDir === 'asc' ? 'ascending' : sortDir === 'desc' ? 'descending' : 'none'
                      }
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : (flexRender(header.column.columnDef.header, header.getContext()) as any)}
                        {canSort ? (
                          <span className="text-xs text-gray-400">
                            {sortDir === 'asc' ? '▲' : sortDir === 'desc' ? '▼' : '↕'}
                          </span>
                        ) : null}
                      </div>

                      {/* Resizer */}
                      {header.column.getCanResize() ? (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className="absolute right-0 top-0 h-full w-2 cursor-col-resize touch-none select-none"
                          aria-hidden="true"
                        />
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-3 py-6 text-sm text-gray-500" colSpan={table.getAllLeafColumns().length}>
                  Loading…
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-sm text-gray-500" colSpan={table.getAllLeafColumns().length}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border-b border-gray-100 px-3 py-2 text-sm text-gray-900">
                      {(flexRender(cell.column.columnDef.cell, cell.getContext()) as any)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


