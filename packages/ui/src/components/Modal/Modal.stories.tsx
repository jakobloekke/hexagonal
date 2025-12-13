import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Patterns/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    closeOnBackdropClick: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
        >
          <p>This is a modal dialog. Click the X button or press ESC to close.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Actions</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>Are you sure you want to proceed?</p>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Long Content"
          size="lg"
        >
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);

    return (
      <div className="space-y-4">
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size}>
            <Button onClick={() => setOpenSize(size)}>
              Open {size.toUpperCase()} Modal
            </Button>
            <Modal
              isOpen={openSize === size}
              onClose={() => setOpenSize(null)}
              title={`${size.toUpperCase()} Modal`}
              size={size}
            >
              <p>This is a {size} modal.</p>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
};

export const NoCloseButton: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Close Button"
          showCloseButton={false}
          footer={
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          }
        >
          <p>This modal has no X button. Use the footer button to close.</p>
        </Modal>
      </>
    );
  },
};

