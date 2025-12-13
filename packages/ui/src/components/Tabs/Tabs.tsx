import React, { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'line' | 'card';
}

/**
 * Tabs component for tabbed content navigation.
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  variant = 'line',
}) => {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || tabs[0]?.id || ''
  );

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <div className="w-full">
      <div
        role="tablist"
        className={cn(
          'flex border-b border-gray-200',
          variant === 'card' && 'gap-2 border-b-0'
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              'px-4 py-2 font-medium text-sm transition-colors',
              activeTabId === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900',
              tab.disabled && 'opacity-50 cursor-not-allowed',
              variant === 'card' && (
                activeTabId === tab.id
                  ? 'bg-white border border-gray-300 rounded-t-md'
                  : 'bg-gray-100 rounded-t-md'
              ),
              FOCUS_RING
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab && (
        <div
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          className={cn(
            'p-4',
            variant === 'card' && 'bg-white border border-gray-300 border-t-0 rounded-b-md'
          )}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';

