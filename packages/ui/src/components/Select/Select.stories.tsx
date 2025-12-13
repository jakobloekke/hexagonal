import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Select, type SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const baseOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France', disabled: true },
];

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>();
    return (
      <Select
        label="Country"
        value={value}
        onChange={(next) => {
          if (!Array.isArray(next)) setValue(next);
        }}
        options={baseOptions}
        searchable
      />
    );
  },
};

export const Multi: Story = {
  render: () => {
    const [value, setValue] = useState<Array<string | number>>(['us']);
    return (
      <Select
        label="Countries"
        value={value}
        onChange={(next) => {
          if (Array.isArray(next)) setValue(next);
        }}
        options={baseOptions}
        multiple
        searchable
      />
    );
  },
};

export const AsyncMock: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>();
    const options = useMemo(() => baseOptions, []);

    return (
      <Select
        label="Async country search"
        value={value}
        onChange={(next) => {
          if (!Array.isArray(next)) setValue(next);
        }}
        options={options}
        searchable
        onSearch={async (q) => {
          await new Promise((r) => setTimeout(r, 250));
          const qq = q.trim().toLowerCase();
          if (!qq) return options;
          return options.filter((o) => o.label.toLowerCase().includes(qq));
        }}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Select label="Disabled" value={undefined} onChange={() => {}} options={baseOptions} disabled />
  ),
};


