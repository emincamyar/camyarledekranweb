import type { Metadata } from 'next'
import Link from 'next/link'
import { blogArticles, getBlogArticle, getRelatedArticles } from '@/lib/blog'
import DynamicBlogPostClient from './DynamicBlogPostClient'
import QuoteTriggerButton from '@/components/QuoteTriggerButton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    return {
      title: 'Makale Bulunamadı | Çamyar LED Ekran',
    }
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.seoKeywords,
    alternates: {
      canonical: `https://camyarled.com/blog/${article.slug}`,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: `https://camyarled.com/blog/${article.slug}`,
      siteName: 'Çamyar LED Ekran',
      locale: 'tr_TR',
      type: 'article',
      publishedTime: article.isoDate,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    return <DynamicBlogPostClient slug={slug} />
  }

  const relatedArticles = getRelatedArticles(slug, 2)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: 'https://camyarled.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Çamyar LED Ekran Teknolojileri',
      logo: {
        '@type': 'ImageObject',
        url: 'https://camyarled.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://camyarled.com/blog/${article.slug}`,
    },
    keywords: article.tags.join(', '),
  }

  const breadcrumbJsonLd = {
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
        name: 'Blog & Bilgi Bankası',
        item: 'https://camyarled.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://camyarled.com/blog/${article.slug}`,
      },
    ],
  }

  const whatsappMessage = encodeURIComponent(
    `Merhaba, "${article.title}" başlıklı teknik makalenizi okudum. Samsun içi ücretsiz keşif ve mühendislik teklifi almak istiyorum.`
  )
  const whatsappUrl = `https://wa.me/905397375595?text=${whatsappMessage}`
  const kesifUrl = `https://wa.me/905397375595?text=${encodeURIComponent(
    `Merhaba, "${article.title}" makaleniz üzerinden ulaşıyorum. Samsun içi ücretsiz yerinde keşif talep ediyorum.`
  )}`

  return (
    <article className="bg-[#f8fafc] min-h-screen pt-24 pb-20">
      {/* ── JSON-LD Schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb Navigation ── */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#292c64] transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-[#292c64] transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-700 truncate max-w-[280px] sm:max-w-none" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* ── Back Link ── */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#292c64] hover:text-[#70b62c] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Tüm Makalelere Geri Dön</span>
          </Link>
        </div>

        {/* ── Article Header ── */}
        <header className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#292c64] text-white">
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              Samsun Yerel Rehber
            </span>
            <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
              <svg className="w-4 h-4 text-[#70b62c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readingTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e2142] leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
            {article.excerpt}
          </p>

          {/* Author & Date Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#292c64] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                ÇM
              </div>
              <div>
                <div className="text-sm font-bold text-[#1e2142]">{article.author}</div>
                <div className="text-xs text-slate-500">{article.authorRole} • Samsun</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Yayınlanma: {article.publishedDate}</span>
            </div>
          </div>
        </header>

        {/* ── Featured 16:9 Image ── */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 mb-8 shadow-xs bg-slate-100">
          <img
            src={article.coverImage}
            alt={article.title}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Table of Contents (İçindekiler) ── */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <nav
            aria-label="İçindekiler Tablosu"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-[#1e2142] uppercase tracking-wider mb-4">
              <svg className="w-4 h-4 text-[#70b62c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>İçindekiler Tablosu (Konu Başlıkları)</span>
            </div>
            <ol className="space-y-2">
              {article.tableOfContents.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-[#292c64] hover:underline font-medium transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-[#292c64] text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* ── Main Article Content ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 mb-8">
          {/* Introduction Paragraph */}
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed border-l-4 border-[#292c64] pl-4 italic bg-slate-50 py-3 rounded-r-lg">
            {article.content.intro}
          </div>

          {/* Structured Sections */}
          <div className="space-y-8 divide-y divide-slate-100">
            {article.content.sections.map((section, idx) => (
              <section
                key={section.id || idx}
                id={section.id}
                className={idx > 0 ? 'pt-8 scroll-mt-28' : 'scroll-mt-28'}
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e2142] mb-3 leading-snug">
                  {section.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                  {section.body}
                </p>

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 my-4 pl-2">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#70b62c] mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.highlight && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-[#1e2142] text-xs sm:text-sm flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#70b62c] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="font-medium text-slate-800 leading-relaxed">
                      {section.highlight}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Conclusion */}
          {article.content.conclusion && (
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-[#1e2142] mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#292c64]"></span>
                Sonuç ve Mühendislik Tavsiyesi
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                {article.content.conclusion}
              </p>

              {/* Inline Direct Engineering & Free Survey Callout */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#70b62c] mb-1">
                    Hızlı Mühendislik Desteği • İlkadım / Samsun
                  </div>
                  <div className="text-sm font-bold text-[#1e2142]">
                    Projeniz için yerinde ölçüm ve teknik şartname desteği alın.
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <QuoteTriggerButton
                    payload={{
                      title: 'Samsun İçi Ücretsiz Keşif Başvurusu',
                      dimensionsSummary: `Blog Makalesi (${article.title}) — Ücretsiz Keşif Talebi`,
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#292c64] hover:bg-[#1e2142] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <span>📍 Samsun İçi Ücretsiz Keşif İste</span>
                  </QuoteTriggerButton>
                  <QuoteTriggerButton
                    payload={{
                      title: 'Proje Fiyat Teklifi Başvurusu',
                      dimensionsSummary: `Blog Makalesi (${article.title}) — Fiyat Teklifi Talebi`,
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#70b62c] hover:bg-[#5da022] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <span>📋 Hızlı Fiyat Teklifi İste</span>
                  </QuoteTriggerButton>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              İlgili Etiketler:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── WhatsApp Direct Quote CTA Banner ── */}
        <section className="bg-gradient-to-r from-[#1e2142] to-[#292c64] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg mb-12">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white mb-2">
                <span className="w-2 h-2 rounded-full bg-[#70b62c]"></span>
                Samsun & Bölge İçi Doğrudan Keşif Talebi
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Bu Konuda Projeniz mi Var? Hemen Teklif Alın
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {article.title} konusunda teknik detayları yerinde inceleyelim, mühendislik ekibimiz projenize özel maliyet ve teknik şartnameyi hazırlasın.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <QuoteTriggerButton
                payload={{
                  title: 'Ücretsiz Keşif & Fiyat Teklifi Başvurusu',
                  dimensionsSummary: `Blog Makalesi (${article.title}) — Keşif & Teklif Başvurusu`,
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#70b62c] hover:bg-[#62a225] text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200"
              >
                <span>📋 Teklif &amp; Keşif Başvurusu Yap</span>
              </QuoteTriggerButton>
              <a
                href="tel:+905462409077"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#292c64] hover:bg-slate-100 text-xs sm:text-sm font-extrabold shadow-md transition-all duration-200"
              >
                <span>📞 0546 240 90 77</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Related Articles Section ── */}
        {relatedArticles.length > 0 && (
          <section aria-labelledby="related-heading">
            <h3 id="related-heading" className="text-xl font-bold text-[#1e2142] mb-6">
              Diğer İlgili Mühendislik Rehberleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#292c64] text-white">
                        {rel.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-slate-500 mb-2">{rel.publishedDate} • {rel.readingTime}</div>
                      <h4 className="text-sm sm:text-base font-bold text-[#1e2142] group-hover:text-[#292c64] transition-colors leading-snug line-clamp-2 mb-2">
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#292c64] group-hover:text-[#70b62c] transition-colors"
                    >
                      <span>İncele</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
