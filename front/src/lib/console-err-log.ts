declare const __IS_DEV__: boolean;

/** Frontend error logger — only outputs in dev mode */
export function ConsoleErrLog(...args: unknown[]): void {
  if (__IS_DEV__) {
    console.error(...args)
  }
}
