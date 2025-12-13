import React, { useEffect, useMemo, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label shown above textarea */
  label?: string;
  /** Error message below textarea */
  error?: string;
  /** Helper text below textarea (hidden if error exists) */
  helperText?: string;
  /** Show character count */
  showCount?: boolean;
  /** Auto-resize height to content */
  autoResize?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  showCount = false,
  autoResize = false,
  className,
  id,
  name,
  value,
  defaultValue,
  onChange,
  maxLength,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const textareaId = id || name;

  const currentLength = useMemo(() => {
    if (typeof value === 'string') return value.length;
    if (typeof defaultValue === 'string') return defaultValue.length;
    return 0;
  }, [value, defaultValue]);

  useEffect(() => {
    if (!autoResize) return;
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize, value]);

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      ) : null}

      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={
          error ? `${textareaId}-error` : helperText || showCount ? `${textareaId}-help` : undefined
        }
        className={cn(
          'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus:ring-red-500' : '',
          autoResize ? 'resize-none overflow-hidden' : 'resize-y',
          className,
        )}
        onChange={onChange}
        {...props}
      />

      <div className="mt-1 flex items-start justify-between gap-3">
        <div className="min-h-[1.25rem]">
          {error ? (
            <p id={`${textareaId}-error`} className="text-sm text-red-600">
              {error}
            </p>
          ) : helperText ? (
            <p id={`${textareaId}-help`} className="text-sm text-gray-500">
              {helperText}
            </p>
          ) : null}
        </div>

        {showCount ? (
          <p id={`${textareaId}-help`} className="text-sm text-gray-500 tabular-nums">
            {typeof maxLength === 'number' ? `${currentLength}/${maxLength}` : `${currentLength}`}
          </p>
        ) : null}
      </div>
    </div>
  );
};


