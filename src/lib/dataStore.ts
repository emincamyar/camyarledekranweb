'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  urunler as defaultProducts,
  yazilimlar as defaultSoftwares,
  type Product,
  type KategoriSlug,
  type Software,
  type YazilimKategori,
} from './products'
import { blogArticles as defaultBlogs, type BlogArticle } from './blog'
import {
  INITIAL_PROJECTS as defaultProjects,
  INITIAL_INQUIRIES as defaultInquiries,
  type AdminProject,
  type AdminInquiry,
} from './adminData'

export interface CamyarLead {
  id: string
  fullName: string
  phone: string
  environmentType: 'İç Mekan' | 'Dış Mekan'
  pitchCode: string
  modelName: string
  widthM: number
  heightM: number
  areaM2: number
  dimensionsSummary: string
  panelCount: number
  modulesLayout: string
  psuCount: number
  resolution: string
  createdAt: string
  status: 'Yeni' | 'Arşivlendi'
}

export type { Software, YazilimKategori }

export interface CmsStoreData {
  products: Product[]
  blogs: BlogArticle[]
  projects: AdminProject[]
  inquiries: AdminInquiry[]
  softwares: Software[]
  updatedAt: string
}

const STORAGE_KEY = 'camyar_cms_store_v2'
const SYNC_EVENT = 'camyar-store-sync'

export const LEADS_STORAGE_KEY = 'camyar_leads'
export const LEADS_SYNC_EVENT = 'camyar-leads-sync'
export const OPEN_QUOTE_MODAL_EVENT = 'camyar-open-quote-modal'

export interface QuoteModalPayload {
  title?: string
  environmentType?: 'İç Mekan' | 'Dış Mekan'
  pitchCode?: string
  modelName?: string
  widthM?: number
  heightM?: number
  areaM2?: number
  dimensionsSummary?: string
  panelCount?: number
  modulesLayout?: string
  psuCount?: number
  resolution?: string
}

export function openQuoteModal(payload: QuoteModalPayload = {}): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<QuoteModalPayload>(OPEN_QUOTE_MODAL_EVENT, { detail: payload }))
}

export const INITIAL_LEADS: CamyarLead[] = [
  {
    id: 'lead-1001',
    fullName: 'Ahmet Yılmaz (Yılmaz Otomotiv)',
    phone: '0532 645 55 19',
    environmentType: 'Dış Mekan',
    pitchCode: 'P4',
    modelName: 'P4 Dış Mekan Pro (IP65)',
    widthM: 4.8,
    heightM: 2.88,
    areaM2: 13.82,
    dimensionsSummary: '4.80m × 2.88m - Dış Mekan P4 - 13.82 m²',
    panelCount: 270,
    modulesLayout: '15 En × 18 Boy (270 Panel)',
    psuCount: 23,
    resolution: '1200 × 720 px',
    createdAt: '20.10.2026 14:30',
    status: 'Yeni',
  },
  {
    id: 'lead-1002',
    fullName: 'Selin Kaya (Atakum Grand Balo Salonu)',
    phone: '0544 312 55 88',
    environmentType: 'İç Mekan',
    pitchCode: 'P2.5',
    modelName: 'P2.5 Ultra HD İç Mekan (3840Hz)',
    widthM: 4.16,
    heightM: 2.4,
    areaM2: 9.98,
    dimensionsSummary: '4.16m × 2.40m - İç Mekan P2.5 - 9.98 m²',
    panelCount: 195,
    modulesLayout: '13 En × 15 Boy (195 Panel)',
    psuCount: 13,
    resolution: '1664 × 960 px',
    createdAt: '20.10.2026 11:15',
    status: 'Yeni',
  },
]

export function readLeadsFromBrowser(): CamyarLead[] {
  if (typeof window === 'undefined') return INITIAL_LEADS
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS))
      return INITIAL_LEADS
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : INITIAL_LEADS
  } catch {
    return INITIAL_LEADS
  }
}

export function writeLeadsToBrowser(nextLeads: CamyarLead[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(nextLeads))
  } catch {
    // ignore storage quota errors
  }
  window.dispatchEvent(new CustomEvent<CamyarLead[]>(LEADS_SYNC_EVENT, { detail: nextLeads }))
}

export function addLeadToBrowser(
  leadInput: Omit<CamyarLead, 'id' | 'createdAt' | 'status'>
): CamyarLead {
  const now = new Date()
  const formattedDate = now.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const newLead: CamyarLead = {
    ...leadInput,
    id: `lead-${Date.now()}`,
    createdAt: formattedDate,
    status: 'Yeni',
  }

  const current = readLeadsFromBrowser()
  const updated = [newLead, ...current]
  writeLeadsToBrowser(updated)
  return newLead
}

