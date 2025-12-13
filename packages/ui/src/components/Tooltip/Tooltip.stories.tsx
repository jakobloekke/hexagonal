import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { Info } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Patterns/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
    },
    delayMs: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    placement: 'top',
    content: 'This is a tooltip at the top',
    children: <Button>Hover me</Button>,
  },
};

export const Bottom: Story = {
  args: {
    placement: 'bottom',
    content: 'This is a tooltip at the bottom',
    children: <Button>Hover me</Button>,
  },
};

export const Left: Story = {
  args: {
    placement: 'left',
    content: 'Left tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Right: Story = {
  args: {
    placement: 'right',
    content: 'Right tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <Tooltip placement="top" content="Top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip placement="bottom" content="Bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip placement="left" content="Left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip placement="right" content="Right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    placement: 'top',
    content: 'Help information',
    children: <Info className="w-5 h-5 text-blue-500 cursor-help" />,
  },
};

export const LongContent: Story = {
  args: {
    placement: 'bottom',
    content: 'This is a longer tooltip with more detailed information about the feature.',
    children: <Button>Hover for details</Button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    placement: 'top',
    content: 'Click to toggle tooltip',
    children: <Button>Click me</Button>,
  },
};

