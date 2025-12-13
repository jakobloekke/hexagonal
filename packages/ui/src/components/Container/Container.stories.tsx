import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    center: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    maxWidth: 'lg',
    padding: 'md',
    center: true,
    children: (
      <div className="bg-blue-100 border-2 border-blue-400 rounded p-4">
        <h2 className="text-lg font-semibold">Default Container</h2>
        <p>Centered, with max-width lg and medium padding.</p>
      </div>
    ),
  },
};

export const SmallWidth: Story = {
  args: {
    maxWidth: 'sm',
    padding: 'md',
    center: true,
    children: (
      <div className="bg-green-100 border-2 border-green-400 rounded p-4">
        <h2 className="text-lg font-semibold">Small Container</h2>
        <p>Max-width sm, centered.</p>
      </div>
    ),
  },
};

export const ExtraLargeWidth: Story = {
  args: {
    maxWidth: '2xl',
    padding: 'lg',
    center: true,
    children: (
      <div className="bg-purple-100 border-2 border-purple-400 rounded p-4">
        <h2 className="text-lg font-semibold">Extra Large Container</h2>
        <p>Max-width 2xl, large padding, centered.</p>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    maxWidth: 'full',
    padding: 'md',
    center: false,
    children: (
      <div className="bg-red-100 border-2 border-red-400 rounded p-4">
        <h2 className="text-lg font-semibold">Full Width Container</h2>
        <p>No max-width constraint.</p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    maxWidth: 'md',
    padding: 'none',
    center: true,
    children: (
      <div className="bg-yellow-100 border-2 border-yellow-400 rounded p-4">
        <h2 className="text-lg font-semibold">No Padding</h2>
        <p>Container has no padding.</p>
      </div>
    ),
  },
};

export const Responsive: Story = {
  args: {
    maxWidth: 'lg',
    padding: 'md',
    center: true,
    children: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This container is responsive. It adapts padding and content width on different screen sizes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="font-semibold">Column 1</h3>
            <p>Stacks on mobile, side-by-side on desktop.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="font-semibold">Column 2</h3>
            <p>Responsive grid layout.</p>
          </div>
        </div>
      </div>
    ),
  },
};

