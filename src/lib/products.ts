/**
 * Çamyar LED Ekran Teknolojileri
 * Merkezi ürün ve yazılım veri katmanı
 */

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

export type KategoriSlug =
  | 'led-paneller'
  | 'kontrol-kartlari'
  | 'guc-kaynaklari'
  | 'cnc-kasalar-aksesuarlar'

export interface Kategori {
  slug: KategoriSlug
  ad: string
  aciklama: string
  icon: string
}

export interface ProductOzetTeknik {
  pikselAraligi: string
  taramaOrani: string
  calismaVoltaji: string
  cozunurluk: string
}

export interface Product {
  id: string
  slug: string
  kategori: KategoriSlug
  ad: string
  model: string
  altBaslik: string
  aciklama: string
  uzunAciklama: string
  gorselUrl: string
  teknikOzellikler: { label: string; value: string }[]
  ozetTeknik: ProductOzetTeknik
  rozetler: string[]
  etiketler: string[]
  uyumluYazilimlar?: string[]
  stok: 'Stokta' | 'Sipariş Üzerine' | 'Sorunuz'
  gradient: string
  seoTitle: string
  seoDescription: string
}

export type YazilimKategori = 'PowerLED' | 'Huidu' | 'Novastar'

export interface Software {
  id: string
  ad: string
  kategori: YazilimKategori
  versiyon: string
  aciklama: string
  uzunAciklama: string
  uyumluKartlar: string[]
  isletimSistemi: string[]
  dosyaBoyutu: string
  guncellemeTarihi: string
  indirmeLinki: string
  kurulumAdımlari: string[]
  seoKeywords: string[]
}

/* ═══════════════════════════════════════════
   KATEGORİLER
   ═══════════════════════════════════════════ */

export const kategoriler: Kategori[] = [
  {
    slug: 'led-paneller',
    ad: 'LED Paneller',
    aciklama: 'İç mekan ve dış mekan LED modüller. P2.5, P3, P4, P5, P10 piksel adımı seçenekleri.',
    icon: '◈',
  },
  {
    slug: 'kontrol-kartlari',
    ad: 'Kontrol Kartları',
    aciklama: 'Huidu, Novastar ve TF PowerLED asenkron ve senkron kontrol sistemleri.',
    icon: '⬡',
  },
  {
    slug: 'guc-kaynaklari',
    ad: 'Güç Kaynakları',
    aciklama: '5V slim akıllı fanlı adaptörler, DC-DC step-down gerilim konvertörleri.',
    icon: '⚡',
  },
  {
    slug: 'cnc-kasalar-aksesuarlar',
    ad: 'CNC Kasalar & Aksesuarlar',
    aciklama: '16cm–96cm CNC alüminyum kasalar, flat kablolar ve Novastar receiver kartlar.',
    icon: '⬛',
  },
]

/* ═══════════════════════════════════════════
   ÜRÜNLER
   ═══════════════════════════════════════════ */

