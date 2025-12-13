import React, { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'destructive';
  submenu?: MenuItem[];
}

export interface MenuProps {
  /** Trigger element */
  trigger: ReactNode;
  /** Menu items */
  items: MenuItem[];
  /** Position of the menu */
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Callback when item is clicked */
  onItemClick?: (item: MenuItem) => void;
}

/**
 * Menu/Dropdown component with keyboard navigation support.
 * 
 * @example
 * <Menu
 *   trigger={<Button>Menu</Button>}
 *   items={[
 *     { id: '1', label: 'Edit', onClick: handleEdit },
 *     { id: '2', label: 'Delete', variant: 'destructive', onClick: handleDelete },
 *   ]}
 * />
 */
export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  placement = 'bottom-left',
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const placementClasses = {
    'bottom-left': 'left-0 top-full mt-2',
    'bottom-right': 'right-0 top-full mt-2',
    'top-left': 'left-0 bottom-full mb-2',
    'top-right': 'right-0 bottom-full mb-2',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) {
          const item = items[activeIndex];
          item.onClick?.();
          onItemClick?.(item);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const renderMenuItems = (menuItems: MenuItem[], depth = 0) => (
    <div className="py-1">
      {menuItems.map((item, index) => (
        <div key={item.id}>
          <button
            onClick={() => {
              if (!item.submenu) {
                item.onClick?.();
                onItemClick?.(item);
                setIsOpen(false);
              } else {
                setOpenSubmenu(openSubmenu === item.id ? null : item.id);
              }
            }}
            onMouseEnter={() => setActiveIndex(index)}
            disabled={item.disabled}
            className={cn(
              'w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors',
              item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer',
              item.variant === 'destructive' ? 'text-red-600 hover:bg-red-50' : 'text-gray-700',
              activeIndex === index && 'bg-gray-100',
              FOCUS_RING
            )}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.submenu && <ChevronDown className="w-4 h-4" />}
          </button>
          {item.submenu && openSubmenu === item.id && (
            <div className="ml-4 bg-gray-50">
              {renderMenuItems(item.submenu, depth + 1)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={FOCUS_RING}
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 min-w-48 bg-white rounded-md shadow-lg border border-gray-200',
              placementClasses[placement]
            )}
            role="menu"
            onKeyDown={handleKeyDown}
            onBlur={() => setIsOpen(false)}
          >
            {renderMenuItems(items)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Menu.displayName = 'Menu';

// Export as Dropdown alias for backward compatibility
export const Dropdown = Menu;

