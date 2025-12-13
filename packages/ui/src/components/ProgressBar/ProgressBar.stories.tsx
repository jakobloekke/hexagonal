import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Patterns/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 50, max: 100 },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <ProgressBar value={25} variant="default" showLabel />
      <ProgressBar value={50} variant="success" showLabel />
      <ProgressBar value={75} variant="warning" showLabel />
      <ProgressBar value={100} variant="error" showLabel />
    </div>
  ),
};

