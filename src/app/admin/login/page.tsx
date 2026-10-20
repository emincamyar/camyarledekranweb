'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SEVEN_DAYS = 60 * 60 * 24 * 7

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        try {
          localStorage.setItem('camyar_auth', 'true')
          localStorage.setItem(
            'camyar_admin_auth',
            JSON.stringify({
              user: 'admin',
              role: 'Sistem Yöneticisi',
              loginTime: new Date().toISOString(),
            })
          )
          document.cookie = 'camyar_admin_session=true; path=/; max-age=604800'
        } catch {
          // ignore storage errors
        }
        router.replace('/admin/dashboard')
        router.refresh()
      } else {
        setError(data?.error || 'Hatalı kullanıcı adı veya şifre!')
        setLoading(false)
      }
    } catch {
      setError('Hatalı kullanıcı adı veya şifre!')
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setUsername('admin')
    setPassword('camyar2026!')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-[#292c64]/10 via-[#70b62c]/5 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Back to Website */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#292c64] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Web Sitesine Geri Dön</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#1e2142] to-[#292c64] p-8 text-center text-white relative">
            <div className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 mx-auto mb-4 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png"
                alt="Çamyar LED Ekran Teknolojileri"
                className="h-9 w-auto object-contain"
              />
            </div>

            <div className="block">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-white mb-2">
                <span className="w-2 h-2 rounded-full bg-[#70b62c]" />
                Çamyar LED Yönetim Portalı
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Güvenli Yönetici Girişi
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Ürün kataloğu, blog, referanslar ve teklifleri yönetin
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3"
                role="alert"
              >
                <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="font-bold">{error}</div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username Input */}
              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="admin-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#292c64] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Yönetici Şifresi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#292c64] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#292c64] hover:bg-[#1e2142] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Doğrulanıyor...</span>
                  </>
                ) : (
                  <>
                    <span>Yönetim Paneline Giriş Yap</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 rounded-2xl p-4 text-center">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Varsayılan Yönetici Bilgileri
              </div>
              <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-700 mb-3">
                <span>Kullanıcı: <strong className="text-[#292c64]">admin</strong></span>
                <span>•</span>
                <span>Şifre: <strong className="text-[#292c64]">camyar2026!</strong></span>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#292c64] hover:border-[#70b62c] hover:text-[#70b62c] transition-colors shadow-xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Giriş Bilgilerini Otomatik Doldur</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-[11px] text-slate-400 mt-6">
          © 2026 Çamyar LED Ekran Teknolojileri • 7 Günlük Oturum Çerezi Koruması Aktif
        </p>
      </div>
    </div>
  )
}
