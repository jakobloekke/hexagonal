import type { Meta, StoryObj } from '@storybook/react';
import { NavigationBar } from './NavigationBar';
import { Button } from '../Button/Button';

const meta: Meta<typeof NavigationBar> = {
  title: 'Layout/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  argTypes: {
    sticky: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  decorators: [
    (Story: any) => (
      <div className="h-screen flex flex-col">
        <Story />
        <div className="flex-1 bg-gray-50 p-4">
          <p className="text-gray-600">Page content below navbar...</p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  args: {
    logo: (
      <div className="text-xl font-bold">SecondGen</div>
    ),
    items: [
      { id: '1', label: 'Home', href: '/', active: true },
      { id: '2', label: 'About', href: '/about' },
      { id: '3', label: 'Services', href: '/services' },
      { id: '4', label: 'Contact', href: '/contact' },
    ],
    actions: <Button size="sm">Sign In</Button>,
  },
};

export const DarkVariant: Story = {
  args: {
    variant: 'dark',
    logo: (
      <div className="text-xl font-bold text-white">SecondGen</div>
    ),
    items: [
      { id: '1', label: 'Dashboard', href: '/', active: true },
      { id: '2', label: 'Analytics', href: '/analytics' },
      { id: '3', label: 'Settings', href: '/settings' },
    ],
    actions: <Button size="sm">Logout</Button>,
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
    logo: (
      <div className="text-lg font-bold">MyApp</div>
    ),
    items: [
      { id: '1', label: 'Products', href: '/' },
      { id: '2', label: 'Pricing', href: '/pricing' },
      { id: '3', label: 'Docs', href: '/docs' },
      { id: '4', label: 'Blog', href: '/blog' },
    ],
  },
  decorators: [
    (Story: any) => (
      <div className="h-screen flex flex-col overflow-y-auto">
        <Story />
        <div className="flex-1 bg-gray-50 p-8">
          <p className="text-gray-600 mb-4">
            Scroll down to see the sticky navbar in action...
          </p>
          {[...Array(20)].map((_, i) => (
            <p key={i} className="text-gray-600 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
};

export const ManyItems: Story = {
  args: {
    logo: (
      <div className="text-lg font-bold">Portal</div>
    ),
    items: [
      { id: '1', label: 'Home', href: '/', active: true },
      { id: '2', label: 'Products', href: '/products' },
      { id: '3', label: 'Solutions', href: '/solutions' },
      { id: '4', label: 'Resources', href: '/resources' },
      { id: '5', label: 'Pricing', href: '/pricing' },
      { id: '6', label: 'Docs', href: '/docs' },
      { id: '7', label: 'Support', href: '/support' },
    ],
    actions: <Button size="sm" variant="outline">Sign Up</Button>,
  },
};

export const MinimalNavigation: Story = {
  args: {
    logo: (
      <div className="text-xl font-bold text-blue-600">App</div>
    ),
    items: [
      { id: '1', label: 'Home', href: '/', active: true },
      { id: '2', label: 'Settings', href: '/settings' },
    ],
  },
};

export const NoLogo: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', href: '/', active: true },
      { id: '2', label: 'Features', href: '/features' },
      { id: '3', label: 'Pricing', href: '/pricing' },
    ],
    actions: <Button size="sm">Get Started</Button>,
  },
};

export const MobileResponsive: Story = {
  args: {
    logo: (
      <div className="text-lg font-bold">Brand</div>
    ),
    items: [
      { id: '1', label: 'Dashboard', href: '/', active: true },
      { id: '2', label: 'Projects', href: '/projects' },
      { id: '3', label: 'Team', href: '/team' },
      { id: '4', label: 'Settings', href: '/settings' },
    ],
    actions: <Button size="sm">Menu</Button>,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

