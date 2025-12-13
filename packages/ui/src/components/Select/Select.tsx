import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { INTERACTIVE_BASE } from '../../utils/a11yClasses';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Controlled selected value(s) */
  value?: string | number | Array<string | number>;
  /** Called when selection changes */
  onChange: (value: string | number | Array<string | number>) => void;
  /** Options */
  options: SelectOption[];
  /** Placeholder shown when empty */
  placeholder?: string;
  /** Label shown above */
  label?: string;
  /** Error message */
  error?: string;
  /** Disabled */
  disabled?: boolean;
  /** Searchable */
  searchable?: boolean;
  /** Multiple selection */
  multiple?: boolean;
  /** Async search */
  onSearch?: (query: string) => Promise<SelectOption[]>;
  /** Loading state */
  isLoading?: boolean;
  /** Additional class names */
  className?: string;
}

function isSelected(value: SelectProps['value'], v: string | number) {
  if (Array.isArray(value)) return value.includes(v);
  return value === v;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  label,
  error,
  disabled = false,
  searchable = false,
  multiple = false,
  onSearch,
  isLoading: isLoadingProp,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [asyncOptions, setAsyncOptions] = useState<SelectOption[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const resolvedOptions = asyncOptions ?? options;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!searchable || !q) return resolvedOptions;
    return resolvedOptions.filter((o) => o.label.toLowerCase().includes(q));
  }, [resolvedOptions, query, searchable]);

  const isLoading = Boolean(isLoadingProp) || isSearching;

  const selectedLabels = useMemo(() => {
    if (value == null) return [];
    if (Array.isArray(value)) {
      return resolvedOptions.filter((o) => value.includes(o.value)).map((o) => o.label);
    }
    const found = resolvedOptions.find((o) => o.value === value);
    return found ? [found.label] : [];
  }, [value, resolvedOptions]);

  useEffect(() => {
    if (!isOpen) return;
    if (searchable) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setTimeout(() => listRef.current?.focus(), 0);
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (!onSearch) return;
    if (!isOpen) return;
    const q = query.trim();
    let cancelled = false;
    setIsSearching(true);
    onSearch(q)
      .then((next) => {
        if (cancelled) return;
        setAsyncOptions(next);
      })
      .finally(() => {
        if (!cancelled) setIsSearching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, onSearch, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t)) return;
      if (listRef.current?.contains(t)) return;
      if (inputRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isOpen]);

  const selectOption = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (!multiple) {
      onChange(opt.value);
      setIsOpen(false);
      return;
    }
    const current = Array.isArray(value) ? value : [];
    const next = current.includes(opt.value)
      ? current.filter((v) => v !== opt.value)
      : [...current, opt.value];
    onChange(next);
  };

  const onKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filtered[activeIndex];
      if (opt) selectOption(opt);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {label ? <div className="mb-1 text-sm font-medium text-gray-700">{label}</div> : null}

      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        className={cn(
          'w-full rounded-md border bg-white px-3 py-2 text-left text-sm',
          'border-gray-300',
          INTERACTIVE_BASE,
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          error ? 'border-red-500' : '',
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={Boolean(error) || undefined}
        onClick={() => setIsOpen((v) => !v)}
      >
        {selectedLabels.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : multiple ? (
          <span className="text-gray-900">{selectedLabels.join(', ')}</span>
        ) : (
          <span className="text-gray-900">{selectedLabels[0]}</span>
        )}
      </button>

      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}

      {isOpen ? (
        <div className="relative mt-2">
          <div className="absolute z-50 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {searchable ? (
              <div className="p-2">
                <input
                  ref={inputRef}
                  className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      listRef.current?.focus();
                    }
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      setIsOpen(false);
                      buttonRef.current?.focus();
                    }
                  }}
                />
              </div>
            ) : null}

            <ul
              ref={listRef}
              tabIndex={0}
              role="listbox"
              className="max-h-64 overflow-auto p-1 outline-none"
              onKeyDown={onKeyDownList}
            >
              {isLoading ? (
                <li className="px-3 py-2 text-sm text-gray-500">Loading…</li>
              ) : filtered.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500">No results</li>
              ) : (
                filtered.map((opt, idx) => {
                  const active = idx === activeIndex;
                  const selected = isSelected(value, opt.value);
                  return (
                    <li
                      key={String(opt.value)}
                      role="option"
                      aria-selected={selected}
                      className={cn(
                        'cursor-pointer select-none rounded px-3 py-2 text-sm',
                        active ? 'bg-blue-50' : '',
                        opt.disabled ? 'opacity-50 cursor-not-allowed' : '',
                      )}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectOption(opt)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{opt.label}</span>
                        {selected ? <span className="text-blue-600">✓</span> : null}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};


