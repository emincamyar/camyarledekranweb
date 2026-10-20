import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GlobalQuoteModal from '@/components/GlobalQuoteModal'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://camyarledekran.com'),
  title: {
    default: 'Çamyar LED Ekran Teknolojileri | Samsun & Karadeniz Endüstriyel LED Ekran Çözümleri',
    template: '%s | Çamyar LED Ekran Teknolojileri',
  },
  description:
    'Samsun İlkadım merkezli; P10 dış mekan LED paneller, ultra HD iç mekan video wall sistemleri, Novastar/Huidu kontrol kartları satışı, montajı ve teknik servisi. Hemen fiyat teklifi alın.',
  keywords: [
    'samsun led ekran',
    'p10 led panel samsun',
    'dış mekan led ekran fiyatları',
    'novastar yetkili satıcı',
    'kayan yazı tamiri samsun',
    'led video wall atakum',
    'ilkadım led tabela',
    'novastar ayarları',
    'dış mekan led panel',
    'huidu kontrol kartı samsun',
    'karadeniz led ekran montajı',
  ],
  authors: [{ name: 'Çamyar LED Ekran Teknolojileri', url: 'https://camyarledekran.com' }],
  creator: 'Çamyar LED Ekran Teknolojileri',
  publisher: 'Çamyar LED Ekran Teknolojileri',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://camyarledekran.com',
    siteName: 'Çamyar LED Ekran Teknolojileri',
    title: 'Çamyar LED Ekran Teknolojileri | Samsun & Karadeniz Endüstriyel LED Ekran Çözümleri',
    description:
      'Samsun İlkadım merkezli; P10 dış mekan LED paneller, ultra HD iç mekan video wall sistemleri, Novastar/Huidu kontrol kartları satışı, montajı ve teknik servisi. Hemen fiyat teklifi alın.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Çamyar LED Ekran Teknolojileri – Samsun & Karadeniz Endüstriyel LED Çözümleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Çamyar LED Ekran Teknolojileri | Samsun & Karadeniz Endüstriyel LED Ekran Çözümleri',
    description:
      'Samsun İlkadım merkezli; P10 dış mekan LED paneller, ultra HD iç mekan video wall sistemleri, Novastar/Huidu kontrol kartları satışı, montajı ve teknik servisi.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://camyarledekran.com',
  },
  category: 'technology',
  other: {
    'geo.region': 'TR-55',
    'geo.placename': 'İlkadım, Samsun',
    'geo.position': '41.2867;36.3300',
    ICBM: '41.2867, 36.3300',
  },
}

/**
 * LocalBusiness JSON-LD Schema – Samsun İlkadım ve Karadeniz Yerel SEO
 */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectronicsStore'],
  '@id': 'https://camyarledekran.com/#organization',
  name: 'Çamyar LED Ekran Teknolojileri',
  alternateName: ['Çamyar LED', 'Çamyar Mühendislik LED Sistemleri'],
  description:
    'Samsun İlkadım merkezli; P10 dış mekan LED paneller, ultra HD iç mekan video wall sistemleri, Novastar/Huidu kontrol kartları satışı, montajı ve teknik servisi.',
  url: 'https://camyarledekran.com',
  telephone: '+90 546 240 90 77',
  email: 'bilgi@camyarelektrik.com',
  foundingDate: '2015',
  priceRange: '₺₺',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '19 Mayıs Mah. Hürriyet Sk. No:19',
    addressLocality: 'İlkadım',
    addressRegion: 'Samsun',
    postalCode: '55030',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.2867,
    longitude: 36.33,
  },
  hasMap: 'https://maps.google.com/?q=19+Mayıs+Mah.+Hürriyet+Sk.+No:19+İlkadım+Samsun',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:30',
      closes: '19:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Samsun' },
    { '@type': 'AdministrativeArea', name: 'İlkadım' },
    { '@type': 'AdministrativeArea', name: 'Atakum' },
    { '@type': 'AdministrativeArea', name: 'Tekkeköy' },
    { '@type': 'AdministrativeArea', name: 'Çarşamba' },
    { '@type': 'AdministrativeArea', name: 'Bafra' },
    { '@type': 'AdministrativeArea', name: 'Karadeniz Bölgesi' },
  ],
  knowsAbout: [
    'Samsun LED Ekran',
    'Dış Mekan LED Panel',
    'Novastar Ayarları ve Kalibrasyon',
    'Huidu HDPlayer Kontrol Sistemleri',
    'P10 LED Tabela ve Totem',
    'İç Mekan Video Wall Sistemleri',
  ],
  image: 'https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png',
  logo: {
    '@type': 'ImageObject',
    url: 'https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png',
    width: 300,
    height: 60,
  },
  sameAs: ['https://www.instagram.com/ledekransamsun'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-slate-900 overflow-x-hidden`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GlobalQuoteModal />
      </body>
    </html>
  )
}
