import type { Metadata } from 'next'
import Link from 'next/link'
import QuoteTriggerButton from '@/components/QuoteTriggerButton'

export const metadata: Metadata = {
  title: {
    absolute: 'Kurumsal & Hakkımızda | Çamyar LED Ekran Teknolojileri - Samsun',
  },
  description:
    "Samsun İlkadım merkezli Çamyar LED Ekran Teknolojileri; Samsun, Karadeniz ve tüm Türkiye'de elektrik-elektronik mühendisliği altyapısıyla dış mekan dev ekran, video wall ve endüstriyel LED çözümleri sunar.",
  keywords: [
    'çamyar led ekran kurumsal',
    'samsun led ekran firmaları',
    'karadeniz led ekran mühendisliği',
    'ilkadım led ekran merkezi',
    'atakum video wall sistemleri',
    'samsun dış mekan dev ekran',
    'novastar yetkili entegratör samsun',
  ],
  alternates: {
    canonical: 'https://camyarled.com/kurumsal',
  },
  openGraph: {
    title: 'Kurumsal & Hakkımızda | Çamyar LED Ekran Teknolojileri - Samsun',
    description:
      "Samsun İlkadım merkezli Çamyar LED Ekran Teknolojileri; Samsun, Karadeniz ve tüm Türkiye'de elektrik-elektronik mühendisliği altyapısıyla dış mekan dev ekran, video wall ve endüstriyel LED çözümleri sunar.",
    url: 'https://camyarled.com/kurumsal',
    siteName: 'Çamyar LED Ekran Teknolojileri',
    locale: 'tr_TR',
    type: 'website',
  },
}

const corporateSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Kurumsal & Hakkımızda | Çamyar LED Ekran Teknolojileri - Samsun',
  description:
    "Samsun İlkadım merkezli Çamyar LED Ekran Teknolojileri; Samsun, Karadeniz ve tüm Türkiye'de elektrik-elektronik mühendisliği altyapısıyla dış mekan dev ekran, video wall ve endüstriyel LED çözümleri sunar.",
  url: 'https://camyarled.com/kurumsal',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': 'https://camyarled.com/#localbusiness',
    name: 'Çamyar LED Ekran Teknolojileri',
    image:
      'https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png',
    logo: 'https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png',
    telephone: '+905462409077',
    email: 'bilgi@camyarelektrik.com',
    url: 'https://camyarled.com',
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
    areaServed: [
      'Samsun',
      'İlkadım',
      'Atakum',
      'Tekkeköy',
      'Ordu',
      'Giresun',
      'Trabzon',
      'Sinop',
      'Amasya',
      'Çorum',
      'Tokat',
    ],
    sameAs: ['https://www.instagram.com/ledekransamsun'],
  },
}

