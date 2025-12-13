import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onRangeChange: { action: 'rangeChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    return <DatePicker label="Date" value={value} onChange={setValue} />;
  },
};

export const MinMax: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    const min = new Date();
    min.setDate(min.getDate() - 3);
    const max = new Date();
    max.setDate(max.getDate() + 10);
    return <DatePicker label="Pick a date" value={value} onChange={setValue} min={min} max={max} />;
  },
};

export const Range: Story = {
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Range"
        range
        value={null}
        onChange={() => {}}
        rangeStart={start ?? undefined}
        rangeEnd={end ?? undefined}
        onRangeChange={(s, e) => {
          setStart(s);
          setEnd(e);
        }}
      />
    );
  },
};

export const Keyboard: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    return <DatePicker label="Keyboard" value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: /keyboard/i });
    await userEvent.click(btn);
    await userEvent.keyboard('{ArrowRight}{ArrowRight}{Enter}');
  },
};


