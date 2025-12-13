import React, { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpenId?: string | string[];
}

/**
 * Accordion component for expandable sections with Framer Motion animations.
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultOpenId,
}) => {
  const initialOpen = Array.isArray(defaultOpenId)
    ? defaultOpenId
    : defaultOpenId
      ? [defaultOpenId]
      : [];
  const [openIds, setOpenIds] = useState<string[]>(initialOpen);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((openId) => openId !== id);
      }
      if (multiple) {
        return [...prev, id];
      }
      return [id];
    });
  };

  return (
    <div className="space-y-2 border border-gray-200 rounded-lg divide-y divide-gray-200">
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => toggleItem(item.id)}
            disabled={item.disabled}
            className={cn(
              'w-full px-4 py-3 flex items-center justify-between text-left font-medium transition-colors',
              openIds.includes(item.id) ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50',
              item.disabled && 'opacity-50 cursor-not-allowed',
              FOCUS_RING
            )}
          >
            {item.label}
            <motion.div
              animate={{ rotate: openIds.includes(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIds.includes(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-3 text-gray-600">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

Accordion.displayName = 'Accordion';