const engineeringAdvantages = [
  {
    number: '01',
    badge: 'Yerel Saha Gücü',
    title: 'Samsun İçi Aynı Gün Servis & Keşif',
    description:
      'İlkadım merkez ofisimiz ve teknik depomuzla Samsun genelinde (Atakum, İlkadım, Tekkeköy, Canik, Bafra, Çarşamba) aynı gün yerinde ücretsiz keşif, statik ölçüm ve acil arıza müdahalesi sağlıyoruz.',
    metrics: 'Maks. 2 Saat Saha İntikali',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: '02',
    badge: 'Sertifikalı Donanım',
    title: 'Novastar & Huidu Lisanslı Kontrol Sistemleri',
    description:
      'Tüm senkron ve asenkron LED ekran projelerimizde orijinal Novastar (VX serisi, TB serisi) ve Huidu kontrol kartları kullanıyor; 3840Hz–7680Hz yenileme hızı ve RCFGX renk kalibrasyonunu mühendislik protokolleriyle gerçekleştiriyoruz.',
    metrics: '%100 Lisanslı & Kalibreli',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  },
  {
    number: '03',
    badge: 'Karadeniz İklim Zırhı',
    title: 'Statik Konstrüksiyon & Rüzgar Dayanımı Güvencesi',
    description:
      'Karadeniz sahil şeridinin yüksek nem, tuzlu deniz buharı ve sert poyraz rüzgarlarına karşı; korozyon önleyici elektrostatik fırın boyalı CNC çelik kabinler, IP65 silikon contalı modüller ve statik rüzgar yükü hesaplı taşıyıcı şasiler üretiyoruz.',
    metrics: 'IP65 Koruma & Statik Raporlu',
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
    number: '04',
    badge: 'Tam Yedek Parça Güvencesi',
    title: '2 Yıl Birebir Değişim Garantisi',
    description:
      'Kurulumunu yaptığımız tüm LED paneller, 5V 60A endüstriyel güç kaynakları ve alıcı kartlar aynı seri (Batch) yedek modüllerle birlikte Samsun depomuzda stoklanır; olası arızalarda tamir bekletmeden birebir modül değişimi yapılır.',
    metrics: 'Samsun Depo Birebir Stok',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
]

const activityAreas = [
  {
    category: 'OUTDOOR DEV EKRAN MÜHENDİSLİĞİ',
    title: 'Dış Mekan (Outdoor) Cephe & Totem Dev LED Ekranlar',
    pitchRange: 'P2.5 · P3 · P4 · P5 · P10 SMD / DIP',
    brightness: '5.500 – 7.500 Nit Güneş Işığı Parlaklığı',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85',
    description:
      'Belediye meydanları, AVM dış cepheleri, kavşak reklam totemleri ve kurumsal bina cepheleri için doğrudan güneş ışığı altında dahi kristal netliğinde görüntü sunan IP65 tam izoleli dış mekan LED ekran projeleri.',
    highlights: [
      'Tuzlu deniz havasına ve yağmura dayanıklı konformal kaplamalı PCB',
      'Otomatik ışık sensörü ile gece/gündüz akıllı parlaklık optimizasyonu',
      'Önden ve arkadan müdahale edilebilen CNC dikme ve kilitli kabin mimarisi',
    ],
  },
  {
    category: 'INDOOR FINE-PITCH GÖRÜNTÜ SİSTEMLERİ',
    title: 'İç Mekan (Indoor) Ultra HD Video Wall & Konferans Ekranları',
    pitchRange: 'P0.9 · P1.53 · P1.86 · P2.5 · P3 SMD / GOB',
    brightness: '3.840 Hz – 7.680 Hz Titreşimsiz Yenileme',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85',
    description:
      'Konferans salonları, yönetim kurulu odaları, TV stüdyoları, düğün salonları ve lüks mağaza iç vitrinleri için çerçevesiz (seamless), sıfır birleşim izli ve yüksek kontrastlı 4K/8K iç mekan LED Video Wall çözümleri.',
    highlights: [
      'Kamera çekimlerinde moiré (dalgalanma) yapmayan 3840Hz+ sürücü entegreleri',
      'Mıknatıslı ön servis (Front-Service) vakum aparatı ile sıfır boşluklu duvar montajı',
      'Novastar hepsi-bir-arada (All-in-One) video işlemci ve kablosuz ekran paylaşımı',
    ],
  },
  {
    category: 'PERAKENDE & ENDÜSTRİYEL OTOMASYON',
    title: 'Mağaza Kayan Yazı, Dijital Vitrin & Endüstriyel Otomasyon Panoları',
    pitchRange: 'Tek Renk · RGB Kayan Yazı · Üretim Sayaç Panoları',
    brightness: 'Wi-Fi / Bulut / PLC & Modbus Entegrasyonu',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85',
    description:
      'Eczaneler, perakende mağazalar, akaryakıt istasyonları ve Tekkeköy OSB fabrikaları için Wi-Fi/USB kontrollü RGB kayan yazı tabelaları, döviz/fiyat panoları ve üretim hattı canlı veri ekranları.',
    highlights: [
      'Mobil uygulama (LedArt / HD2020) üzerinden saniyeler içinde kablosuz içerik güncelleme',
      'Fabrika üretim bantları için iş güvenliği günü, hedef/üretim ve sıcaklık/nem göstergeleri',
      'Slim CNC alüminyum kasalarla estetik ve uzun ömürlü dış cephe montajı',
    ],
  },
]

const regionalDistricts = [
  {
    name: 'İlkadım (Merkez & Depo)',
    detail: '19 Mayıs Mah. merkez ofisimiz, yedek parça depomuz, test laboratuvarımız ve ticari cadde LED ekran projeleri.',
  },
  {
    name: 'Atakum (Sahil & AVM Aksı)',
    detail: 'Atakum sahil şeridi, Adnan Menderes Bulvarı, Cağaloğlu ve kurumsal mağaza cepheleri için yüksek parlaklıklı vitrin & totem ekranları.',
  },
  {
    name: 'Tekkeköy (OSB & Sanayi)',
    detail: 'Tekkeköy Organize Sanayi Bölgesi fabrikaları, lojistik merkezleri, stadyum/etkinlik alanları ve endüstriyel bilgi ekranları.',
  },
  {
    name: 'Tüm Karadeniz Sahil Şeridi',
    detail: 'Ordu, Giresun, Trabzon, Rize, Sinop, Amasya, Çorum ve Tokat illerine kendi mühendis ve montaj ekibimizle anahtar teslim kurulum.',
  },
]

export default function KurumsalPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-[#1e2142]">
      {/* Schema.org Yapısal Veri (AboutPage + LocalBusiness) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateSchema) }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          1. GİRİŞ / KURUMSAL KİMLİK (SİNEMATİK ÜST ALAN)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 bg-white border-b border-slate-200 overflow-hidden">
        {/* Subtle Engineering Grid & Ambient Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(41, 44, 100, 0.08) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#70b62c]/10 via-[#292c64]/5 to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="İz imi" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <li>
                <Link href="/" className="hover:text-[#292c64] transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                /
              </li>
              <li className="text-[#70b62c] font-bold" aria-current="page">
                Kurumsal &amp; Hakkımızda
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Corporate Narrative & H1 */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#292c64]/5 border border-[#292c64]/15">
                <span className="w-2.5 h-2.5 rounded-full bg-[#70b62c] animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#292c64]">
                  Çamyar LED Ekran Teknolojileri • İlkadım / Samsun
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292c64] tracking-tight leading-[1.12]">
                Samsun ve Karadeniz’in Güvenilir{' '}
                <span className="text-[#70b62c]">LED Ekran Mühendisliği</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                <strong className="font-bold text-[#1e2142]">
                  Çamyar LED Ekran Teknolojileri
                </strong>
                , Samsun İlkadım’daki merkez ofisi ve teknik laboratuvarından hareketle; sadece panel
                satışı yapan bir tedarikçi değil,{' '}
                <strong className="font-semibold text-[#292c64]">
                  Elektrik-Elektronik Mühendisliği
                </strong>{' '}
                disipliniyle çalışan uçtan uca bir görüntü teknolojileri ve endüstriyel otomasyon
                merkezidir.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Karadeniz Bölgesi’nin yüksek nem oranı, tuzlu deniz buharı ve sert kıyı rüzgarları;
                standart reklam tabelalarının kısa sürede korozyona uğramasına ve güç arızaları
                vermesine yol açar. Çamyar LED olarak projelendirdiğimiz her dış mekan dev ekran ve
                iç mekan video wall sistemini; statik rüzgar yükü hesaplamaları, IP65 silikon
                izolasyon zırhı, doğru amperaj/kablo kesiti mühendisliği ve lisanslı{' '}
                <strong className="font-semibold text-[#1e2142]">Novastar &amp; Huidu</strong>{' '}
                kalibrasyonuyla uzun yıllar kesintisiz çalışacak şekilde inşa ediyoruz.
              </p>

              {/* Key Engineering Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { value: '150+', label: 'Tamamlanan LED Projesi' },
                  { value: '2 Saat', label: 'Samsun İçi Servis' },
                  { value: 'IP65', label: 'Karadeniz İklim Zırhı' },
                  { value: '2 Yıl', label: 'Birebir Değişim Garantisi' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 shadow-2xs"
                  >
                    <div className="text-2xl font-black text-[#292c64] font-mono">{stat.value}</div>
                    <div className="text-[11px] font-bold text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <QuoteTriggerButton
                  payload={{
                    title: 'Kurumsal Keşif & Proje Teklifi Başvurusu',
                    dimensionsSummary:
                      'Kurumsal Sayfa — Ücretsiz Yerinde Keşif ve Mühendislik Projelendirme Talebi',
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#70b62c] hover:bg-[#5ea020] text-white font-bold text-sm shadow-lg shadow-[#70b62c]/25 transition-all cursor-pointer"
                >
                  <span>Ücretsiz Keşif &amp; Fiyat Teklifi Al</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </QuoteTriggerButton>

                <Link
                  href="/referanslar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-[#292c64] text-[#292c64] hover:bg-[#292c64] hover:text-white font-bold text-sm transition-all"
                >
                  <span>Saha Referanslarımızı İnceleyin</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Cinematic Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                    alt="Çamyar LED Ekran Teknolojileri Elektrik-Elektronik Mühendisliği ve Kalibrasyon Laboratuvarı"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17]/90 via-[#0b0d17]/30 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#292c64]/90 backdrop-blur-md text-white text-[11px] font-bold border border-white/15">
                      Elektrik-Elektronik Mühendisliği
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#70b62c] text-white text-[11px] font-black shadow-sm">
                      İlkadım / Samsun
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-mono text-[#8fd43a] uppercase tracking-wider mb-1">
                      ENDÜSTRİYEL KALİTE STANDARDI
                    </div>
                    <div className="text-base sm:text-lg font-extrabold leading-snug">
                      Karadeniz İklimine Dayanıklı Statik Şasi, Gerçek Bakır Enerji Hatları ve Piksel
                      Kalibrasyonu
                    </div>
                  </div>
                </div>

                {/* Bottom Engineering Spec Strip */}
                <div className="p-5 bg-white grid grid-cols-3 divide-x divide-slate-100 text-center">
                  <div className="px-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">KONTROLÖR</div>
                    <div className="text-xs sm:text-sm font-black text-[#292c64] mt-0.5">
                      Novastar &amp; Huidu
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">YENİLEME HIZI</div>
                    <div className="text-xs sm:text-sm font-black text-[#70b62c] mt-0.5">
                      3840Hz – 7680Hz
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">DIŞ MEKAN ZIRHI</div>
                    <div className="text-xs sm:text-sm font-black text-[#292c64] mt-0.5">
                      IP65 Su &amp; Nem
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. İDDİALI VİZYON, MİSYON VE STRATEJİK HEDEFLER BÖLÜMÜ
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70b62c]/10 border border-[#70b62c]/25 text-xs font-extrabold text-[#467319] uppercase tracking-wider mb-3">
              KurumsalManifesto &amp; Gelecek Vizyonu
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292c64] tracking-tight">
              Mühendislik İlkelerimiz, Vizyonumuz ve Stratejik Hedeflerimiz
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Her pikseli mühendislik hassasiyetiyle hesaplanan projelerimizde; kısa vadeli ticari
              kazanç yerine on yıllarca ayakta kalan kurumsal prestij inşa ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {/* Vizyonumuz Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#292c64]/30 transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#292c64]" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-[#292c64] text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                    01 / VİZYON
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#292c64] mb-4">
                  Vizyonumuz
                </h3>

                <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium border-l-3 border-[#70b62c] pl-4">
                  &ldquo;Karadeniz bölgesinin sınırlarını aşarak, Türkiye’nin en yenilikçi ve
                  güvenilir endüstriyel LED ekran ve otomasyon mühendisliği markası olmak; yüksek
                  çözünürlüklü dijital vitrin teknolojilerinde standartları belirlemek.&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#292c64]">
                <span>Ulusal Teknoloji Liderliği</span>
                <span className="text-[#70b62c]">● Fine-Pitch &amp; Outdoor</span>
              </div>
            </div>

            {/* Misyonumuz Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#70b62c]/50 transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#70b62c]" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-[#70b62c] text-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                    02 / MİSYON
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#292c64] mb-4">
                  Misyonumuz
                </h3>

                <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium border-l-3 border-[#292c64] pl-4">
                  &ldquo;Samsun’dan doğan mühendislik gücümüzle; kamu kurumlarından kurumsal
                  işletmelere, mağazalardan dev etkinlik alanlarına kadar her ölçekte projeye en
                  dayanıklı, enerji verimli ve kusursuz görüntü kalitesine sahip LED ekran
                  sistemlerini anahtar teslim sunmak.&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#292c64]">
                <span>Anahtar Teslim Mühendislik</span>
                <span className="text-[#70b62c]">● Enerji Verimli Tasarım</span>
              </div>
            </div>

            {/* Stratejik Hedeflerimiz Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#292c64]/30 transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#292c64] to-[#70b62c]" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-[#1e2142] text-[#70b62c] flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                    03 / STRATEJİ
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#292c64] mb-4">
                  Stratejik Hedeflerimiz
                </h3>

                <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium border-l-3 border-[#70b62c] pl-4">
                  &ldquo;Arıza oranını sıfıra indiren lisanslı Novastar ve Huidu kalibrasyon
                  altyapısı, Samsun içinde 2 saat içinde teknik servis müdahalesi ve Karadeniz sahil
                  şeridindeki tüm illerde lider teknoloji sağlayıcısı konumu.&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#292c64]">
                <span>Sıfır Hata &amp; 2 Saatte Müdahale</span>
                <span className="text-[#70b62c]">● Karadeniz Liderliği</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. NEDEN ÇAMYAR LED? (4'LÜ MÜHENDİSLİK AVANTAJI)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292c64]/8 text-xs font-extrabold text-[#292c64] uppercase tracking-wider mb-3">
                4 Temel Mühendislik Güvencesi
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292c64] tracking-tight">
                Neden Çamyar LED Ekran Teknolojileri?
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Standart tabelacılıktan farklı olarak; projelerimizi elektriksel yük dengesi, termal
              soğutma ve optik renk kalibrasyonu standartlarına göre teslim ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {engineeringAdvantages.map((item) => (
              <div
                key={item.number}
                className="bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-[#70b62c] p-7 sm:p-8 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#292c64] text-[#70b62c] flex items-center justify-center shadow-sm">
                        {item.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-[#292c64]">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-2xl font-black font-mono text-slate-300">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#292c64] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#467319] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#70b62c]" />
                    {item.metrics}
                  </span>
                  <span className="text-xs font-bold text-[#292c64]">Çamyar LED Standardı ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. FAALİYET ALANLARIMIZ & BÖLGESEL HİZMET AĞI
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Part A: Faaliyet Alanlarımız */}
          <div>
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70b62c]/15 text-xs font-extrabold text-[#467319] uppercase tracking-wider mb-3">
                Uzmanlık &amp; Uygulama Alanlarımız
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292c64] tracking-tight">
                Faaliyet Alanlarımız &amp; Anahtar Teslim Çözümlerimiz
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Dev dış cephe medya ekranlarından hassas iç mekan toplantı salonu ekranlarına kadar
                tüm donanım, yazılım ve çelik konstrüksiyon süreçlerini kendi bünyemizde yürütüyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {activityAreas.map((area) => (
                <div
                  key={area.title}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17]/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-[#292c64]/95 text-white text-[10px] font-extrabold uppercase tracking-wider">
                          {area.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono font-bold text-white">
                        <span className="px-2.5 py-0.5 rounded bg-[#70b62c] text-white">
                          {area.pitchRange}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="text-xs font-mono font-bold text-[#467319] mb-1.5">
                        ⚡ {area.brightness}
                      </div>
                      <h3 className="text-lg font-black text-[#292c64] mb-3 leading-snug">
                        {area.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                        {area.description}
                      </p>

                      <ul className="space-y-2 border-t border-slate-100 pt-4">
                        {area.highlights.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="w-4 h-4 rounded-full bg-[#70b62c]/15 text-[#467319] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                              ✓
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/urunler"
                      className="text-xs font-bold text-[#292c64] hover:text-[#70b62c] transition-colors"
                    >
                      Donanım Kataloğunu İncele →
                    </Link>
                    <Link
                      href="/hesaplama-araci"
                      className="text-xs font-bold text-[#467319] hover:underline"
                    >
                      Ölçü Hesapla
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part B: Bölgesel Hizmet Ağı (Samsun & Karadeniz) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292c64]/10 text-xs font-extrabold text-[#292c64] uppercase tracking-wider">
                  Samsun &amp; Karadeniz Bölgesel Hizmet Ağı
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#292c64] leading-tight">
                  İlkadım, Atakum ve Tekkeköy’den Tüm Karadeniz Sahil Şeridine
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Merkez depomuzun bulunduğu <strong className="text-[#1e2142]">Samsun</strong>{' '}
                  başta olmak üzere; Karadeniz’in tüm il ve ilçelerine aracı taşeron kullanmadan,
                  kendi bünyemizdeki elektrik-elektronik mühendisleri ve çelik konstrüksiyon
                  teknisyenlerimizle doğrudan kurulum ve periyodik bakım hizmeti veriyoruz.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'Samsun (Merkez)',
                    'İlkadım',
                    'Atakum',
                    'Tekkeköy',
                    'Bafra',
                    'Çarşamba',
                    'Ordu',
                    'Giresun',
                    'Trabzon',
                    'Sinop',
                    'Amasya',
                    'Çorum',
                  ].map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-[#292c64]"
                    >
                      📍 {city}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {regionalDistricts.map((dist) => (
                  <div
                    key={dist.name}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#70b62c] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#70b62c]" />
                      <h4 className="text-sm font-black text-[#292c64]">{dist.name}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{dist.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. RESMİ İLETİŞİM & LOKASYON BİLGİLERİ (SCHEMA DESTEKLİ)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-extrabold text-[#292c64] uppercase tracking-wider mb-3">
              Resmi Kurumsal İletişim &amp; Merkez Ofis
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#292c64]">
              Samsun İlkadım Merkez Ofis &amp; Teknik Depo
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Canlı LED panel demolarımızı incelemek ve projenizi mühendislerimizle yüz yüze
              planlamak için İlkadım merkez ofisimize davetlisiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Adres Kartı */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#292c64] text-white flex items-center justify-center mb-5 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Merkez Ofis &amp; Depo Adresi
                </div>
                <h3 className="text-lg font-black text-[#292c64] mb-2">
                  19 Mayıs Mah. Hürriyet Sk. No:19 İlkadım / Samsun
                </h3>
                <p className="text-xs text-slate-500">
                  Pazartesi – Cumartesi: 08:30 – 19:00 • 7/24 Nöbetçi Teknik Servis
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <a
                  href="https://maps.google.com/?q=19+Mayıs+Mah.+Hürriyet+Sk.+No:19+İlkadım+Samsun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#292c64] hover:text-[#70b62c] transition-colors"
                >
                  <span>Google Haritalar’da Yol Tarifi Al</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Telefon Kartı */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#70b62c] text-white flex items-center justify-center mb-5 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Doğrudan Müşteri &amp; Mühendislik Hattı
                </div>
                <h3 className="text-xl font-black text-[#292c64] font-mono mb-2">
                  <a href="tel:+905462409077" className="hover:text-[#70b62c] transition-colors">
                    0546 240 90 77
                  </a>
                </h3>
                <p className="text-xs text-slate-500">
                  Keşif talebi, proje danışmanlığı, toptan panel tedariği ve Novastar/Huidu teknik
                  destek hattı.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <a
                  href="tel:+905462409077"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#467319] hover:text-[#292c64] transition-colors"
                >
                  <span>📞 Tek Tıkla Hemen Ara (0546 240 90 77)</span>
                </a>
              </div>
            </div>

            {/* Resmi E-Posta Kartı */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#292c64] text-[#70b62c] flex items-center justify-center mb-5 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Resmi Kurumsal E-Posta
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#292c64] font-mono mb-2 break-all">
                  <a
                    href="mailto:bilgi@camyarelektrik.com"
                    className="hover:text-[#70b62c] transition-colors"
                  >
                    bilgi@camyarelektrik.com
                  </a>
                </h3>
                <p className="text-xs text-slate-500">
                  Kurumsal şartname, ihale dosyaları, teknik proje çizimleri ve resmi fiyat teklifi
                  yazışmaları.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <a
                  href="mailto:bilgi@camyarelektrik.com"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#292c64] hover:text-[#70b62c] transition-colors"
                >
                  <span>✉️ E-Posta Gönder</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Instagram & Sosyal Medya Kartı */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1e2142] text-[#70b62c] flex items-center justify-center mb-5 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Güncel Saha Montajlarımız &amp; Sosyal Medya
                </div>
                <h3 className="text-xl font-black text-[#292c64] font-mono mb-2">
                  <a
                    href="https://www.instagram.com/ledekransamsun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#70b62c] transition-colors"
                  >
                    @ledekransamsun
                  </a>
                </h3>
                <p className="text-xs text-slate-500">
                  Samsun ve Karadeniz genelinde tamamladığımız güncel LED ekran kurulum videolarını
                  Instagram hesabımızdan takip edin.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <a
                  href="https://www.instagram.com/ledekransamsun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#292c64] hover:text-[#70b62c] transition-colors"
                >
                  <span>Instagram Profilimizi Ziyaret Et (@ledekransamsun)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. BÜYÜK EYLEME ÇAĞRI (CTA - CRM TEKLİF FORMUNA YÖNLENDİREN KUTU)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#1e2142] via-[#292c64] to-[#1e2142] p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
            {/* Decorative ambient circles */}
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#70b62c]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#8fd43a]">
                  <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-ping" />
                  Ücretsiz Mühendislik Keşfi &amp; Bütçe Planlaması
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Samsun İçi Ücretsiz Keşif ve Projelendirme İçin Bize Ulaşın
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                  İster dış cephe dev reklam ekranı, ister iç mekan yüksek çözünürlüklü toplantı
                  salonu ekranı planlayın; uzman elektrik-elektronik mühendislerimiz işletmenizi
                  ziyaret ederek en doğru piksel aralığını, statik şasiyi ve fiyat teklifini aynı
                  gün hazırlasın.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
                <QuoteTriggerButton
                  payload={{
                    title: 'Samsun İçi Ücretsiz Keşif & Projelendirme Başvurusu',
                    dimensionsSummary:
                      'Kurumsal Alt CTA — Samsun İçi Ücretsiz Keşif ve Projelendirme Talebi',
                  }}
                  className="w-full py-4 px-7 rounded-2xl bg-[#70b62c] hover:bg-[#5ea020] text-white font-black text-sm shadow-lg shadow-[#70b62c]/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <span>Hemen Teklif &amp; Keşif Başvurusu Yap</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </QuoteTriggerButton>

                <a
                  href="tel:+905462409077"
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>📞 Doğrudan Mühendislik Hattı: 0546 240 90 77</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
