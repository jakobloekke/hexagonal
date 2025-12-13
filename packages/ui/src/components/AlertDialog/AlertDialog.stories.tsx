import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './AlertDialog';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof AlertDialog> = {
  title: 'Patterns/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    severity: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
    },
    isDestructive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Info: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Info Alert</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Information"
          description="This is an informational alert dialog."
          severity="info"
          confirmLabel="OK"
          cancelLabel=""
        />
      </>
    );
  },
};

export const Warning: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Warning</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Warning"
          description="Please be careful with this action."
          severity="warning"
          confirmLabel="Continue"
        />
      </>
    );
  },
};

export const Error: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Error</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Error"
          description="Something went wrong. Please try again."
          severity="error"
          confirmLabel="Retry"
        />
      </>
    );
  },
};

export const Success: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Success</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Success"
          description="Your action was completed successfully."
          severity="success"
          confirmLabel="Done"
          cancelLabel=""
        />
      </>
    );
  },
};

export const DestructiveAction: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">Delete Item</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Item"
          description="This action cannot be undone. Are you sure?"
          severity="error"
          confirmLabel="Delete"
          isDestructive={true}
          onConfirm={() => console.log('Item deleted')}
        />
      </>
    );
  },
};

export const Confirmation: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState('');
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Confirm Action</Button>
        {result && <p className="mt-4 text-sm text-gray-600">{result}</p>}
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setResult('');
          }}
          title="Save Changes"
          description="Do you want to save your changes before leaving?"
          severity="warning"
          confirmLabel="Save"
          cancelLabel="Don't Save"
          onConfirm={() => setResult('Changes saved!')}
        />
      </>
    );
  },
};

