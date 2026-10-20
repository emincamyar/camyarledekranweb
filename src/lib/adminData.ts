/**
 * Çamyar LED Ekran Teknolojileri - Yönetim Paneli Veri Katmanı
 */

export interface AdminProduct {
  id: string
  title: string
  category: 'LED Paneller' | 'Kontrol Kartları' | 'Güç Kaynakları' | 'CNC Kasalar & Aksesuarlar'
  status: 'Stokta (Samsun Depo)' | 'Sipariş Üzerine' | 'Tükendi'
  priceDisplay: string
  pixelPitch?: string
  scanRate?: string
  voltage?: string
  brightness?: string
  imageUrl: string
  createdAt: string
}

export interface AdminBlogPost {
  id: string
  title: string
  slug: string
  category: 'Teknik Rehberler' | 'Samsun Projeleri' | 'Ürün Karşılaştırmaları'
  excerpt: string
  readingTime: string
  coverImage: string
  author: string
  publishedDate: string
  status: 'Yayında' | 'Taslak'
}

export interface AdminProject {
  id: string
  title: string
  clientName: string
  location: string
  panelType: string
  dimensions: string
  completionDate: string
  imageUrl: string
  status: 'Tamamlandı' | 'Devam Ediyor'
}

export interface AdminInquiry {
  id: string
  name: string
  phone: string
  email: string
  subject: string
  location: string
  notes: string
  date: string
  status: 'Yeni' | 'İletişime Geçildi' | 'Teklif Verildi' | 'Tamamlandı'
}

export const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: 'prod-1',
    title: 'P10 RGB Dış Mekan LED Panel (1/4 Scan)',
    category: 'LED Paneller',
    status: 'Stokta (Samsun Depo)',
    priceDisplay: 'Teklif Alınız',
    pixelPitch: '10 mm',
    scanRate: '1/4 Scan Yüksek Yenileme',
    voltage: '5V DC (Maks. 4.5A)',
    brightness: '6.500 Nit (Güneş Işığına Dayanıklı)',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    createdAt: '2025-10-10',
  },
  {
    id: 'prod-2',
    title: 'P3 İç Mekan SMD2121 LED Modül',
    category: 'LED Paneller',
    status: 'Stokta (Samsun Depo)',
    priceDisplay: 'Teklif Alınız',
    pixelPitch: '3.0 mm',
    scanRate: '1/32 Scan',
    voltage: '5V DC',
    brightness: '1.200 Nit (Yansıma Önleyici)',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    createdAt: '2025-10-12',
  },
  {
    id: 'prod-3',
    title: 'Novastar MCTRL300 Bağımsız Kontrol Kartı',
    category: 'Kontrol Kartları',
    status: 'Stokta (Samsun Depo)',
    priceDisplay: 'Teklif Alınız',
    pixelPitch: '1.3 Milyon Piksel Kapasite',
    scanRate: 'DVI Giriş / Çift RJ45 Çıkış',
    voltage: '100-240V AC Dahili Güç',
    brightness: 'Donanımsal NovaLCT Destekli',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    createdAt: '2025-10-14',
  },
  {
    id: 'prod-4',
    title: 'Huidu HD-WF1 Wi-Fi + USB Kontrol Kartı',
    category: 'Kontrol Kartları',
    status: 'Stokta (Samsun Depo)',
    priceDisplay: 'Teklif Alınız',
    pixelPitch: '640x32 Piksel Desteği',
    scanRate: 'Wi-Fi / USB Flash Disk',
    voltage: '5V DC',
    brightness: 'LedArt Mobil Uygulama Uyumlu',
    imageUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=600&q=80',
    createdAt: '2025-10-15',
  },
  {
    id: 'prod-5',
    title: '5V 60A Slim Akıllı Fanlı Güç Kaynağı',
    category: 'Güç Kaynakları',
    status: 'Stokta (Samsun Depo)',
    priceDisplay: 'Teklif Alınız',
    pixelPitch: '300W Çıkış Gücü',
    scanRate: 'Termal Korumalı Akıllı Fan',
    voltage: 'Giriş 220V AC / Çıkış 5V 60A',
    brightness: 'Kısa Devre & Aşırı Yük Korumalı',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    createdAt: '2025-10-16',
  },
  {
    id: 'prod-6',
    title: 'CNC Ekstrüzyon Alüminyum LED Kasa (96x96cm)',
    category: 'CNC Kasalar & Aksesuarlar',
    status: 'Stokta (Samsun Depo)',
    priceDisplay: 'Teklif Alınız',
    pixelPitch: 'Standardize Modül Yuvaları',
    scanRate: 'IP65 Su Geçirmez Arka Kapak',
    voltage: 'Statik Fırtına Mukavemetli',
    brightness: 'EPDM Kauçuk Fitil Korumalı',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
    createdAt: '2025-10-17',
  },
]

