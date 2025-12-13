/**
 * Portal + scroll lock helpers for overlay components (Modal/Drawer/Menu/Tooltip).
 *
 * Keep this lightweight and SSR-safe.
 */

export const DEFAULT_PORTAL_ROOT_ID = 'secondgen-ui-portal-root';

export function getOrCreatePortalRoot(id: string = DEFAULT_PORTAL_ROOT_ID): HTMLElement | null {
  if (typeof document === 'undefined') return null;

  const existing = document.getElementById(id);
  if (existing) return existing;

  const el = document.createElement('div');
  el.id = id;
  document.body.appendChild(el);
  return el;
}

let lockCount = 0;
let previousOverflow: string | null = null;

export function lockBodyScroll(): void {
  if (typeof document === 'undefined') return;
  lockCount += 1;
  if (lockCount > 1) return;

  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
}

export function unlockBodyScroll(): void {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0) return;

  document.body.style.overflow = previousOverflow ?? '';
  previousOverflow = null;
}


