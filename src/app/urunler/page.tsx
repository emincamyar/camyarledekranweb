'use client'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCmsStore, openQuoteModal } from '@/lib/dataStore'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'

export default function UrunlerPage() {
  const { store } = useCmsStore()
  const urunler = store.products
  const [selectedKategori, setSelectedKategori] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) setSearchTerm(q)
  }, [])

  const filteredUrunler = urunler.filter((urun) => {
    const matchesCategory = selectedKategori === 'all' || urun.kategori === selectedKategori
    const matchesSearch =
      searchTerm === '' ||
      urun.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      urun.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      urun.etiketler.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const tabOptions = [
    { id: 'all', label: 'Tüm Ürünler', count: urunler.length },
    { id: 'led-paneller', label: 'LED Paneller (P10, P2.5, P3, P4, P5)', count: urunler.filter((u) => u.kategori === 'led-paneller').length },
    { id: 'kontrol-kartlari', label: 'Kontrol Kartları (Huidu & Novastar)', count: urunler.filter((u) => u.kategori === 'kontrol-kartlari').length },
    { id: 'guc-kaynaklari', label: 'Güç Kaynakları (5V Slim)', count: urunler.filter((u) => u.kategori === 'guc-kaynaklari').length },
    { id: 'cnc-kasalar-aksesuarlar', label: 'CNC Kasalar & Aksesuarlar', count: urunler.filter((u) => u.kategori === 'cnc-kasalar-aksesuarlar').length },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      {/* ── Top Header Section (Apple / Schneider Electric Style) ── */}
      <section className="pt-28 pb-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="İz imi" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <li>
                <Link href="/" className="hover:text-[#1e2142] transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li>
                <span className="text-[#1e2142] font-bold" aria-current="page">
                  Ürün Kataloğu
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70b62c]/10 border border-[#70b62c]/30 text-[#467319] text-xs font-extrabold uppercase tracking-wider mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-pulse" />
                Samsun Merkez Depo Stokları
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e2142] tracking-tight">
                Endüstriyel LED Ekran Bileşenleri
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl font-medium leading-relaxed">
                P10 dış mekan modüllerden Novastar MCTRL kontrolörlere, 5V slim adaptörlerden yerli üretim CNC kasalara kadar tüm donanımlar Samsun depomuzda aynı gün teslim ve 2 yıl garantilidir.
              </p>
            </div>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 text-xs flex-shrink-0">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="font-extrabold text-[#1e2142]">Aynı Gün Teslim</div>
                  <div className="text-slate-600 font-medium">Samsun İçi Hızlı İntikal</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-xl">🛡️</span>
                <div>
                  <div className="font-extrabold text-[#1e2142]">2 Yıl Birebir Değişim</div>
                  <div className="text-slate-600 font-medium">Yerel Servis Garantisi</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Category Tabs & Search Bar ── */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-100">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
              {tabOptions.map((tab) => {
                const isActive = selectedKategori === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedKategori(tab.id)}
                    className={`category-tab-btn ${
                      isActive
                        ? 'bg-[#1e2142] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#1e2142]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#70b62c] text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <input
                type="text"
                placeholder="Model, marka veya özellik ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e2142] focus:border-transparent transition-all"
              />
              <svg
                className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Grid Section ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredUrunler.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-[#1e2142]">Aramanıza Uygun Ürün Bulunamadı</h3>
            <p className="text-slate-600 text-sm mt-1 mb-6">
              Lütfen farklı bir kategori sekmesi seçin veya arama teriminizi değiştirin.
            </p>
            <button
              onClick={() => {
                setSelectedKategori('all')
                setSearchTerm('')
              }}
              className="btn-primary px-6 py-2.5 text-sm cursor-pointer"
            >
              Tüm Ürünleri Listele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {filteredUrunler.map((urun) => {
              const whatsappText = encodeURIComponent(
                `Merhaba, ${urun.ad} (${urun.model}) için fiyat teklifi ve Samsun içi stok durumu hakkında bilgi almak istiyorum.`
              )

              return (
                <article
                  key={urun.id}
                  id={`urun-${urun.id}`}
                  className="apple-card flex flex-col justify-between overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
                  role="listitem"
                >
                  <div>
                    {/* Product image: fixed height, clipped alt text, clean badges */}
                    <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-slate-100 border-b border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={urun.gorselUrl}
                        alt={`${urun.ad} - ${urun.model}`}
                        className="w-full h-full object-cover text-[0px] group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE
                          e.currentTarget.onerror = null
                        }}
                      />

                      {/* Badges: stacked top-left, compact, never overlapping each other */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold leading-tight bg-[#70b62c] text-white shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          {urun.stok}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold leading-tight bg-white text-[#1e2142] shadow-sm border border-slate-200">
                          2 Yıl Garanti
                        </span>
                      </div>
                    </div>

                    {/* Card Body Content */}
                    <div className="p-6">
                      {/* Model & Subtitle */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-extrabold text-[#70b62c] uppercase tracking-wider">
                          {urun.model}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          Samsun Depo
                        </span>
                      </div>

                      {/* Main Title */}
                      <h2 className="text-lg font-black text-[#1e2142] mb-2 leading-snug group-hover:text-[#292c64] transition-colors">
                        {urun.ad}
                      </h2>

                      {/* Description */}
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2 font-normal">
                        {urun.aciklama}
                      </p>

                      {/* Structured Technical Parameters Box (Clean Light Slate Box) */}
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-5">
                        <div className="text-[11px] font-extrabold text-[#1e2142] uppercase tracking-wider mb-2.5 flex items-center justify-between border-b border-slate-200 pb-1.5">
                          <span>Teknik Parametreler</span>
                          <span className="font-mono text-[10px] text-slate-500 font-semibold">Özet Tablo</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                          <div>
                            <span className="text-[11px] text-slate-500 font-medium block">Piksel / Modül</span>
                            <span className="font-extrabold text-slate-900 font-mono text-xs">
                              {urun.ozetTeknik.pikselAraligi}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 font-medium block">Tarama / Sinyal</span>
                            <span className="font-extrabold text-slate-900 font-mono text-xs">
                              {urun.ozetTeknik.taramaOrani}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 font-medium block">Çalışma Voltajı</span>
                            <span className="font-extrabold text-slate-900 font-mono text-xs">
                              {urun.ozetTeknik.calismaVoltaji}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 font-medium block">Çözünürlük / Güç</span>
                            <span className="font-extrabold text-slate-900 font-mono text-xs">
                              {urun.ozetTeknik.cozunurluk}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action CTA Buttons */}
                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex items-center gap-3">
                      {/* Secondary: İncele */}
                      <Link
                        href={`/urunler/${urun.kategori}/${urun.slug}`}
                        className="btn-outline-navy flex-1 text-center py-2.5 px-3 text-xs sm:text-sm font-bold shadow-2xs"
                        aria-label={`${urun.ad} detaylarını incele`}
                      >
                        İncele &rarr;
                      </Link>

                      {/* Primary: Teklif Al / Fiyat İste (CRM Modal) */}
                      <button
                        type="button"
                        onClick={() =>
                          openQuoteModal({
                            title: `${urun.ad} — Fiyat Teklifi`,
                            pitchCode: urun.model,
                            modelName: urun.ad,
                            dimensionsSummary: `Katalog Ürün Talebi: ${urun.ad} (${urun.model})`,
                          })
                        }
                        className="btn-green flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-bold text-white shadow-sm cursor-pointer"
                        aria-label={`${urun.ad} için fiyat teklifi iste`}
                      >
                        <span>Fiyat İste / Teklif Al</span>
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* ── Engineering Support & Calculator Banner ── */}
        <section className="mt-16 rounded-3xl bg-[#1e2142] text-white p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="px-3.5 py-1 rounded-full bg-[#70b62c]/20 text-[#8fd43a] text-xs font-extrabold uppercase tracking-wider inline-block mb-3 border border-[#70b62c]/30">
              Mühendislik &amp; Hesaplama
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
              Projeniz İçin Gerekli LED Panel ve Güç İhtiyacını Belirleyin
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              En ve boy ölçülerinizi girerek kaç adet LED modüle, hangi çözünürlüğe ve kaç adet 5V 60A adaptöre ihtiyacınız olduğunu saniyeler içinde hesaplayın.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/hesaplama-araci"
                className="btn-green px-6 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2"
              >
                <span>📐 İnteraktif Hesaplama Aracını Başlat</span>
                <span>&rarr;</span>
              </Link>
              <a
                href="tel:+905462409077"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
              >
                <span>📞 Teknik Servis Hattı (0546 240 90 77)</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
