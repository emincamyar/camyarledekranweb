'use client'

import Link from 'next/link'
import type React from 'react'
import { useCmsStore, openQuoteModal } from '@/lib/dataStore'
import type { Software, YazilimKategori } from '@/lib/products'

const katConfig: Record<
  YazilimKategori,
  { renk: string; bg: string; border: string; desc: string; icon: React.ReactNode }
> = {
  PowerLED: {
    renk: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'TF serisi asenkron kontrol kartları için içerik yönetim ve tabela yazılımı.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
      </svg>
    ),
  },
  Huidu: {
    renk: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Huidu asenkron, WiFi ve video LED kontrol kartları için yazılım paketi.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="9" cy="15" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  Novastar: {
    renk: 'text-[#292c64]',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    desc: 'Novastar senkron kontrolörler, alıcı kartlar ve VNNOX bulut yazılımları.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
      </svg>
    ),
  },
}

function getSuggestedFilename(yazilim: Software): string {
  const link = (yazilim.indirmeLinki || '').trim()
  if (link) {
    const cleanPath = link.split('?')[0].split('#')[0]
    const lastSegment = cleanPath.substring(cleanPath.lastIndexOf('/') + 1)
    if (lastSegment && (lastSegment.endsWith('.exe') || lastSegment.endsWith('.zip') || lastSegment.endsWith('.rar') || lastSegment.endsWith('.msi'))) {
      return lastSegment
    }
  }
  const safeName = yazilim.ad.replace(/[^a-zA-Z0-9._-]/g, '_')
  return `${safeName}_Setup.exe`
}

