import React, { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import { INTERACTIVE_BASE } from '../../utils/a11yClasses';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'checked'> {
  /** Checked state (controlled) */
  checked?: boolean;
  /** Called when checked changes */
  onChange?: (checked: boolean) => void;
  /** Indeterminate state (visual only; still controlled by `checked`) */
  indeterminate?: boolean;
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Error message displayed below the checkbox */
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  error,
  disabled,
  className,
  id,
  name,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = id || name;

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = Boolean(indeterminate) && !checked;
  }, [indeterminate, checked]);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-start gap-2">
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="checkbox"
          className={cn(
            'mt-0.5 h-4 w-4 rounded border border-gray-300 bg-white text-blue-600',
            'focus:ring-0', // focus ring comes from INTERACTIVE_BASE on wrapper
          )}
          checked={checked}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          onChange={(e) => onChange?.(e.target.checked)}
          {...props}
        />

        {label ? (
          <label
            htmlFor={inputId}
            className={cn(
              'select-none text-sm text-gray-900',
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
              INTERACTIVE_BASE,
            )}
          >
            {label}
          </label>
        ) : null}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};


