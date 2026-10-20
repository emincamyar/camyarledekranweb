import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'camyar_admin_session'
const EXPECTED_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'camyar_session_valid_token_2026'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const isAuthenticated =
    Boolean(sessionCookie) &&
    (sessionCookie === 'true' ||
      sessionCookie === EXPECTED_TOKEN ||
      sessionCookie === 'authenticated')

  const isLoginPage = pathname === '/admin/login'

  // 1) Kullanıcı giriş yapmamışsa ve /admin/login dışında bir /admin sayfasına gidiyorsa -> anında /admin/login'e yönlendir
  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 2) Kullanıcı zaten giriş yapmışsa ve /admin/login veya /admin kök dizinine gidiyorsa -> /admin/dashboard'a yönlendir
  if (isAuthenticated && (isLoginPage || pathname === '/admin')) {
    const dashboardUrl = new URL('/admin/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
