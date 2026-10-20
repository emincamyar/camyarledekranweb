'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      const hasAuth = localStorage.getItem('camyar_auth') === 'true'
      if (hasAuth) {
        router.replace('/admin/dashboard')
      } else {
        router.replace('/admin/login')
      }
    } catch {
      router.replace('/admin/login')
    }
  }, [router])

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