function DownloadCard({ yazilim }: { yazilim: Software }) {
  const kat = katConfig[yazilim.kategori] || katConfig.Novastar
  const downloadFilename = getSuggestedFilename(yazilim)
  const downloadHref =
    yazilim.indirmeLinki && !yazilim.indirmeLinki.startsWith('#')
      ? yazilim.indirmeLinki
      : `/downloads/${downloadFilename}`

  return (
    <article
      id={yazilim.id}
      className="download-card rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
      aria-labelledby={`${yazilim.id}-baslik`}
    >
      {/* Card header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${kat.renk} ${kat.bg} border ${kat.border} flex-shrink-0`}
          >
            {kat.icon}
          </div>
          <span
            className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${kat.border} ${kat.renk} ${kat.bg}`}
          >
            {yazilim.versiyon}
          </span>
        </div>

        <h3 id={`${yazilim.id}-baslik`} className="text-lg font-black text-[#1e2142] mb-1.5">
          {yazilim.ad}
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{yazilim.aciklama}</p>
      </div>

      {/* Card body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Compatibility */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Uyumlu Kartlar
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(yazilim.uyumluKartlar || []).map((kart) => (
                <span
                  key={kart}
                  className="text-[10px] px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-mono bg-slate-50"
                >
                  {kart}
                </span>
              ))}
            </div>
          </div>

          {/* OS Support & File Size */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>📦 {yazilim.dosyaBoyutu}</span>
            <span>🗓 Güncelleme: {yazilim.guncellemeTarihi}</span>
          </div>

          {/* Install steps accordion */}
          {yazilim.kurulumAdımlari && yazilim.kurulumAdımlari.length > 0 && (
            <details className="group pt-1">
              <summary className="cursor-pointer text-xs font-bold text-[#467319] hover:text-[#70b62c] transition-colors list-none flex items-center gap-1.5 select-none">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-open:rotate-90 transition-transform"
                  aria-hidden="true"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
                Kurulum Rehberi ({yazilim.kurulumAdımlari.length} Adım)
              </summary>
              <ol className="mt-3 space-y-2 list-none pl-0 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                {yazilim.kurulumAdımlari.map((adim, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-[#292c64] text-[9px] font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{adim}</span>
                  </li>
                ))}
              </ol>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4">
          <a
            href={downloadHref}
            download={downloadFilename}
            id={`indir-${yazilim.id}`}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xs"
            aria-label={`${yazilim.ad} ${yazilim.versiyon} indir`}
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
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>
              {yazilim.ad} İndir ({yazilim.versiyon})
            </span>
          </a>

          <button
            type="button"
            onClick={() =>
              openQuoteModal({
                title: `${yazilim.ad} — Kurulum & Teknik Destek Talebi`,
                dimensionsSummary: `Yazılım Kurulum Desteği: ${yazilim.ad} (${yazilim.versiyon})`,
              })
            }
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-[#467319] bg-[#70b62c]/10 hover:bg-[#70b62c]/20 transition-all border border-[#70b62c]/30 cursor-pointer"
          >
            🛠️ Kurulum &amp; RCFGX Ayar Desteği Talep Et
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ProgramIndirClient() {
  const { store } = useCmsStore()
  const softwares = store.softwares || []
  const kategorilerListesi: YazilimKategori[] = ['PowerLED', 'Huidu', 'Novastar']

  const getByCat = (kat: YazilimKategori) => softwares.filter((y) => y.kategori === kat)

  return (
    <>
      {/* ── Page Header ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Breadcrumb */}
        <nav aria-label="İz imi" className="mb-4">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#292c64] transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-[#70b62c] font-semibold" aria-current="page">
                Yazılım İndirme Merkezi
              </span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl">
            <span className="section-label mb-3">Teknik Destek &amp; Sürücüler</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e2142] tracking-tight">
              LED Ekran <span className="text-[#70b62c]">Program İndirme Merkezi</span>
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Samsun ve Karadeniz Bölgesi teknik ekipleri ve tabela ustaları için güncel LED kontrol
              yazılımları, USB programlama araçları ve adım adım kurulum rehberleri tek adreste.
              İndir butonuna tıkladığınızda kurulum paketi doğrudan bilgisayarınıza iner.
            </p>

            {/* Category Quick Badges */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {kategorilerListesi.map((kat) => (
                <a
                  key={kat}
                  href={`#${kat.toLowerCase()}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2 border border-slate-200"
                >
                  <span>{kat} Yazılımları</span>
                  <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded shadow-2xs">
                    {getByCat(kat).length}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Software Lists by Category ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {kategorilerListesi.map((kat) => {
          const cfg = katConfig[kat]
          const list = getByCat(kat)
          if (list.length === 0) return null

          return (
            <section key={kat} id={kat.toLowerCase()} aria-labelledby={`${kat}-heading`}>
              <div className="flex items-center gap-3.5 mb-6 pb-3 border-b border-slate-200">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.renk} ${cfg.bg} border ${cfg.border} font-bold`}
                >
                  {cfg.icon}
                </div>
                <div>
                  <h2 id={`${kat}-heading`} className="text-2xl font-black text-[#1e2142]">
                    {kat} Yazılım Paketi
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">{cfg.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((yazilim) => (
                  <DownloadCard key={yazilim.id} yazilim={yazilim} />
                ))}
              </div>
            </section>
          )
        })}
      </main>

      {/* ── Technical Support Notice ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl bg-[#1e2142] text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              Program Kurulumunda Sorun mu Yaşıyorsunuz?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              AnyDesk veya TeamViewer üzerinden uzaktan bağlantı ile Novastar / Huidu / TF
              kartlarınızın RCFGX dosyasını, ekran haritasını ve kablosuz ayarlarını ücretsiz
              yapılandırıyoruz. Resmi E-Posta:{' '}
              <a href="mailto:bilgi@camyarelektrik.com" className="text-[#8fd43a] underline">
                bilgi@camyarelektrik.com
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                openQuoteModal({
                  title: 'Uzaktan LED Yazılım & Kalibrasyon Destek Talebi',
                  dimensionsSummary:
                    'Program İndirme Merkezi — AnyDesk / TeamViewer Uzaktan Yazılım Desteği Talebi',
                })
              }
              className="btn-green px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap shadow-md cursor-pointer"
            >
              🛠️ Canlı Teknik Destek Başvurusu
            </button>
            <a
              href="tel:+905462409077"
              className="px-5 py-3.5 rounded-xl border border-white/25 hover:bg-white/10 text-white font-bold text-sm whitespace-nowrap transition-colors"
            >
              📞 0546 240 90 77
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
