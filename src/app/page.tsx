import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import CalculatorTeaser from '@/components/CalculatorTeaser'
import QuoteTriggerButton from '@/components/QuoteTriggerButton'
import { urunler } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Samsun Profesyonel LED Ekran Çözümleri | Çamyar LED',
  description:
    'Çamyar LED Ekran Teknolojileri: Samsun ve Karadeniz Bölgesi için iç mekan LED, dış mekan LED, LED kiralama ve teknik servis. Novastar & Huidu sertifikalı ekip.',
  alternates: { canonical: 'https://camyarled.com' },
}

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const WA = 'https://wa.me/905397375595'
const waLink = (text: string) => `${WA}?text=${encodeURIComponent(text)}`

/* ── 2. Çözüm & uygulama alanları ── */
const solutions = [
  {
    id: 'cozum-dis-mekan',
    title: 'Dış Mekan Cephe & Totem Ekranlar',
    desc: 'Zorlu Karadeniz rüzgar ve yağışına tam dayanıklı IP65 kabinler.',
    tag: 'Outdoor',
    img: unsplash('photo-1542751371-adc38448a05e'),
    href: '/urunler',
  },
  {
    id: 'cozum-ic-mekan',
    title: 'İç Mekan Toplantı & Showroom Video Wall',
    desc: 'P1.8 – P2.5 kristal netliğinde yüksek yenileme hızlı ekranlar.',
    tag: 'Indoor',
    img: unsplash('photo-1492691527719-9d1e07e534b4'),
    href: '/urunler',
  },
  {
    id: 'cozum-kiralik',
    title: 'Etkinlik & Fuar Kiralık Kabinler',
    desc: 'Hızlı kilit mekanizmalı, hafif döküm alüminyum paneller.',
    tag: 'Rental',
    img: unsplash('photo-1501281668745-f7f57925c3b4'),
    href: '/urunler',
  },
  {
    id: 'cozum-tabela',
    title: 'Tabela, Kayan Yazı & Eczane / Mağaza Panoları',
    desc: 'Yüksek parlaklıklı modüler CNC kasalı çözümler.',
    tag: 'Signage',
    img: unsplash('photo-1518770660439-4636190af475'),
    href: '/urunler',
  },
]

/* ── 3. Çok satan ürünler (lib/products ile senkron) ── */
const featuredIds = ['p10-rgb-dis-mekan', 'novastar-mctrl300', 'huidu-hd-w02', '5v-60a-slim']
const featured = featuredIds
  .map((id) => urunler.find((u) => u.id === id))
  .filter((u): u is NonNullable<typeof u> => Boolean(u))

