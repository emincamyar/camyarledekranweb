import type { Metadata } from 'next'
import Link from 'next/link'
import {
  urunler,
  getUrun,
  getKategori,
  getIlgiliUrunler,
  yazilimlar,
} from '@/lib/products'
import DynamicProductClient from './DynamicProductClient'

interface PageProps {
  params: Promise<{
    kategori: string
    slug: string
  }>
}

export async function generateStaticParams() {
  return urunler.map((u) => ({
    kategori: u.kategori,
    slug: u.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori, slug } = await params
  const urun = getUrun(kategori, slug)
  if (!urun) return { title: 'Ürün Bulunamadı | Çamyar LED Samsun' }

  return {
    title: `${urun.ad} | Çamyar LED Samsun`,
    description: urun.seoDescription,
    keywords: [
      urun.ad,
      urun.model,
      'Samsun LED ekran',
      'LED modül Samsun',
      'İlkadım LED servis',
      ...urun.etiketler,
    ],
    alternates: {
      canonical: `https://camyarled.com/urunler/${urun.kategori}/${urun.slug}`,
    },
    openGraph: {
      title: `${urun.ad} | Çamyar LED Ekran Samsun`,
      description: urun.aciklama,
      url: `https://camyarled.com/urunler/${urun.kategori}/${urun.slug}`,
      type: 'website',
    },
  }
}

export default async function UrunDetayPage({ params }: PageProps) {
  const { kategori, slug } = await params
  const urun = getUrun(kategori, slug)

  if (!urun) {
    return <DynamicProductClient kategori={kategori} slug={slug} />
  }

  const kategoriBilgi = getKategori(urun.kategori)
  const ilgiliUrunler = getIlgiliUrunler(urun, 3)

  // Find compatible software
  const uyumluYazilimDetaylari = urun.uyumluYazilimlar
    ? yazilimlar.filter((y) =>
        urun.uyumluYazilimlar?.some(
          (ad) => y.ad.toLowerCase().includes(ad.toLowerCase()) || ad.toLowerCase().includes(y.ad.toLowerCase())
        )
      )
    : []

  // JSON-LD Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: urun.ad,
    model: urun.model,
    description: urun.aciklama,
    category: kategoriBilgi?.ad ?? 'LED Ekran Donanımı',
    brand: {
      '@type': 'Brand',
      name: 'Çamyar LED',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      availability:
        urun.stok === 'Stokta'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Çamyar LED Ekran Teknolojileri',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Samsun',
          addressRegion: 'İlkadım',
          addressCountry: 'TR',
        },
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://camyarled.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ürünler',
        item: 'https://camyarled.com/urunler',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: kategoriBilgi?.ad ?? 'Kategori',
        item: `https://camyarled.com/urunler#${urun.kategori}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: urun.ad,
        item: `https://camyarled.com/urunler/${urun.kategori}/${urun.slug}`,
      },
    ],
  }

  const whatsappMessage = encodeURIComponent(
    `Merhaba, Çamyar LED web sitenizden ${urun.ad} (${urun.model}) ürününüzü inceledim. Fiyat teklifi ve Samsun içi stok/teslimat durumu hakkında bilgi alabilir miyim?`
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] text-[#1e2142]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Breadcrumb ── */}
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
                <Link
                  href={`/urunler#${urun.kategori}`}
                  className="hover:text-[#292c64] transition-colors"
                >
                  {kategoriBilgi?.ad ?? 'Kategori'}
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

          {/* ── Main Product Section ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            {/* Left: Product Visual Area */}
            <div className="lg:col-span-6 space-y-5">
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urun.gorselUrl}
                  alt={`${urun.ad} - ${urun.model}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Badges */}
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

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {urun.etiketler.map((etiket) => (
                  <span
                    key={etiket}
                    className="text-xs font-mono px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs"
                  >
                    #{etiket}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Product Details & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Header */}
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
                <p className="text-sm sm:text-base text-[#467319] font-bold">
                  {urun.altBaslik}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {urun.rozetler.map((rozet, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-[#1e2142] border border-slate-200 shadow-2xs"
                  >
                    ✓ {rozet}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Mühendislik Değerlendirmesi
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-normal">
                  {urun.uzunAciklama}
                </p>
              </div>

              {/* Fast Quote CTA Box */}
              <div className="p-6 rounded-2xl bg-white border-2 border-[#70b62c]/40 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Hızlı İntikal &amp; Tedarik</span>
                    <div className="text-lg font-black text-[#1e2142]">Samsun Depodan Doğrudan Satış</div>
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
                    id="product-whatsapp-cta"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Hızlı İletişim
                  </a>
                  <a
                    href="tel:+905462409077"
                    className="btn-outline flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm"
                    id="product-phone-cta"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.6A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    Hemen Ara (0546 240 90 77)
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                  <span>✓ 2 Yıl Birebir Garanti</span>
                  <span>✓ Samsun İçi Montaj Desteği</span>
                  <span>✓ Orijinal Fabrika Çıkışlı</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Technical Specifications Table ── */}
          <section className="mb-16" aria-labelledby="specs-heading">
            <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-[#70b62c] uppercase tracking-wider">
                  Detaylı Parametreler
                </span>
                <h2 id="specs-heading" className="text-2xl font-black text-[#1e2142] mt-1">
                  Teknik Özellikler Tablosu
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {urun.teknikOzellikler.length} Parametre Kayıtlı
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left spec-table">
                <tbody>
                  {urun.teknikOzellikler.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}
                    >
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

          {/* ── Compatible Software Section (if any) ── */}
          {uyumluYazilimDetaylari.length > 0 && (
            <section className="mb-16" aria-labelledby="software-heading">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <span className="text-xs font-mono font-bold text-[#70b62c] uppercase tracking-wider">
                  Yazılım &amp; Sürücü Desteği
                </span>
                <h2 id="software-heading" className="text-2xl font-black text-[#1e2142] mt-1">
                  Uyumlu LED Kontrol Yazılımları
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Bu donanım için gereken programları doğrudan ücretsiz indirebilir ve kurulum rehberlerini inceleyebilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {uyumluYazilimDetaylari.map((yazilim) => (
                  <div
                    key={yazilim.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#467319] uppercase font-mono">
                          {yazilim.kategori}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                          {yazilim.versiyon}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-[#1e2142] mb-1">{yazilim.ad}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{yazilim.aciklama}</p>
                    </div>

                    <Link
                      href={`/program-indir#${yazilim.id}`}
                      className="btn-outline flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-center"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Programı İndir &amp; Kur
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Related Products ── */}
          {ilgiliUrunler.length > 0 && (
            <section aria-labelledby="related-heading">
              <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <span className="text-xs font-mono font-bold text-[#70b62c] uppercase tracking-wider">
                    Benzer Ürünler
                  </span>
                  <h2 id="related-heading" className="text-2xl font-black text-[#1e2142] mt-1">
                    Bu Kategorideki Diğer Modeller
                  </h2>
                </div>
                <Link
                  href={`/urunler#${urun.kategori}`}
                  className="text-xs font-bold text-[#292c64] hover:text-[#70b62c] underline"
                >
                  Tümünü Gör &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ilgiliUrunler.map((ilgili) => (
                  <article
                    key={ilgili.id}
                    className="product-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200 bg-white p-5 shadow-xs"
                  >
                    <div>
                      <div
                        className="h-28 rounded-xl flex items-center justify-center text-center p-4 mb-4"
                        style={{ background: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)' }}
                      >
                        <div className="font-mono text-lg font-black text-white">{ilgili.model}</div>
                      </div>
                      <h3 className="text-base font-black text-[#1e2142] mb-1">{ilgili.ad}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {ilgili.aciklama}
                      </p>
                    </div>
                    <Link
                      href={`/urunler/${ilgili.kategori}/${ilgili.slug}`}
                      className="btn-primary py-2.5 px-4 rounded-xl text-xs font-bold text-white text-center shadow-xs"
                    >
                      İncele &rarr;
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
