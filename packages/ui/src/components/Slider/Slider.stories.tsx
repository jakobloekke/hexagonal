import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    return (
      <Slider
        label="Volume"
        value={value}
        onChange={(next) => {
          if (typeof next === 'number') setValue(next);
        }}
        showValue
      />
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <Slider
        label="Price"
        value={value}
        onChange={(next) => {
          if (Array.isArray(next)) setValue(next);
        }}
        min={0}
        max={100}
        showValue
      />
    );
  },
};

export const Disabled: Story = {
  render: () => <Slider label="Disabled" value={50} onChange={() => {}} disabled showValue />,
};

export const Step: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return (
      <Slider
        label="Step 5"
        value={value}
        onChange={(next) => {
          if (typeof next === 'number') setValue(next);
        }}
        min={0}
        max={100}
        step={5}
        showValue
      />
    );
  },
};


