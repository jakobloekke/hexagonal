/**
 * Client-side table helpers (FR-010a).
 *
 * These functions are intentionally dependency-free. They provide lightweight
 * utilities for consumers who want client-side sorting/filtering/pagination
 * without standing up server-side data management.
 *
 * NOTE: Phase 2 provides stubs and types; Phase US2 implements full behavior.
 */

export type SortingState = Array<{ id: string; desc: boolean }>;
export type ColumnFiltersState = Array<{ id: string; value: unknown }>;
export type PaginationState = { pageIndex: number; pageSize: number };

export function sortData<T>(data: T[], _sorting: SortingState): T[] {
  // Multi-column sort. For each sorting rule, try to read a value from the row by key.
  // If the key does not exist, the rule is ignored.
  const sorting = _sorting ?? [];
  if (sorting.length === 0) return data;

  const copy = [...data];
  copy.sort((a, b) => {
    for (const rule of sorting) {
      const av = (a as any)?.[rule.id];
      const bv = (b as any)?.[rule.id];

      if (av == null && bv == null) continue;
      if (av == null) return rule.desc ? 1 : -1;
      if (bv == null) return rule.desc ? -1 : 1;

      // number compare
      if (typeof av === 'number' && typeof bv === 'number') {
        if (av === bv) continue;
        return rule.desc ? bv - av : av - bv;
      }

      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as === bs) continue;
      return rule.desc ? (bs < as ? -1 : 1) : (as < bs ? -1 : 1);
    }
    return 0;
  });

  return copy;
}

export function filterData<T>(data: T[], _filters: ColumnFiltersState): T[] {
  const filters = _filters ?? [];
  if (filters.length === 0) return data;

  return data.filter((row) => {
    for (const f of filters) {
      const fv = f.value;
      if (fv == null || fv === '') continue;
      const rv = (row as any)?.[f.id];

      // string contains (case-insensitive)
      if (typeof fv === 'string') {
        const needle = fv.toLowerCase();
        const hay = rv == null ? '' : String(rv).toLowerCase();
        if (!hay.includes(needle)) return false;
        continue;
      }

      // exact match fallback
      if (rv !== fv) return false;
    }
    return true;
  });
}

export function paginateData<T>(
  data: T[],
  pagination: PaginationState,
): { data: T[]; pageCount: number } {
  const { pageIndex, pageSize } = pagination;
  const total = data.length;
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const start = Math.max(0, pageIndex) * Math.max(1, pageSize);
  return { data: data.slice(start, start + pageSize), pageCount };
}

export function getTableState<T>(args: {
  data: T[];
  sorting?: SortingState;
  filters?: ColumnFiltersState;
  pagination?: PaginationState;
}): { processedData: T[]; totalRows: number; pageCount: number } {
  const totalRows = args.data.length;

  let processedData = args.data;
  if (args.sorting && args.sorting.length > 0) processedData = sortData(processedData, args.sorting);
  if (args.filters && args.filters.length > 0) processedData = filterData(processedData, args.filters);

  if (args.pagination) {
    const paged = paginateData(processedData, args.pagination);
    return { processedData: paged.data, totalRows, pageCount: paged.pageCount };
  }

  return { processedData, totalRows, pageCount: 1 };
}


