import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MaskedInput } from './MaskedInput';

const meta: Meta<typeof MaskedInput> = {
  title: 'Forms/MaskedInput',
  component: MaskedInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

export const Phone: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <MaskedInput
        label="Phone"
        placeholder="(555) 123-4567"
        value={value}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        onChange={(formatted) => setValue(formatted)}
        showMask
      />
    );
  },
};

export const CreditCard: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <MaskedInput
        label="Card"
        value={value}
        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
        onChange={(formatted) => setValue(formatted)}
        showMask
      />
    );
  },
};

export const CustomStringMask: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <MaskedInput
        label="SSN"
        value={value}
        mask={'999-99-9999'}
        onChange={(formatted) => setValue(formatted)}
        showMask
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <MaskedInput
      label="Disabled"
      value="123-45-6789"
      mask="999-99-9999"
      onChange={() => {}}
      disabled
      showMask
    />
  ),
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <MaskedInput
        label="Phone"
        value={value}
        mask="(999) 999-9999"
        onChange={(formatted) => setValue(formatted)}
        error="Invalid phone number"
        showMask
      />
    );
  },
};


