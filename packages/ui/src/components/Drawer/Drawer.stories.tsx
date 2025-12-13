import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
  title: 'Patterns/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    closeOnBackdropClick: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const LeftDrawer: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Left Sidebar"
          position="left"
        >
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Analytics</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Settings</a>
          </nav>
        </Drawer>
      </>
    );
  },
};

export const RightDrawer: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Notifications"
          position="right"
        >
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded">Notification 1</div>
            <div className="p-3 bg-blue-50 rounded">Notification 2</div>
            <div className="p-3 bg-blue-50 rounded">Notification 3</div>
          </div>
        </Drawer>
      </>
    );
  },
};

export const TopDrawer: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Top Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Search"
          position="top"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </Drawer>
      </>
    );
  },
};

export const BottomDrawer: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Filters"
          position="bottom"
        >
          <div className="space-y-3">
            <label className="block">
              <input type="checkbox" /> Filter Option 1
            </label>
            <label className="block">
              <input type="checkbox" /> Filter Option 2
            </label>
          </div>
        </Drawer>
      </>
    );
  },
};

