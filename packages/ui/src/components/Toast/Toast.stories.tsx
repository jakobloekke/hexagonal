import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Patterns/Toast',
  tags: ['autodocs'],
};

export default meta;

const ToastDemo = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-4">
      <Button
        onClick={() =>
          addToast({
            title: 'Success',
            description: 'Operation completed successfully',
            severity: 'success',
            duration: 3000,
          })
        }
      >
        Success Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Error',
            description: 'Something went wrong',
            severity: 'error',
            duration: 3000,
          })
        }
      >
        Error Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Warning',
            description: 'Please be careful',
            severity: 'warning',
            duration: 3000,
          })
        }
      >
        Warning Toast
      </Button>
      <Button
        onClick={() =>
          addToast({
            description: 'Just a note',
            severity: 'info',
            duration: 3000,
          })
        }
      >
        Info Toast
      </Button>
    </div>
  );
};

export const Default: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

