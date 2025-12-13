import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Patterns/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  args: {
    items: [
      { id: '1', label: 'Section 1', content: 'Content for section 1' },
      { id: '2', label: 'Section 2', content: 'Content for section 2' },
      { id: '3', label: 'Section 3', content: 'Content for section 3' },
    ],
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    items: [
      { id: '1', label: 'FAQ 1', content: 'Answer to first question' },
      { id: '2', label: 'FAQ 2', content: 'Answer to second question' },
    ],
  },
};

