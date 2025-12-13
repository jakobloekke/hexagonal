import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Enable feature',
    size: 'md',
    onChange: () => {},
  },
};

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    const [c, setC] = useState(true);
    return (
      <div className="space-y-3">
        <Switch checked={a} onChange={setA} label="Small" size="sm" />
        <Switch checked={b} onChange={setB} label="Medium" size="md" />
        <Switch checked={c} onChange={setC} label="Large" size="lg" />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    label: 'Disabled',
    disabled: true,
    onChange: () => {},
  },
};


