import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { Button } from '../Button/Button';
import { Edit, Trash2, Copy, Share2 } from 'lucide-react';

const meta: Meta<typeof Menu> = {
  title: 'Patterns/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    trigger: <Button>Menu</Button>,
    items: [
      { id: '1', label: 'Edit' },
      { id: '2', label: 'Copy' },
      { id: '3', label: 'Delete', variant: 'destructive' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <Button>Actions</Button>,
    items: [
      { id: '1', label: 'Edit', icon: <Edit className="w-4 h-4" /> },
      { id: '2', label: 'Copy', icon: <Copy className="w-4 h-4" /> },
      { id: '3', label: 'Share', icon: <Share2 className="w-4 h-4" /> },
      { id: '4', label: 'Delete', icon: <Trash2 className="w-4 h-4" />, variant: 'destructive' },
    ],
  },
};

export const WithSubmenus: Story = {
  args: {
    trigger: <Button>File</Button>,
    items: [
      {
        id: '1',
        label: 'New',
        submenu: [
          { id: '1-1', label: 'Document' },
          { id: '1-2', label: 'Spreadsheet' },
          { id: '1-3', label: 'Presentation' },
        ],
      },
      { id: '2', label: 'Open' },
      { id: '3', label: 'Save' },
      { id: '4', label: 'Exit', variant: 'destructive' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    trigger: <Button>Options</Button>,
    items: [
      { id: '1', label: 'Enabled' },
      { id: '2', label: 'Disabled', disabled: true },
      { id: '3', label: 'Also Enabled' },
    ],
  },
};

export const ContextMenu: Story = {
  args: {
    trigger: <Button variant="outline">Right-click simulation</Button>,
    placement: 'bottom-right',
    items: [
      { id: '1', label: 'Cut' },
      { id: '2', label: 'Copy' },
      { id: '3', label: 'Paste' },
      { id: '4', label: 'Delete', variant: 'destructive' },
    ],
  },
};

