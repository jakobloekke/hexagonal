import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribed',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Partially selected',
    checked: false,
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    checked: true,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    checked: false,
    error: 'You must accept terms to continue',
  },
};

export const ControlledExample: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);

    return (
      <div className="space-y-3">
        <Checkbox
          label="Select all (indeterminate demo)"
          checked={checked}
          indeterminate={indeterminate}
          onChange={(next) => {
            setChecked(next);
            setIndeterminate(false);
          }}
        />
        <button
          className="text-sm underline"
          onClick={() => {
            setChecked(false);
            setIndeterminate(true);
          }}
        >
          Reset to indeterminate
        </button>
      </div>
    );
  },
};


