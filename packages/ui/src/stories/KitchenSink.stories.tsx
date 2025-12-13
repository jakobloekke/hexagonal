import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Input } from '../components/Input/Input';

const meta: Meta = {
  title: 'Kitchen Sink',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">SecondGen UI - Kitchen Sink</h1>

      <Card title="Buttons" footer={<div className="flex gap-2"><Button size="sm">Primary</Button><Button size="sm" variant="secondary">Secondary</Button></div>}>
        <div className="flex gap-2 flex-wrap">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button isLoading>Loading</Button>
        </div>
      </Card>

      <Card title="Inputs">
        <div className="space-y-4">
          <Input label="Email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="With error" error="This field is required" placeholder="Try leaving me empty" />
        </div>
      </Card>
    </div>
  ),
};