export const INITIAL_BLOG_POSTS: AdminBlogPost[] = [
  {
    id: 'blog-1',
    title: 'Samsun ve Karadeniz Bölgesinde Dış Mekan LED Ekran Seçerken Dikkat Edilmesi Gereken 5 Teknik Detay',
    slug: 'samsun-dis-mekan-led-ekran-secimi',
    category: 'Teknik Rehberler',
    excerpt: 'Karadeniz’in yoğun nem, tuzlu deniz rüzgarı ve fırtına ikliminde LED ekranınızın yıllarca sorunsuz çalışması için IP65 yalıtım rehberi.',
    readingTime: '6 dk okuma',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    author: 'Çamyar Mühendislik Ekibi',
    publishedDate: '15 Ekim 2025',
    status: 'Yayında',
  },
  {
    id: 'blog-2',
    title: 'Novastar ve Huidu Kontrol Kartları Arasındaki Farklar: Hangi Kartı Seçmelisiniz?',
    slug: 'novastar-huidu-kontrol-kart-karsilastirmasi',
    category: 'Ürün Karşılaştırmaları',
    excerpt: 'Senkron video oynatımı için Novastar mı, pratik Wi-Fi metin/reklam tabelaları için Huidu mu? Mühendislik karşılaştırma rehberi.',
    readingTime: '7 dk okuma',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    author: 'Çamyar Mühendislik Ekibi',
    publishedDate: '12 Ekim 2025',
    status: 'Yayında',
  },
  {
    id: 'blog-3',
    title: 'Mağaza Vitrinleri İçin İdeal LED Ekran Ölçüsü ve Çözünürlük Hesabı',
    slug: 'magaza-vitrin-led-ekran-hesabi',
    category: 'Teknik Rehberler',
    excerpt: 'Güneş ışığı yansımasını yenen vitrin LED panelleri, izleme mesafesine göre P2.5 ve P3 piksel seçimi ve boyut hesaplamaları.',
    readingTime: '5 dk okuma',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    author: 'Çamyar Mühendislik Ekibi',
    publishedDate: '08 Ekim 2025',
    status: 'Yayında',
  },
]

export const INITIAL_PROJECTS: AdminProject[] = [
  {
    id: 'proj-1',
    title: 'İlkadım Belediyesi Dış Mekan LED Ekran Montajı',
    clientName: 'İlkadım Belediyesi',
    location: 'Samsun / İlkadım Meydanı',
    panelType: 'P10 RGB Outdoor 1/4 Scan IP65',
    dimensions: '6.40m x 3.84m (24.5 m²)',
    completionDate: 'Ağustos 2025',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    status: 'Tamamlandı',
  },
  {
    id: 'proj-2',
    title: 'Atakum Sahil Bulvarı Ticari Reklam Totemi',
    clientName: 'Sahil Medya A.Ş.',
    location: 'Samsun / Atakum',
    panelType: 'P6 SMD Outdoor Full Color',
    dimensions: '4.80m x 2.88m (13.8 m²)',
    completionDate: 'Temmuz 2025',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
    status: 'Tamamlandı',
  },
  {
    id: 'proj-3',
    title: 'Tekkeköy Organize Sanayi Fabrika Giriş Bilgilendirme Ekranı',
    clientName: 'Tekkeköy Ağır Sanayi A.Ş.',
    location: 'Samsun / Tekkeköy',
    panelType: 'P8 RGB Yüksek Parlaklık (7.500 Nit)',
    dimensions: '3.84m x 1.92m (7.3 m²)',
    completionDate: 'Eylül 2025',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    status: 'Tamamlandı',
  },
  {
    id: 'proj-4',
    title: 'Piazza AVM Mağaza İçi Ultra HD P2.5 Vitrin Ekranı',
    clientName: 'Moda Tekstil Mağazacılık',
    location: 'Samsun / Canik',
    panelType: 'P2.5 İç Mekan Yüksek Yenileme Hızı',
    dimensions: '2.56m x 1.60m (4.1 m²)',
    completionDate: 'Ekim 2025',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    status: 'Tamamlandı',
  },
]

export const INITIAL_INQUIRIES: AdminInquiry[] = [
  {
    id: 'inq-1',
    name: 'Ahmet Karadeniz',
    phone: '+90 532 987 65 43',
    email: 'ahmet@karadenizgida.com',
    subject: 'Dış Mekan Reklam LED Ekranı',
    location: 'İlkadım / Samsun',
    notes: 'Mağazamızın caddeye bakan cephesine 4x2 metre ebatlarında P6 veya P10 LED ekran fiyat teklifi ve montaj süresi istiyoruz.',
    date: '18 Ekim 2025 - 14:30',
    status: 'Yeni',
  },
  {
    id: 'inq-2',
    name: 'Merve Yılmaz',
    phone: '+90 544 321 00 11',
    email: 'merve@atakumeczane.com',
    subject: 'E-Tabela & Kayan Yazı',
    location: 'Atakum / Samsun',
    notes: 'Nöbetçi eczane ve duyurular için kırmızı/yeşil P10 modül tabela ihtiyacımız var. Wi-Fi ile güncellenebilir olmalı.',
    date: '17 Ekim 2025 - 11:15',
    status: 'İletişime Geçildi',
  },
  {
    id: 'inq-3',
    name: 'Kemal Tekin',
    phone: '+90 555 789 12 34',
    email: 'kemal@tekinotomotiv.com.tr',
    subject: 'Plaza Önü LED Totem',
    location: 'Tekkeköy / Samsun',
    notes: 'Sanayi yolu üzerindeki showroom önü için çift taraflı P8 LED totem ekran keşfi talep ediyoruz.',
    date: '16 Ekim 2025 - 09:40',
    status: 'Teklif Verildi',
  },
]
