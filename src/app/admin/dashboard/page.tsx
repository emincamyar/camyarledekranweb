'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  useCmsStore,
  useLeadsStore,
  slugifyTr,
  mapCategoryLabelToSlug,
  mapCategorySlugToLabel,
} from '@/lib/dataStore'
import type { Product, KategoriSlug, Software, YazilimKategori } from '@/lib/products'
import type { BlogArticle } from '@/lib/blog'
import type { AdminProject } from '@/lib/adminData'

type ActiveTab = 'overview' | 'products' | 'blogs' | 'projects' | 'softwares' | 'inquiries'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { store, updateStore, resetStore } = useCmsStore()
  const { products, blogs, projects, softwares = [] } = store
  const { leads, deleteLead, archiveLead } = useLeadsStore()

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Search filter states
  const [productSearch, setProductSearch] = useState('')
  const [blogSearch, setBlogSearch] = useState('')
  const [projectSearch, setProjectSearch] = useState('')
  const [softwareSearch, setSoftwareSearch] = useState('')

  // Modal toggle states
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showSoftwareModal, setShowSoftwareModal] = useState(false)
  const [editingSoftwareId, setEditingSoftwareId] = useState<string | null>(null)

  // Form states - New / Edit Product
  const [productForm, setProductForm] = useState({
    ad: '',
    model: '',
    kategori: 'led-paneller' as KategoriSlug,
    stok: 'Stokta' as Product['stok'],
    garanti: '2 Yıl Birebir Değişim Garantili',
    aciklama: '',
    pikselAraligi: '10 mm Pitch',
    taramaOrani: '1/4 Scan',
    calismaVoltaji: '5V DC',
    cozunurluk: '32 × 16 Piksel',
    gorselUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  })

  // Form states - New Blog
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Teknik Rehberler' as BlogArticle['category'],
    excerpt: '',
    readingTime: '5 dk okuma',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    contentBody: '',
  })

  // Form states - New Project
  const [projectForm, setProjectForm] = useState({
    title: '',
    clientName: '',
    location: 'Samsun / İlkadım',
    panelType: 'P10 RGB Outdoor 1/4 Scan IP65',
    dimensions: '4.80m x 2.88m (13.8 m²)',
    completionDate: 'Ekim 2026',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    status: 'Tamamlandı' as AdminProject['status'],
  })

  // Form states - New / Edit Software
  const [softwareForm, setSoftwareForm] = useState({
    ad: '',
    versiyon: 'v5.3.4 (Güncel)',
    kategori: 'Huidu' as YazilimKategori,
    dosyaBoyutu: '65 MB',
    guncellemeTarihi: '2026-10',
    indirmeLinki: '/downloads/HDPlayer_v5.3.4_Setup.exe',
    aciklama: '',
    uyumluKartlarText: 'HD-W02, HD-WF1, HD-C16C, HD-D15',
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // ignore network error
    }
    try {
      localStorage.removeItem('camyar_auth')
      localStorage.removeItem('camyar_admin_auth')
      document.cookie = 'camyar_admin_session=; path=/; max-age=0; SameSite=Lax'
    } catch {
      // ignore
    }
    router.replace('/admin/login')
    router.refresh()
  }

  // --- Product Handlers ---
  const openAddProductModal = () => {
    setEditingProductId(null)
    setProductForm({
      ad: '',
      model: '',
      kategori: 'led-paneller',
      stok: 'Stokta',
      garanti: '2 Yıl Birebir Değişim Garantili',
      aciklama: '',
      pikselAraligi: '10 mm Pitch',
      taramaOrani: '1/4 Scan',
      calismaVoltaji: '5V DC',
      cozunurluk: '32 × 16 Piksel',
      gorselUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    })
    setShowProductModal(true)
  }

  const openEditProductModal = (prod: Product) => {
    setEditingProductId(prod.id)
    setProductForm({
      ad: prod.ad,
      model: prod.model,
      kategori: prod.kategori,
      stok: prod.stok,
      garanti: prod.rozetler?.[1] || '2 Yıl Birebir Değişim Garantili',
      aciklama: prod.aciklama,
      pikselAraligi: prod.ozetTeknik.pikselAraligi,
      taramaOrani: prod.ozetTeknik.taramaOrani,
      calismaVoltaji: prod.ozetTeknik.calismaVoltaji,
      cozunurluk: prod.ozetTeknik.cozunurluk,
      gorselUrl: prod.gorselUrl,
    })
    setShowProductModal(true)
  }

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProductForm((prev) => ({ ...prev, gorselUrl: reader.result as string }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!productForm.ad.trim()) return

    const kategoriSlug = mapCategoryLabelToSlug(productForm.kategori)

    if (editingProductId) {
      updateStore((prev) => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.id !== editingProductId) return p
          return {
            ...p,
            kategori: kategoriSlug,
            ad: productForm.ad.trim(),
            model: productForm.model.trim() || productForm.ad.trim(),
            altBaslik: mapCategorySlugToLabel(kategoriSlug),
            aciklama: productForm.aciklama.trim() || p.aciklama,
            uzunAciklama: productForm.aciklama.trim() || p.uzunAciklama,
            gorselUrl: productForm.gorselUrl.trim() || p.gorselUrl,
            stok: productForm.stok,
            rozetler: [
              'Samsun Stokta Aynı Gün Teslim',
              productForm.garanti.trim() || '2 Yıl Birebir Değişim Garantili',
            ],
            ozetTeknik: {
              pikselAraligi: productForm.pikselAraligi || p.ozetTeknik.pikselAraligi,
              taramaOrani: productForm.taramaOrani || p.ozetTeknik.taramaOrani,
              calismaVoltaji: productForm.calismaVoltaji || p.ozetTeknik.calismaVoltaji,
              cozunurluk: productForm.cozunurluk || p.ozetTeknik.cozunurluk,
            },
            teknikOzellikler: [
              { label: 'Piksel / Kapasite', value: productForm.pikselAraligi || p.ozetTeknik.pikselAraligi },
              { label: 'Tarama / Arayüz', value: productForm.taramaOrani || p.ozetTeknik.taramaOrani },
              { label: 'Çalışma Voltajı', value: productForm.calismaVoltaji || p.ozetTeknik.calismaVoltaji },
              { label: 'Çözünürlük / Güç', value: productForm.cozunurluk || p.ozetTeknik.cozunurluk },
            ],
          }
        }),
      }))

      setShowProductModal(false)
      setEditingProductId(null)
      showToast('Ürün bilgileri ve görseli güncellendi, /urunler kataloğu anında senkronize edildi!')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
      return
    }

    const slug = slugifyTr(productForm.ad) || `urun-${Date.now()}`

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      slug,
      kategori: kategoriSlug,
      ad: productForm.ad.trim(),
      model: productForm.model.trim() || productForm.ad.trim(),
      altBaslik: mapCategorySlugToLabel(kategoriSlug),
      aciklama:
        productForm.aciklama.trim() ||
        `${productForm.ad.trim()} — Samsun merkez depomuzda stokta, 2 yıl birebir değişim garantili endüstriyel LED donanımı.`,
      uzunAciklama:
        productForm.aciklama.trim() ||
        `${productForm.ad.trim()}, Çamyar LED Ekran Teknolojileri mühendislik standartlarına uygun olarak Samsun ve Karadeniz iklim şartları için test edilmiştir.`,
      gorselUrl:
        productForm.gorselUrl.trim() ||
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      ozetTeknik: {
        pikselAraligi: productForm.pikselAraligi || 'Standart',
        taramaOrani: productForm.taramaOrani || '1/4 Scan',
        calismaVoltaji: productForm.calismaVoltaji || '5V DC',
        cozunurluk: productForm.cozunurluk || 'Yüksek Çözünürlük',
      },
      teknikOzellikler: [
        { label: 'Piksel / Kapasite', value: productForm.pikselAraligi || 'Standart' },
        { label: 'Tarama / Arayüz', value: productForm.taramaOrani || '1/4 Scan' },
        { label: 'Çalışma Voltajı', value: productForm.calismaVoltaji || '5V DC' },
        { label: 'Çözünürlük / Güç', value: productForm.cozunurluk || 'Standart' },
      ],
      rozetler: [
        'Samsun Stokta Aynı Gün Teslim',
        productForm.garanti.trim() || '2 Yıl Birebir Değişim Garantili',
      ],
      etiketler: [mapCategorySlugToLabel(kategoriSlug), 'Samsun LED', productForm.model || 'Çamyar LED'],
      stok: productForm.stok,
      gradient: 'linear-gradient(135deg, #1e2142 0%, #292c64 100%)',
      seoTitle: `${productForm.ad.trim()} | Çamyar LED Samsun`,
      seoDescription: `${productForm.ad.trim()} Samsun depomuzda stokta ve 2 yıl garantili.`,
    }

    updateStore((prev) => ({
      ...prev,
      products: [newProd, ...prev.products],
    }))

    setShowProductModal(false)
    setEditingProductId(null)
    showToast('Yeni ürün eklendi ve /urunler sayfasında canlı yayına alındı!')
  }

  const handleDeleteProduct = (id: string) => {
    updateStore((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }))
    showToast('Ürün katalogdan ve /urunler sayfasından kaldırıldı.')
  }

  // --- Blog Handlers ---
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault()
    if (!blogForm.title.trim()) return

    const cleanSlug =
      slugifyTr(blogForm.slug.trim() || blogForm.title.trim()) || `rehber-${Date.now()}`

    const todayStr = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const bodyParagraph =
      blogForm.contentBody.trim() ||
      blogForm.excerpt.trim() ||
      'Samsun ve Karadeniz bölgesinde profesyonel LED ekran sistemleri için mühendislik ekibimiz tarafından hazırlanan teknik inceleme.'

    const newBlog: BlogArticle = {
      slug: cleanSlug,
      title: blogForm.title.trim(),
      excerpt: blogForm.excerpt.trim() || bodyParagraph.slice(0, 180),
      coverImage:
        blogForm.coverImage.trim() ||
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      category: blogForm.category,
      readingTime: blogForm.readingTime || '5 dk okuma',
      publishedDate: todayStr,
      isoDate: new Date().toISOString().split('T')[0],
      author: 'Çamyar Mühendislik Ekibi',
      authorRole: 'Kıdemli LED Sistem Mühendisleri',
      tags: ['Samsun LED Ekran', blogForm.category, 'Teknik Rehber'],
      tableOfContents: [
        { id: 'teknik-degerlendirme', title: '1. Teknik Değerlendirme ve Saha Kriterleri' },
        { id: 'uygulama-onerileri', title: '2. Çamyar LED Mühendislik Önerileri' },
      ],
      content: {
        intro: blogForm.excerpt.trim() || bodyParagraph,
        sections: [
          {
            id: 'teknik-degerlendirme',
            title: '1. Teknik Değerlendirme ve Saha Kriterleri',
            body: bodyParagraph,
            bullets: [
              'Karadeniz iklimine uygun IP65 sızdırmazlık ve nem koruması standarttır.',
              'Lisanslı Novastar ve Huidu kontrol sistemleri ile yüksek yenileme hızı sağlanır.',
              'Samsun İlkadım merkez depomuzdan aynı gün yedek parça ve servis desteği sunulur.',
            ],
            highlight:
              'Çamyar LED mühendislik ekibi tüm projelerde ücretsiz keşif ve statik hesaplama desteği verir.',
          },
          {
            id: 'uygulama-onerileri',
            title: '2. Çamyar LED Mühendislik Önerileri',
            body: 'Projenizin uzun ömürlü ve düşük enerji tüketimli olması için doğru piksel aralığı, tazeleme oranı ve akıllı fanlı güç kaynağı seçimi büyük önem taşır.',
          },
        ],
        conclusion:
          'Bu konuda işletmenize özel yerinde keşif ve fiyat teklifi almak için Samsun İlkadım merkez ofisimizle veya WhatsApp destek hattımızla hemen iletişime geçebilirsiniz.',
      },
      seoTitle: `${blogForm.title.trim()} | Çamyar LED Samsun`,
      seoDescription: blogForm.excerpt.trim() || bodyParagraph.slice(0, 155),
      seoKeywords: ['Samsun LED ekran', blogForm.title.trim(), blogForm.category],
    }

    updateStore((prev) => ({
      ...prev,
      blogs: [newBlog, ...prev.blogs.filter((b) => b.slug !== cleanSlug)],
    }))

    setShowBlogModal(false)
    setBlogForm({
      title: '',
      slug: '',
      category: 'Teknik Rehberler',
      excerpt: '',
      readingTime: '5 dk okuma',
      coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      contentBody: '',
    })
    showToast('Yeni makale yayınlandı ve /blog sayfasının en başına eklendi!')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  const handleDeleteBlog = (slug: string) => {
    updateStore((prev) => ({
      ...prev,
      blogs: prev.blogs.filter((b) => b.slug !== slug),
    }))
    showToast('Makale /blog sayfasından kaldırıldı.')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  // --- Project Handlers ---
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectForm.title.trim()) return

    const newProj: AdminProject = {
      id: `proj-${Date.now()}`,
      title: projectForm.title.trim(),
      clientName: projectForm.clientName.trim() || 'Kurumsal Müşteri',
      location: projectForm.location.trim() || 'Samsun / İlkadım',
      panelType: projectForm.panelType.trim() || 'P10 RGB Outdoor 1/4 Scan',
      dimensions: projectForm.dimensions.trim() || '3.84m x 1.92m',
      completionDate: projectForm.completionDate.trim() || 'Ekim 2026',
      imageUrl:
        projectForm.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      status: projectForm.status,
    }

    updateStore((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }))

    setShowProjectModal(false)
    setProjectForm({
      title: '',
      clientName: '',
      location: 'Samsun / İlkadım',
      panelType: 'P10 RGB Outdoor 1/4 Scan IP65',
      dimensions: '4.80m x 2.88m (13.8 m²)',
      completionDate: 'Ekim 2026',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      status: 'Tamamlandı',
    })
    showToast('Yeni referans proje eklendi ve /referanslar sayfasında yayınlandı!')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  const handleDeleteProject = (id: string) => {
    updateStore((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
    showToast('Referans proje /referanslar listesinden silindi.')
// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  // --- Lead (CRM) Handlers ---
  const handleDeleteLead = (id: string) => {
    deleteLead(id)
    showToast('Müşteri başvurusu kalıcı olarak silindi.')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  const handleArchiveLead = (id: string) => {
    archiveLead(id)
    showToast('Müşteri başvurusu arşiv durumu güncellendi.')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  // --- Software & Program Handlers ---
  const openAddSoftwareModal = () => {
    setEditingSoftwareId(null)
    setSoftwareForm({
      ad: '',
      versiyon: 'v1.0.0 (Güncel)',
      kategori: 'Huidu',
      dosyaBoyutu: '60 MB',
      guncellemeTarihi: '2026-10',
      indirmeLinki: '/downloads/HDPlayer_v5.3.4_Setup.exe',
      aciklama: '',
      uyumluKartlarText: 'HD-W02, HD-WF1, HD-C16C',
    })
    setShowSoftwareModal(true)
  }

  const openEditSoftwareModal = (sw: Software) => {
    setEditingSoftwareId(sw.id)
    setSoftwareForm({
      ad: sw.ad,
      versiyon: sw.versiyon,
      kategori: sw.kategori,
      dosyaBoyutu: sw.dosyaBoyutu,
      guncellemeTarihi: sw.guncellemeTarihi,
      indirmeLinki: sw.indirmeLinki,
      aciklama: sw.aciklama,
      uyumluKartlarText: (sw.uyumluKartlar || []).join(', '),
    })
    setShowSoftwareModal(true)
  }

  const handleSaveSoftware = (e: React.FormEvent) => {
    e.preventDefault()
    if (!softwareForm.ad.trim()) return

    const uyumluKartlar = softwareForm.uyumluKartlarText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (editingSoftwareId) {
      updateStore((prev) => ({
        ...prev,
        softwares: (prev.softwares || []).map((sw) =>
          sw.id === editingSoftwareId
            ? {
                ...sw,
                ad: softwareForm.ad.trim(),
                versiyon: softwareForm.versiyon.trim() || 'v1.0',
                kategori: softwareForm.kategori,
                dosyaBoyutu: softwareForm.dosyaBoyutu.trim() || '50 MB',
                guncellemeTarihi: softwareForm.guncellemeTarihi.trim() || '2026-10',
                indirmeLinki: softwareForm.indirmeLinki.trim() || '/downloads/HDPlayer_v5.3.4_Setup.exe',
                aciklama: softwareForm.aciklama.trim() || sw.aciklama,
                uyumluKartlar: uyumluKartlar.length > 0 ? uyumluKartlar : sw.uyumluKartlar,
              }
            : sw
        ),
      }))
      setShowSoftwareModal(false)
      setEditingSoftwareId(null)
      showToast('Yazılım bilgileri ve indirme bağlantısı güncellendi (/program-indir ile senkron)!')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
      return
    }

    const id = `${slugifyTr(softwareForm.ad)}-${Date.now().toString().slice(-4)}`
    const newSoftware: Software = {
      id,
      ad: softwareForm.ad.trim(),
      kategori: softwareForm.kategori,
      versiyon: softwareForm.versiyon.trim() || 'v1.0',
      aciklama:
        softwareForm.aciklama.trim() ||
        `${softwareForm.ad} LED ekran kontrol ve konfigürasyon yazılımı.`,
      uzunAciklama:
        softwareForm.aciklama.trim() ||
        `${softwareForm.ad} LED ekran kontrol ve konfigürasyon yazılımı.`,
      uyumluKartlar: uyumluKartlar.length > 0 ? uyumluKartlar : ['Tüm Seriler'],
      isletimSistemi: ['Windows 10', 'Windows 11'],
      dosyaBoyutu: softwareForm.dosyaBoyutu.trim() || '60 MB',
      guncellemeTarihi: softwareForm.guncellemeTarihi.trim() || '2026-10',
      indirmeLinki:
        softwareForm.indirmeLinki.trim() || '/downloads/HDPlayer_v5.3.4_Setup.exe',
      kurulumAdımlari: [
        `${softwareForm.ad} kurulum paketini (.exe / .zip) indirin.`,
        'Yükleyiciyi yönetici olarak çalıştırın.',
        'Kontrol kartınızı Wi-Fi, USB veya Ethernet ile bağlayarak programı başlatın.',
      ],
      seoKeywords: [`${softwareForm.ad} indir`, `${softwareForm.kategori} yazılımı`],
    }

    updateStore((prev) => ({
      ...prev,
      softwares: [newSoftware, ...(prev.softwares || [])],
    }))
    setShowSoftwareModal(false)
    showToast('Yeni yazılım eklendi ve /program-indir sayfasında yayınlandı!')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  const handleQuickUpdateSoftwareLink = (id: string, newLink: string) => {
    updateStore((prev) => ({
      ...prev,
      softwares: (prev.softwares || []).map((sw) =>
        sw.id === id ? { ...sw, indirmeLinki: newLink.trim() } : sw
      ),
    }))
    showToast('İndirme bağlantısı (.exe/.zip) anında güncellendi!')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  const handleDeleteSoftware = (id: string) => {
    updateStore((prev) => ({
      ...prev,
      softwares: (prev.softwares || []).filter((sw) => sw.id !== id),
    }))
    showToast('Yazılım /program-indir listesinden kaldırıldı.')
	// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
  }

  // Filtered queries
  const filteredSoftwares = softwares.filter(
    (sw) =>
      sw.ad.toLowerCase().includes(softwareSearch.toLowerCase()) ||
      sw.kategori.toLowerCase().includes(softwareSearch.toLowerCase()) ||
      sw.versiyon.toLowerCase().includes(softwareSearch.toLowerCase())
  )
  const filteredProducts = products.filter(
    (p) =>
      p.ad.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.model.toLowerCase().includes(productSearch.toLowerCase()) ||
      mapCategorySlugToLabel(p.kategori).toLowerCase().includes(productSearch.toLowerCase())
  )

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase())
  )

  const filteredProjects = projects.filter(
    (pr) =>
      pr.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      pr.location.toLowerCase().includes(projectSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e2142] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#70b62c]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Menüyü Aç/Kapat"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://raw.githubusercontent.com/emincamyar/camyarledekran/refs/heads/main/camyarlogoyatay.png"
                alt="Çamyar LED Ekran Teknolojileri"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </Link>

            <span className="hidden sm:inline-block h-4 w-px bg-slate-200 mx-1" />

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#70b62c] animate-pulse" />
              Canlı Site Senkronizasyonu Aktif
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#292c64] hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Siteyi Gör</span>
            </Link>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
              <div className="hidden sm:block text-right">
                <div className="text-xs font-bold text-slate-900 leading-none">Sistem Yöneticisi</div>
                <div className="text-[10px] text-slate-500 mt-0.5">bilgi@camyarelektrik.com</div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 hover:border-red-600 text-xs font-bold transition-all cursor-pointer"
                title="Güvenli Çıkış Yap"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Güvenli Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Left Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white lg:bg-transparent border-r lg:border-r-0 border-slate-200 transform transition-transform duration-200 ease-in-out p-4 lg:p-0 flex flex-col justify-between ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Yönetim Menüsü
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('overview')
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#292c64] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Genel Bakış</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('products')
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#292c64] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Ürün Yönetimi</span>
                </div>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-bold ${activeTab === 'products' ? 'bg-[#70b62c] text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {products.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('blogs')
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'blogs'
                    ? 'bg-[#292c64] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Blog Makaleleri</span>
                </div>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-bold ${activeTab === 'blogs' ? 'bg-[#70b62c] text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {blogs.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('projects')
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#292c64] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Referans Projeler</span>
                </div>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-bold ${activeTab === 'projects' ? 'bg-[#70b62c] text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {projects.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('softwares')
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'softwares'
                    ? 'bg-[#292c64] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="leading-tight">Yazılım &amp; Program Yönetimi</span>
                </div>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${activeTab === 'softwares' ? 'bg-[#70b62c] text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {softwares.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('inquiries')
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#292c64] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="leading-tight">Gelen Başvurular / CRM</span>
                </div>
                <span className="text-[11px] px-1.5 py-0.5 rounded-md font-bold bg-amber-100 text-amber-700 shrink-0">
                  {leads.filter((l) => l.status === 'Yeni').length} Yeni
                </span>
              </button>
            </div>

            {/* Canlı Sayfa Kısayolları */}
            <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-xs space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#70b62c]" />
                Canlı Sayfa Kısayolları
              </div>
              <div className="flex flex-col gap-1.5 pt-1 text-slate-600 font-medium">
                <Link href="/urunler" className="hover:text-[#292c64] flex items-center justify-between">
                  <span>/urunler</span>
                  <span className="text-[10px] font-bold text-[#70b62c]">{products.length} ürün →</span>
                </Link>
                <Link href="/program-indir" className="hover:text-[#292c64] flex items-center justify-between">
                  <span>/program-indir</span>
                  <span className="text-[10px] font-bold text-[#70b62c]">{softwares.length} yazılım →</span>
                </Link>
                <Link href="/blog" className="hover:text-[#292c64] flex items-center justify-between">
                  <span>/blog</span>
                  <span className="text-[10px] font-bold text-[#70b62c]">{blogs.length} yazı →</span>
                </Link>
                <Link href="/referanslar" className="hover:text-[#292c64] flex items-center justify-between">
                  <span>/referanslar</span>
                  <span className="text-[10px] font-bold text-[#70b62c]">{projects.length} proje →</span>
                </Link>
              </div>
            </div>

            {/* Sidebar Altı Güvenli Çıkış Yap & Veri Sıfırlama */}
            <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Güvenli Çıkış Yap</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  resetStore()
                  showToast('Tüm veriler varsayılan fabrika ayarlarına sıfırlandı.')
		// --- Örnek Senkronizasyon Fonksiyonu (Tüm Kaydetme İşlemlerinden Sonra Çalışacak) ---
  const syncStoreToServer = async (newStoreData: typeof store) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
      })
    } catch (err) {
      console.error('Sunucu senkronizasyon hatası:', err)
    }
  }
                }}
                className="w-full text-center py-1.5 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Varsayılan Verilere Sıfırla
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-8 min-w-0">
          {/* Top 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1">Total Ürün Sayısı</div>
                <div className="text-2xl font-bold text-[#1e2142]">{products.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">✓ /urunler İle Senkron</div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#292c64] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1">Yayınlanan Blog Yazıları</div>
                <div className="text-2xl font-bold text-[#1e2142]">{blogs.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">✓ /blog İle Senkron</div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1">Tamamlanan Projeler</div>
                <div className="text-2xl font-bold text-[#1e2142]">{projects.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">✓ /referanslar İle Senkron</div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('inquiries')}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-amber-300 transition-colors"
            >
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1">Gelen Teklif Talepleri</div>
                <div className="text-2xl font-bold text-amber-600">
                  {leads.length}
                </div>
                <div className="text-[11px] text-amber-600 font-semibold mt-1">
                  {leads.filter((l) => l.status === 'Yeni').length} Yeni Müşteri Başvurusu
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-[#1e2142]">Hızlı İçerik &amp; Ürün İşlemleri</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Buradan eklediğiniz her içerik anında web sitesindeki ilgili sayfada yayınlanır.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('products')
                      openAddProductModal()
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#292c64] text-white text-xs font-semibold hover:bg-[#1e2142] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Yeni Ürün Ekle</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('blogs')
                      setShowBlogModal(true)
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#70b62c] text-white text-xs font-semibold hover:bg-[#62a225] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Yeni Blog Makalesi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('projects')
                      setShowProjectModal(true)
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Yeni Referans Proje</span>
                  </button>
                </div>
              </div>

              {/* Recent Leads List (Overview Preview) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#1e2142] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Son Gelen Teklif Talepleri / Müşteri Başvuruları
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs font-bold text-[#292c64] hover:text-[#70b62c] cursor-pointer"
                  >
                    Tümünü Gör ({leads.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="pb-3">Müşteri Bilgisi</th>
                        <th className="pb-3">İhtiyaç Detayı (Hesaplama Özeti)</th>
                        <th className="pb-3">Tarih</th>
                        <th className="pb-3">Durum</th>
                        <th className="pb-3 text-right">Hızlı İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.slice(0, 4).map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="py-3 pr-3">
                            <div className="font-bold text-slate-900">{lead.fullName}</div>
                            <div className="font-mono text-slate-500">{lead.phone}</div>
                          </td>
                          <td className="py-3 pr-3">
                            <div className="font-bold text-[#292c64]">{lead.dimensionsSummary}</div>
                            <div className="text-[11px] text-slate-500">
                              {lead.panelCount} Adet Panel • {lead.psuCount} Adet Güç Kaynağı ({lead.resolution})
                            </div>
                          </td>
                          <td className="py-3 pr-3 font-mono text-slate-500">{lead.createdAt}</td>
                          <td className="py-3 pr-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.status === 'Yeni'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3 text-right space-x-1.5 whitespace-nowrap">
                            <a
                              href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#292c64] text-white font-bold text-[11px] hover:bg-[#1e2142]"
                            >
                              📞 Ara
                            </a>
                            <a
                              href={`https://wa.me/9${lead.phone.replace(/[^0-9]/g, '').replace(/^9/, '')}?text=${encodeURIComponent(
                                `Merhaba Sayın ${lead.fullName}, Çamyar LED Ekran Teknolojileri'nden ulaşıyoruz. Sitemiz üzerinden yaptığınız "${lead.dimensionsSummary}" (${lead.panelCount} Panel, ${lead.psuCount} Güç Kaynağı) başvurunuz için fiyat teklifimiz hazırdır.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#70b62c] text-white font-bold text-[11px] hover:bg-[#62a225]"
                            >
                              💬 WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Ürün adı, model veya kategori ara..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/urunler"
                    target="_blank"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#292c64] hover:bg-slate-50"
                  >
                    /urunler Sayfasını Gör ↗
                  </Link>
                  <button
                    type="button"
                    onClick={openAddProductModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#292c64] text-white text-xs font-bold hover:bg-[#1e2142] shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Yeni Ürün Ekle</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Görsel</th>
                      <th className="py-3 px-4">Ürün Adı &amp; Model</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Teknik Parametre</th>
                      <th className="py-3 px-4">Stok Durumu</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.gorselUrl}
                            alt={p.ad}
                            className="w-12 h-10 object-cover rounded-lg border border-slate-200"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{p.ad}</div>
                          <div className="text-[11px] text-[#70b62c] font-mono">{p.model}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                            {mapCategorySlugToLabel(p.kategori)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <div>
                            {p.ozetTeknik.pikselAraligi} • {p.ozetTeknik.taramaOrani}
                          </div>
                          <div className="text-[11px] text-slate-400">{p.ozetTeknik.calismaVoltaji}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            {p.stok}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditProductModal(p)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#292c64]/20 bg-indigo-50/70 text-[#292c64] hover:bg-[#292c64] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                              title="Ürünü ve Görseli Düzenle"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span>Düzenle</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Ürünü Sil"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BLOG ARTICLES */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Blog başlığına göre ara..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/blog"
                    target="_blank"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#292c64] hover:bg-slate-50"
                  >
                    /blog Sayfasını Gör ↗
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowBlogModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#70b62c] text-white text-xs font-bold hover:bg-[#62a225] shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Yeni Blog Makalesi Ekle</span>
                  </button>
                </div>
              </div>

              {/* Blog Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Kapak</th>
                      <th className="py-3 px-4">Makale Başlığı &amp; Slug</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Okunma / Tarih</th>
                      <th className="py-3 px-4">Durum</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBlogs.map((b) => (
                      <tr key={b.slug} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={b.coverImage}
                            alt={b.title}
                            className="w-14 h-10 object-cover rounded-lg border border-slate-200"
                          />
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-bold text-slate-900 leading-snug">{b.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">/blog/{b.slug}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                            {b.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <div>{b.readingTime}</div>
                          <div className="text-[11px] text-slate-400">{b.publishedDate}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            Yayında
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <Link
                            href={`/blog/${b.slug}`}
                            target="_blank"
                            className="p-1.5 rounded text-slate-600 hover:text-[#292c64] inline-block"
                            title="Sitede Görüntüle"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(b.slug)}
                            className="p-1.5 rounded text-red-600 hover:bg-red-50 inline-block cursor-pointer"
                            title="Makaleyi Sil"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: REFERENCE PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Proje adına veya ilçeye göre ara..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/referanslar"
                    target="_blank"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#292c64] hover:bg-slate-50"
                  >
                    /referanslar Sayfasını Gör ↗
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowProjectModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Yeni Referans Proje Ekle</span>
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((pr) => (
                  <div
                    key={pr.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pr.imageUrl}
                          alt={pr.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#292c64] text-white">
                            {pr.location}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500 text-white">
                            {pr.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="text-xs text-slate-500 mb-1">Müşteri: {pr.clientName}</div>
                        <h4 className="text-base font-bold text-[#1e2142] mb-3 leading-snug">
                          {pr.title}
                        </h4>
                        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 space-y-1">
                          <div>
                            <strong>Kullanılan Panel:</strong> {pr.panelType}
                          </div>
                          <div>
                            <strong>Ekran Ebatı:</strong> {pr.dimensions}
                          </div>
                          <div>
                            <strong>Teslim Tarihi:</strong> {pr.completionDate}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">ID: {pr.id}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(pr.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 p-1 cursor-pointer"
                      >
                        Projeyi Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: YAZILIM & PROGRAM YÖNETİMİ */}
          {activeTab === 'softwares' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[11px] font-bold text-[#292c64] mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#70b62c] animate-pulse" />
                    /program-indir İle Canlı Senkronize
                  </div>
                  <h3 className="text-lg font-black text-[#1e2142]">
                    Yazılım &amp; Program İndirme Merkezi Yönetimi
                  </h3>
                  <p className="text-xs text-slate-500">
                    PowerLED, Huidu HDPlayer, HDSet, Novastar NovaLCT ve ViPlex kurulum dosyalarının (.exe / .zip) doğrudan indirme bağlantılarını ve versiyonlarını buradan güncelleyebilirsiniz.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href="/program-indir"
                    target="_blank"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#292c64]"
                  >
                    /program-indir Sayfasını Gör ↗
                  </Link>
                  <button
                    type="button"
                    onClick={openAddSoftwareModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#292c64] text-white text-xs font-bold hover:bg-[#1e2142] shadow-xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Yeni Program Ekle</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Program adı, marka (Huidu, Novastar, PowerLED) veya versiyon ara..."
                  value={softwareSearch}
                  onChange={(e) => setSoftwareSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Softwares Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Program Adı &amp; Kategori</th>
                        <th className="py-3.5 px-4">Versiyon &amp; Boyut</th>
                        <th className="py-3.5 px-4">Doğrudan İndirme Bağlantısı (.exe / .zip URL)</th>
                        <th className="py-3.5 px-4 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSoftwares.map((sw) => (
                        <tr key={sw.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 align-middle">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-black text-sm text-[#1e2142]">{sw.ad}</span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#292c64] font-bold text-[10px]">
                                {sw.kategori}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                              {sw.aciklama}
                            </div>
                          </td>

                          <td className="py-4 px-4 align-middle whitespace-nowrap">
                            <div className="font-mono font-bold text-[#70b62c]">{sw.versiyon}</div>
                            <div className="text-[11px] text-slate-400">
                              {sw.dosyaBoyutu} • {sw.guncellemeTarihi}
                            </div>
                          </td>

                          <td className="py-4 px-4 align-middle min-w-[280px]">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                defaultValue={sw.indirmeLinki}
                                onBlur={(e) => {
                                  if (e.target.value.trim() && e.target.value.trim() !== sw.indirmeLinki) {
                                    handleQuickUpdateSoftwareLink(sw.id, e.target.value)
                                  }
                                }}
                                placeholder="/downloads/Program_Setup.exe veya https://..."
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-mono text-slate-800 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                              />
                              <a
                                href={sw.indirmeLinki}
                                download
                                className="px-2.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold whitespace-nowrap"
                                title="İndirmeyi Test Et"
                              >
                                ⬇ Test
                              </a>
                            </div>
                          </td>

                          <td className="py-4 px-4 align-middle text-right whitespace-nowrap">
                            <div className="inline-flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => openEditSoftwareModal(sw)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#292c64]/20 bg-indigo-50/70 text-[#292c64] hover:bg-[#292c64] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                <span>✏️ Düzenle</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSoftware(sw.id)}
                                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Programı Sil"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GELEN TEKLİF TALEPLERİ / MÜŞTERİ BAŞVURULARI (CRM) */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-800 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Canlı CRM Başvuru Havuzu (camyar_leads)
                  </div>
                  <h3 className="text-lg font-black text-[#1e2142]">
                    Gelen Başvurular / CRM (Teklif &amp; Keşif Talepleri)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sitedeki tüm &quot;Teklif Al / Fiyat İste&quot; butonlarından ve LED Hesaplama Aracı üzerinden gönderilen müşteri başvuruları anlık olarak bu tabloya düşer.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/hesaplama-araci"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#292c64]"
                  >
                    Hesaplama Aracını Aç ↗
                  </Link>
                  <div className="px-3.5 py-2 rounded-xl bg-[#292c64] text-white text-xs font-bold">
                    Toplam {leads.length} Başvuru
                  </div>
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                  <p className="text-sm font-semibold text-slate-600">
                    Henüz kayıtlı teklif başvurusu bulunmuyor.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4">Müşteri Bilgisi</th>
                          <th className="py-3.5 px-4">İhtiyaç Detayı (Ölçü, Ortam, Panel &amp; Güç)</th>
                          <th className="py-3.5 px-4">Tarih</th>
                          <th className="py-3.5 px-4 text-right">İşlem Butonları</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leads.map((lead) => {
                          const cleanDigits = lead.phone.replace(/[^0-9]/g, '')
                          const waPhone = cleanDigits.startsWith('90')
                            ? cleanDigits
                            : cleanDigits.startsWith('0')
                            ? `9${cleanDigits}`
                            : `90${cleanDigits}`
                          const waText = encodeURIComponent(
                            `Merhaba Sayın ${lead.fullName}, Çamyar LED Ekran Teknolojileri'nden ulaşıyoruz. Sitemiz üzerinden ilettiğiniz "${lead.dimensionsSummary}" (${lead.panelCount} Adet Panel, ${lead.psuCount} Adet Güç Kaynağı) teknik başvurunuz için fiyat teklifimiz hazırdır.`
                          )

                          return (
                            <tr
                              key={lead.id}
                              className={`transition-colors ${
                                lead.status === 'Arşivlendi'
                                  ? 'bg-slate-50/70 opacity-75'
                                  : 'hover:bg-slate-50'
                              }`}
                            >
                              {/* 1. Müşteri Bilgisi */}
                              <td className="py-4 px-4 align-top">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-black text-sm text-[#1e2142]">
                                    {lead.fullName}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      lead.status === 'Yeni'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-slate-200 text-slate-700'
                                    }`}
                                  >
                                    {lead.status}
                                  </span>
                                </div>
                                <div className="font-mono text-xs font-bold text-slate-600 flex items-center gap-1">
                                  <span>📞</span>
                                  <span>{lead.phone}</span>
                                </div>
                              </td>

                              {/* 2. İhtiyaç Detayı */}
                              <td className="py-4 px-4 align-top">
                                <div className="font-black text-xs sm:text-sm text-[#292c64] mb-1">
                                  {lead.dimensionsSummary}
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-[#292c64] font-bold border border-indigo-100">
                                    🧩 {lead.panelCount} Adet Panel ({lead.modulesLayout})
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-bold border border-amber-200/70">
                                    ⚡ {lead.psuCount} Adet 5V 60A Adaptör
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-semibold">
                                    📺 {lead.resolution}
                                  </span>
                                </div>
                              </td>

                              {/* 3. Tarih */}
                              <td className="py-4 px-4 align-top whitespace-nowrap">
                                <span className="font-mono text-xs font-semibold text-slate-600">
                                  {lead.createdAt}
                                </span>
                              </td>

                              {/* 4. İşlem Butonları */}
                              <td className="py-4 px-4 align-top text-right">
                                <div className="flex flex-wrap items-center justify-end gap-2">
                                  <a
                                    href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#292c64] hover:bg-[#1e2142] text-white text-xs font-bold shadow-2xs transition-colors"
                                  >
                                    <span>📞 Müşteriyi Ara</span>
                                  </a>

                                  <a
                                    href={`https://wa.me/${waPhone}?text=${waText}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#70b62c] hover:bg-[#62a225] text-white text-xs font-bold shadow-2xs transition-colors"
                                  >
                                    <span>💬 WhatsApp&apos;tan Yaz</span>
                                  </a>

                                  <button
                                    type="button"
                                    onClick={() => handleArchiveLead(lead.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                                    title={lead.status === 'Yeni' ? 'Talebi Arşivle' : 'Yeni Olarak İşaretle'}
                                  >
                                    <span>{lead.status === 'Yeni' ? '📁 Arşivle' : '↩ Geri Al'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                                    title="Talebi Kalıcı Olarak Sil"
                                  >
                                    <span>🗑️ Talebi Sil</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── MODAL 1: ÜRÜN EKLEME & DÜZENLEME ── */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#1e2142]">
                  {editingProductId ? 'Ürünü ve Görseli Düzenle' : 'Yeni LED Donanımı Ekle'}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingProductId
                    ? 'Yaptığınız görsel ve teknik özellik güncellemeleri anında /urunler sayfasına yansır'
                    : 'Eklenen ürün anında /urunler sayfasındaki ilgili kategoriye yansır'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowProductModal(false)
                  setEditingProductId(null)
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ürün Adı</label>
                  <input
                    type="text"
                    required
                    placeholder="örn: P8 RGB Dış Mekan LED Modül"
                    value={productForm.ad}
                    onChange={(e) => setProductForm({ ...productForm, ad: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Model Kodu</label>
                  <input
                    type="text"
                    placeholder="örn: P8 SMD3535 Outdoor"
                    value={productForm.model}
                    onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
                  <select
                    value={productForm.kategori}
                    onChange={(e) =>
                      setProductForm({ ...productForm, kategori: e.target.value as KategoriSlug })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  >
                    <option value="led-paneller">LED Paneller</option>
                    <option value="kontrol-kartlari">Kontrol Kartları</option>
                    <option value="guc-kaynaklari">Güç Kaynakları</option>
                    <option value="cnc-kasalar-aksesuarlar">CNC Kasalar &amp; Aksesuarlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Stok Durumu</label>
                  <select
                    value={productForm.stok}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stok: e.target.value as Product['stok'] })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  >
                    <option value="Stokta">Stokta</option>
                    <option value="Sipariş Üzerine">Sipariş Üzerine</option>
                    <option value="Sorunuz">Sorunuz</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Garanti Süresi</label>
                  <input
                    type="text"
                    placeholder="örn: 2 Yıl Garanti"
                    value={productForm.garanti}
                    onChange={(e) => setProductForm({ ...productForm, garanti: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Piksel Aralığı / Kapasite
                  </label>
                  <input
                    type="text"
                    placeholder="örn: 8 mm Pitch"
                    value={productForm.pikselAraligi}
                    onChange={(e) => setProductForm({ ...productForm, pikselAraligi: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tarama Oranı (Scan)
                  </label>
                  <input
                    type="text"
                    placeholder="örn: 1/4 Scan"
                    value={productForm.taramaOrani}
                    onChange={(e) => setProductForm({ ...productForm, taramaOrani: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Çalışma Voltajı
                  </label>
                  <input
                    type="text"
                    placeholder="örn: 5V DC"
                    value={productForm.calismaVoltaji}
                    onChange={(e) => setProductForm({ ...productForm, calismaVoltaji: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Çözünürlük / Boyut
                  </label>
                  <input
                    type="text"
                    placeholder="örn: 32 × 16 Piksel (320x160mm)"
                    value={productForm.cozunurluk}
                    onChange={(e) => setProductForm({ ...productForm, cozunurluk: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kısa Teknik Açıklama
                </label>
                <textarea
                  rows={2}
                  placeholder="Ürün kartında görünecek açıklama..."
                  value={productForm.aciklama}
                  onChange={(e) => setProductForm({ ...productForm, aciklama: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              {/* Ürün Görseli (URL veya Dosya Yükleme + Canlı Önizleme) */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Ürün Görseli (URL veya Bilgisayardan Yükle)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#292c64] hover:bg-[#1e2142] text-white text-[11px] font-bold cursor-pointer transition-colors">
                    <span>📁 Görsel Seç / Yükle</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  {productForm.gorselUrl && (
                    <div className="w-16 h-14 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={productForm.gorselUrl}
                        alt="Ürün Önizleme"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... veya /novastar-tb40.jpg"
                    value={productForm.gorselUrl}
                    onChange={(e) => setProductForm({ ...productForm, gorselUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowProductModal(false)
                    setEditingProductId(null)
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#292c64] text-white text-xs font-bold hover:bg-[#1e2142] shadow-xs cursor-pointer"
                >
                  {editingProductId ? 'Değişiklikleri Kaydet ve Güncelle' : 'Ürünü Kaydet ve Yayınla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: BLOG YAZISI EKLEME ── */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#1e2142]">Yeni SEO Blog Makalesi Ekle</h3>
                <p className="text-xs text-slate-500">
                  Yayınlanan makale anında /blog sayfasının en başına düşer
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBlogModal(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Makale Başlığı
                </label>
                <input
                  type="text"
                  required
                  placeholder="örn: Samsun Sahil Şeridinde Dış Mekan LED Bakımı Nasıl Yapılır?"
                  value={blogForm.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setBlogForm({
                      ...blogForm,
                      title,
                      slug: slugifyTr(title),
                    })
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    SEO Slug Adresi
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="samsun-sahil-seridi-led-bakimi"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={blogForm.category}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, category: e.target.value as BlogArticle['category'] })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  >
                    <option value="Teknik Rehberler">Teknik Rehberler</option>
                    <option value="Samsun Projeleri">Samsun Projeleri</option>
                    <option value="Ürün Karşılaştırmaları">Ürün Karşılaştırmaları</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kapak Görsel URL&apos;si
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={blogForm.coverImage}
                  onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kısa Özet (Meta Description)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Arama motorlarında ve blog kartında çıkacak 1-2 cümlelik özet..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Makale Ana İçeriği
                </label>
                <textarea
                  rows={4}
                  placeholder="Makalenin detaylı teknik metnini buraya yazın..."
                  value={blogForm.contentBody}
                  onChange={(e) => setBlogForm({ ...blogForm, contentBody: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#70b62c] text-white text-xs font-bold hover:bg-[#62a225] shadow-xs cursor-pointer"
                >
                  Makaleyi Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 3: REFERANS PROJE EKLEME ── */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#1e2142]">Yeni Samsun Referans Projesi Ekle</h3>
                <p className="text-xs text-slate-500">
                  Eklenen proje anında /referanslar sayfasında ve sayaçta görünür
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Proje Adı</label>
                <input
                  type="text"
                  required
                  placeholder="örn: İlkadım Belediyesi Dış Mekan LED Ekran Montajı"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Müşteri / Kurum Adı
                  </label>
                  <input
                    type="text"
                    placeholder="örn: İlkadım Belediyesi"
                    value={projectForm.clientName}
                    onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Lokasyon / İlçe
                  </label>
                  <input
                    type="text"
                    placeholder="Samsun / İlkadım, Atakum..."
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kullanılan Panel / Sistem
                  </label>
                  <input
                    type="text"
                    placeholder="P10 RGB Outdoor 1/4 Scan IP65"
                    value={projectForm.panelType}
                    onChange={(e) => setProjectForm({ ...projectForm, panelType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Ekran Ebatları
                  </label>
                  <input
                    type="text"
                    placeholder="4.80m x 2.88m (13.8 m²)"
                    value={projectForm.dimensions}
                    onChange={(e) => setProjectForm({ ...projectForm, dimensions: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Teslim Tarihi
                  </label>
                  <input
                    type="text"
                    placeholder="Ekim 2026"
                    value={projectForm.completionDate}
                    onChange={(e) => setProjectForm({ ...projectForm, completionDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Proje Fotoğrafı URL&apos;si
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-xs cursor-pointer"
                >
                  Projeyi Kaydet ve Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 4: YAZILIM & PROGRAM EKLEME / DÜZENLEME ── */}
      {showSoftwareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#1e2142]">
                  {editingSoftwareId ? 'Yazılımı & İndirme Linkini Düzenle' : 'Yeni LED Yazılımı Ekle'}
                </h3>
                <p className="text-xs text-slate-500">
                  Değişiklikler anında /program-indir sayfasına yansır ve İndir butonu doğrudan dosyayı indirir
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSoftwareModal(false)
                  setEditingSoftwareId(null)
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSoftware} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Program Adı
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="örn: HDPlayer veya NovaLCT"
                    value={softwareForm.ad}
                    onChange={(e) => setSoftwareForm({ ...softwareForm, ad: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Versiyon Bilgisi
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="örn: v5.3.4 (Güncel)"
                    value={softwareForm.versiyon}
                    onChange={(e) => setSoftwareForm({ ...softwareForm, versiyon: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Marka / Kategori
                  </label>
                  <select
                    value={softwareForm.kategori}
                    onChange={(e) =>
                      setSoftwareForm({
                        ...softwareForm,
                        kategori: e.target.value as YazilimKategori,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  >
                    <option value="PowerLED">PowerLED</option>
                    <option value="Huidu">Huidu</option>
                    <option value="Novastar">Novastar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Dosya Boyutu
                  </label>
                  <input
                    type="text"
                    placeholder="örn: 85 MB"
                    value={softwareForm.dosyaBoyutu}
                    onChange={(e) =>
                      setSoftwareForm({ ...softwareForm, dosyaBoyutu: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Güncelleme Tarihi
                  </label>
                  <input
                    type="text"
                    placeholder="örn: 2026-10"
                    value={softwareForm.guncellemeTarihi}
                    onChange={(e) =>
                      setSoftwareForm({ ...softwareForm, guncellemeTarihi: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 space-y-2">
                <label className="block text-xs font-bold text-[#292c64] uppercase">
                  İndirme Dosyası Bağlantısı (.exe veya .zip Doğrudan URL / Dosya Yolu)
                </label>
                <input
                  type="text"
                  required
                  placeholder="/downloads/HDPlayer_v5.3.4_Setup.exe veya https://.../setup.zip"
                  value={softwareForm.indirmeLinki}
                  onChange={(e) =>
                    setSoftwareForm({ ...softwareForm, indirmeLinki: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  Müşteri &quot;İndir&quot; butonuna bastığında HTML5 <code>download</code> niteliğiyle bu bağlantıdaki kurulum dosyası doğrudan inmeye başlar.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Uyumlu Kontrol Kartları (Virgülle Ayırın)
                </label>
                <input
                  type="text"
                  placeholder="örn: HD-W02, HD-WF1, HD-C16C, HD-D15"
                  value={softwareForm.uyumluKartlarText}
                  onChange={(e) =>
                    setSoftwareForm({ ...softwareForm, uyumluKartlarText: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kısa Açıklama
                </label>
                <textarea
                  rows={2}
                  placeholder="Programın kullanım amacı ve desteklediği özellikler..."
                  value={softwareForm.aciklama}
                  onChange={(e) => setSoftwareForm({ ...softwareForm, aciklama: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#292c64] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowSoftwareModal(false)
                    setEditingSoftwareId(null)
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#292c64] text-white text-xs font-bold hover:bg-[#1e2142] shadow-xs cursor-pointer"
                >
                  {editingSoftwareId ? 'Değişiklikleri Kaydet ve Güncelle' : 'Programı Kaydet ve Yayınla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
