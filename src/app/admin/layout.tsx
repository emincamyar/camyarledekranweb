'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const COOKIE_NAME = 'camyar_admin_session'

function hasValidCookie(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split(';').some((item) => {
    const [key, val] = item.trim().split('=')
    return (
      key === COOKIE_NAME &&
      (val === 'true' || val === 'camyar_session_valid_token_2026' || val === 'authenticated')
    )
  })
}

function readLoggedIn(): boolean {
  try {
    const localAuth = localStorage.getItem('camyar_auth')
    const cookieAuth = hasValidCookie()

    if (localAuth === 'true' || cookieAuth) {
      // Senkronizasyon: Biri mevcutsa diğerini de koru
      if (localAuth !== 'true') {
        localStorage.setItem('camyar_auth', 'true')
      }
      if (!cookieAuth) {
        document.cookie = 'camyar_admin_session=true; path=/; max-age=604800; SameSite=Lax'
      }
      return true
    }

    return false
  } catch {
    return false
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'
  const [authorized, setAuthorized] = useState<boolean>(false)
  const [checking, setChecking] = useState<boolean>(true)

  useEffect(() => {
    const loggedIn = readLoggedIn()

    if (!loggedIn && !isLoginPage) {
      setAuthorized(false)
      setChecking(false)
      router.replace('/admin/login')
      return
    }

    if (loggedIn && isLoginPage) {
      setAuthorized(false)
      setChecking(false)
      router.replace('/admin/dashboard')
      return
    }

    setAuthorized(true)
    setChecking(false)
  }, [pathname, isLoginPage, router])

  // Kullanıcı /admin/login dışında bir sayfadaysa ve oturumu yoksa içeriği HİÇ YÜKLEMEDEN spinner göster
  if (checking || (!authorized && !isLoginPage)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-sm font-bold text-[#292c64] bg-white px-8 py-6 rounded-2xl border border-slate-200 shadow-sm">
          <svg className="animate-spin w-6 h-6 text-[#70b62c]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Güvenlik Kontrolü Yapılıyor...</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
