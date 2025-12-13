import React from 'react';
import { cn } from '../../utils/cn';

export interface ColumnCustomizerItem {
  id: string;
  label: string;
  canHide: boolean;
  isVisible: boolean;
}

export interface ColumnCustomizerProps {
  columns: ColumnCustomizerItem[];
  onToggleColumn: (columnId: string, visible: boolean) => void;
  columnOrder?: string[];
  onMoveColumn?: (columnId: string, direction: 'up' | 'down') => void;
  className?: string;
}

export const ColumnCustomizer: React.FC<ColumnCustomizerProps> = ({
  columns,
  onToggleColumn,
  onMoveColumn,
  className,
}) => {
  return (
    <div className={cn('rounded-md border border-gray-200 bg-white p-3', className)}>
      <div className="mb-2 text-sm font-medium text-gray-700">Columns</div>
      <div className="space-y-2">
        {columns.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-2">
            <label className={cn('flex items-center gap-2 text-sm', !c.canHide && 'opacity-70')}>
              <input
                type="checkbox"
                checked={c.isVisible}
                disabled={!c.canHide}
                onChange={(e) => onToggleColumn(c.id, e.target.checked)}
              />
              <span className="text-gray-900">{c.label}</span>
            </label>

            {onMoveColumn ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="h-8 w-8 rounded border border-gray-200 text-sm hover:bg-gray-50"
                  onClick={() => onMoveColumn(c.id, 'up')}
                  aria-label={`Move ${c.label} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="h-8 w-8 rounded border border-gray-200 text-sm hover:bg-gray-50"
                  onClick={() => onMoveColumn(c.id, 'down')}
                  aria-label={`Move ${c.label} down`}
                >
                  ↓
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};


