import type { Metadata } from 'next'
import Link from 'next/link'
import ReferanslarClient from './ReferanslarClient'
import QuoteTriggerButton from '@/components/QuoteTriggerButton'

export const metadata: Metadata = {
  title: 'Referanslarımız | Samsun LED Ekran Montaj Projeleri | Çamyar LED',
  description:
    'İlkadım, Atakum, Tekkeköy ve Samsun genelinde tamamladığımız dış mekan LED ekran, totem ve showroom video wall montaj referanslarımız.',
  alternates: { canonical: 'https://camyarled.com/referanslar' },
}

export default function ReferanslarPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#292c64] transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#292c64]" aria-current="page">
              Referanslar
            </li>
          </ol>
        </nav>

        <header className="max-w-3xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b62c] mb-3">Referanslar</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292c64] tracking-tight mb-4">
            Samsun &amp; Bölge Montaj Referanslarımız
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Belediye meydanlarından sanayi sitelerine, AVM vitrinlerinden kurumsal showroomlara kadar tamamladığımız
            LED ekran projeleri.
          </p>
        </header>

        <ReferanslarClient />

        <div className="mt-14 text-center">
          <QuoteTriggerButton
            payload={{
              title: 'Referans Proje Benzeri Keşif & Teklif Başvurusu',
              dimensionsSummary: 'Referanslar Sayfası — Benzer LED Ekran Projesi Keşif & Teklif Talebi',
            }}
            className="inline-flex px-8 py-3.5 rounded-xl bg-[#70b62c] hover:bg-[#5da022] text-white font-bold transition-colors"
          >
            Projeniz İçin Keşif &amp; Teklif İsteyin
          </QuoteTriggerButton>
        </div>
      </div>
    </div>
  )
}
