/**
 * Minimal className join helper.
 *
 * Keep this dependency-free so `@secondgen/ui` stays portable and tree-shakeable.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}


