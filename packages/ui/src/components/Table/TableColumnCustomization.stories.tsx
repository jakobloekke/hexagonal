import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import type { ColumnDef, ColumnSizingState, PaginationState } from '@tanstack/react-table';
import { Table } from './Table';

type Row = { id: number; a: string; b: string; c: string; d: string };

const meta: Meta<typeof Table<Row>> = {
  title: 'Data Display/Table (Customization)',
  component: Table as any,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table<Row>>;

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'a', header: 'Alpha' },
  { accessorKey: 'b', header: 'Beta' },
  { accessorKey: 'c', header: 'Gamma' },
  { accessorKey: 'd', header: 'Delta' },
];

export const ColumnVisibilityResizeReorder: Story = {
  render: () => {
    const data = useMemo<Row[]>(
      () =>
        Array.from({ length: 50 }).map((_, i) => ({
          id: i + 1,
          a: `A-${i + 1}`,
          b: `B-${i + 1}`,
          c: `C-${i + 1}`,
          d: `D-${i + 1}`,
        })),
      [],
    );

    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnOrder, setColumnOrder] = useState<string[]>([]);
    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

    return (
      <Table
        data={data}
        columns={columns}
        showControls
        showColumnCustomizer
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        columnOrder={columnOrder}
        onColumnOrderChange={setColumnOrder}
        columnSizing={columnSizing}
        onColumnSizingChange={setColumnSizing}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    );
  },
};


