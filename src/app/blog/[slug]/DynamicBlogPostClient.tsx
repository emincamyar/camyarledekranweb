'use client'

import Link from 'next/link'
import { useCmsStore, openQuoteModal } from '@/lib/dataStore'

export default function DynamicBlogPostClient({ slug }: { slug: string }) {
  const { store, hydrated } = useCmsStore()
  const article = store.blogs.find((a) => a.slug === slug)

  if (!hydrated) {
    return (
      <div className="bg-[#f8fafc] min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-sm font-semibold text-slate-600">Makale yükleniyor...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="bg-[#f8fafc] min-h-screen pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center bg-white rounded-2xl border border-slate-200 p-10 shadow-xs">
          <h1 className="text-2xl font-black text-[#1e2142] mb-2">Makale Bulunamadı</h1>
          <p className="text-sm text-slate-600 mb-6">
            Aradığınız blog yazısı kaldırılmış veya adresi değişmiş olabilir.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292c64] text-white text-xs font-bold hover:bg-[#1e2142] transition-colors"
          >
            &larr; Blog Sayfasına Dön
          </Link>
        </div>
      </div>
    )
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#292c64] hover:text-[#70b62c] transition-colors"
          >
            <span>&larr; Tüm Makalelere Geri Dön</span>
          </Link>
        </div>

        <header className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#292c64] text-white">
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              Samsun Yerel Rehber
            </span>
            <span className="text-xs text-slate-500 ml-auto">{article.readingTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e2142] leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
            {article.excerpt}
          </p>

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
            <div className="text-xs text-slate-500 font-medium">
              Yayınlanma: {article.publishedDate}
            </div>
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 mb-8 shadow-xs bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <nav
            aria-label="İçindekiler Tablosu"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-[#1e2142] uppercase tracking-wider mb-4">
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

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 mb-8">
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed border-l-4 border-[#292c64] pl-4 italic bg-slate-50 py-3 rounded-r-lg">
            {article.content.intro}
          </div>

          <div className="space-y-8 divide-y divide-slate-100">
            {article.content.sections.map((section, idx) => (
              <section key={section.id || idx} id={section.id} className={idx > 0 ? 'pt-8' : ''}>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e2142] mb-3 leading-snug">
                  {section.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {article.content.conclusion && (
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-[#1e2142] mb-3">
                Sonuç ve Mühendislik Tavsiyesi
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {article.content.conclusion}
              </p>
            </div>
          )}
        </div>

        <section className="bg-gradient-to-r from-[#1e2142] to-[#292c64] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Bu Konuda Projeniz mi Var? Hemen Teklif Alın</h3>
              <p className="text-xs sm:text-sm text-slate-200">
                Mühendislik ekibimiz projenize özel maliyet ve teknik şartnameyi hazırlasın.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  openQuoteModal({
                    title: 'Ücretsiz Keşif & Fiyat Teklifi Başvurusu',
                    dimensionsSummary: `Blog Makalesi (${article.title}) — Keşif & Teklif Başvurusu`,
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#70b62c] hover:bg-[#62a225] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                📋 Teklif &amp; Keşif Başvurusu Yap
              </button>
              <a
                href="tel:+905462409077"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#292c64] hover:bg-slate-100 text-xs sm:text-sm font-extrabold shadow-md transition-all"
              >
                📞 0546 240 90 77
              </a>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
