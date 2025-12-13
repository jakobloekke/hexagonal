import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import type { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { Table } from './Table';

type User = { id: number; name: string; email: string; role: string };

const meta: Meta<typeof Table<User>> = {
  title: 'Data Display/Table',
  component: Table as any,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

function makeUsers(count: number): User[] {
  const roles = ['Admin', 'User', 'Editor', 'Viewer'] as const;
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
  }));
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

export const Basic: Story = {
  render: () => {
    const data = useMemo(() => makeUsers(25), []);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [columnOrder, setColumnOrder] = useState<string[]>([]);

    return (
      <Table
        data={data}
        columns={columns}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        columnOrder={columnOrder}
        onColumnOrderChange={setColumnOrder}
      />
    );
  },
};

export const ResponsiveAndLarge: Story = {
  render: () => {
    const data = useMemo(() => makeUsers(10000), []);
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 20 });
    return (
      <Table
        data={data.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize)}
        columns={columns}
        pagination={pagination}
        onPaginationChange={setPagination}
        rowCount={data.length}
      />
    );
  },
};