export function useLeadsStore() {
  const [leads, setLeads] = useState<CamyarLead[]>(() => INITIAL_LEADS)

  useEffect(() => {
    setLeads(readLeadsFromBrowser())

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<CamyarLead[]>
      if (custom.detail) {
        setLeads(custom.detail)
      } else {
        setLeads(readLeadsFromBrowser())
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === LEADS_STORAGE_KEY) {
        setLeads(readLeadsFromBrowser())
      }
    }

    window.addEventListener(LEADS_SYNC_EVENT, handleSync)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(LEADS_SYNC_EVENT, handleSync)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const deleteLead = useCallback((id: string) => {
    const current = readLeadsFromBrowser()
    const next = current.filter((item) => item.id !== id)
    writeLeadsToBrowser(next)
    setLeads(next)
  }, [])

  const archiveLead = useCallback((id: string) => {
    const current = readLeadsFromBrowser()
    const next = current.map((item) =>
      item.id === id
        ? { ...item, status: (item.status === 'Yeni' ? 'Arşivlendi' : 'Yeni') as CamyarLead['status'] }
        : item
    )
    writeLeadsToBrowser(next)
    setLeads(next)
  }, [])

  return {
    leads,
    deleteLead,
    archiveLead,
  }
}

export function getDefaultStore(): CmsStoreData {
  return {
    products: defaultProducts,
    blogs: defaultBlogs,
    projects: defaultProjects,
    inquiries: defaultInquiries,
    softwares: defaultSoftwares,
    updatedAt: '2026-10-20T00:00:00.000Z',
  }
}

export function readStoreFromBrowser(): CmsStoreData {
  const defaults = getDefaultStore()
  if (typeof window === 'undefined') {
    return defaults
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw) as Partial<CmsStoreData>
    const storedBlogs = Array.isArray(parsed.blogs) && parsed.blogs.length > 0 ? parsed.blogs : defaults.blogs
    const missingDefaultBlogs = defaults.blogs.filter(
      (defBlog) => !storedBlogs.some((b) => b.slug === defBlog.slug)
    )
    const storedSoftwares =
      Array.isArray(parsed.softwares) && parsed.softwares.length > 0
        ? parsed.softwares.map((sw) => {
            if (sw.indirmeLinki && sw.indirmeLinki.startsWith('#')) {
              const fallback = defaults.softwares.find((d) => d.id === sw.id)
              return fallback ? { ...sw, indirmeLinki: fallback.indirmeLinki } : sw
            }
            return sw
          })
        : defaults.softwares
    return {
      products: Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : defaults.products,
      blogs: [...storedBlogs, ...missingDefaultBlogs],
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaults.projects,
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : defaults.inquiries,
      softwares: storedSoftwares,
      updatedAt: parsed.updatedAt || defaults.updatedAt,
    }
  } catch {
    return defaults
  }
}

export function writeStoreToBrowser(nextStore: CmsStoreData): void {
  if (typeof window === 'undefined') return

  const payload: CmsStoreData = {
    ...nextStore,
    updatedAt: new Date().toISOString(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore quota errors
  }

  // Aynı sekmedeki tüm bileşenleri anında haberdar et
  window.dispatchEvent(new CustomEvent<CmsStoreData>(SYNC_EVENT, { detail: payload }))

  // Arka planda sunucu JSON dosyasına da senkronize et
  fetch('/api/store', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // ignore network error
  })
}

export function slugifyTr(input: string): string {
  const trMap: Record<string, string> = {
    ç: 'c',
    Ç: 'c',
    ğ: 'g',
    Ğ: 'g',
    ı: 'i',
    I: 'i',
    İ: 'i',
    ö: 'o',
    Ö: 'o',
    ş: 's',
    Ş: 's',
    ü: 'u',
    Ü: 'u',
  }
  return input
    .split('')
    .map((ch) => trMap[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function mapCategoryLabelToSlug(labelOrSlug: string): KategoriSlug {
  const clean = labelOrSlug.toLowerCase()
  if (clean.includes('kontrol') || clean === 'kontrol-kartlari') return 'kontrol-kartlari'
  if (clean.includes('güç') || clean.includes('guc') || clean === 'guc-kaynaklari') return 'guc-kaynaklari'
  if (clean.includes('cnc') || clean.includes('kasa') || clean === 'cnc-kasalar-aksesuarlar')
    return 'cnc-kasalar-aksesuarlar'
  return 'led-paneller'
}

export function mapCategorySlugToLabel(slug: KategoriSlug): string {
  switch (slug) {
    case 'led-paneller':
      return 'LED Paneller'
    case 'kontrol-kartlari':
      return 'Kontrol Kartları'
    case 'guc-kaynaklari':
      return 'Güç Kaynakları'
    case 'cnc-kasalar-aksesuarlar':
      return 'CNC Kasalar & Aksesuarlar'
  }
}

/**
 * Tüm sayfalarda (/urunler, /blog, /referanslar, /, /admin/dashboard) canlı senkronize veri sağlayan React Hook
 */
export function useCmsStore() {
  const [store, setStore] = useState<CmsStoreData>(() => getDefaultStore())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // 1. Önce tarayıcı belleğinden (LocalStorage) oku
    const localData = readStoreFromBrowser()
    setStore(localData)
    setHydrated(true)

    // 2. Sunucu tarafında daha güncel bir kayıt varsa senkronize et
    fetch('/api/store', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((serverData: CmsStoreData | null) => {
        if (!serverData || !serverData.updatedAt) return
        const currentLocal = readStoreFromBrowser()
        const hasLocalCustom = Boolean(localStorage.getItem(STORAGE_KEY))
        if (!hasLocalCustom || new Date(serverData.updatedAt) > new Date(currentLocal.updatedAt)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData))
          setStore(serverData)
        }
      })
      .catch(() => {
        // ignore
      })

    // 3. Aynı sekme içi CustomEvent ve sekmeler arası storage event dinleyicileri
    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<CmsStoreData>
      if (custom.detail) {
        setStore(custom.detail)
      } else {
        setStore(readStoreFromBrowser())
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setStore(readStoreFromBrowser())
      }
    }

    window.addEventListener(SYNC_EVENT, handleSync)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const updateStore = useCallback((updater: (prev: CmsStoreData) => CmsStoreData) => {
    setStore((prev) => {
      const next = updater(prev)
      writeStoreToBrowser(next)
      return next
    })
  }, [])

  const resetStore = useCallback(() => {
    const defaults = getDefaultStore()
    writeStoreToBrowser(defaults)
    setStore(defaults)
  }, [])

  return {
    store,
    hydrated,
    updateStore,
    resetStore,
  }
}
