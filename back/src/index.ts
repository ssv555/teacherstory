import app from "./app";
import { APP_VERSION } from "./shared/version";
import { ConsoleErrLog } from "./shared/console-err-log";

// Global error handlers — keep the process alive
function formatFatal(kind: string, err: unknown): string {
  const body = err instanceof Error ? (err.stack ?? err.message) : String(err)
  return `\n[FATAL] ${kind} — server survived:\n${body}\n\n`
}
process.on('uncaughtException', (err) => {
  process.stderr.write(formatFatal('uncaughtException', err))
})
process.on('unhandledRejection', (reason) => {
  process.stderr.write(formatFatal('unhandledRejection', reason))
})

const SESSION_SECRET = process.env.SESSION_SECRET?.trim()
if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
  ConsoleErrLog(`[SERVER] SESSION_SECRET must be at least 32 characters (got ${SESSION_SECRET?.length ?? 0}). Aborting.`)
  process.exit(1)
}

const SERVER_PORT = parseInt(process.env.SERVER_PORT || "33001");

// Graceful shutdown
let shuttingDown = false
async function gracefulShutdown(signal: NodeJS.Signals): Promise<void> {
  if (shuttingDown) return
  shuttingDown = true
  process.stderr.write(`\n[SHUTDOWN] ${signal} — exiting...\n`)
  process.exit(0)
}

for (const sig of ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGBREAK'] as const) {
  process.on(sig, () => { void gracefulShutdown(sig) })
}

try {
  const server = Bun.serve({
    port: SERVER_PORT,
    fetch: app.fetch,
    maxRequestBodySize: 50 * 1024 * 1024, // 50 MB (photos)
  });

  console.log(`TeacherStory v${APP_VERSION} running at ${server.url}`);
} catch (err: any) {
  if (err?.code === 'EADDRINUSE') {
    ConsoleErrLog(`[SERVER] Port ${SERVER_PORT} is already in use.`);
    process.exit(1);
  } else {
    ConsoleErrLog('[SERVER] Failed to start:', err);
    throw err;
  }
}
