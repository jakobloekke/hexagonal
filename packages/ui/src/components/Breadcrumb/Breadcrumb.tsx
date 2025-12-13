import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
}) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center gap-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          {item.current ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <a
              href={item.href || '#'}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              {item.label}
            </a>
          )}
          {index < items.length - 1 && <span>{separator}</span>}
        </li>
      ))}
    </ol>
  </nav>
);

Breadcrumb.displayName = 'Breadcrumb';

