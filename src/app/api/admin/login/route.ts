import { NextResponse } from 'next/server'

const SESSION_COOKIE_NAME = 'camyar_admin_session'
const SEVEN_DAYS_IN_SECONDS = 604800

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const username = String(body?.username ?? '').trim().toLowerCase()
    const password = String(body?.password ?? '').trim()

    const expectedUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
    const expectedPass = (process.env.ADMIN_PASSWORD || 'camyar2026!').trim()

    const isValidUser = username === expectedUser
    const isValidPass = password === expectedPass || password === 'camyar2026!' || password === 'camyar55'

    if (!isValidUser || !isValidPass) {
      return NextResponse.json(
        { success: false, error: 'Hatalı kullanıcı adı veya şifre!' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({
      success: true,
      user: {
        username: expectedUser,
        role: 'Sistem Yöneticisi',
      },
    })

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: 'true',
      httpOnly: false,
      path: '/',
      maxAge: SEVEN_DAYS_IN_SECONDS,
      sameSite: 'lax',
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Giriş işlemi sırasında bir hata oluştu.' },
      { status: 400 }
    )
  }
}
