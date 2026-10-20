'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { openQuoteModal } from '@/lib/dataStore'

const LOGO_URL =
  'https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png'
const PHONE = '+905462409077'
const PHONE_DISPLAY = '0546 240 90 77'

const productMenu = [
  { label: 'LED Paneller', desc: 'P2.5 · P3 · P4 · P5 · P10', href: '/urunler' },
  { label: 'Kontrol Kartları', desc: 'Novastar · Huidu · TF', href: '/urunler' },
  { label: 'Güç Kaynakları', desc: '5V Slim · DC-DC', href: '/urunler' },
  { label: 'CNC Kasalar & Aksesuarlar', desc: '16cm – 96cm kasalar', href: '/urunler' },
]

const simpleLinks = [
  { label: 'Referanslar', href: '/referanslar' },
  { label: 'Program İndir', href: '/program-indir' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kurumsal', href: '/kurumsal' },
]

const mobileLinks: { label: string; href: string; highlight?: boolean }[] = [
  { label: 'Ürünler', href: '/urunler' },
  { label: 'LED Hesapla', href: '/hesaplama-araci', highlight: true },
  ...simpleLinks,
  { label: 'İletişim', href: '/#iletisim' },
]

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    setSearchOpen(false)
    router.push(q ? `/urunler?q=${encodeURIComponent(q)}` : '/urunler')
  }

  const handleOpenGeneralQuote = () => {
    setMobileOpen(false)
    openQuoteModal({
      title: 'Hızlı Fiyat Teklifi & Keşif Başvurusu',
      dimensionsSummary: 'Üst Menü — Genel LED Ekran Proje & Fiyat Teklifi Talebi',
    })
  }

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs"
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4"
          aria-label="Ana navigasyon"
        >
          {/* ── Horizontal Corporate Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Çamyar LED Ekran Teknolojileri – Ana Sayfa"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_URL}
              alt="Çamyar LED Ekran Teknolojileri"
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* ── Center menu ── */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {/* Ürünler dropdown */}
            <li className="relative group">
              <Link
                href="/urunler"
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:text-[#292c64] hover:bg-slate-50 transition-colors"
                aria-haspopup="true"
              >
                Ürünler
                <ChevronDown className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </Link>
              <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-0 top-full pt-2 w-72">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-2">
                  {productMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-sm font-bold text-[#292c64]">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </Link>
                  ))}
                  <Link
                    href="/urunler"
                    className="mt-1 block px-4 py-2.5 rounded-xl bg-[#292c64]/5 text-xs font-bold text-[#292c64] hover:bg-[#292c64]/10 transition-colors"
                  >
                    Tüm Ürün Kataloğu →
                  </Link>
                </div>
              </div>
            </li>

            {/* LED Hesapla pill */}
            <li>
              <Link
                href="/hesaplama-araci"
                className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-bold text-[#292c64] rounded-full bg-[#70b62c]/10 border border-[#70b62c]/30 hover:bg-[#70b62c]/20 transition-colors"
              >
                <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#70b62c] opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#70b62c]" />
                </span>
                LED Hesapla
              </Link>
            </li>

            {simpleLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:text-[#292c64] hover:bg-slate-50 transition-colors block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right side ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-[#292c64] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Hızlı ürün arama"
              aria-expanded={searchOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <a
              href={`tel:${PHONE}`}
              id="nav-phone-btn"
              className="hidden xl:flex items-center gap-2 text-sm font-bold text-[#292c64] hover:text-[#70b62c] transition-colors whitespace-nowrap"
              aria-label={`Müşteri hattı: ${PHONE_DISPLAY}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.6A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              {PHONE_DISPLAY}
            </a>

            <button
              type="button"
              id="nav-quote-btn"
              onClick={handleOpenGeneralQuote}
              className="px-5 py-2.5 rounded-full bg-[#70b62c] text-white text-sm font-bold shadow-sm hover:bg-[#5da022] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Teklif Al
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-lg text-slate-700 hover:text-[#292c64] hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </nav>

        {/* ── Search panel ── */}
        {searchOpen && (
          <div className="hidden md:block border-t border-slate-100 bg-white">
            <form onSubmit={submitSearch} className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ürün, model veya marka ara (örn: P10, MCTRL300, HD-W02)"
                className="flex-1 px-4 py-2.5 rounded-full border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#292c64]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#292c64] text-white text-sm font-bold hover:bg-[#1e2142] transition-colors cursor-pointer"
              >
                Ara
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Menu Panel ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobil navigasyon menüsü"
        aria-modal="true"
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white border-l border-slate-200 flex flex-col lg:hidden shadow-2xl transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            alt="Çamyar LED Ekran Teknolojileri"
            className="h-9 w-auto object-contain"
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Menüyü kapat"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1.5" role="list">
            {mobileLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    link.highlight
                      ? 'bg-[#70b62c]/10 text-[#292c64] border border-[#70b62c]/30'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#292c64]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {link.highlight ? (
                      <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#70b62c] opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#70b62c]" />
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    )}
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-5 pb-6 space-y-3 border-t border-slate-100 pt-5 bg-slate-50">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-slate-200 bg-white text-[#292c64] font-bold text-sm shadow-sm"
          >
            📞 {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={handleOpenGeneralQuote}
            className="flex items-center justify-center w-full py-3 rounded-full bg-[#70b62c] hover:bg-[#5da022] text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
          >
            Teklif Al
          </button>
        </div>
      </div>
    </>
  )
}
