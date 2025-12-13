import React, { useMemo } from 'react';
import { cn } from '../../utils/cn';

export type MaskToken = string | RegExp;

export interface MaskedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Formatted value (controlled) */
  value: string;
  /**
   * Called with formatted and raw values.
   * `rawValue` contains only characters that match placeholder tokens in the mask.
   */
  onChange: (value: string, rawValue: string) => void;
  /** Mask definition */
  mask: string | MaskToken[];
  /** Placeholder char for string masks (default: '_') */
  maskChar?: string;
  /** Whether to show mask placeholders (default: false) */
  showMask?: boolean;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
}

const DIGIT = /\d/;

function normalizeMask(mask: string | MaskToken[]): MaskToken[] {
  if (Array.isArray(mask)) return mask;
  // String mask: use '9' as digit placeholder, everything else literal.
  return mask.split('').map((ch) => (ch === '9' ? DIGIT : ch));
}

function applyMask(raw: string, tokens: MaskToken[], maskChar: string, showMask: boolean) {
  let rawIndex = 0;
  let formatted = '';
  let usedRaw = '';

  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (typeof t === 'string') {
      formatted += t;
      continue;
    }

    // find next raw char that matches this token
    let matched: string | null = null;
    while (rawIndex < raw.length) {
      const ch = raw[rawIndex];
      rawIndex += 1;
      if (t.test(ch)) {
        matched = ch;
        break;
      }
    }

    if (matched) {
      formatted += matched;
      usedRaw += matched;
    } else if (showMask) {
      formatted += maskChar;
    } else {
      // stop early if we don't show mask and there is no more input
      break;
    }
  }

  return { formatted, rawValue: usedRaw };
}

function extractRawFromFormatted(formatted: string, tokens: MaskToken[]) {
  // Pull out only characters in formatted positions where token is RegExp.
  let raw = '';
  let fi = 0;
  for (let i = 0; i < tokens.length && fi < formatted.length; i += 1) {
    const t = tokens[i];
    const ch = formatted[fi];
    fi += 1;
    if (typeof t === 'string') continue;
    if (t.test(ch)) raw += ch;
  }
  return raw;
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
  value,
  onChange,
  mask,
  maskChar = '_',
  showMask = false,
  label,
  error,
  className,
  id,
  name,
  disabled,
  ...props
}) => {
  const tokens = useMemo(() => normalizeMask(mask), [mask]);
  const inputId = id || name;

  const rawValue = useMemo(() => extractRawFromFormatted(value, tokens), [value, tokens]);
  const masked = useMemo(() => applyMask(rawValue, tokens, maskChar, showMask).formatted, [rawValue, tokens, maskChar, showMask]);

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        name={name}
        disabled={disabled}
        value={masked}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus:ring-red-500' : '',
          className,
        )}
        onChange={(e) => {
          const nextRaw = e.target.value.replace(/\W/g, '');
          const next = applyMask(nextRaw, tokens, maskChar, showMask);
          onChange(next.formatted, next.rawValue);
        }}
        {...props}
      />

      {error ? (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};


