import Link from 'next/link'
import QuoteTriggerButton from './QuoteTriggerButton'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=80'

const trustItems = [
  {
    id: 'trust-muhendislik',
    title: 'Mühendislik Kökenli Altyapı',
    desc: '10+ Yıllık Saha ve Mühendislik Güvencesi',
    href: undefined,
    icon: (
      <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3zm-1 6v3H8v2h3v3h2v-3h3v-2h-3V8h-2z" />
    ),
  },
  {
    id: 'trust-novastar',
    title: 'Lisanslı Novastar & Huidu Sistemleri',
    desc: 'Orijinal Lisanslı Kontrol ve Kalibrasyon',
    href: undefined,
    icon: (
      <path d="M9 2v2H7a2 2 0 00-2 2v2H3v2h2v4H3v2h2v2a2 2 0 002 2h2v2h2v-2h4v2h2v-2h2a2 2 0 002-2v-2h2v-2h-2v-4h2V8h-2V6a2 2 0 00-2-2h-2V2h-2v2h-4V2H9zm-2 4h10v12H7V6zm3 3v6h4V9h-4z" />
    ),
  },
  {
    id: 'trust-servis',
    title: 'Samsun Yerel Servis ve Yedek Parça',
    desc: 'Karadeniz İçi Aynı Gün Servis ve Yedek Parça',
    href: undefined,
    icon: (
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
    ),
  },
  {
    id: 'trust-hesaplayici',
    title: 'Online LED Hesaplayıcı',
    desc: 'Panel ve Güç İhtiyacını Anında Gör',
    href: '/hesaplama-araci',
    icon: (
      <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v4h10V4H7zm1 6a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zM8 14a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z" />
    ),
  },
]

function TrustContent({ item }: { item: (typeof trustItems)[number] }) {
  return (
    <>
      <div className="w-11 h-11 shrink-0 rounded-xl bg-[#70b62c]/15 border border-[#70b62c]/30 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#70b62c" aria-hidden="true">
          {item.icon}
        </svg>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-white leading-snug">{item.title}</div>
        <div className="text-xs text-slate-300 leading-snug mt-0.5">
          {item.href && <span className="text-[#70b62c] font-bold">➔ </span>}
          {item.desc}
        </div>
      </div>
    </>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-[#0b0d17] pt-[72px]"
      aria-label="Ana karşılama bölümü"
    >
      {/* Background image + gradient (clipped so the trust bar can overflow) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d17]/95 via-[#0b0d17]/75 to-[#0b0d17]/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0d17]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#70b62c] bg-[#70b62c]/10 backdrop-blur-sm text-[#70b62c] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-pulse" />
            Samsun &amp; Karadeniz Bölge Lideri
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
            Samsun &amp; Karadeniz Endüstriyel LED Ekran Çözümleri
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-10 max-w-xl">
            Elektrik-Elektronik mühendisliği altyapımızla; dış mekan cephe dev ekranlardan ultra HD iç mekan
            video wall sistemlerine kadar anahtar teslim montaj ve lisanslı Novastar kontrolör desteği.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <QuoteTriggerButton
              payload={{
                title: 'Keşif & Fiyat Teklifi Başvurusu',
                dimensionsSummary: 'Ana Sayfa Hero — Ücretsiz Keşif ve LED Ekran Fiyat Teklifi Talebi',
              }}
              className="bg-[#70b62c] text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#5da022] transition-colors"
            >
              Keşif &amp; Fiyat Teklifi Al <span aria-hidden="true">→</span>
            </QuoteTriggerButton>
            <Link
              href="/urunler"
              className="border border-white/30 text-white hover:bg-white/10 px-6 py-3.5 rounded-xl font-semibold text-center transition-colors"
            >
              Ürün Donanımlarını İncele
            </Link>
          </div>
        </div>
      </div>

      {/* Floating glassmorphism trust bar */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1/2 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#292c64]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
          {trustItems.map((item) => {
            const base = 'flex items-center gap-3.5 p-5'
            return item.href ? (
              <Link
                key={item.id}
                id={item.id}
                href={item.href}
                className={`${base} hover:bg-white/5 transition-colors first:rounded-t-2xl last:rounded-b-2xl lg:first:rounded-l-2xl lg:last:rounded-r-2xl lg:first:rounded-tr-none lg:last:rounded-bl-none`}
              >
                <TrustContent item={item} />
              </Link>
            ) : (
              <div key={item.id} id={item.id} className={base}>
                <TrustContent item={item} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
