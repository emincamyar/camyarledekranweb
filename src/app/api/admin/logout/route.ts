import { NextResponse } from 'next/server'

const SESSION_COOKIE_NAME = 'camyar_admin_session'

export async function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  })

  return response
}
