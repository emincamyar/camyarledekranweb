import type { Metadata } from 'next'
import { yazilimlar } from '@/lib/products'
import ProgramIndirClient from './ProgramIndirClient'

/* ── JSON-LD Schemas ── */
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Samsun LED Ekran Yazılım Desteği – PowerLED, Huidu, Novastar İndirme Merkezi',
  description:
    "Çamyar LED Ekran Teknolojileri'nin teknik yazılım indirme merkezi. PowerLED, HDPlayer, HDSet, HDBar, NovaLCT ve ViPlex Express güncel sürümler.",
  author: { '@type': 'Organization', name: 'Çamyar LED Ekran Teknolojileri' },
  publisher: {
    '@type': 'Organization',
    name: 'Çamyar LED Ekran Teknolojileri',
    logo: {
      '@type': 'ImageObject',
      url: 'https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png',
    },
  },
  dateModified: '2026-10-20',
  url: 'https://camyarled.com/program-indir',
  inLanguage: 'tr',
}

const softwareSchemas = yazilimlar.map((y) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: y.ad,
  version: y.versiyon,
  description: y.aciklama,
  operatingSystem: y.isletimSistemi.join(', '),
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'TRY',
    availability: 'https://schema.org/InStock',
  },
  publisher: { '@type': 'Organization', name: 'Çamyar LED Ekran Teknolojileri' },
  downloadUrl: y.indirmeLinki.startsWith('http')
    ? y.indirmeLinki
    : `https://camyarled.com${y.indirmeLinki}`,
}))

export const metadata: Metadata = {
  title: 'LED Ekran Yazılım İndirme Merkezi | PowerLED, Huidu, Novastar',
  description:
    'Samsun LED ekran yazılım desteği: PowerLED v2.88, HDPlayer, HDSet, HDBar, NovaLCT ve ViPlex Express güncel sürümleri indir. TF, Huidu ve Novastar kontrol kartı kurulum rehberleri.',
  keywords: [
    'PowerLED indir',
    'HDPlayer indir',
    'HDSet indir',
    'NovaLCT indir',
    'ViPlex Express indir',
    'LED yazılım indir',
    'Huidu yazılımı',
    'Novastar yazılımı',
    'TF LED yazılımı',
    'LED ekran program indir Samsun',
    'HDBar indir',
    'PowerLED v2.88',
    'LED kontrol yazılımı',
  ],
  alternates: { canonical: 'https://camyarled.com/program-indir' },
  openGraph: {
    title: 'LED Ekran Yazılım İndirme Merkezi | Çamyar LED Samsun',
    description:
      'PowerLED, HDPlayer, NovaLCT ve daha fazlası. Ücretsiz LED ekran yazılımları ve kurulum rehberleri.',
    url: 'https://camyarled.com/program-indir',
    type: 'article',
  },
}

export default function ProgramIndirPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e2142] pt-28 pb-20">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchemas) }}
      />

      <ProgramIndirClient />
    </div>
  )
}
