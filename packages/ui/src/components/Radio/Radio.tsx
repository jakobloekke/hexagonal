import React from 'react';
import { cn } from '../../utils/cn';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'checked'> {
  /** Checked state (controlled) */
  checked?: boolean;
  /** Called when checked changes */
  onChange?: (checked: boolean) => void;
  /** Label text displayed next to the radio */
  label?: string;
}

export const Radio: React.FC<RadioProps> = ({
  checked = false,
  onChange,
  label,
  disabled,
  className,
  id,
  name,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className={cn('flex items-start gap-2', className)}>
      <input
        id={inputId}
        name={name}
        type="radio"
        className="mt-0.5 h-4 w-4 border border-gray-300 text-blue-600"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        {...props}
      />
      {label ? (
        <label
          htmlFor={inputId}
          className={cn(
            'select-none text-sm text-gray-900',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};


