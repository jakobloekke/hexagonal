import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    label: 'Or',
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center gap-4">
      <div className="text-sm">Content Left</div>
      <Divider orientation="vertical" />
      <div className="text-sm">Content Right</div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold mb-2">Solid</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold mb-2">Small</p>
        <Divider size="sm" />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Medium</p>
        <Divider size="md" />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Large</p>
        <Divider size="lg" />
      </div>
    </div>
  ),
};

export const SectionExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded">
        <h3 className="font-semibold">Section 1</h3>
        <p className="text-sm text-gray-600">First section content</p>
      </div>
      <Divider label="Divider Label" />
      <div className="p-4 bg-green-50 rounded">
        <h3 className="font-semibold">Section 2</h3>
        <p className="text-sm text-gray-600">Second section content</p>
      </div>
    </div>
  ),
};

