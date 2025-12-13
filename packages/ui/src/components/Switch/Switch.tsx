import React from 'react';
import { cn } from '../../utils/cn';
import { INTERACTIVE_BASE } from '../../utils/a11yClasses';

export interface SwitchProps {
  /** Switch state (controlled) */
  checked: boolean;
  /** Called when switch toggles */
  onChange: (checked: boolean) => void;
  /** Optional label */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional id */
  id?: string;
  /** Optional name */
  name?: string;
  /** Additional class names */
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  id,
  name,
  className,
}) => {
  const sizes = {
    sm: { track: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4' },
    md: { track: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5' },
    lg: { track: 'h-7 w-14', thumb: 'h-6 w-6', translate: 'translate-x-7' },
  } as const;

  const s = sizes[size];

  return (
    <label className={cn('inline-flex items-center gap-2', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button
        id={id}
        name={name}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          'relative inline-flex shrink-0 rounded-full border border-transparent',
          s.track,
          checked ? 'bg-blue-600' : 'bg-gray-200',
          INTERACTIVE_BASE,
        )}
        onClick={() => onChange(!checked)}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow transform transition-transform',
            s.thumb,
            checked ? s.translate : 'translate-x-1',
          )}
        />
      </button>
      {label ? <span className="text-sm text-gray-900 select-none">{label}</span> : null}
    </label>
  );
};


