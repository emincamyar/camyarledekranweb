'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { openQuoteModal } from '@/lib/dataStore'

const LOGO_URL =
  'https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png'
const PHONE = '+905462409077'
const PHONE_DISPLAY = '0546 240 90 77'
const EMAIL = 'bilgi@camyarelektrik.com'
const INSTAGRAM_URL = 'https://www.instagram.com/ledekransamsun'
const INSTAGRAM_HANDLE = '@ledekransamsun'
const ADDRESS_STREET = '19 Mayıs Mah. Hürriyet Sk. No:19'
const ADDRESS_DISTRICT = 'İlkadım / Samsun'
const MAPS_URL = 'https://maps.google.com/?q=19+Mayıs+Mah.+Hürriyet+Sk.+No:19+İlkadım+Samsun'

const footerLinks = {
  hizmetler: [
    { label: 'İç Mekan LED Ekran', href: '/#hizmetler' },
    { label: 'Dış Mekan LED Ekran', href: '/#hizmetler' },
    { label: 'LED Ekran Kiralama', href: '/#hizmetler' },
    { label: 'Otomasyon & Teknik Servis', href: '/#hizmetler' },
  ],
  urunlerVeAraclar: [
    { label: 'İnteraktif Hesaplama Aracı', href: '/hesaplama-araci' },
    { label: 'Tüm Ürün Kataloğu', href: '/urunler' },
    { label: 'P10, P3, P2.5 LED Paneller', href: '/urunler#led-paneller' },
    { label: 'Novastar & Huidu Kontrol Kartları', href: '/urunler#kontrol-kartlari' },
    { label: '5V Slim Güç Kaynakları & Kasalar', href: '/urunler#guc-kaynaklari' },
    { label: 'Yazılım İndirme Merkezi', href: '/program-indir' },
  ],
  kurumsal: [
    { label: 'Kurumsal & Hakkımızda', href: '/kurumsal' },
    { label: 'Neden Çamyar LED?', href: '/kurumsal' },
    { label: 'Blog & Bilgi Bankası', href: '/blog' },
    { label: 'Samsun Depo & Hızlı Servis', href: '/kurumsal' },
    { label: 'İletişim & Konum', href: '/#iletisim' },
  ],
}

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer
      className="relative bg-[#1e2142] text-slate-300 border-t border-slate-200/20 overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle green ambient accent line */}
      <div
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#292c64] via-[#70b62c] to-[#292c64]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* ── Column 1: Brand ── */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group mb-4 bg-white px-4 py-2.5 rounded-2xl shadow-sm"
              aria-label="Çamyar LED Ekran – Ana Sayfa"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_URL}
                alt="Çamyar LED Ekran Teknolojileri"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Samsun İlkadım merkezli profesyonel LED ekran çözümleri. Novastar ve Huidu sertifikalı
              mühendis kadromuzla keşif, satış, kiralama, montaj ve 7/24 yerel teknik servis.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['Novastar Sertifikalı', 'Huidu Uzmanı', 'TF PowerLED'].map((cert) => (
                <span
                  key={cert}
                  className="px-2.5 py-1 text-[10px] font-mono font-semibold text-[#8fd43a] border border-[#70b62c]/30 rounded-md bg-[#70b62c]/10"
                >
                  ◈ {cert}
                </span>
              ))}
            </div>

            {/* Social Media Link (@ledekransamsun) */}
            <a
              id="footer-instagram"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-200 hover:border-[#70b62c] hover:text-[#8fd43a] transition-all text-xs font-bold"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>Instagram: {INSTAGRAM_HANDLE}</span>
            </a>
          </div>

          {/* ── Column 2: Hizmetlerimiz ── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#70b62c] pl-2.5">
              Hizmetlerimiz
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.label} role="listitem">
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#70b62c] transition-colors group"
                  >
                    <svg
                      className="w-3 h-3 text-[#70b62c] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="2,6 10,6" />
                      <polyline points="7,3 10,6 7,9" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Ürünler & Hesaplama Aracı ── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#70b62c] pl-2.5">
              Ürün &amp; Araçlar
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.urunlerVeAraclar.map((link) => (
                <li key={link.label} role="listitem">
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#70b62c] transition-colors group"
                  >
                    <svg
                      className="w-3 h-3 text-[#70b62c] group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="2,6 10,6" />
                      <polyline points="7,3 10,6 7,9" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: İletişim ── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#70b62c] pl-2.5">
              İletişim &amp; Adres
            </h3>
            <address className="not-italic space-y-3.5">
              {/* Address */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-slate-300 hover:text-[#70b62c] transition-colors group"
                aria-label="Adres – Google Maps'te aç"
              >
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#70b62c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {ADDRESS_STREET}
                  <br />
                  {ADDRESS_DISTRICT}
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${PHONE}`}
                id="footer-phone"
                className="flex items-center gap-3 text-sm font-bold text-white hover:text-[#70b62c] transition-colors group"
                aria-label={`Telefon: ${PHONE_DISPLAY}`}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 text-[#70b62c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.6A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {PHONE_DISPLAY}
              </a>

              {/* Official Email */}
              <a
                href={`mailto:${EMAIL}`}
                id="footer-email"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-[#70b62c] transition-colors group font-medium"
                aria-label={`Resmi E-Posta: ${EMAIL}`}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 text-[#70b62c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                <span>{EMAIL}</span>
              </a>

              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-[#8fd43a] transition-colors font-semibold"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 text-[#70b62c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>{INSTAGRAM_HANDLE}</span>
              </a>

              {/* CRM Quote Modal Trigger */}
              <button
                type="button"
                onClick={() =>
                  openQuoteModal({
                    title: 'Proje Teklifi & Keşif Başvurusu',
                    dimensionsSummary: 'Footer İletişim — Genel Teklif & Keşif Başvurusu',
                  })
                }
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#70b62c] hover:bg-[#5da022] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>📋 Hızlı Teklif Başvuru Formu</span>
              </button>
            </address>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-slate-800 mb-6" aria-hidden="true" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 Çamyar LED Ekran Teknolojileri. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-2 font-mono text-[#8fd43a]">
            <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-pulse" aria-hidden="true" />
            <span>19 Mayıs Mah. Hürriyet Sk. No:19 İlkadım / Samsun</span>
          </div>
          <nav aria-label="Alt navigasyon">
            <ul className="flex items-center gap-4" role="list">
              <li>
                <Link href="/hesaplama-araci" className="hover:text-white transition-colors">
                  Hesaplama Aracı
                </Link>
              </li>
              <li>
                <Link href="/urunler" className="hover:text-white transition-colors">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/program-indir" className="hover:text-white transition-colors">
                  Program İndir
                </Link>
              </li>
              <li>
                <Link href="/kurumsal" className="hover:text-white transition-colors">
                  Kurumsal
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
