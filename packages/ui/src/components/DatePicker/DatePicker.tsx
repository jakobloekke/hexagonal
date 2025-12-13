import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { INTERACTIVE_BASE } from '../../utils/a11yClasses';

export interface DatePickerProps {
  /** Selected date (single mode) */
  value?: Date | null;
  /** Called when selected date changes (single mode) */
  onChange: (date: Date | null) => void;
  /** Min selectable date */
  min?: Date;
  /** Max selectable date */
  max?: Date;
  /** Locale for formatting */
  locale?: string;
  /** Placeholder */
  placeholder?: string;
  /** Label */
  label?: string;
  /** Error message */
  error?: string;
  /** Disabled */
  disabled?: boolean;

  /** Enable range mode */
  range?: boolean;
  /** Range start (controlled) */
  rangeStart?: Date;
  /** Range end (controlled) */
  rangeEnd?: Date;
  /** Called when range changes (optional, for controlled range mode) */
  onRangeChange?: (rangeStart: Date | null, rangeEnd: Date | null) => void;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBefore(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

function isAfter(a: Date, b: Date) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

function clampToMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
  locale = 'en-US',
  placeholder = 'Select date…',
  label,
  error,
  disabled = false,
  range = false,
  rangeStart,
  rangeEnd,
  onRangeChange,
}) => {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => clampToMonth(value ?? new Date()));
  const [focusedDate, setFocusedDate] = useState<Date>(() => startOfDay(value ?? new Date()));

  const [internalStart, setInternalStart] = useState<Date | null>(null);
  const [internalEnd, setInternalEnd] = useState<Date | null>(null);

  const start = range ? (rangeStart ?? internalStart) : null;
  const end = range ? (rangeEnd ?? internalEnd) : null;

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [locale],
  );

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewMonth),
    [locale, viewMonth],
  );

  const isDisabledDate = (d: Date) => {
    if (min && isBefore(d, min)) return true;
    if (max && isAfter(d, max)) return true;
    return false;
  };

  const displayValue = useMemo(() => {
    if (range) {
      if (start && end) return `${formatter.format(start)} – ${formatter.format(end)}`;
      if (start) return `${formatter.format(start)} – …`;
      return '';
    }
    return value ? formatter.format(value) : '';
  }, [range, start, end, value, formatter]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => gridRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t)) return;
      if (gridRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const selectDate = (d: Date) => {
    if (isDisabledDate(d)) return;
    if (!range) {
      onChange(d);
      setOpen(false);
      return;
    }

    const s = start;
    const e = end;
    if (!s || (s && e)) {
      // start new range
      if (onRangeChange) onRangeChange(d, null);
      else {
        setInternalStart(d);
        setInternalEnd(null);
      }
      return;
    }

    // set end
    const nextStart = isAfter(s, d) ? d : s;
    const nextEnd = isAfter(s, d) ? s : d;
    if (onRangeChange) onRangeChange(nextStart, nextEnd);
    else {
      setInternalStart(nextStart);
      setInternalEnd(nextEnd);
    }
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const totalDays = daysInMonth(year, month);
  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= totalDays; d += 1) cells.push(new Date(year, month, d));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
      return;
    }

    const move = (deltaDays: number) => {
      e.preventDefault();
      const next = new Date(focusedDate);
      next.setDate(next.getDate() + deltaDays);
      setFocusedDate(startOfDay(next));
      setViewMonth(clampToMonth(next));
    };

    if (e.key === 'ArrowLeft') return move(-1);
    if (e.key === 'ArrowRight') return move(1);
    if (e.key === 'ArrowUp') return move(-7);
    if (e.key === 'ArrowDown') return move(7);

    if (e.key === 'Enter') {
      e.preventDefault();
      selectDate(focusedDate);
    }
  };

  return (
    <div className="w-full">
      {label ? <div className="mb-1 text-sm font-medium text-gray-700">{label}</div> : null}

      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        className={cn(
          'w-full rounded-md border bg-white px-3 py-2 text-left text-sm',
          'border-gray-300',
          INTERACTIVE_BASE,
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          error ? 'border-red-500' : '',
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={Boolean(error) || undefined}
        onClick={() => {
          if (disabled) return;
          setOpen((v) => !v);
          const base = range ? (start ?? new Date()) : (value ?? new Date());
          setViewMonth(clampToMonth(base));
          setFocusedDate(startOfDay(base));
        }}
      >
        {displayValue ? <span className="text-gray-900">{displayValue}</span> : <span className="text-gray-400">{placeholder}</span>}
      </button>

      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}

      {open ? (
        <div className="relative mt-2">
          <div
            role="dialog"
            aria-label="Calendar"
            tabIndex={0}
            ref={gridRef}
            onKeyDown={onKeyDown}
            className="absolute z-50 w-full max-w-sm rounded-md border border-gray-200 bg-white p-3 shadow-lg outline-none"
          >
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                className="rounded px-2 py-1 text-sm hover:bg-gray-100"
                onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                aria-label="Previous month"
              >
                ‹
              </button>
              <div className="text-sm font-medium text-gray-900">{monthLabel}</div>
              <button
                type="button"
                className="rounded px-2 py-1 text-sm hover:bg-gray-100"
                onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div key={d} className="text-center py-1">
                  {d}
                </div>
              ))}
            </div>

            <div role="grid" aria-label="Calendar grid" className="grid grid-cols-7 gap-1">
              {cells.map((d, idx) => {
                if (!d) return <div key={idx} />;
                const day = startOfDay(d);
                const disabledDay = isDisabledDate(day);
                const isToday = isSameDay(day, startOfDay(new Date()));
                const isFocused = isSameDay(day, focusedDate);
                const isSelectedSingle = !range && value && isSameDay(day, startOfDay(value));
                const inRange = range && start && end && !isBefore(day, start) && !isAfter(day, end);
                const isStart = range && start && isSameDay(day, startOfDay(start));
                const isEnd = range && end && isSameDay(day, startOfDay(end));

                return (
                  <button
                    key={idx}
                    role="gridcell"
                    type="button"
                    disabled={disabledDay}
                    aria-selected={Boolean(isSelectedSingle || inRange || isStart || isEnd)}
                    className={cn(
                      'h-9 rounded text-sm',
                      disabledDay ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100',
                      isToday ? 'border border-gray-200' : '',
                      inRange ? 'bg-blue-50' : '',
                      isStart || isEnd || isSelectedSingle ? 'bg-blue-600 text-white hover:bg-blue-600' : '',
                      isFocused ? 'ring-2 ring-blue-500 ring-offset-2' : '',
                    )}
                    onMouseEnter={() => setFocusedDate(day)}
                    onClick={() => selectDate(day)}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            {range ? (
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:underline"
                  onClick={() => {
                    if (onRangeChange) onRangeChange(null, null);
                    else {
                      setInternalStart(null);
                      setInternalEnd(null);
                    }
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Done
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};


