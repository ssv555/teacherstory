/**
 * Project-wide error logger for catch blocks (backend).
 * Single source of truth — never call console.error directly in catch blocks.
 */
export function ConsoleErrLog(...args: unknown[]): void {
  console.error(...args)
}
