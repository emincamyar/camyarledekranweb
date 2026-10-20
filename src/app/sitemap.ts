import type { MetadataRoute } from 'next'
import { blogArticles } from '@/lib/blog'
import { urunler } from '@/lib/products'

const BASE_URL = 'https://camyarled.com'
const LAST_MODIFIED = '2026-10-20T00:00:00.000Z'

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/urunler`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/referanslar`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/hesaplama-araci`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/program-indir`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/kurumsal`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 1.0,
  }))

  const productRoutes: MetadataRoute.Sitemap = urunler.map((urun) => ({
    url: `${BASE_URL}/urunler/${urun.kategori}/${urun.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...mainRoutes, ...blogRoutes, ...productRoutes]
}
