import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";
import { versionRoute } from "./routes/version";
import { initRoute } from "./routes/init";
import { ConsoleErrLog } from "./shared/console-err-log";
import { IS_DEV } from "./shared/constants";

// Read HTML template once at startup
async function loadHtmlTemplate(): Promise<string> {
  for (const path of ["./front/dist/app.html", "./front/app.html"]) {
    try {
      return await Bun.file(path).text()
    } catch { /* silent: try next fallback */ }
  }
  ConsoleErrLog('[APP] HTML template not found — using minimal stub.')
  return '<!doctype html><html><head><title>TeacherStory</title></head><body><div id="root"></div></body></html>'
}
const HTML_TEMPLATE = await loadHtmlTemplate();

const app = new Elysia()
  .onError(({ error, request, code, set }) => {
    const status = set.status && typeof set.status === 'number' ? set.status : 500
    if (code === 'VALIDATION' || code === 'NOT_FOUND' || (status >= 400 && status < 500)) {
      if (IS_DEV) {
        console.log(`[ELYSIA] ${request.method} ${request.url} ${status} ${code}`)
      }
      return
    }
    ConsoleErrLog(`[ELYSIA] ${request.method} ${request.url}`, error)
  })
  .onBeforeHandle(({ set }) => {
    set.headers["X-Frame-Options"] = "DENY";
    set.headers["X-Content-Type-Options"] = "nosniff";
    set.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";
    set.headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    set.headers["Permissions-Policy"] = "camera=(self), microphone=(self), geolocation=()";
    set.headers["Content-Security-Policy"] = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://telegram.org",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src https://telegram.org https://oauth.telegram.org",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
  });

if (IS_DEV) {
  app.use(swagger({ path: "/swagger" }));
}

app
  .use(
    cors({
      origin: process.env.FRONT_URL || false,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    })
  )

  // Health check
  .get("/status", () => "OK")

  // API routes
  .group("/api", (app) =>
    app
      .get("/", () => "OK")
      .get("/status", () => "OK")
      .get("/health", () => "OK")
      .use(initRoute)
      .use(versionRoute)
  )

  // Static files serving
  .onBeforeHandle(({ request, set }) => {
    const url = new URL(request.url);
    const path = url.pathname;
    if (
      path.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/)
    ) {
      set.headers["Cache-Control"] = IS_DEV
        ? "no-store, no-cache, must-revalidate"
        : "public, max-age=31536000, immutable";
    }
    else if (path.endsWith(".html") || path === "/") {
      set.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    }
  })
  .use(
    staticPlugin({
      assets: "./front/dist",
      prefix: "/",
    })
  )

  // SPA fallback — serve HTML template for all unmatched routes
  .get("/", ({ set }) => {
    set.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return new Response(HTML_TEMPLATE);
  })
  .get("/gallery", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return new Response(HTML_TEMPLATE);
  })
  .get("/gallery/*", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return new Response(HTML_TEMPLATE);
  })
  .get("/auth", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return new Response(HTML_TEMPLATE);
  })
  .get("/auth/*", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return new Response(HTML_TEMPLATE);
  })
  .get("/admin", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return new Response(HTML_TEMPLATE);
  })
  .get("/admin/*", ({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf-8";
    return new Response(HTML_TEMPLATE);
  });

export type App = typeof app;
export default app;
