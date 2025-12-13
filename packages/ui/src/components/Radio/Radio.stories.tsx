import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Single: Story = {
  args: {
    label: 'Option A',
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    checked: true,
    disabled: true,
  },
};

export const GroupExample: Story = {
  render: () => {
    const [value, setValue] = useState<'a' | 'b' | 'c'>('a');
    return (
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">Choose one</legend>
        <Radio
          name="demo"
          label="Option A"
          checked={value === 'a'}
          onChange={(checked) => checked && setValue('a')}
        />
        <Radio
          name="demo"
          label="Option B"
          checked={value === 'b'}
          onChange={(checked) => checked && setValue('b')}
        />
        <Radio
          name="demo"
          label="Option C"
          checked={value === 'c'}
          onChange={(checked) => checked && setValue('c')}
        />
        <div className="text-xs text-gray-500">Selected: {value}</div>
      </fieldset>
    );
  },
};


