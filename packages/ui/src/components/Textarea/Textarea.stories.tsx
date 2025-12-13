import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        label="Description"
        placeholder="Write something…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Tell us a bit more."
      />
    );
  },
};

export const WithCount: Story = {
  render: () => {
    const [value, setValue] = useState('Hello');
    return (
      <Textarea
        label="Bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={140}
        showCount
      />
    );
  },
};

export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = useState('Line 1\nLine 2\nLine 3');
    return (
      <Textarea
        label="Auto-resize"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoResize
        showCount
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Required…',
    error: 'This field is required',
  },
};