export const urunler: Product[] = [
  /* ── 1. LED PANELLER ── */
  {
    id: 'p10-rgb-dis-mekan',
    slug: 'p10-rgb-dis-mekan-14-scan',
    kategori: 'led-paneller',
    ad: 'P10 RGB Dış Mekan LED Modül (1/4 Scan)',
    model: 'P10 1/4 Scan Outdoor',
    altBaslik: 'Outdoor High Brightness LED Module',
    aciklama: 'Güneş ışığında kristal netliğinde görünürlük sunan, IP65 korumalı, 1/4 tarama oranlı dış mekan LED modülü.',
    uzunAciklama: `P10 RGB dış mekan LED modülü, Samsun ve Karadeniz Bölgesi'nin yağışlı, nemli ve rüzgarlı hava koşullarına tam uyumlu olarak üretilmiştir. 
IP65 silikon dolgulu ön maskesi ve korozyona dayanıklı PCB kaplaması sayesinde açık hava tabelalarında, bina cephelerinde ve yol kenarı reklam totemlerinde uzun yıllar kesintisiz çalışır.
Novastar ve Huidu kontrol kartlarıyla 1/4 tarama desteği sayesinde yüksek kontrast ve canlı renk doygunluğu sağlar.`,
    gorselUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: '10 mm Pitch',
      taramaOrani: '1/4 Scan Statik',
      calismaVoltaji: '5V DC / 18W Maks.',
      cozunurluk: '32 × 16 Piksel (320x160mm)',
    },
    teknikOzellikler: [
      { label: 'Piksel Adımı', value: '10 mm' },
      { label: 'Modül Boyutu', value: '320mm × 160mm' },
      { label: 'Piksel Yoğunluğu', value: '10.000 piksel/m²' },
      { label: 'Tarama Oranı', value: '1/4' },
      { label: 'LED Tipi', value: 'SMD 3535 RGB' },
      { label: 'Parlaklık', value: '6.500 – 8.000 nit' },
      { label: 'Görüş Açısı (H/V)', value: '140° / 120°' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
      { label: 'Maks. Güç Tüketimi', value: '18W / modül' },
      { label: 'Koruma Sınıfı', value: 'IP65 (Ön) / IP54 (Arka)' },
      { label: 'Çalışma Sıcaklığı', value: '-25°C / +65°C' },
      { label: 'Kullanım Ömrü', value: '100.000 Saat' },
    ],
    rozetler: ['Samsun Stokta Aynı Gün Teslim', 'IP65 Su Geçirmez', '2 Yıl Birebir Değişim Garantili', 'Novastar / Huidu Uyumlu'],
    etiketler: ['P10', 'Dış Mekan', 'IP65', '1/4 Scan', 'Tabela', 'Bina Cephesi'],
    uyumluYazilimlar: ['HDPlayer', 'NovaLCT', 'PowerLED'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'P10 RGB Dış Mekan LED Modül 1/4 Scan | Çamyar LED Samsun',
    seoDescription: 'Samsun depomuzdan aynı gün teslim P10 RGB dış mekan LED modülü. 1/4 scan, IP65 su geçirmez, 7000 nit parlaklık. 2 yıl garanti.',
  },
  {
    id: 'p25-ic-mekan',
    slug: 'p25-ic-mekan-modul',
    kategori: 'led-paneller',
    ad: 'P2.5 Yüksek Çözünürlüklü İç Mekan LED Modül',
    model: 'P2.5 SMD Indoor Fine-Pitch',
    altBaslik: 'Ultra High-Definition Indoor LED Panel',
    aciklama: 'Konferans salonları, TV stüdyoları ve lüks showroomlar için 160.000 piksel/m² ultra yoğunluklu iç mekan modülü.',
    uzunAciklama: `P2.5 iç mekan modülü, 1.5–3 metre gibi yakın izleme mesafelerinde bile piksel noktalarının seçilmediği pürüzsüz bir görüntü kalitesi sunar.
Yüksek yenileme hızı (≥3.840 Hz) sayesinde stüdyo çekimlerinde ve kamera önü etkinliklerde titreşimsiz kayıt alınabilir.
Manyetik ön servis desteği ile montaj ve müdahale saniyeler içinde gerçekleştirilir.`,
    gorselUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: '2.5 mm Pitch',
      taramaOrani: '1/32 Scan',
      calismaVoltaji: '5V DC / 16W Maks.',
      cozunurluk: '128 × 64 Piksel (320x160mm)',
    },
    teknikOzellikler: [
      { label: 'Piksel Adımı', value: '2.5 mm' },
      { label: 'Modül Boyutu', value: '320mm × 160mm' },
      { label: 'Piksel Yoğunluğu', value: '160.000 piksel/m²' },
      { label: 'Tarama Oranı', value: '1/32' },
      { label: 'LED Tipi', value: 'Black Shell SMD 1515' },
      { label: 'Parlaklık', value: '800 – 1.000 nit' },
      { label: 'Yenileme Hızı', value: '3.840 Hz' },
      { label: 'Gri Tonlama', value: '16 Bit (65.536 seviye)' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
      { label: 'Güç Tüketimi (Ort.)', value: '180W / m²' },
      { label: 'Bakım', value: 'Önden Manyetik Servis' },
    ],
    rozetler: ['Ultra HD 3840Hz', 'Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili', 'Novastar Kalibrasyonlu'],
    etiketler: ['P2.5', 'İç Mekan', 'Fine Pitch', 'Stüdyo', 'Toplantı Salonu', '3840Hz'],
    uyumluYazilimlar: ['NovaLCT', 'ViPlex Express'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'P2.5 İç Mekan LED Modül Ultra HD | Çamyar LED Samsun',
    seoDescription: 'P2.5 iç mekan yüksek çözünürlüklü LED ekran modülü Samsun. 3840 Hz yenileme hızı, stüdyo kalitesi, 2 yıl garanti.',
  },
  {
    id: 'p3-ic-mekan',
    slug: 'p3-ic-mekan-modul',
    kategori: 'led-paneller',
    ad: 'P3 İç Mekan Profesyonel LED Modül',
    model: 'P3 SMD Indoor Standard',
    altBaslik: 'Professional Indoor Display Module',
    aciklama: 'Showroomlar, düğün salonları ve toplantı odaları için en çok tercih edilen fiyat/performans iç mekan LED paneli.',
    uzunAciklama: `P3 iç mekan LED paneli, 111.111 piksel/m² çözünürlüğü ve 1.920–3.840 Hz yenileme hızıyla iç mekan video duvarlarının vazgeçilmezidir.
Canlı renk doygunluğu ve geniş izleme açısı sayesinde salonun her noktasından net izleme konforu sunar.
Novastar alıcı kartlarıyla renk ve parlaklık kalibrasyonu kusursuz şekilde yapılabilir.`,
    gorselUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: '3 mm Pitch',
      taramaOrani: '1/16 Scan',
      calismaVoltaji: '5V DC / 14W Maks.',
      cozunurluk: '64 × 64 Piksel (192x192mm)',
    },
    teknikOzellikler: [
      { label: 'Piksel Adımı', value: '3 mm' },
      { label: 'Modül Boyutu', value: '192mm × 192mm' },
      { label: 'Piksel Yoğunluğu', value: '111.111 piksel/m²' },
      { label: 'Tarama Oranı', value: '1/16' },
      { label: 'LED Tipi', value: 'SMD 2121 RGB' },
      { label: 'Parlaklık', value: '1.000 – 1.200 nit' },
      { label: 'Yenileme Hızı', value: '1.920 – 3.840 Hz' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
      { label: 'Görüş Açısı', value: '160° Yatay / 140° Dikey' },
    ],
    rozetler: ['Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili', 'Novastar Uyumlu', 'Popüler Ürün'],
    etiketler: ['P3', 'İç Mekan', 'Showroom', 'Düğün Salonu', 'AVM Ekranı'],
    uyumluYazilimlar: ['NovaLCT', 'HDPlayer', 'ViPlex Express'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'P3 İç Mekan LED Modül | Çamyar LED Samsun',
    seoDescription: 'Samsun P3 iç mekan LED modül satışı ve montajı. Showroom, düğün salonu ve kurumsal alanlar için en ideal çözüm.',
  },
  {
    id: 'p4-ic-mekan',
    slug: 'p4-ic-mekan-modul',
    kategori: 'led-paneller',
    ad: 'P4 İç/Yarı Dış Mekan LED Modül',
    model: 'P4 SMD Multi-Purpose',
    altBaslik: 'Commercial Display Module',
    aciklama: 'Geniş izleme mesafeli fuar alanları, otel lobileri ve spor salonları için ekonomik ve dayanıklı P4 LED paneli.',
    uzunAciklama: `P4 LED paneli, geniş alanlarda büyük ölçekli ekranlar kurmak isteyen işletmeler için bütçe dostu ve yüksek parlaklıklı bir tercihtir.
62.500 piksel/m² yoğunluğu ile 4 metre ve üzeri mesafelerden kusursuz görüntü sunar.
Yüksek verimli sürücü entegreleri sayesinde düşük enerji sarfiyatı ve minimum ısınma ile çalışır.`,
    gorselUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: '4 mm Pitch',
      taramaOrani: '1/8 Scan',
      calismaVoltaji: '5V DC / 18W Maks.',
      cozunurluk: '64 × 32 Piksel (256x128mm)',
    },
    teknikOzellikler: [
      { label: 'Piksel Adımı', value: '4 mm' },
      { label: 'Modül Boyutu', value: '256mm × 128mm / 320x160mm' },
      { label: 'Piksel Yoğunluğu', value: '62.500 piksel/m²' },
      { label: 'Tarama Oranı', value: '1/8' },
      { label: 'LED Tipi', value: 'SMD 2121 / 2020' },
      { label: 'Parlaklık', value: '1.200 – 1.600 nit' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
    ],
    rozetler: ['Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili', 'Ekonomik & Güvenilir'],
    etiketler: ['P4', 'İç Mekan', 'Fuar', 'Otel Lobisi', 'Geniş Ekran'],
    uyumluYazilimlar: ['HDPlayer', 'NovaLCT'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'P4 İç Mekan LED Modül Fiyatları | Çamyar LED Samsun',
    seoDescription: 'P4 iç mekan LED modül Samsun. Otel, spor kompleksi ve fuarlar için dayanıklı ve ekonomik LED panel çözümleri.',
  },
  {
    id: 'p5-ic-mekan',
    slug: 'p5-ic-mekan-modul',
    kategori: 'led-paneller',
    ad: 'P5 İç & Dış Mekan LED Modül',
    model: 'P5 SMD High Brightness',
    altBaslik: 'Large Area LED Display Module',
    aciklama: 'Büyük ölçekli konferans salonları, stadyum kontrol odaları ve podyum arkası ekranlar için yüksek dayanımlı P5 paneli.',
    uzunAciklama: `P5 modülleri, geniş metrekareli projelerde maliyeti optimize ederken yüksek parlaklık ve güvenilirlik sunar.
Yüksek kontrastlı siyah maskesi sayesinde ışıklı ortamlarda bile canlı renk görünürlüğü korunur.`,
    gorselUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: '5 mm Pitch',
      taramaOrani: '1/8 Scan',
      calismaVoltaji: '5V DC / 18W Maks.',
      cozunurluk: '64 × 32 Piksel (320x160mm)',
    },
    teknikOzellikler: [
      { label: 'Piksel Adımı', value: '5 mm' },
      { label: 'Modül Boyutu', value: '320mm × 160mm' },
      { label: 'Piksel Yoğunluğu', value: '40.000 piksel/m²' },
      { label: 'Tarama Oranı', value: '1/8' },
      { label: 'Parlaklık', value: '1.500 – 2.000 nit' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
    ],
    rozetler: ['Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili', 'Geniş Alan'],
    etiketler: ['P5', 'Büyük Alan', 'Stadyum', 'Podyum'],
    uyumluYazilimlar: ['NovaLCT', 'HDPlayer'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'P5 LED Modül Samsun | Çamyar LED',
    seoDescription: 'P5 LED modül modelleri. Büyük ekran uygulamaları için ekonomik ve dayanıklı modül seçenekleri Samsun depomuzda.',
  },

  /* ── 2. KONTROL KARTLARI ── */
  {
    id: 'huidu-hd-w02',
    slug: 'huidu-hd-w02',
    kategori: 'kontrol-kartlari',
    ad: 'Huidu HD-W02 WiFi Asenkron LED Kontrol Kartı',
    model: 'Huidu HD-W02 (WiFi)',
    altBaslik: 'Single/Double Color WiFi Controller',
    aciklama: 'Kablosuz WiFi bağlantısıyla cep telefonundan veya bilgisayardan anında yazı ve animasyon yükleme imkanı sunan ekonomik kart.',
    uzunAciklama: `Huidu HD-W02, tabela ve tek/çift renkli LED ekranların en popüler WiFi kontrol kartıdır.
Android ve iOS için "LedArt" mobil uygulaması veya PC için HDPlayer yazılımıyla doğrudan kablosuz bağlantı kurularak içerik saniyeler içinde güncellenir.
Ekstra kablolama ihtiyacını ortadan kaldırır, şifreli WiFi ağıyla güvenli yönetim sağlar.`,
    gorselUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Evrensel Uyumlu',
      taramaOrani: 'Tüm HUB12/08 Modüller',
      calismaVoltaji: '5V DC (3.5V-6V)',
      cozunurluk: 'Maks. 512 × 32 / 320 × 48 Piksel',
    },
    teknikOzellikler: [
      { label: 'Kart Tipi', value: 'Asenkron WiFi Kontrol Kartı' },
      { label: 'Bağlantı', value: 'WiFi 802.11 b/g/n & USB Port' },
      { label: 'Maksimum Yük', value: '512×32 veya 320×48 piksel' },
      { label: 'Çıkış Portları', value: '2 × HUB12, 1 × HUB08' },
      { label: 'Hafıza', value: 'Dahili Flash Bellek' },
      { label: 'Yazılım & Mobil', value: 'HDPlayer / LedArt (Android & iOS)' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
    ],
    rozetler: ['Samsun Stokta Aynı Gün Teslim', 'Mobil LedArt Desteği', '2 Yıl Birebir Değişim Garantili', 'Kablosuz WiFi'],
    etiketler: ['Huidu', 'HD-W02', 'WiFi', 'LedArt', 'Kayan Yazı Kartı'],
    uyumluYazilimlar: ['HDPlayer', 'HDSet'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'Huidu HD-W02 WiFi Kontrol Kartı | Çamyar LED Samsun',
    seoDescription: 'Huidu HD-W02 WiFi LED kontrol kartı Samsun depomuzda. Cep telefonundan LedArt ile anında güncelleme, 2 yıl garanti.',
  },
  {
    id: 'huidu-hd-wf1',
    slug: 'huidu-hd-wf1',
    kategori: 'kontrol-kartlari',
    ad: 'Huidu HD-WF1 WiFi RGB Full Color Kontrol Kartı',
    model: 'Huidu HD-WF1 (RGB WiFi)',
    altBaslik: 'Full Color WiFi LED Controller',
    aciklama: 'P10, P4, P5 gibi RGB tam renkli panelleri kablosuz WiFi ve USB üzerinden yönetebilen akıllı kontrol kartı.',
    uzunAciklama: `Huidu HD-WF1, tam renkli (RGB) LED modüller için geliştirilmiş kompakt ve ekonomik bir asenkron kontrol kartıdır.
Dahili HUB75E portu sayesinde doğrudan modüllere bağlanabilir. 
Metin, resim, analog saat, sayaç ve renkli animasyonları akıcı bir şekilde ekranda oynatır.`,
    gorselUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'P10, P5, P4, P3 RGB',
      taramaOrani: '1/32, 1/16, 1/8, 1/4 vb.',
      calismaVoltaji: '5V DC',
      cozunurluk: 'Maks. 640 × 32 / 320 × 64 Piksel',
    },
    teknikOzellikler: [
      { label: 'Kart Tipi', value: 'RGB Full Color Asenkron' },
      { label: 'Çıkış Arayüzü', value: '1 × Standart HUB75E Port' },
      { label: 'Bağlantı', value: 'WiFi + USB Bellek' },
      { label: 'Desteklenen Renk', value: 'Full Color RGB (256 seviye gri)' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
      { label: 'Yazılım', value: 'HDPlayer / LedArt Mobile' },
    ],
    rozetler: ['Samsun Stokta Aynı Gün Teslim', 'HUB75E Çıkışlı', '2 Yıl Birebir Değişim Garantili', 'RGB Tam Renkli'],
    etiketler: ['Huidu', 'HD-WF1', 'HUB75E', 'RGB Kart', 'WiFi'],
    uyumluYazilimlar: ['HDPlayer', 'HDSet'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'Huidu HD-WF1 RGB WiFi LED Kontrol Kartı | Çamyar LED Samsun',
    seoDescription: 'Huidu HD-WF1 full color RGB WiFi LED kontrol kartı. HUB75 portlu, P10 ve iç mekan panellerle tam uyumlu.',
  },
  {
    id: 'huidu-hd-c16c',
    slug: 'huidu-hd-c16c',
    kategori: 'kontrol-kartlari',
    ad: 'Huidu HD-C16C Asenkron Video Oynatıcı Kart',
    model: 'Huidu HD-C16C Asenkron Video',
    altBaslik: 'Async Video Player Card with Hub75',
    aciklama: 'Bilgisayara ihtiyaç duymadan dahili 4GB hafızasında video ve animasyonları oynatan, Ethernet ve WiFi destekli kart.',
    uzunAciklama: `HD-C16C, orta ve büyük ölçekli video ekranları için geliştirilmiş entegre alıcı+gönderici video oynatıcı karttır.
Üzerinde bulunan 10 adet HUB75E çıkışı sayesinde harici receiver kart olmadan doğrudan 120.000 piksele kadar ekranları sürer.
Ethernet, opsiyonel 4G/WiFi ve USB desteğiyle bulut üzerinden uzaktan reklam güncellemesi yapılabilir.`,
    gorselUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm RGB Modüller',
      taramaOrani: 'Statik → 1/64 Scan',
      calismaVoltaji: '5V DC / 10W Maks.',
      cozunurluk: 'Maks. 384 × 320 Piksel (120K Toplam)',
    },
    teknikOzellikler: [
      { label: 'Kart Tipi', value: 'Entegre Video Kontrol Kartı' },
      { label: 'Çıkış Portları', value: '10 Adet Doğrudan HUB75E' },
      { label: 'Dahili Hafıza', value: '4 GB eMMC (Genişletilebilir)' },
      { label: 'Ağ Bağlantısı', value: '100M RJ45 Ethernet + USB + WiFi Opsiyon' },
      { label: 'Video Desteği', value: '1080P Donanımsal Çözme (MP4, AVI vb.)' },
      { label: 'Ses Çıkışı', value: '3.5 mm Standart Stereo Çıkış' },
    ],
    rozetler: ['10x HUB75 Entegre', '1080P Video Çözme', 'Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['Huidu', 'HD-C16C', 'Video Kart', 'Dahili Hafıza', 'Reklam Ekranı'],
    uyumluYazilimlar: ['HDPlayer', 'HDSet'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'Huidu HD-C16C Video Kontrol Kartı | Çamyar LED Samsun',
    seoDescription: 'Huidu HD-C16C 10 adet HUB75 çıkışlı asenkron video LED kontrol kartı Samsun. 1080p video oynatma, 2 yıl garanti.',
  },
  {
    id: 'novastar-mctrl300',
    slug: 'novastar-mctrl300',
    kategori: 'kontrol-kartlari',
    ad: 'Novastar MCTRL300 Bağımsız Senkron Gönderici Kutu',
    model: 'Novastar MCTRL300 (DVI Input)',
    altBaslik: 'Independent Synchronous Sending Box',
    aciklama: '1.300.000 piksel yük kapasitesi, DVI video girişi ve 2 adet Gigabit Ethernet çıkışı sunan endüstri standardı Novastar kontrolör.',
    uzunAciklama: `Novastar MCTRL300, profesyonel sabit kurulumlar ve kiralık sahne LED ekranları için dünya standardı kabul edilen senkron kontrol kutusudur.
DVI video girişi ile bilgisayardan alınan görüntüyü pikseller arasında sıfır gecikmeyle iki adet Gigabit ağ çıkışına aktarır.
NovaLCT yazılımı ile piksel düzeyinde parlaklık ve renk kalibrasyonu (Chroma/Brightness Calibration) desteği sunar.`,
    gorselUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm P Serisi Modüller',
      taramaOrani: 'Evrensel NovaLCT',
      calismaVoltaji: '100–240V AC Dahili PSU',
      cozunurluk: '1.300.000 Piksel (Maks 1920×1200)',
    },
    teknikOzellikler: [
      { label: 'Kontrolör Tipi', value: 'Bağımsız Senkron Gönderici (Sending Box)' },
      { label: 'Video Girişi', value: '1 × DVI-D Giriş' },
      { label: 'Çıkış Portları', value: '2 × Gigabit RJ45 Ethernet Portu' },
      { label: 'Yükleme Kapasitesi', value: '1.3 Milyon Piksel (1280×1024 @ 60Hz)' },
      { label: 'Yazılım Desteği', value: 'NovaLCT / SmartLCT' },
      { label: 'Ses Desteği', value: 'Harici Ses Kartı Entegrasyonu' },
      { label: 'Güç Girişi', value: 'AC 100-240V, 50/60Hz' },
    ],
    rozetler: ['Novastar Orijinal', 'Samsun Stokta Aynı Gün Teslim', '1.3M Piksel Kapasite', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['Novastar', 'MCTRL300', 'Senkron Kutu', 'DVI Gönderici', 'Sahne Ekranı'],
    uyumluYazilimlar: ['NovaLCT', 'ViPlex Express'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'Novastar MCTRL300 Senkron Kontrol Kutu | Çamyar LED Samsun',
    seoDescription: 'Orijinal Novastar MCTRL300 bağımsız LED gönderici kutu Samsun depomuzda. 1.3M piksel, NovaLCT tam uyumlu.',
  },
  {
    id: 'novastar-mctrl600',
    slug: 'novastar-mctrl600',
    kategori: 'kontrol-kartlari',
    ad: 'Novastar MCTRL600 Yüksek Kapasiteli Senkron Kontrolör',
    model: 'Novastar MCTRL600 (HDMI + DVI)',
    altBaslik: 'High-Capacity Synchronous Controller',
    aciklama: '2.300.000 piksel yük kapasitesi, HDMI ve DVI girişleri, 4 adet Gigabit çıkış portuyla dev LED duvar kontrolörü.',
    uzunAciklama: `Novastar MCTRL600, stadyum ekranları, dev cephe LED panoları ve üst düzey sahne organizasyonları için tasarlanmış amiral gemisi bir kontrol kutusudur.
HDMI ve DVI çift video girişi sayesinde esnek bağlantı imkanı tanır.
4 adet bağımsız RJ45 çıkışı ile 2.3 Milyon pikseli 60 Hz yenileme hızıyla doğrudan besler.`,
    gorselUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm P Serisi Modüller',
      taramaOrani: 'Evrensel NovaLCT',
      calismaVoltaji: '100–240V AC Dahili PSU',
      cozunurluk: '2.300.000 Piksel (Maks 2048×1152)',
    },
    teknikOzellikler: [
      { label: 'Kontrolör Tipi', value: '4 Portlu Senkron Gönderici Kutu' },
      { label: 'Video Girişleri', value: '1 × HDMI 1.3, 1 × DVI' },
      { label: 'Çıkış Portları', value: '4 × Gigabit RJ45 Ethernet Portu' },
      { label: 'Piksel Kapasitesi', value: '2.3 Milyon Piksel (Genişlik: 3840, Yükseklik: 3840)' },
      { label: 'Ses Girişi', value: '3.5 mm Bağımsız Ses Girişi' },
      { label: 'Kasa Tipi', value: '1U Standart Endüstriyel Rack Kasa' },
    ],
    rozetler: ['2.3M Piksel Kapasite', '4 Port Gigabit RJ45', 'Novastar Orijinal', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['Novastar', 'MCTRL600', '4 Port', 'HDMI Giriş', 'Dev LED Ekran'],
    uyumluYazilimlar: ['NovaLCT', 'ViPlex Express'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'Novastar MCTRL600 4 Port LED Kontrolör | Çamyar LED Samsun',
    seoDescription: 'Novastar MCTRL600 4 portlu LED kontrol kutusu. 2.3 milyon piksel, HDMI/DVI girişli. Samsun garantili teslimat.',
  },
  {
    id: 'novastar-tb30',
    slug: 'novastar-taurus-tb30',
    kategori: 'kontrol-kartlari',
    ad: 'Novastar Taurus TB30 Multimedya Oynatıcı & Kontrolör',
    model: 'Novastar Taurus TB30 (Smart Media Player)',
    altBaslik: 'Smart Cloud Multimedia Player',
    aciklama: '650.000 piksel yük kapasiteli, dahili Android işlemcili, WiFi ve bulut (VNNOX) uzaktan yönetimli akıllı oynatıcı.',
    uzunAciklama: `Novastar Taurus TB30, bilgisayar gerektirmeyen yeni nesil akıllı medya oynatıcı ve göndericidir.
Dahili 1.5 GHz 4 çekirdekli işlemcisi ve 16 GB depolaması sayesinde 4K video çözme desteğine sahiptir.
VNNOX Cloud platformu ile Türkiye'nin veya dünyanın neresinde olursanız olun internet üzerinden içerikleri zamanlayabilir ve uzaktan ekranı kontrol edebilirsiniz.`,
    gorselUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm P Serisi Modüller',
      taramaOrani: 'Evrensel NovaLCT',
      calismaVoltaji: '100–240V AC',
      cozunurluk: '650.000 Piksel (2 Port RJ45)',
    },
    teknikOzellikler: [
      { label: 'İşlemci / Sistem', value: 'Quad-Core 1.5 GHz, Android Tabanlı' },
      { label: 'Depolama', value: '2 GB RAM + 16 GB Dahili eMMC' },
      { label: 'Ağ Bağlantısı', value: 'Gigabit LAN, WiFi AP & İstemci, 4G Opsiyonel' },
      { label: 'Piksel Yükü', value: '650.000 Piksel (Genişlik 4096 / Yükseklik 4096)' },
      { label: 'Çıkış', value: '2 × Gigabit Ethernet (Ana + Yedek Modu)' },
      { label: 'Bulut Desteği', value: 'VNNOX Cloud & ViPlex Mobil' },
    ],
    rozetler: ['Bulut VNNOX Destekli', 'Bilgisayarsız Oynatma', 'Novastar Orijinal', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['Novastar', 'Taurus TB30', 'Bulut Oynatıcı', 'VNNOX', 'WiFi Medya'],
    uyumluYazilimlar: ['ViPlex Express', 'NovaLCT'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'Novastar Taurus TB30 Medya Oynatıcı | Çamyar LED Samsun',
    seoDescription: 'Novastar Taurus TB30 multimedya oynatıcı Samsun. VNNOX bulut desteği, bilgisayarsız akıllı oynatma.',
  },
  {
    id: 'tf-s6u',
    slug: 'tf-powerled-tf-s6u',
    kategori: 'kontrol-kartlari',
    ad: 'TF PowerLED TF-S6U USB Asenkron Kontrol Kartı',
    model: 'TF-S6U USB Controller',
    altBaslik: 'PowerLED USB Display Controller',
    aciklama: 'Kayan yazı ve tek/çift renkli LED ekranların en sağlam kontrol kartı. USB bellek ile kolayca program yükleme.',
    uzunAciklama: `TF-S6U, PowerLED yazılımıyla tam uyumlu, Türkiye genelinde en yaygın kullanılan asenkron LED kontrol kartıdır.
Elektrik kesintilerine karşı dayanıklı mimarisi ve saat pili desteği sayesinde tarih/saat bilgilerini daima hafızasında tutar.`,
    gorselUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'P10 Tek & Çift Renk',
      taramaOrani: '1/16, 1/8, 1/4 vb.',
      calismaVoltaji: '5V DC',
      cozunurluk: '1024 × 32 / 512 × 64 Piksel',
    },
    teknikOzellikler: [
      { label: 'Kart Tipi', value: 'USB Asenkron Kayan Yazı Kartı' },
      { label: 'Port Sayısı', value: '4 × HUB12, 2 × HUB08' },
      { label: 'Hafıza', value: '2 MB Dahili Flash' },
      { label: 'Yazılım', value: 'PowerLED v2.88 ve üzeri' },
      { label: 'Çalışma Voltajı', value: '5V DC' },
    ],
    rozetler: ['PowerLED v2.88 Uyumlu', 'Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['TF-S6U', 'PowerLED', 'Kayan Yazı', 'USB Kart'],
    uyumluYazilimlar: ['PowerLED'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'TF-S6U PowerLED Kontrol Kartı | Çamyar LED Samsun',
    seoDescription: 'TF-S6U USB LED kontrol kartı Samsun. PowerLED v2.88 uyumlu, 2 yıl değişim garantisi.',
  },

  /* ── 3. GÜÇ KAYNAKLARI ── */
  {
    id: '5v-60a-slim',
    slug: '5v-60a-slim-akilli-fanli-adaptor',
    kategori: 'guc-kaynaklari',
    ad: '5V 60A Slim Akıllı Fanlı LED Güç Kaynağı (300W)',
    model: 'Slim 5V 60A (Smart Fan 300W)',
    altBaslik: 'Ultra Slim High Efficiency Power Supply',
    aciklama: 'Kabin içine mükemmel oturan 30mm ultra ince gövde, sıcaklık kontrollü akıllı fan ve %88 yüksek verimli 300W LED güç kaynağı.',
    uzunAciklama: `5V 60A Slim güç kaynağı, modern CNC kasalı LED ekranlar ve kiralık kabinler için özel olarak dizayn edilmiştir.
Sıcaklık kontrollü akıllı fan sistemi yalnızca ihtiyaç duyulduğunda devreye girerek sessiz bir çalışma ortamı sağlar.
Aşırı akım (OCP), aşırı gerilim (OVP) ve kısa devre koruma devreleri sayesinde bağlı LED panelleri voltaj dalgalanmalarından korur.`,
    gorselUrl: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm 5V LED Paneller',
      taramaOrani: 'Evrensel Güç',
      calismaVoltaji: 'Giriş: 190–240V AC / Çıkış: 5V DC',
      cozunurluk: '300W Güç (60A Sürekli Çıkış)',
    },
    teknikOzellikler: [
      { label: 'Çıkış Gerilimi', value: '5V DC (±%2 tolerans)' },
      { label: 'Çıkış Akımı', value: '60 Amper (Maks.)' },
      { label: 'Nominal Güç', value: '300 Watt' },
      { label: 'Giriş Gerilimi', value: 'AC 190–240V, 50/60 Hz' },
      { label: 'Kasa Kalınlığı', value: '30 mm Ultra Slim' },
      { label: 'Soğutma', value: 'Sıcaklık Sensörlü Akıllı Fan' },
      { label: 'Korumalar', value: 'Kısa Devre / Aşırı Yük / Aşırı Voltaj' },
      { label: 'Sertifikalar', value: 'CE, RoHS, ISO9001' },
    ],
    rozetler: ['Samsun Stokta Aynı Gün Teslim', 'Sessiz Akıllı Fan', '30mm Ultra Slim', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['5V 60A', 'Slim Adaptör', '300W', 'LED Trafo', 'Akıllı Fan'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: '5V 60A Slim Akıllı Fanlı LED Adaptör 300W | Çamyar LED Samsun',
    seoDescription: '5V 60A slim LED ekran güç kaynağı Samsun depomuzda. Akıllı fanlı, 300W, 30mm ultra slim gövde, 2 yıl garanti.',
  },
  {
    id: '5v-40a-slim',
    slug: '5v-40a-slim-fansiz-adaptor',
    kategori: 'guc-kaynaklari',
    ad: '5V 40A Fansız Sessiz LED Güç Kaynağı (200W)',
    model: 'Slim 5V 40A Fanless (200W)',
    altBaslik: 'Fanless Silent Slim Power Supply',
    aciklama: 'Showroom ve toplantı salonları için sıfır gürültülü doğal hava soğutmalı 200W slim LED adaptörü.',
    uzunAciklama: `5V 40A fansız adaptör, iç mekanlarda mutlak sessizlik aranan mekanlar (yayın stüdyoları, toplantı odaları) için idealdir.
Doğal alüminyum ızgara yapısıyla ısıyı verimli şekilde tahliye eder.`,
    gorselUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm 5V LED Paneller',
      taramaOrani: 'Evrensel Güç',
      calismaVoltaji: 'Giriş: 200–240V AC / Çıkış: 5V DC',
      cozunurluk: '200W Güç (40A Sürekli Çıkış)',
    },
    teknikOzellikler: [
      { label: 'Çıkış Gerilimi', value: '5V DC' },
      { label: 'Çıkış Akımı', value: '40 Amper' },
      { label: 'Nominal Güç', value: '200 Watt' },
      { label: 'Soğutma', value: 'Fansız / Pasif Alüminyum Gövde (0 dB)' },
    ],
    rozetler: ['Sıfır Ses (0 dB Fansız)', 'Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['5V 40A', 'Fansız', 'Sessiz Adaptör', '200W'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: '5V 40A Fansız Sessiz LED Güç Kaynağı | Çamyar LED Samsun',
    seoDescription: '5V 40A fansız sessiz LED adaptörü. Showroom ve iç mekan ekranları için sıfır ses garantili.',
  },
  {
    id: 'dc-dc-konvertor',
    slug: 'dc-dc-step-down-konvertor',
    kategori: 'guc-kaynaklari',
    ad: 'DC-DC Yüksek Verimli Step-Down Voltaj Regülatörü',
    model: 'DC-DC 5V → 3.8V High Efficiency',
    altBaslik: 'Energy Saving Step-Down Converter',
    aciklama: 'Büyük ölçekli dış mekan panellerde LED çalışma gerilimini optimize ederek %30 enerji tasarrufu ve soğuk çalışma sağlayan regülatör.',
    uzunAciklama: `Bu step-down konvertör, dış mekan ekranların enerji sarfiyatını azaltmak ve LED boncuk ömrünü uzatmak için tasarlanmıştır.`,
    gorselUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Dış Mekan Paneller',
      taramaOrani: 'Evrensel Güç',
      calismaVoltaji: 'Giriş: 4.5V-6V / Çıkış: 3.8V-4.2V',
      cozunurluk: '%30 Enerji Tasarrufu',
    },
    teknikOzellikler: [
      { label: 'Giriş Gerilimi', value: '4.5V – 6.0V DC' },
      { label: 'Çıkış Gerilimi', value: '3.8V DC (Ayarlanabilir)' },
      { label: 'Verimlilik', value: '≥ %93' },
    ],
    rozetler: ['%30 Enerji Tasarrufu', 'Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili'],
    etiketler: ['DC-DC', 'Regülatör', 'Enerji Tasarrufu', '3.8V'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'DC-DC LED Ekran Konvertör | Çamyar LED Samsun',
    seoDescription: 'LED ekran enerji tasarrufu için DC-DC step down voltaj regülatörü Samsun.',
  },

  /* ── 4. CNC KASALAR & AKSESUARLAR ── */
  {
    id: 'cnc-kasa-16cm',
    slug: '16cm-cnc-aluminyum-kasa',
    kategori: 'cnc-kasalar-aksesuarlar',
    ad: '16cm CNC Alüminyum LED Ekran Kasası (Tek Sıra)',
    model: 'CNC-16 (160mm Height Single Row)',
    altBaslik: 'Precision Cut Extruded Aluminium Cabinet',
    aciklama: 'P10 ve benzeri tek sıra modüller için hassas CNC kesim, su tahliye kanallı ve kilitli servis kapaklı alüminyum kasa.',
    uzunAciklama: `CNC-16 kasalar, Samsun atölyemizde milimetrik hassasiyetle üretilmektedir.
Özel fitilli yapısı ve su tahliye labirentleri sayesinde en şiddetli yağışlarda bile kabin içine su sızdırmaz.
Mat siyah elektrostatik fırın boyası UV ışınlarına karşı 10 yıl solmama garantilidir.`,
    gorselUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: '160mm Yükseklik Uyumlu',
      taramaOrani: 'Tek Sıra Modüller',
      calismaVoltaji: 'IP65 Su Geçirmez Gövde',
      cozunurluk: '16cm × İstenen Uzunlukta Modüler',
    },
    teknikOzellikler: [
      { label: 'Kasa Yüksekliği', value: '160 mm (Tek Sıra P10 modül)' },
      { label: 'Malzeme', value: 'Ekstrüzyon Alüminyum Profil' },
      { label: 'Yüzey İşlemi', value: 'Elektrostatik Mat Siyah Fırın Boya' },
      { label: 'Sızdırmazlık', value: 'Kauçuk Fitil + Su Tahliye Kanalı (IP65)' },
      { label: 'Servis', value: 'Mıknatıslı / Vidalanabilir Ön-Arka Kapak' },
    ],
    rozetler: ['Samsun Yerli CNC İmalat', 'IP65 Su Geçirmez', '10 Yıl Boya Garantili', 'Hızlı Teslim'],
    etiketler: ['CNC Kasa', '16cm Kasa', 'Alüminyum Tabela', 'P10 Kasası'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: '16cm CNC Alüminyum LED Kasa | Çamyar LED Samsun',
    seoDescription: '16cm CNC alüminyum LED ekran kasası imalatı Samsun. IP65 su sızdırmaz, elektrostatik fırın boyalı.',
  },
  {
    id: 'cnc-kasa-64cm',
    slug: '64cm-cnc-aluminyum-kasa',
    kategori: 'cnc-kasalar-aksesuarlar',
    ad: '64cm CNC Alüminyum LED Ekran Kasası (4 Sıra)',
    model: 'CNC-64 (640mm Height Multi-Row)',
    altBaslik: 'Heavy Duty Outdoor Display Cabinet',
    aciklama: 'Büyük format dış mekan tabelalar ve cephe ekranları için 4 sıra P10 veya 2 sıra büyük modül taşıyıcı CNC kasa.',
    uzunAciklama: `CNC-64 serisi kasalarımız, yüksek rüzgar mukavemetine dayanacak şekilde iç takviye profilleriyle güçlendirilmiştir.
Arka servis kapaklarında bulunan amortisörlü kilit mekanizması teknisyenlerin sahada rahatça bakım yapmasını sağlar.`,
    gorselUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: '640mm Yükseklik Uyumlu',
      taramaOrani: '4 Sıra Modüller',
      calismaVoltaji: 'IP65 Dayanıklı Gövde',
      cozunurluk: '64cm × İstenen Genişlikte Modüler',
    },
    teknikOzellikler: [
      { label: 'Kasa Yüksekliği', value: '640 mm (4 Sıra 16cm Modül)' },
      { label: 'Malzeme', value: '3mm Güçlendirilmiş Alüminyum' },
      { label: 'Soğutma Bölmesi', value: 'Dahili Fan Montaj Menfezleri' },
      { label: 'Rüzgar Direnci', value: '120 km/h Fırtına Dayanımı' },
    ],
    rozetler: ['Samsun Yerli CNC İmalat', 'Rüzgar Mukavemetli', 'IP65 Su Geçirmez', 'Amortisörlü Servis'],
    etiketler: ['CNC Kasa', '64cm Kasa', 'Cephe Ekranı', 'Dış Mekan'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: '64cm CNC Alüminyum LED Kasa İmalatı | Çamyar LED Samsun',
    seoDescription: '64cm 4 sıra modül taşıyıcı CNC alüminyum LED kasa imalatı Samsun. Fırtına dayanımlı, IP65 su geçirmez.',
  },
  {
    id: 'receiver-kart',
    slug: 'novastar-mrv-alici-kart',
    kategori: 'cnc-kasalar-aksesuarlar',
    ad: 'Novastar MRV208 / MRV336 Senkron Alıcı Kartı',
    model: 'Novastar MRV Series Receiving Card',
    altBaslik: 'Standard LED Display Receiving Card',
    aciklama: 'Novastar göndericilerinden gelen sinyali panellere dağıtan, çift RJ45 portlu ve yedek hat destekli orijinal alıcı kart.',
    uzunAciklama: `Novastar MRV alıcı kartı, profesyonel LED ekranların kalbinde yer alır.
Piksel seviyesinde renk ve parlaklık kalibrasyonu (Calibration Coefficiency) verilerini hafızasında depolar.
Çift Gigabit Ethernet portu sayesinde hat kopmalarında yedek port otomatik devreye girerek kesintisiz görüntü sağlar.`,
    gorselUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm P Serisi Modüller',
      taramaOrani: 'Statik → 1/64 Scan',
      calismaVoltaji: '3.3V – 5V DC',
      cozunurluk: '256 × 256 Piksel (Kart Başına)',
    },
    teknikOzellikler: [
      { label: 'Giriş Portları', value: '2 × Gigabit RJ45 (Ana + Yedek)' },
      { label: 'HUB Arayüzü', value: 'Dahili 12 × HUB75 Port' },
      { label: 'Maks. Piksel Yükü', value: '256 × 256 Piksel' },
      { label: 'Yedekleme Desteği', value: 'Otomatik Çift Hat / Loop Yedekleme' },
      { label: 'Kalibrasyon', value: 'Piksel Seviyesi Renk & Parlaklık' },
    ],
    rozetler: ['Novastar Orijinal', 'Samsun Stokta Aynı Gün Teslim', '2 Yıl Birebir Değişim Garantili', 'Çift Hat Yedeklemeli'],
    etiketler: ['Novastar', 'MRV208', 'Alıcı Kart', 'Receiver', 'HUB75'],
    uyumluYazilimlar: ['NovaLCT'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'Novastar MRV Alıcı Kartı Samsun | Çamyar LED',
    seoDescription: 'Orijinal Novastar MRV208 / MRV336 alıcı kartı Samsun depomuzda. Çift portlu sinyal yedekleme, 2 yıl garanti.',
  },
  {
    id: 'flat-kablo',
    slug: 'led-ekran-flat-kablo-seti',
    kategori: 'cnc-kasalar-aksesuarlar',
    ad: 'Altın Kaplama Saf Bakır LED Modül Flat Kablo Seti',
    model: 'HUB75 16-Pin Flat Cable (AWG26)',
    altBaslik: 'Gold-Plated 16-Pin Ribbon Cable',
    aciklama: 'Sinyal kaybını ve paraziti önleyen kalın AWG26 saf bakır iletkenli, altın kaplama pinli 16-pin data kabloları.',
    uzunAciklama: `LED ekranlarda görüntü titremesi ve renk sapmalarının %80'i kalitesiz data kablolarından kaynaklanır.
Çamyar LED olarak sunduğumuz 16-pin flat kablolar, saf bakır iletken ve altın kaplama kontakları ile yüksek frekanslı sinyali sıfır kayıpla iletir.`,
    gorselUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    ozetTeknik: {
      pikselAraligi: 'Tüm HUB75 Modüller',
      taramaOrani: 'Evrensel Sinyal',
      calismaVoltaji: 'Düşük Empedans Data',
      cozunurluk: '15cm, 30cm, 50cm, 100cm Boy Seçenekleri',
    },
    teknikOzellikler: [
      { label: 'Pin Tipi', value: '16 Pin (2×8) Standart HUB75' },
      { label: 'İletken', value: 'AWG26 Saf Bakır' },
      { label: 'Kontak', value: 'Altın Kaplama (Oksitlenmez)' },
      { label: 'Boyutlar', value: '15 cm / 30 cm / 50 cm / 100 cm' },
    ],
    rozetler: ['Saf Bakır İletken', 'Altın Kaplama Kontak', 'Samsun Stokta Aynı Gün Teslim'],
    etiketler: ['Flat Kablo', 'HUB75 Kablo', '16 Pin', 'Data Kablosu'],
    stok: 'Stokta',
    gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
    seoTitle: 'LED Ekran Flat Kablo Samsun | Çamyar LED',
    seoDescription: '16 pin HUB75 altın kaplama saf bakır flat kablolar. LED modül veri iletim kablosu Samsun.',
  },
]

/* ═══════════════════════════════════════════
   YAZILIMLAR (Software Downloads)
   ═══════════════════════════════════════════ */

export const yazilimlar: Software[] = [
  {
    id: 'powerfed-v288',
    ad: 'PowerLED v2.88',
    kategori: 'PowerLED',
    versiyon: 'v2.88 (En Kararlı Sürüm)',
    aciklama: 'TF serisi (TF-S6U, TF-S6, TF-S3 vb.) kontrol kartları için Türkçe arayüzlü LED içerik yönetim yazılımı.',
    uzunAciklama: `PowerLED v2.88, TF serisi asenkron LED kontrol kartları için geliştirilmiş en stabil programlama yazılımıdır.
Kayan yazı, saat, tarih, analog saat, animasyonlu çerçeveler ve hazır efektleri sürükle-bırak yöntemiyle saniyeler içinde ekrana yükleyebilirsiniz.`,
    uyumluKartlar: ['TF-S6U', 'TF-S6', 'TF-S3', 'TF-S2', 'TF-Mini', 'TF-A6UW'],
    isletimSistemi: ['Windows 7', 'Windows 10', 'Windows 11'],
    dosyaBoyutu: '85 MB',
    guncellemeTarihi: '2025-01',
    indirmeLinki: '/downloads/PowerLED_v2.88_Setup.exe',
    kurulumAdımlari: [
      'PowerLED_v288_Setup.exe dosyasını indirin.',
      'Yükleyiciyi yönetici olarak çalıştırın.',
      'Varsayılan şifre sorarsa: "168" veya "888" girin.',
      'USB belleği takın ve Araçlar menüsünden panel boyutunu (ör. 96x16) seçin.',
      'İçeriği USB belleğe aktarıp LED ekrana takın.',
    ],
    seoKeywords: ['PowerLED v2.88 indir', 'TF LED yazılımı', 'LED tabela yazılımı', 'TF-S6U yazılımı'],
  },
  {
    id: 'huidu-hdplayer',
    ad: 'HDPlayer',
    kategori: 'Huidu',
    versiyon: 'v5.3.4 (Güncel)',
    aciklama: 'Huidu asenkron ve video kontrol kartları (HD-W02, HD-WF1, HD-C16C vb.) için resmi PC ve mobil içerik programı.',
    uzunAciklama: `HDPlayer, Huidu marka tüm RGB ve tek renkli kartların yönetim aracıdır.
WiFi üzerinden kablosuz bağlanarak video, resim, metin ve saat programlarını tek tıkla ekrana gönderir.
Türkçe dil desteği ile son derece kolay ve kullanıcı dostudur.`,
    uyumluKartlar: ['HD-W02', 'HD-WF1', 'HD-C16C', 'HD-D15', 'HD-A601', 'HD-A602', 'HD-D30'],
    isletimSistemi: ['Windows 10/11', 'Android 6.0+', 'iOS 12+'],
    dosyaBoyutu: '62 MB',
    guncellemeTarihi: '2025-06',
    indirmeLinki: '/downloads/HDPlayer_v5.3.4_Setup.exe',
    kurulumAdımlari: [
      'HDPlayer_Setup.exe dosyasını indirin ve kurun.',
      'Bilgisayarınızı Huidu kartın yaydığı WiFi ağına bağlayın (Şifre: 88888888).',
      'Yazılımı açın; kart otomatik olarak algılanacaktır.',
      'Yeni Program ekleyip metin veya videonuzu yerleştirin.',
      '"Gönder" butonuna tıklayarak yayına alın.',
    ],
    seoKeywords: ['HDPlayer indir', 'Huidu yazılımı', 'LedArt indir', 'Huidu WiFi programı'],
  },
  {
    id: 'huidu-hdset',
    ad: 'HDSet Konfigürasyon',
    kategori: 'Huidu',
    versiyon: 'v4.8.2',
    aciklama: 'Huidu kontrol kartlarının donanımsal tarama oranı, polarite ve piksel konfigürasyonunu yapan mühendislik aracı.',
    uzunAciklama: `HDSet, LED ekran imalatçılarının ve teknik servis mühendislerinin kart kurulum parametrelerini girdiği derinlemesine konfigürasyon yazılımıdır.`,
    uyumluKartlar: ['HD-W02', 'HD-WF1', 'HD-C16C', 'HD-D serisi'],
    isletimSistemi: ['Windows 7', 'Windows 10', 'Windows 11'],
    dosyaBoyutu: '95 MB',
    guncellemeTarihi: '2025-04',
    indirmeLinki: '/downloads/HDSet_v4.8.2_Setup.exe',
    kurulumAdımlari: [
      'HDSet_v482_Setup.exe dosyasını kurun.',
      'Karta Ethernet veya WiFi ile bağlanın.',
      'Kart ayar şifresi: "168" girin.',
      'Modül türünü (ör. P10 Outdoor 1/4 Scan) seçip karta gönderin.',
    ],
    seoKeywords: ['HDSet indir', 'Huidu HDSet ayar', 'LED tarama oranı ayarı'],
  },
  {
    id: 'novastar-novalct',
    ad: 'NovaLCT',
    kategori: 'Novastar',
    versiyon: 'v5.5.2 (En Son Sürüm)',
    aciklama: 'Novastar senkron kontrolörler (MCTRL300, MCTRL600) ve alıcı kartlar için resmi ekran kalibrasyon ve kurulum yazılımı.',
    uzunAciklama: `NovaLCT, dünya genelindeki profesyonel LED ekran sektörünün referans yönetim programıdır.
Ekranın fiziksel kabin bağlantı haritasını (Screen Connection), RCFG konfigürasyon dosyasını, piksel düzeyinde gama ve renk kalibrasyonunu gerçekleştirir.`,
    uyumluKartlar: ['MCTRL300', 'MCTRL600', 'Taurus TB30', 'MRV208', 'MRV336', 'VX1000', 'VX4S'],
    isletimSistemi: ['Windows 10', 'Windows 11'],
    dosyaBoyutu: '280 MB',
    guncellemeTarihi: '2025-09',
    indirmeLinki: '/downloads/NovaLCT_v5.5.2_Setup.exe',
    kurulumAdımlari: [
      'NovaLCT_Setup.exe dosyasını indirin.',
      '.NET Framework 4.8 bileşenini onaylayıp kurulumu tamamlayın.',
      'MCTRL kontrolörü USB kablo ile PC\'ye bağlayın.',
      'Kullanıcı Girişi → "admin" (Şifre: admin) seçin.',
      'Screen Configuration menüsünden ekran bağlantı haritanızı oluşturup alıcı kartlara kaydedin.',
    ],
    seoKeywords: ['NovaLCT indir', 'Novastar yazılımı', 'NovaLCT son sürüm', 'MCTRL300 ayar'],
  },
  {
    id: 'novastar-viplex',
    ad: 'ViPlex Express',
    kategori: 'Novastar',
    versiyon: 'v4.2.2',
    aciklama: 'Novastar Taurus serisi (TB30, TB40 vb.) multimedya oynatıcılar için PC içerik tasarım ve bulut zamanlama yazılımı.',
    uzunAciklama: `ViPlex Express, Taurus serisi multimedya kartlar için stüdyo kalitesinde içerik hazırlama aracıdır.
Ekranda pencereler bölerek aynı anda canlı video, hava durumu, döviz kurları ve kayan yazı yayınlamanıza olanak tanır.`,
    uyumluKartlar: ['Taurus TB30', 'TB40', 'TB60', 'TB1', 'TB2'],
    isletimSistemi: ['Windows 10', 'Windows 11'],
    dosyaBoyutu: '175 MB',
    guncellemeTarihi: '2025-08',
    indirmeLinki: '/downloads/ViPlex_Express_v4.2.2_Setup.exe',
    kurulumAdımlari: [
      'ViPlex_Express_Setup.exe indirin ve kurun.',
      'Taurus TB30 cihazını aynı ağa bağlayın.',
      'Async Mode sekmesinden ekranınızı seçin.',
      'İçerik planınızı oluşturup "Publish" butonuna basarak aktarın.',
    ],
    seoKeywords: ['ViPlex Express indir', 'Taurus TB30 yazılımı', 'Novastar bulut oynatıcı'],
  },
]

/* ═══════════════════════════════════════════
   HELPER FUNCTIONS
   ═══════════════════════════════════════════ */

export function getUrun(kategoriSlug: string, urunSlug: string): Product | undefined {
  return urunler.find((u) => u.kategori === kategoriSlug && u.slug === urunSlug)
}

export function getKategoriUrunleri(kategoriSlug: KategoriSlug): Product[] {
  return urunler.filter((u) => u.kategori === kategoriSlug)
}

export function getKategori(slug: string): Kategori | undefined {
  return kategoriler.find((k) => k.slug === slug)
}

export function getYazilimByKategori(kategori: YazilimKategori): Software[] {
  return yazilimlar.filter((y) => y.kategori === kategori)
}

export function getIlgiliUrunler(urun: Product, limit = 3): Product[] {
  return urunler
    .filter((u) => u.kategori === urun.kategori && u.id !== urun.id)
    .slice(0, limit)
}
