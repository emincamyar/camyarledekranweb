'use client'

import Link from 'next/link'
import { useCmsStore } from '@/lib/dataStore'
import { getKategori } from '@/lib/products'

export default function DynamicProductClient({
  kategori,
  slug,
}: {
  kategori: string
  slug: string
}) {
  const { store, hydrated } = useCmsStore()
  const urun = store.products.find((u) => u.kategori === kategori && u.slug === slug)

  if (!hydrated) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] flex items-center justify-center">
        <div className="text-sm font-semibold text-slate-600">Ürün detayları yükleniyor...</div>
      </div>
    )
  }

  if (!urun) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc]">
        <div className="max-w-2xl mx-auto px-4 text-center bg-white rounded-2xl border border-slate-200 p-10 shadow-xs">
          <h1 className="text-2xl font-black text-[#1e2142] mb-2">Ürün Bulunamadı</h1>
          <p className="text-sm text-slate-600 mb-6">
            Aradığınız donanım katalogdan kaldırılmış veya adresi değişmiş olabilir.
          </p>
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292c64] text-white text-xs font-bold hover:bg-[#1e2142] transition-colors"
          >
            &larr; Ürün Kataloğuna Dön
          </Link>
        </div>
      </div>
    )
  }

  const kategoriBilgi = getKategori(urun.kategori)
  const whatsappMessage = encodeURIComponent(
    `Merhaba, Çamyar LED web sitenizden ${urun.ad} (${urun.model}) ürününüzü inceledim. Fiyat teklifi ve Samsun içi stok/teslimat durumu hakkında bilgi alabilir miyim?`
  )

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] text-[#1e2142]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="İz imi" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#292c64] transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li>
              <Link href="/urunler" className="hover:text-[#292c64] transition-colors">
                Ürün Kataloğu
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li>
              <span className="text-[#70b62c] font-semibold" aria-current="page">
                {urun.model}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-6 space-y-5">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urun.gorselUrl}
                alt={`${urun.ad} - ${urun.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#70b62c] text-white shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {urun.stok}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1e2142]/90 text-white backdrop-blur-xs shadow-md border border-white/20">
                  2 Yıl Birebir Garanti
                </span>
              </div>
              <div className="absolute bottom-3 left-4 pointer-events-none">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-black/60 text-white backdrop-blur-xs uppercase">
                  {kategoriBilgi?.ad} · {urun.model}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#70b62c] text-white shadow-2xs">
                  ● {urun.stok}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">
                  Model: {urun.model}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1e2142] leading-tight mb-2">
                {urun.ad}
              </h1>
              <p className="text-sm sm:text-base text-[#467319] font-bold">{urun.altBaslik}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Mühendislik Değerlendirmesi
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-normal">
                {urun.uzunAciklama}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-[#70b62c]/40 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Hızlı İntikal &amp; Tedarik
                  </span>
                  <div className="text-lg font-black text-[#1e2142]">
                    Samsun Depodan Doğrudan Satış
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#70b62c]/15 text-[#467319] border border-[#70b62c]/30 font-bold">
                  Aynı Gün Yanıt
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/905462409077?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm shadow-sm"
                >
                  WhatsApp Hızlı İletişim
                </a>
                <a
                  href="tel:+905462409077"
                  className="btn-outline flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm"
                >
                  Hemen Ara (0546 240 90 77)
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="text-xs font-mono font-bold text-[#70b62c] uppercase tracking-wider">
              Detaylı Parametreler
            </span>
            <h2 className="text-2xl font-black text-[#1e2142] mt-1">
              Teknik Özellikler Tablosu
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left spec-table">
              <tbody>
                {urun.teknikOzellikler.map((spec, i) => (
                  <tr key={spec.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="py-3.5 px-6 text-sm font-semibold text-slate-600 border-b border-slate-100 w-1/3">
                      {spec.label}
                    </td>
                    <td className="py-3.5 px-6 text-sm font-bold text-[#1e2142] font-mono border-b border-slate-100">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
