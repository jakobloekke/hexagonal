import React, { ReactNode } from 'react';

export interface CardProps {
  /** Optional header title */
  title?: string;
  /** Optional footer content (actions) */
  footer?: ReactNode;
  /** Main content */
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  footer,
  children,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

