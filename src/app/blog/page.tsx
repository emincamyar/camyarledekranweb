import type { Metadata } from 'next'
import Link from 'next/link'
import { blogArticles } from '@/lib/blog'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog & Bilgi Bankası | Samsun LED Ekran Teknik Rehberleri | Çamyar LED',
  description:
    'Samsun ve Karadeniz bölgesine özel LED ekran seçim rehberleri, Novastar - Huidu kart karşılaştırmaları, mağaza vitrin ölçü hesaplamaları ve teknik makaleler.',
  keywords: [
    'Samsun LED ekran blog',
    'Karadeniz LED ekran teknik rehber',
    'Novastar vs Huidu',
    'Dış mekan LED ekran seçimi',
    'Vitrin LED ekran hesaplama',
    'P10 panel montaj rehberi',
    'İlkadım LED ekran mühendisliği',
  ],
  alternates: {
    canonical: 'https://camyarled.com/blog',
  },
  openGraph: {
    title: 'Blog & Bilgi Bankası | Çamyar LED Ekran Teknolojileri Samsun',
    description:
      'Samsun ve Karadeniz bölgesine özel LED ekran mühendislik rehberleri, kart karşılaştırmaları ve vitrin çözümleri.',
    url: 'https://camyarled.com/blog',
    siteName: 'Çamyar LED Ekran',
    locale: 'tr_TR',
    type: 'website',
  },
}

export default function BlogPage() {
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Çamyar LED Ekran Blog ve Bilgi Bankası',
    description:
      'Samsun ve Karadeniz bölgesine özel LED ekran teknolojileri, teknik rehberler ve ürün karşılaştırmaları.',
    url: 'https://camyarled.com/blog',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Çamyar LED Ekran Teknolojileri',
      url: 'https://camyarled.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kale Mahallesi, Gazi Caddesi No:42',
        addressLocality: 'İlkadım',
        addressRegion: 'Samsun',
        postalCode: '55030',
        addressCountry: 'TR',
      },
    },
    blogPost: blogArticles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      url: `https://camyarled.com/blog/${article.slug}`,
      datePublished: article.isoDate,
      image: article.coverImage,
      author: {
        '@type': 'Organization',
        name: article.author,
      },
    })),
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#292c64] transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#292c64]" aria-current="page">
              Blog & Bilgi Bankası
            </li>
          </ol>
        </nav>

        {/* ── Page Header ── */}
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292c64]/10 text-[#292c64] text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#70b62c]"></span>
            Mühendislik & Teknik İçerikler
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1e2142] tracking-tight mb-4">
            LED Ekran Bilgi Bankası & Uzman Rehberleri
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Samsun ve Karadeniz iklimine uygun dış mekan çözümleri, kontrol kartı optimizasyonları ve mağaza vitrin hesaplama teknikleriyle LED projelerinizi güvenle inşa edin.
          </p>
        </header>

        {/* ── Blog Client Listing (Tabs + Featured + Grid) ── */}
        <BlogClient articles={blogArticles} />
      </div>
    </div>
  )
}
