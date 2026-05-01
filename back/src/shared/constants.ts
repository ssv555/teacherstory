export const C_APP_NAME = 'TeacherStory'

export const IS_DEV = process.env.IS_DEV === 'true' && process.env.NODE_ENV !== 'production'

/** Service user (system actor) — fixed UUID, created by seed */
export const C_SERVICE_USER_ID = "00000000-0000-0000-0000-000000000000"

/** Cookie header value to clear the session */
export function clearSessionCookie(): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
  return `ts_session=; HttpOnly; Path=/; SameSite=Strict; ${secureFlag}Max-Age=0`
}

/** Build CSRF cookie (non-HttpOnly so frontend JS can read it) */
export function createCsrfCookie(token: string, maxAge: number): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
  return `ts_csrf=${token}; Path=/; SameSite=Strict; ${secureFlag}Max-Age=${maxAge}`
}

/** Cookie header value to clear the CSRF token */
export function clearCsrfCookie(): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
  return `ts_csrf=; Path=/; SameSite=Strict; ${secureFlag}Max-Age=0`
}

/** MAX messenger */
export const C_MAX_API_HOST = 'platform-api.max.ru'
export const C_MAX_DEEPLINK_BASE = 'https://max.ru/'
