import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, Skeleton } from './Spinner';

const spinnerMeta: Meta<typeof Spinner> = {
  title: 'Patterns/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export default spinnerMeta;
type SpinnerStory = StoryObj<typeof Spinner>;

export const Default: SpinnerStory = {
  args: { size: 'md' },
};

export const Sizes: SpinnerStory = {
  render: () => (
    <div className="flex gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

const skeletonMeta: Meta<typeof Skeleton> = {
  title: 'Patterns/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

type SkeletonStory = StoryObj<typeof Skeleton>;

export const SkeletonDefault: SkeletonStory = {
  args: { width: '100%', height: '1rem' },
};

export const SkeletonCircle: SkeletonStory = {
  args: { width: '40px', height: '40px', circle: true },
};

