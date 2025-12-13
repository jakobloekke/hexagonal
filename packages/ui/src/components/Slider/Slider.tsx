import React from 'react';
import { cn } from '../../utils/cn';

export interface SliderProps {
  /** Controlled value (single) or tuple (range) */
  value: number | [number, number];
  /** Called when the value changes */
  onChange: (value: number | [number, number]) => void;
  /** Min value */
  min?: number;
  /** Max value */
  max?: number;
  /** Step */
  step?: number;
  /** Optional label */
  label?: string;
  /** Show numeric value(s) */
  showValue?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  disabled = false,
  className,
}) => {
  const isRange = Array.isArray(value);

  const single = typeof value === 'number' ? value : value[0];
  const rangeA = isRange ? value[0] : single;
  const rangeB = isRange ? value[1] : single;

  const handleSingle = (next: number) => onChange(clamp(next, min, max));

  const handleRangeA = (next: number) => {
    const a = clamp(next, min, max);
    const b = clamp(rangeB, min, max);
    onChange([Math.min(a, b), Math.max(a, b)]);
  };

  const handleRangeB = (next: number) => {
    const a = clamp(rangeA, min, max);
    const b = clamp(next, min, max);
    onChange([Math.min(a, b), Math.max(a, b)]);
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label ? <span className="text-sm font-medium text-gray-700">{label}</span> : <span />}
          {showValue ? (
            <span className="text-sm text-gray-600">
              {isRange ? `${rangeA} – ${rangeB}` : `${single}`}
            </span>
          ) : null}
        </div>
      )}

      <div className="relative">
        {/* Track */}
        <div className="h-2 w-full rounded-full bg-gray-200" />

        {/* Active range */}
        <div
          className="absolute top-0 h-2 rounded-full bg-blue-600"
          style={{
            left: `${((rangeA - min) / (max - min)) * 100}%`,
            width: `${((rangeB - rangeA) / (max - min)) * 100}%`,
          }}
        />

        {/* Inputs */}
        {!isRange ? (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={single}
            disabled={disabled}
            aria-label={label ?? 'Slider'}
            className={cn(
              'absolute top-[-6px] left-0 w-full bg-transparent',
              'appearance-none',
              'focus:outline-none',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              // thumb
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow',
              '[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300',
              '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-300',
            )}
            onChange={(e) => handleSingle(Number(e.target.value))}
          />
        ) : (
          <>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={rangeA}
              disabled={disabled}
              aria-label={(label ? `${label} (min)` : 'Range min')}
              className={cn(
                'absolute top-[-6px] left-0 w-full bg-transparent appearance-none focus:outline-none',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow',
                '[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300',
                '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-300',
              )}
              onChange={(e) => handleRangeA(Number(e.target.value))}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={rangeB}
              disabled={disabled}
              aria-label={(label ? `${label} (max)` : 'Range max')}
              className={cn(
                'absolute top-[-6px] left-0 w-full bg-transparent appearance-none focus:outline-none',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow',
                '[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300',
                '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-300',
              )}
              onChange={(e) => handleRangeB(Number(e.target.value))}
            />
          </>
        )}
      </div>
    </div>
  );
};


