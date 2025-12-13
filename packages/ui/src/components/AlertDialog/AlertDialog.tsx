import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';
import { AnimatePresence, motion } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { AlertCircle, CheckCircle, AlertTriangle, InfoIcon, X } from 'lucide-react';

export interface AlertDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Dialog title */
  title: ReactNode;
  /** Dialog description/message */
  description?: ReactNode;
  /** Severity variant */
  severity?: 'info' | 'warning' | 'error' | 'success';
  /** Confirm button label */
  confirmLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Callback when confirm is clicked */
  onConfirm?: () => void;
  /** Whether confirm button is destructive */
  isDestructive?: boolean;
}

const severityIcons = {
  info: <InfoIcon className="w-6 h-6 text-blue-500" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
  error: <AlertCircle className="w-6 h-6 text-red-500" />,
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
};

const severityColors = {
  info: 'bg-blue-50 border-blue-200',
  warning: 'bg-yellow-50 border-yellow-200',
  error: 'bg-red-50 border-red-200',
  success: 'bg-green-50 border-green-200',
};

/**
 * AlertDialog component for confirmations and alerts.
 * 
 * @example
 * <AlertDialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Delete User"
 *   description="This action cannot be undone."
 *   severity="error"
 *   confirmLabel="Delete"
 *   onConfirm={handleDelete}
 * />
 */
export const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  severity = 'info',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isDestructive = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="alert-title"
              aria-describedby="alert-description"
              className={cn(
                'relative bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 border-l-4',
                severity === 'info' && 'border-l-blue-500',
                severity === 'warning' && 'border-l-yellow-500',
                severity === 'error' && 'border-l-red-500',
                severity === 'success' && 'border-l-green-500'
              )}
            >
              {/* Header with icon */}
              <div className={cn('p-6 flex items-start gap-4', severityColors[severity])}>
                <div className="flex-shrink-0">
                  {severityIcons[severity]}
                </div>
                <div className="flex-1">
                  <h2 id="alert-title" className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                  {description && (
                    <p id="alert-description" className="mt-1 text-sm text-gray-600">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className={cn(
                    'p-1 text-gray-400 hover:text-gray-600 rounded-md',
                    FOCUS_RING
                  )}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium',
                    'text-gray-700 bg-white border border-gray-300',
                    'hover:bg-gray-50',
                    FOCUS_RING
                  )}
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => {
                    onConfirm?.();
                    onClose();
                  }}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium text-white',
                    isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700',
                    FOCUS_RING
                  )}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
};

AlertDialog.displayName = 'AlertDialog';

