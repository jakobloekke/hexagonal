import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const VerticalStack: Story = {
  args: {
    direction: 'vertical',
    gap: 'md',
    children: (
      <>
        <div className="bg-blue-100 border border-blue-400 rounded p-3">Item 1</div>
        <div className="bg-blue-100 border border-blue-400 rounded p-3">Item 2</div>
        <div className="bg-blue-100 border border-blue-400 rounded p-3">Item 3</div>
      </>
    ),
  },
};

export const HorizontalStack: Story = {
  args: {
    direction: 'horizontal',
    gap: 'md',
    align: 'center',
    children: (
      <>
        <div className="bg-green-100 border border-green-400 rounded p-3">Item 1</div>
        <div className="bg-green-100 border border-green-400 rounded p-3">Item 2</div>
        <div className="bg-green-100 border border-green-400 rounded p-3">Item 3</div>
      </>
    ),
  },
};

export const WithGaps: Story = {
  render: () => (
    <div className="space-y-8">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm font-semibold mb-2">Gap: {gap}</p>
          <Stack direction="horizontal" gap={gap} wrap>
            <div className="bg-purple-100 border border-purple-400 rounded p-3">A</div>
            <div className="bg-purple-100 border border-purple-400 rounded p-3">B</div>
            <div className="bg-purple-100 border border-purple-400 rounded p-3">C</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-8">
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <div key={align}>
          <p className="text-sm font-semibold mb-2">Align: {align}</p>
          <Stack direction="horizontal" gap="md" align={align}>
            <div className="bg-blue-100 border border-blue-400 rounded p-3 h-12">Short</div>
            <div className="bg-blue-100 border border-blue-400 rounded p-3 h-20">Taller</div>
            <div className="bg-blue-100 border border-blue-400 rounded p-3 h-16">Medium</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Justification: Story = {
  render: () => (
    <div className="space-y-8">
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((justify) => (
        <div key={justify}>
          <p className="text-sm font-semibold mb-2">Justify: {justify}</p>
          <div className="border border-gray-300 rounded">
            <Stack direction="horizontal" gap="md" justify={justify} className="h-16">
              <div className="bg-green-100 border border-green-400 rounded p-3">A</div>
              <div className="bg-green-100 border border-green-400 rounded p-3">B</div>
              <div className="bg-green-100 border border-green-400 rounded p-3">C</div>
            </Stack>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const NestedStacks: Story = {
  args: {
    direction: 'vertical',
    gap: 'md',
    children: (
      <>
        <Stack direction="horizontal" gap="md">
          <div className="bg-red-100 border border-red-400 rounded p-3">Left</div>
          <div className="bg-red-100 border border-red-400 rounded p-3">Center</div>
          <div className="bg-red-100 border border-red-400 rounded p-3">Right</div>
        </Stack>
        <Stack direction="horizontal" gap="lg" justify="center">
          <div className="bg-yellow-100 border border-yellow-400 rounded p-3">Item A</div>
          <div className="bg-yellow-100 border border-yellow-400 rounded p-3">Item B</div>
        </Stack>
      </>
    ),
  },
};

