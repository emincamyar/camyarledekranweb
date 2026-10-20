'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogArticle } from '@/lib/blog'
import { useCmsStore, openQuoteModal } from '@/lib/dataStore'

interface BlogClientProps {
  articles: BlogArticle[]
}

const CATEGORIES = [
  'Tümü',
  'Teknik Rehberler',
  'Samsun Projeleri',
  'Ürün Karşılaştırmaları',
] as const

type CategoryType = (typeof CATEGORIES)[number]

const FALLBACK_BLOG_IMAGE =
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80'

export default function BlogClient({ articles: initialArticles }: BlogClientProps) {
  const { store } = useCmsStore()
  const articles = store.blogs && store.blogs.length > 0 ? store.blogs : initialArticles
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Tümü')

  const filteredArticles =
    selectedCategory === 'Tümü'
      ? articles
      : articles.filter((a) => a.category === selectedCategory)

  const featuredArticle = articles[0]

  return (
    <div className="space-y-12">
      {/* ── Category Filter Tabs ── */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          const count =
            cat === 'Tümü'
              ? articles.length
              : articles.filter((a) => a.category === cat).length

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-[#292c64] text-white shadow-sm shadow-[#292c64]/20 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-[#292c64] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? 'bg-[#70b62c] text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Featured Article Hero (When 'Tümü' or matching category is active) ── */}
      {selectedCategory === 'Tümü' && featuredArticle && (
        <section aria-labelledby="featured-heading">
          <div className="text-xs font-bold uppercase tracking-wider text-[#70b62c] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-pulse"></span>
            Öne Çıkan Teknik Rehber
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#292c64] text-white shadow-sm">
                  {featuredArticle.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#70b62c] text-white shadow-sm">
                  Samsun Yerel Rehber
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {featuredArticle.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <svg className="w-4 h-4 text-[#70b62c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {featuredArticle.readingTime}
                  </span>
                </div>

                <h2 id="featured-heading" className="text-xl sm:text-2xl font-bold text-[#1e2142] group-hover:text-[#292c64] transition-colors leading-snug mb-3">
                  <Link href={`/blog/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3 sm:line-clamp-4">
                  {featuredArticle.excerpt}
                </p>

                {/* Tags Preview */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featuredArticle.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#292c64]/10 text-[#292c64] font-bold text-xs flex items-center justify-center">
                    ÇM
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{featuredArticle.author}</div>
                    <div className="text-[11px] text-slate-500">{featuredArticle.authorRole}</div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#292c64] text-white text-xs font-semibold hover:bg-[#1e2142] transition-colors group/btn"
                >
                  <span>Rehberi Oku</span>
                  <svg
                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Article Cards Grid ── */}
      <section aria-labelledby="articles-heading">
        <div className="flex items-center justify-between mb-6">
          <h2 id="articles-heading" className="text-lg font-bold text-[#1e2142]">
            {selectedCategory === 'Tümü'
              ? 'Tüm Makaleler & İncelemeler'
              : `${selectedCategory} (${filteredArticles.length})`}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Toplam {filteredArticles.length} makale
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-600 text-sm">Bu kategoride henüz yayınlanmış makale bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#292c64] text-white shadow-xs">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-slate-700 shadow-xs flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#70b62c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readingTime}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date and Author */}
                    <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-2.5">
                      <span>{article.publishedDate}</span>
                      <span>•</span>
                      <span className="text-[#292c64] font-medium">{article.author}</span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#1e2142] group-hover:text-[#292c64] transition-colors leading-snug mb-2.5 line-clamp-2">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-5">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read More Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">
                      Tam İnceleme
                    </span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#292c64] group-hover:text-[#70b62c] transition-colors"
                      aria-label={`${article.title} makalesini okuyun`}
                    >
                      <span>Devamını Oku</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Technical Consultation Banner ── */}
      <section className="bg-gradient-to-r from-[#1e2142] to-[#292c64] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#70b62c]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white mb-4">
            <span className="w-2 h-2 rounded-full bg-[#70b62c]"></span>
            Samsun & Karadeniz Proje Destek Hattı
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            Projenize Özel Teknik Danışmanlık ve Yerinde Keşif
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed mb-6">
            Hangi LED panelin, kaç nit parlaklığın veya hangi kontrol kartının işletmeniz için en doğrusu olduğundan emin değil misiniz? Samsun mühendislik ofisimizden aynı gün teknik keşif talep edin.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                openQuoteModal({
                  title: 'Samsun İçi Ücretsiz Keşif & Teklif Başvurusu',
                  dimensionsSummary: 'Blog Bilgi Bankası — Ücretsiz Teknik Keşif ve Teklif Talebi',
                })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#70b62c] hover:bg-[#62a225] text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>📋 Teklif &amp; Keşif Başvurusu Yap</span>
            </button>
            <a
              href="tel:+905462409077"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#292c64] hover:bg-slate-100 text-xs sm:text-sm font-extrabold shadow-md transition-all duration-200"
            >
              <span>📞 0546 240 90 77</span>
            </a>
            <Link
              href="/hesaplama-araci"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all duration-200"
            >
              <span>LED Hesaplama Aracını Aç</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