/* ── 5. Çamyar Akıllı Otomasyon & Yazılım Çözümleri (5'li Vitrin) ── */
const smartAutomationSolutions = [
  {
    id: 'otomasyon-doviz-eczane',
    badge: 'Kuyumcu & Eczaneler İçin',
    techTag: 'Python API Bot + Huidu / Novastar',
    title: 'Döviz, Altın & Nöbetçi Eczane Otomatik Botu',
    desc: 'Samsun serbest piyasa altın/döviz kurlarını veya nöbetçi eczane listesini Huidu/Novastar tabelalara saniyesinde otomatik çeken Python otomasyon yazılımı hediyeli sistem. "Güncelleme derdine son, tamamen otomatik akış."',
    highlight: 'Güncelleme derdine son, tamamen otomatik akış.',
    colSpan: 'lg:col-span-2',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'otomasyon-canli-mac-skor',
    badge: 'Kafe & Sosyal Alanlar İçin',
    techTag: 'Canlı Spor Veri Akışı Botu',
    title: 'Canlı Maç & Skor Entegrasyonu',
    desc: 'Samsunspor maç günlerinde skorları, golleri ve lig puan durumunu dış mekan LED tabelanıza saniyesinde yansıtan otomatik otomasyon botu. Müşteriyi kapınıza çeken dijital mıknatıs.',
    highlight: 'Müşteriyi kapınıza çeken dijital mıknatıs.',
    colSpan: 'lg:col-span-2',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'otomasyon-sanayi-isg-sayac',
    badge: 'OSB & Tekkeköy Odaklı',
    techTag: 'Endüstriyel PLC / RTC Otomasyon',
    title: 'Sanayi & İSG Dijital İş Güvenliği Sayaçları',
    desc: 'Fabrika ve tesis girişleri için zorunlu olan "Bu tesiste X gündür kaza yaşanmadı" sayaç panelleri. Her gece otomatik artan endüstriyel LED göstergeler.',
    highlight: 'Her gece otomatik artan endüstriyel İSG sayacı.',
    colSpan: 'lg:col-span-2',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 'otomasyon-bulut-4g-servis',
    badge: 'Sıfır Yerinde Servis Maliyeti',
    techTag: 'Bulut & 4G Uzaktan Yönetim',
    title: 'Uzaktan Bulut & 4G Servis Desteği',
    desc: 'Samsun merkezli ofisimizden internet üzerinden ekranınıza bağlanarak saat, yazı veya program güncellemelerini anında yaptığımız bulut tabanlı uzaktan müdahale güvencesi.',
    highlight: 'Ofisimizden saniyeler içinde uzaktan programlama.',
    colSpan: 'lg:col-span-3',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
  },
  {
    id: 'otomasyon-qr-kesif-crm',
    badge: 'Sahada Hız & CRM Entegrasyonu',
    techTag: 'Akıllı QR & Anında Hesaplama',
    title: 'QR Kodlu Anında Keşif & Akıllı Teklif Sistemi',
    desc: 'Sanayi ve cadde gezilerimizde sunduğumuz akıllı QR kartvizit sistemi. Esnaf dükkanından ayrılmadan telefonundan ölçülerini girer, anında maliyet hesaplar ve talebi doğrudan admin panelimize düşürür.',
    highlight: 'Telefonunuzdan ölçü girin, talep anında CRM panelimize düşsün.',
    colSpan: 'lg:col-span-3',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        />
      </svg>
    ),
  },
]

/* ── 6. Mühendislik farkımız ── */
const engineering = [
  {
    id: 'muh-statik',
    title: 'Statik Rüzgar & Çelik Konstrüksiyon Analizi',
    desc: 'Karadeniz sahil şeridindeki sert fırtınalara dayanıklı, profesyonel demir / kabin karkas projeleri.',
    icon: <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 11h6" />,
  },
  {
    id: 'muh-pano',
    title: 'Pano Otomasyonu & Enerji Güvenliği',
    desc: 'Kaçak akım röleli, faz korumalı, otomatik zaman ayarlı endüstriyel dağıtım panoları.',
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    id: 'muh-kalibrasyon',
    title: 'Kalibrasyon & Piksel Eşitleme',
    desc: 'Novastar yazılımlarıyla her modülde homojen renk ve parlaklık eşitlemesi.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </>
    ),
  },
]

/* ── 6. Referanslar ── */
const references = [
  {
    id: 'ref-ilkadim',
    title: 'İlkadım Meydan Dış Mekan P4 Dev Ekran',
    meta: '12 m² · P4 Outdoor',
    img: unsplash('photo-1514565131-fce0801e5785'),
  },
  {
    id: 'ref-atakum',
    title: 'Atakum Kurumsal Showroom Video Wall',
    meta: 'P2.5 SMD · Indoor',
    img: unsplash('photo-1540575467063-178a50c2df87'),
  },
  {
    id: 'ref-tekkekoy',
    title: 'Tekkeköy Sanayi Sitesi Totem Ekran',
    meta: '15 m² · Çift Taraflı Totem',
    img: unsplash('photo-1477959858617-67f85cf4f1df'),
  },
]

/* ── 7. Süreç ── */
const steps = [
  {
    n: '01',
    title: 'Ücretsiz Keşif',
    desc: 'Samsun içinde aynı gün yerinde ölçü ve statik fizibilite.',
  },
  {
    n: '02',
    title: '3D Modelleme',
    desc: 'Ekranın binada nasıl duracağını gösteren simülasyon.',
  },
  {
    n: '03',
    title: 'Hassas İmalat & Montaj',
    desc: 'CNC kasalama ve düzenli kablo altyapısıyla profesyonel asım.',
  },
  {
    n: '04',
    title: 'Canlı Kalibrasyon & Eğitim',
    desc: 'Kontrol yazılımlarının kullanıcıya öğretilmesi ve 2 yıl birebir garanti başlangıcı.',
  },
]

