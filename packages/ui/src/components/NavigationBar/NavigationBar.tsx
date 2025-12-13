import React, { HTMLAttributes, useState } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {
  /** Logo or brand element */
  logo?: React.ReactNode;
  /** Navigation items */
  items?: NavigationItem[];
  /** Right-side action element (e.g., button) */
  actions?: React.ReactNode;
  /** Whether the navbar should be sticky */
  sticky?: boolean;
  /** Background color variant */
  variant?: 'light' | 'dark';
  /** Callback when a nav item is clicked */
  onItemClick?: (item: NavigationItem) => void;
}

/**
 * NavigationBar component for app header with responsive mobile menu.
 * Includes mobile hamburger menu with Framer Motion animation.
 * 
 * @example
 * <NavigationBar
 *   logo={<img src="/logo.png" alt="Logo" />}
 *   items={[
 *     { id: '1', label: 'Home', href: '/', active: true },
 *     { id: '2', label: 'About', href: '/about' },
 *   ]}
 *   sticky
 * />
 */
export const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(
  (
    {
      logo,
      items = [],
      actions,
      sticky = false,
      variant = 'light',
      onItemClick,
      className,
      ...props
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const bgClasses = {
      light: 'bg-white border-b border-gray-200',
      dark: 'bg-gray-900 border-b border-gray-800',
    };

    const textClasses = {
      light: 'text-gray-900',
      dark: 'text-white',
    };

    const handleItemClick = (item: NavigationItem) => {
      onItemClick?.(item);
      setMobileMenuOpen(false);
    };

    return (
      <nav
        ref={ref}
        className={cn(
          'w-full',
          bgClasses[variant],
          sticky && 'sticky top-0 z-50',
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {logo}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                    handleItemClick(item);
                  }}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    item.active
                      ? cn('text-blue-600', variant === 'dark' && 'text-blue-400')
                      : cn(textClasses[variant], 'hover:text-gray-600'),
                    FOCUS_RING
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">{actions}</div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-md',
                  FOCUS_RING,
                  variant === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                )}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className={cn('w-6 h-6', textClasses[variant])} />
                ) : (
                  <MenuIcon className={cn('w-6 h-6', textClasses[variant])} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'lg:hidden overflow-hidden border-t',
                  variant === 'light' ? 'border-gray-200' : 'border-gray-800'
                )}
              >
                <div className={cn('px-4 pt-2 pb-3 space-y-1', bgClasses[variant])}>
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={item.href || '#'}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        handleItemClick(item);
                      }}
                      className={cn(
                        'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                        item.active
                          ? cn('bg-blue-50 text-blue-600', variant === 'dark' && 'bg-gray-800 text-blue-400')
                          : cn(textClasses[variant], 'hover:bg-gray-100', variant === 'dark' && 'hover:bg-gray-800')
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                  {actions && (
                    <>
                      <div className="border-t border-gray-200 my-2" />
                      <div className="px-3 py-2">{actions}</div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    );
  }
);

NavigationBar.displayName = 'NavigationBar';

