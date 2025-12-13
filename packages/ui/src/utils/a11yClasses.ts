/**
 * Shared Tailwind class constants for consistent accessibility across components.
 */

export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500';

export const INTERACTIVE_DISABLED = 'disabled:opacity-50 disabled:pointer-events-none';

export const INTERACTIVE_BASE =
  `transition-colors ${FOCUS_RING} ${INTERACTIVE_DISABLED}`;