export default function HomePage() {
  return (
    <div className="bg-white text-[#1e2142]">
      {/* ═══════ 1. HERO + YÜZEN CAM BAR ═══════ */}
      <Hero />

      {/* ═══════ 2. ÇÖZÜM & UYGULAMA ALANLARI ═══════ */}
      <section
        id="hizmetler"
        className="bg-white pt-60 sm:pt-44 lg:pt-32 pb-20 lg:pb-28"
        aria-labelledby="cozumler-baslik"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b62c] mb-3">Çözümler</div>
            <h2 id="cozumler-baslik" className="text-3xl sm:text-4xl font-black text-[#292c64] tracking-tight">
              İhtiyacınıza Uygun LED Ekran Çözümü
            </h2>
            <p className="mt-3 text-slate-600">Uygulama alanınızı seçin, doğru donanımı birlikte belirleyelim.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((s) => (
              <Link
                key={s.id}
                id={s.id}
                href={s.href}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover text-[0px] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17]/90 via-[#0b0d17]/30 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#70b62c] text-white text-[11px] font-bold">
                  {s.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-black text-white leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-200 leading-snug">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#70b62c] group-hover:gap-2 transition-all">
                    İncele <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 3. ÇOK SATAN DONANIMLAR ═══════ */}
      <section id="urunler" className="bg-[#f8fafc] py-20 lg:py-28 border-y border-slate-200" aria-labelledby="urunler-baslik">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b62c] mb-3">E-Katalog</div>
            <h2 id="urunler-baslik" className="text-3xl sm:text-4xl font-black text-[#292c64] tracking-tight">
              Çok Satan Donanımlar &amp; Modüller
            </h2>
            <p className="mt-3 text-slate-600">Samsun depomuzda stokta, aynı gün teslim.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((u) => (
              <article
                key={u.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={u.gorselUrl}
                    alt={`${u.ad} - ${u.model}`}
                    loading="lazy"
                    className="w-full h-full object-cover text-[0px]"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#70b62c] text-white shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {u.stok}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-white text-[#1e2142] border border-slate-200 shadow-sm">
                      2 Yıl Garanti
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[11px] font-mono font-bold text-[#70b62c] uppercase tracking-wider">{u.model}</div>
                  <h3 className="mt-1 text-base font-black text-[#1e2142] leading-snug">{u.ad}</h3>

                  <dl className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs space-y-1.5">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500 font-semibold">Piksel Aralığı</dt>
                      <dd className="text-slate-900 font-bold text-right">{u.ozetTeknik.pikselAraligi}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500 font-semibold">Tarama</dt>
                      <dd className="text-slate-900 font-bold text-right">{u.ozetTeknik.taramaOrani}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500 font-semibold">Voltaj</dt>
                      <dd className="text-slate-900 font-bold text-right">{u.ozetTeknik.calismaVoltaji}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-5 flex items-center gap-2">
                    <Link
                      href={`/urunler/${u.kategori}/${u.slug}`}
                      className="flex-1 text-center px-3 py-2.5 rounded-xl border border-slate-200 text-[#292c64] hover:bg-slate-50 text-xs font-bold transition-colors"
                    >
                      İncele →
                    </Link>
                    <QuoteTriggerButton
                      payload={{
                        title: `${u.ad} — Fiyat Teklifi`,
                        pitchCode: u.model,
                        modelName: u.ad,
                        dimensionsSummary: `Ürün Teklif Talebi: ${u.ad} (${u.model})`,
                      }}
                      className="flex-1 text-center px-3 py-2.5 rounded-xl bg-[#70b62c] hover:bg-[#5da022] text-white text-xs font-bold transition-colors"
                    >
                      Fiyat İste
                    </QuoteTriggerButton>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#292c64] text-[#292c64] font-bold hover:bg-[#292c64] hover:text-white transition-colors"
            >
              Tüm Kataloğu Görüntüle ({urunler.length}+ Ürün) <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ 4. HIZLI HESAPLAMA TEASER ═══════ */}
      <section id="hesapla" className="bg-white py-20 lg:py-28" aria-label="Hızlı LED ekran hesaplama">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CalculatorTeaser />
        </div>
      </section>

      {/* ═══════ 5. ÇAMYAR AKILLI OTOMASYON & YAZILIM ÇÖZÜMLERİ (5'Lİ VİTRİN) ═══════ */}
      <section
        id="akilli-otomasyon"
        className="bg-slate-50 py-20 lg:py-28 border-t border-slate-200/80 relative overflow-hidden"
        aria-labelledby="otomasyon-baslik"
      >
        {/* Subtle Engineering Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(41, 44, 100, 0.08) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bölüm Başlığı ve Alt Açıklama */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#292c64]/5 border border-[#292c64]/15 text-xs font-extrabold uppercase tracking-wider text-[#292c64] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-pulse" />
              Çamyar Akıllı Otomasyon &amp; Yazılım Çözümleri
            </div>
            <h2
              id="otomasyon-baslik"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292c64] tracking-tight leading-[1.15]"
            >
              Sadece LED Ekran Değil, Tam Otomasyon ve{' '}
              <span className="text-[#70b62c]">Akıllı Yazılım Ortaklığı</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Samsun ve Karadeniz bölgesindeki işletmenize özel; Python tabanlı otomatik veri çeken,
              uzaktan yönetilen, iş güvenliğini ve ticari akışları dijitalleştiren akıllı LED ekran
              sistemleri.
            </p>
          </div>

          {/* 5'li Akıllı Çözüm Kartı Grid Yapısı (Responsive 6-Column Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-7">
            {smartAutomationSolutions.map((item, idx) => (
              <article
                key={item.id}
                id={item.id}
                className={`${item.colSpan} bg-white rounded-3xl border border-slate-200/90 hover:border-[#70b62c] p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
              >
                {/* Top Accent Strip */}
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 ${
                    idx % 2 === 0 ? 'bg-[#292c64]' : 'bg-[#70b62c]'
                  }`}
                />

                <div>
                  {/* Icon & Target Audience Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#292c64] text-[#70b62c] flex items-center justify-center shadow-md group-hover:bg-[#70b62c] group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#70b62c]/10 border border-[#70b62c]/30 text-xs font-extrabold text-[#467319]">
                      {item.badge}
                    </span>
                  </div>

                  {/* Tech Tag */}
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    ◈ {item.techTag}
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-black text-[#292c64] leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Highlight & CRM Modal Trigger */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#292c64]">
                    <span className="w-2 h-2 rounded-full bg-[#70b62c]" />
                    <span>{item.highlight}</span>
                  </div>

                  <QuoteTriggerButton
                    payload={{
                      title: `${item.title} — Otomasyon Teklifi`,
                      dimensionsSummary: `Akıllı Otomasyon & Yazılım Talebi: ${item.title} (${item.badge})`,
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#467319] hover:text-[#292c64] transition-colors cursor-pointer"
                  >
                    <span>Bu Sistemi Talep Et</span>
                    <span aria-hidden="true">→</span>
                  </QuoteTriggerButton>
                </div>
              </article>
            ))}
          </div>

          {/* 2. Eyleme Çağrı (CTA) Koyu Lacivert Vurgu Bandı */}
          <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#1e2142] via-[#292c64] to-[#1e2142] p-7 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#70b62c]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#8fd43a] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-ping" />
                  Python Bot • Novastar / Huidu API • Uzaktan Bulut Yönetimi
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-snug">
                  İşletmenize özel yazılım entegrasyonu, otomasyon botu ve akıllı LED çözümleri için
                  Samsun içi ücretsiz keşif talep edin.
                </p>
              </div>

              <div className="w-full lg:w-auto shrink-0">
                <QuoteTriggerButton
                  payload={{
                    title: 'Akıllı Otomasyon & Yazılım Keşif Başvurusu',
                    dimensionsSummary:
                      'Ana Sayfa Otomasyon Bandı — İşletmeye Özel Yazılım Entegrasyonu & Ücretsiz Keşif Talebi',
                  }}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#70b62c] hover:bg-[#5ea020] text-white font-black text-sm shadow-lg shadow-[#70b62c]/30 transition-all cursor-pointer"
                >
                  <span>Ücretsiz Otomasyon &amp; Keşif Talep Et</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </QuoteTriggerButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 5. MÜHENDİSLİK FARKIMIZ ═══════ */}
      <section id="neden-camyar" className="bg-[#f8fafc] py-20 lg:py-28 border-y border-slate-200" aria-labelledby="muhendislik-baslik">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b62c] mb-3">Mühendislik Farkımız</div>
            <h2 id="muhendislik-baslik" className="text-3xl sm:text-4xl font-black text-[#292c64] tracking-tight">
              Sıradan Tabelacılardan Neden Farklıyız?
            </h2>
            <p className="mt-3 text-slate-600">LED ekran yalnızca bir ürün değil; statik, elektrik ve yazılım disiplinidir.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {engineering.map((e) => (
              <div
                key={e.id}
                id={e.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#292c64] flex items-center justify-center mb-6">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#70b62c"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {e.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-black text-[#1e2142] leading-snug mb-3">{e.title}</h3>
                <p className="text-slate-600 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 6. REFERANSLAR ═══════ */}
      <section id="referanslar" className="bg-white py-20 lg:py-28" aria-labelledby="referanslar-baslik">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b62c] mb-3">Referanslar</div>
            <h2 id="referanslar-baslik" className="text-3xl sm:text-4xl font-black text-[#292c64] tracking-tight">
              Samsun &amp; Bölge Montaj Referanslarımız
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {references.map((r) => (
              <article
                key={r.id}
                id={r.id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full h-56 overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.img}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover text-[0px] group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#292c64] text-white text-[11px] font-bold">
                    Tamamlandı
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-[#1e2142] leading-snug">{r.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#70b62c]">{r.meta}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/referanslar"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#292c64] text-[#292c64] font-bold hover:bg-[#292c64] hover:text-white transition-colors"
            >
              Tüm Referans Projelerimizi İnceleyin <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ 7. 4 ADIMDA KURULUM ═══════ */}
      <section id="surec" className="bg-[#f8fafc] py-20 lg:py-28 border-y border-slate-200" aria-labelledby="surec-baslik">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b62c] mb-3">Süreç</div>
            <h2 id="surec-baslik" className="text-3xl sm:text-4xl font-black text-[#292c64] tracking-tight">
              4 Adımda Kusursuz Kurulum Süreci
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative" role="list">
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-7 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#292c64] text-[#70b62c] font-black font-mono flex items-center justify-center mb-5">
                  {s.n}
                </div>
                <h3 className="text-lg font-black text-[#1e2142] mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════ 8. CTA BANNER ═══════ */}
      <section id="iletisim" className="bg-white py-20 lg:py-24" aria-labelledby="cta-baslik">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#292c64] to-[#1e2142] px-6 sm:px-12 py-14 sm:py-16 text-center shadow-xl">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#70b62c]/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#70b62c]/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 id="cta-baslik" className="text-3xl sm:text-4xl font-black text-white leading-tight max-w-3xl mx-auto">
                Projeniz İçin Doğru LED Ekranı ve Maliyetini Birlikte Belirleyelim.
              </h2>
              <p className="mt-5 text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                19 Mayıs Mah. Hürriyet Sk. No:19 İlkadım / Samsun merkezimizden ücretsiz yerinde keşif veya aynı gün mühendislik fiyat teklifi alın.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-mono text-[#8fd43a]">
                <a href="mailto:bilgi@camyarelektrik.com" className="hover:underline">
                  ✉️ bilgi@camyarelektrik.com
                </a>
                <span>•</span>
                <a href="tel:+905462409077" className="hover:underline">
                  📞 0546 240 90 77
                </a>
              </div>
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                <QuoteTriggerButton
                  payload={{
                    title: 'Proje Keşif & Fiyat Teklifi Başvurusu',
                    dimensionsSummary: 'Ana Sayfa Alt CTA — LED Ekran Proje & Fiyat Teklifi Talebi',
                  }}
                  className="bg-[#70b62c] hover:bg-[#5da022] text-white px-8 py-4 rounded-xl font-bold text-base transition-colors"
                >
                  Hızlı Teklif &amp; Keşif Başvurusu Yap
                </QuoteTriggerButton>
                <a
                  href="tel:+905462409077"
                  id="cta-phone"
                  className="border border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-base transition-colors"
                >
                  Doğrudan Ara: 0546 240 90 77
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
