'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { addLeadToBrowser } from '@/lib/dataStore'

type EnvironmentType = 'indoor' | 'outdoor'

interface PanelOption {
  id: string
  code: string
  name: string
  environment: EnvironmentType
  pitchMm: number
  pixelDensityM2: string
  moduleWidthM: number
  moduleHeightM: number
  modulePixelsW: number
  modulePixelsH: number
  wattsPerModule: number
  modulesPerPSU: number
  minViewingM: number
  optViewingM: number
  brightness: string
  ipRating: string
  refreshRate: string
  usageBadge: string
  recommendedUsage: string
}

const PANEL_OPTIONS: PanelOption[] = [
  // ── İÇ MEKAN (INDOOR) MODELLERİ: P0.9, P1.53, P1.86, P2.5, P3, P4 ──
  {
    id: 'indoor-p09',
    code: 'P0.9',
    name: 'P0.9 Micro-COB Ultra 8K İç Mekan',
    environment: 'indoor',
    pitchMm: 0.9,
    pixelDensityM2: '1.234.567 px/m²',
    moduleWidthM: 0.3,
    moduleHeightM: 0.16875,
    modulePixelsW: 320,
    modulePixelsH: 180,
    wattsPerModule: 18,
    modulesPerPSU: 14,
    minViewingM: 0.9,
    optViewingM: 2.0,
    brightness: '600 – 800 Nit',
    ipRating: 'IP40 COB Koruma',
    refreshRate: '3840Hz – 7680Hz',
    usageBadge: 'Kriz Merkezi & VIP Odası',
    recommendedUsage: 'Komuta kontrol merkezleri, yönetim kurulu odaları, yayın stüdyoları',
  },
  {
    id: 'indoor-p153',
    code: 'P1.53',
    name: 'P1.53 Fine-Pitch 4K Pro İç Mekan',
    environment: 'indoor',
    pitchMm: 1.53,
    pixelDensityM2: '422.500 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 208,
    modulePixelsH: 104,
    wattsPerModule: 17,
    modulesPerPSU: 14,
    minViewingM: 1.5,
    optViewingM: 3.0,
    brightness: '750 – 900 Nit',
    ipRating: 'IP30 Ön Müdahale',
    refreshRate: '3840Hz Pro IC',
    usageBadge: 'TV Stüdyosu & Konferans',
    recommendedUsage: 'Lüks toplantı salonları, TV stüdyoları, prestijli kurumsal lobiler',
  },
  {
    id: 'indoor-p186',
    code: 'P1.86',
    name: 'P1.86 Kristal Seri İç Mekan Video Wall',
    environment: 'indoor',
    pitchMm: 1.86,
    pixelDensityM2: '288.906 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 172,
    modulePixelsH: 86,
    wattsPerModule: 16,
    modulesPerPSU: 15,
    minViewingM: 1.8,
    optViewingM: 3.5,
    brightness: '800 – 1.000 Nit',
    ipRating: 'IP30 İç Mekan',
    refreshRate: '3840Hz Flicker-Free',
    usageBadge: 'Showroom & Amfi',
    recommendedUsage: 'Kurumsal showroomlar, üniversite amfileri, yakın mesafe vitrinler',
  },
  {
    id: 'indoor-p25',
    code: 'P2.5',
    name: 'P2.5 Ultra HD İç Mekan (En Çok Tercih Edilen)',
    environment: 'indoor',
    pitchMm: 2.5,
    pixelDensityM2: '160.000 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 128,
    modulePixelsH: 64,
    wattsPerModule: 15,
    modulesPerPSU: 15,
    minViewingM: 2.5,
    optViewingM: 5.0,
    brightness: '800 – 1.100 Nit',
    ipRating: 'IP30 İç Mekan',
    refreshRate: '3840Hz Kamera Uyumlu',
    usageBadge: 'Mağaza Vitrini & Salon',
    recommendedUsage: 'AVM mağazaları, konferans salonları, otel balo salonları',
  },
  {
    id: 'indoor-p3',
    code: 'P3',
    name: 'P3 Standart HD Sahne & Salon Serisi',
    environment: 'indoor',
    pitchMm: 3.0,
    pixelDensityM2: '111.111 px/m²',
    moduleWidthM: 0.192,
    moduleHeightM: 0.192,
    modulePixelsW: 64,
    modulePixelsH: 64,
    wattsPerModule: 14,
    modulesPerPSU: 16,
    minViewingM: 3.0,
    optViewingM: 6.0,
    brightness: '1.000 – 1.200 Nit',
    ipRating: 'IP30 İç Mekan',
    refreshRate: '3840Hz Sahne Serisi',
    usageBadge: 'Düğün & Balo Salonu',
    recommendedUsage: 'Düğün salonları, etkinlik sahneleri, geniş AVM atriumları',
  },
  {
    id: 'indoor-p4',
    code: 'P4',
    name: 'P4 Geniş Salon Ekonomik İç Mekan',
    environment: 'indoor',
    pitchMm: 4.0,
    pixelDensityM2: '62.500 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 80,
    modulePixelsH: 40,
    wattsPerModule: 14,
    modulesPerPSU: 16,
    minViewingM: 4.0,
    optViewingM: 8.0,
    brightness: '1.000 – 1.200 Nit',
    ipRating: 'IP30 İç Mekan',
    refreshRate: '1920Hz / 3840Hz',
    usageBadge: 'Kapalı Spor & Kongre',
    recommendedUsage: 'Kapalı spor salonları, büyük kongre merkezleri, yüksek tavanlı lobiler',
  },

  // ── DIŞ MEKAN (OUTDOOR) MODELLERİ: P2.5, P3, P4, P5, P10 ──
  {
    id: 'outdoor-p25',
    code: 'P2.5',
    name: 'P2.5 Ultra HD Dış Mekan Vitrin & Totem',
    environment: 'outdoor',
    pitchMm: 2.5,
    pixelDensityM2: '160.000 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 128,
    modulePixelsH: 64,
    wattsPerModule: 22,
    modulesPerPSU: 10,
    minViewingM: 2.5,
    optViewingM: 5.0,
    brightness: '5.000 – 5.500 Nit',
    ipRating: 'IP65 Tam Sızdırmaz',
    refreshRate: '3840Hz Outdoor Pro',
    usageBadge: 'Yakın Mesafe Prestij Totem',
    recommendedUsage: 'Yaya kaldırımı hizasındaki lüks vitrinler, belediye dijital raket (CLP) totemler',
  },
  {
    id: 'outdoor-p3',
    code: 'P3',
    name: 'P3 Yüksek Çözünürlüklü Dış Mekan Cephe',
    environment: 'outdoor',
    pitchMm: 3.0,
    pixelDensityM2: '111.111 px/m²',
    moduleWidthM: 0.192,
    moduleHeightM: 0.192,
    modulePixelsW: 64,
    modulePixelsH: 64,
    wattsPerModule: 20,
    modulesPerPSU: 11,
    minViewingM: 3.0,
    optViewingM: 6.5,
    brightness: '5.500 – 6.000 Nit',
    ipRating: 'IP65 Tam Sızdırmaz',
    refreshRate: '3840Hz Güneş Netliği',
    usageBadge: 'Cadde Cephesi & Giriş',
    recommendedUsage: 'Prestijli bina girişleri, cadde mağaza alınlıkları, kent meydanları',
  },
  {
    id: 'outdoor-p4',
    code: 'P4',
    name: 'P4 Dış Mekan Pro (Fiyat / Performans Lideri)',
    environment: 'outdoor',
    pitchMm: 4.0,
    pixelDensityM2: '62.500 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 80,
    modulePixelsH: 40,
    wattsPerModule: 20,
    modulesPerPSU: 12,
    minViewingM: 4.0,
    optViewingM: 9.0,
    brightness: '6.000 – 6.500 Nit',
    ipRating: 'IP65 Karadeniz Zırhlı',
    refreshRate: '3840Hz SMD1921',
    usageBadge: 'Bina Cephesi & Meydan',
    recommendedUsage: 'Belediye meydan ekranları, AVM dış cepheleri, kavşak reklam ekranları',
  },
  {
    id: 'outdoor-p5',
    code: 'P5',
    name: 'P5 Dış Mekan Geniş Meydan & Totem Serisi',
    environment: 'outdoor',
    pitchMm: 5.0,
    pixelDensityM2: '40.000 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 64,
    modulePixelsH: 32,
    wattsPerModule: 19,
    modulesPerPSU: 12,
    minViewingM: 5.0,
    optViewingM: 12.0,
    brightness: '6.500 – 7.000 Nit',
    ipRating: 'IP65 Karadeniz Zırhlı',
    refreshRate: '3840Hz SMD2727',
    usageBadge: 'Bulvar & Dev Cephe',
    recommendedUsage: 'Büyük bina cepheleri, bulvar totemleri, stadyum skorbordları',
  },
  {
    id: 'outdoor-p10',
    code: 'P10',
    name: 'P10 1/4 Scan RGB Dev Ekran & Otoyol Serisi',
    environment: 'outdoor',
    pitchMm: 10.0,
    pixelDensityM2: '10.000 px/m²',
    moduleWidthM: 0.32,
    moduleHeightM: 0.16,
    modulePixelsW: 32,
    modulePixelsH: 16,
    wattsPerModule: 18,
    modulesPerPSU: 12,
    minViewingM: 10.0,
    optViewingM: 25.0,
    brightness: '7.000 – 8.500 Nit',
    ipRating: 'IP65 Tam Silikonlu',
    refreshRate: '1/4 Scan Yüksek Parlaklık',
    usageBadge: 'Otoyol Totemi & Tabela',
    recommendedUsage: 'Otoyol dev reklam totemleri, çatı ekranları, yüksek görünürlüklü tabelalar',
  },
]

const QUICK_PRESETS = [
  {
    label: 'Lüks Mağaza Vitrini',
    env: 'indoor' as EnvironmentType,
    panelId: 'indoor-p25',
    width: 2.5,
    height: 1.5,
  },
  {
    label: 'Düğün & Konferans Salonu',
    env: 'indoor' as EnvironmentType,
    panelId: 'indoor-p3',
    width: 4.5,
    height: 2.5,
  },
  {
    label: 'Cadde Cephe Dev Ekran',
    env: 'outdoor' as EnvironmentType,
    panelId: 'outdoor-p4',
    width: 5.0,
    height: 3.0,
  },
  {
    label: 'Otoyol & Meydan Totemi',
    env: 'outdoor' as EnvironmentType,
    panelId: 'outdoor-p10',
    width: 6.4,
    height: 3.2,
  },
]

export default function HesaplamaAraciPage() {
  const [environment, setEnvironment] = useState<EnvironmentType>('outdoor')
  const [selectedPanelId, setSelectedPanelId] = useState<string>('outdoor-p4')
  const [targetWidth, setTargetWidth] = useState<number>(4.8)
  const [targetHeight, setTargetHeight] = useState<number>(2.8)

  // CRM Lead Modal States
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false)
  const [leadFullName, setLeadFullName] = useState<string>('')
  const [leadPhone, setLeadPhone] = useState<string>('')
  const [leadSuccess, setLeadSuccess] = useState<boolean>(false)

  const filteredPanels = useMemo(
    () => PANEL_OPTIONS.filter((p) => p.environment === environment),
    [environment]
  )

  const panel = useMemo(() => {
    const found = PANEL_OPTIONS.find((p) => p.id === selectedPanelId)
    if (found && found.environment === environment) return found
    return filteredPanels[0]
  }, [selectedPanelId, environment, filteredPanels])

  const handleEnvironmentChange = (nextEnv: EnvironmentType) => {
    setEnvironment(nextEnv)
    const defaultForEnv = nextEnv === 'indoor' ? 'indoor-p25' : 'outdoor-p4'
    setSelectedPanelId(defaultForEnv)
  }

  // Engineering Calculations
  const calc = useMemo(() => {
    const modulesW = Math.max(1, Math.round(targetWidth / panel.moduleWidthM))
    const modulesH = Math.max(1, Math.round(targetHeight / panel.moduleHeightM))
    const totalModules = modulesW * modulesH

    const actualWidthM = Number((modulesW * panel.moduleWidthM).toFixed(2))
    const actualHeightM = Number((modulesH * panel.moduleHeightM).toFixed(2))
    const actualAreaM2 = Number((actualWidthM * actualHeightM).toFixed(2))

    const pixelsW = modulesW * panel.modulePixelsW
    const pixelsH = modulesH * panel.modulePixelsH
    const totalPixels = pixelsW * pixelsH

    // 5V 60A (300W) PSU Calculation with 80% safe continuous engineering margin
    const psuCount = Math.max(1, Math.ceil(totalModules / panel.modulesPerPSU))

    // Power consumption (kW)
    const maxPowerKw = Number(((totalModules * panel.wattsPerModule) / 1000).toFixed(2))
    const avgPowerKw = Number((maxPowerKw * 0.38).toFixed(2))

    // Aspect ratio label
    const ratio = actualWidthM / actualHeightM
    let aspectLabel = `${actualWidthM}:${actualHeightM}`
    if (Math.abs(ratio - 16 / 9) < 0.18) aspectLabel = '16:9 Geniş Ekran'
    else if (Math.abs(ratio - 4 / 3) < 0.15) aspectLabel = '4:3 Klasik Oran'
    else if (Math.abs(ratio - 9 / 16) < 0.15) aspectLabel = '9:16 Dikey Totem'
    else if (ratio >= 2.2) aspectLabel = 'Panoramik Alınlık'

    // Preview Grid (clamped for clean visual schematic rendering)
    const previewCols = Math.min(20, Math.max(3, modulesW))
    const previewRows = Math.min(12, Math.max(2, modulesH))

    return {
      modulesW,
      modulesH,
      totalModules,
      actualWidthM,
      actualHeightM,
      actualAreaM2,
      pixelsW,
      pixelsH,
      totalPixels,
      psuCount,
      maxPowerKw,
      avgPowerKw,
      aspectLabel,
      previewCols,
      previewRows,
    }
  }, [targetWidth, targetHeight, panel])

  const envLabel = environment === 'indoor' ? 'İç Mekan' : 'Dış Mekan'

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadFullName.trim() || !leadPhone.trim()) return

    addLeadToBrowser({
      fullName: leadFullName.trim(),
      phone: leadPhone.trim(),
      environmentType: envLabel,
      pitchCode: panel.code,
      modelName: panel.name,
      widthM: calc.actualWidthM,
      heightM: calc.actualHeightM,
      areaM2: calc.actualAreaM2,
      dimensionsSummary: `${calc.actualWidthM}m × ${calc.actualHeightM}m - ${envLabel} ${panel.code} - ${calc.actualAreaM2} m²`,
      panelCount: calc.totalModules,
      modulesLayout: `${calc.modulesW} En × ${calc.modulesH} Boy (${calc.totalModules} Panel)`,
      psuCount: calc.psuCount,
      resolution: `${calc.pixelsW} × ${calc.pixelsH} px`,
    })

    setLeadSuccess(true)
  }

  const openLeadModal = () => {
    setLeadSuccess(false)
    setShowLeadModal(true)
  }

  const widthPercent = ((targetWidth - 0.5) / (15 - 0.5)) * 100
  const heightPercent = ((targetHeight - 0.5) / (10 - 0.5)) * 100

  return (
    <div className="min-h-screen bg-slate-50 text-[#1e2142] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ── */}
        <nav aria-label="İz imi" className="mb-5">
          <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#292c64] transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <span className="text-[#292c64] font-bold" aria-current="page">
                LED Ekran Hesaplama &amp; Simülasyon Aracı
              </span>
            </li>
          </ol>
        </nav>

        {/* ── Page Header ── */}
        <header className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[#292c64] text-xs font-extrabold uppercase tracking-wider mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#70b62c] animate-pulse" />
            Çamyar Mühendislik • Canlı LED Mimari Simülatörü
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2142] tracking-tight leading-tight">
            Endüstriyel LED Ekran <span className="text-[#70b62c]">Hesaplama Aracı</span>
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Kullanım ortamınızı, piksel adımını (P değeri) ve hedef ölçülerinizi seçin; modül dizilim şemasını, piksel çözünürlüğünü ve elektrik gücünü saniyeler içinde simüle edin.
          </p>

          {/* Quick Scenario Presets */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mr-1">
              Hazır Proje Şablonları:
            </span>
            {QUICK_PRESETS.map((preset) => {
              const isCurrent =
                environment === preset.env &&
                selectedPanelId === preset.panelId &&
                Math.abs(targetWidth - preset.width) < 0.05 &&
                Math.abs(targetHeight - preset.height) < 0.05
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setEnvironment(preset.env)
                    setSelectedPanelId(preset.panelId)
                    setTargetWidth(preset.width)
                    setTargetHeight(preset.height)
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#292c64] text-white border-[#292c64] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:border-[#70b62c] hover:text-[#292c64] shadow-2xs'
                  }`}
                >
                  {preset.label} ({preset.width}×{preset.height}m)
                </button>
              )
            })}
          </div>
        </header>

        {/* ── Main Two-Column Engineering Workspace ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ══════════════════════════════════════════════════════════════════
              LEFT COLUMN (6 cols): Ortam Tipi, P Değeri Kartları & Sliderlar
             ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. ORTAM TİPİ SEÇİMİ (Segmented Switch / Tab) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-[#292c64] text-white flex items-center justify-center text-xs font-black">
                    1
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-[#1e2142]">
                    Ortam Tipi Seçimi
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Adım 1 / 3
                </span>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/70"
                role="tablist"
                aria-label="Ortam Tipi Seçimi"
              >
                {/* Indoor Tab */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={environment === 'indoor'}
                  onClick={() => handleEnvironmentChange('indoor')}
                  className={`flex items-center gap-3.5 p-4 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                    environment === 'indoor'
                      ? 'bg-white text-[#1e2142] shadow-md ring-2 ring-[#292c64]'
                      : 'text-slate-600 hover:text-[#1e2142] hover:bg-white/60'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      environment === 'indoor'
                        ? 'bg-[#292c64] text-[#70b62c]'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm sm:text-base leading-tight">
                        İç Mekan
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        Indoor
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                      Showroom, Salon, Vitrin &amp; Stüdyo
                    </p>
                  </div>
                </button>

                {/* Outdoor Tab */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={environment === 'outdoor'}
                  onClick={() => handleEnvironmentChange('outdoor')}
                  className={`flex items-center gap-3.5 p-4 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                    environment === 'outdoor'
                      ? 'bg-white text-[#1e2142] shadow-md ring-2 ring-[#70b62c]'
                      : 'text-slate-600 hover:text-[#1e2142] hover:bg-white/60'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      environment === 'outdoor'
                        ? 'bg-[#70b62c] text-white'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm sm:text-base leading-tight">
                        Dış Mekan
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#70b62c]/15 text-[#467319]">
                        Outdoor
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                      IP65 Su Geçirmez Cephe &amp; Totem
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. PİKSEL ADIMI (P DEĞERİ) KARTLARI */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-[#292c64] text-white flex items-center justify-center text-xs font-black">
                    2
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#1e2142]">
                      Piksel Adımı (P Değeri) Seçimi
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {environment === 'indoor'
                        ? 'İç mekan yakın mesafe Ultra HD / 4K video wall modülleri'
                        : 'Dış mekan IP65 yağmur/fırtına korumalı yüksek nit modüller'}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Adım 2 / 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-300">
                {filteredPanels.map((opt) => {
                  const isSelected = panel.id === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPanelId(opt.id)}
                      className={`group relative text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#292c64]/[0.03] border-2 border-[#70b62c] shadow-md'
                          : 'bg-white border-slate-200/90 hover:border-[#292c64]/40 hover:shadow-sm'
                      }`}
                    >
                      <div>
                        {/* Top row: P Code + Active Check */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg font-mono text-sm font-black tracking-tight ${
                              isSelected
                                ? 'bg-[#292c64] text-white'
                                : 'bg-slate-100 text-[#1e2142] group-hover:bg-[#292c64]/10'
                            }`}
                          >
                            {opt.code}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-slate-500">
                            {opt.pitchMm} mm adım
                          </span>
                        </div>

                        {/* Model Title */}
                        <div className="font-bold text-xs sm:text-sm text-[#1e2142] leading-snug mb-2.5">
                          {opt.name}
                        </div>
                      </div>

                      {/* Environment-specific Visual Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                        {opt.environment === 'indoor' ? (
                          <>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-[#292c64] text-[10px] font-bold border border-indigo-100">
                              <span>⚡</span> {opt.pixelDensityM2}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-[#467319] text-[10px] font-bold border border-emerald-200/60">
                              <span>🎯</span> {opt.usageBadge}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-900 text-[10px] font-bold border border-sky-200/70">
                              <span>🛡️</span> {opt.ipRating}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[10px] font-bold border border-amber-200/70">
                              <span>☀️</span> {opt.brightness}
                            </span>
                          </>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. FİZİKSEL ÖLÇÜ SLIDERLARI (EN & BOY) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-[#292c64] text-white flex items-center justify-center text-xs font-black">
                    3
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#1e2142]">
                      Ekran Genişlik &amp; Yükseklik Ayarı
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Sürgüleri kaydırarak hedef ekran ebatınızı belirleyin
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Adım 3 / 3
                </span>
              </div>

              {/* Width Slider Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <label htmlFor="calc-width-slider" className="text-sm font-extrabold text-[#1e2142] block">
                      Ekran Eni (Genişlik)
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Yatayda {calc.modulesW} adet modül dizilir (Net: {calc.actualWidthM}m)
                    </span>
                  </div>

                  {/* Digital Counter Badge */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTargetWidth((w) => Math.max(0.5, Number((w - 0.2).toFixed(1))))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center justify-center cursor-pointer"
                      aria-label="Genişliği azalt"
                    >
                      −
                    </button>
                    <div className="px-3.5 py-1.5 rounded-xl bg-[#292c64] text-white font-mono text-base sm:text-lg font-black tracking-tight shadow-xs min-w-[92px] text-center">
                      {targetWidth.toFixed(1)} <span className="text-xs font-bold text-[#8fd43a]">m</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTargetWidth((w) => Math.min(15.0, Number((w + 0.2).toFixed(1))))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center justify-center cursor-pointer"
                      aria-label="Genişliği artır"
                    >
                      +
                    </button>
                  </div>
                </div>

                <input
                  id="calc-width-slider"
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.1"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(parseFloat(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #70b62c 0%, #292c64 ${widthPercent}%, #e2e8f0 ${widthPercent}%, #e2e8f0 100%)`,
                  }}
                  className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-[#70b62c]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold mt-2">
                  <span>0.5 m</span>
                  <span>4.0 m</span>
                  <span>8.0 m</span>
                  <span>12.0 m</span>
                  <span>15.0 m</span>
                </div>
              </div>

              {/* Height Slider Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <label htmlFor="calc-height-slider" className="text-sm font-extrabold text-[#1e2142] block">
                      Ekran Boyu (Yükseklik)
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Dikeyde {calc.modulesH} adet modül dizilir (Net: {calc.actualHeightM}m)
                    </span>
                  </div>

                  {/* Digital Counter Badge */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTargetHeight((h) => Math.max(0.5, Number((h - 0.2).toFixed(1))))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center justify-center cursor-pointer"
                      aria-label="Yüksekliği azalt"
                    >
                      −
                    </button>
                    <div className="px-3.5 py-1.5 rounded-xl bg-[#292c64] text-white font-mono text-base sm:text-lg font-black tracking-tight shadow-xs min-w-[92px] text-center">
                      {targetHeight.toFixed(1)} <span className="text-xs font-bold text-[#8fd43a]">m</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTargetHeight((h) => Math.min(10.0, Number((h + 0.2).toFixed(1))))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center justify-center cursor-pointer"
                      aria-label="Yüksekliği artır"
                    >
                      +
                    </button>
                  </div>
                </div>

                <input
                  id="calc-height-slider"
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.1"
                  value={targetHeight}
                  onChange={(e) => setTargetHeight(parseFloat(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #70b62c 0%, #292c64 ${heightPercent}%, #e2e8f0 ${heightPercent}%, #e2e8f0 100%)`,
                  }}
                  className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-[#70b62c]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold mt-2">
                  <span>0.5 m</span>
                  <span>2.5 m</span>
                  <span>5.0 m</span>
                  <span>7.5 m</span>
                  <span>10.0 m</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT COLUMN (6 cols): Canlı Görsel Önizleme + 4 Rapor Kartı + Özet
             ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. CANLI EKRAN ŞEMA ÖNİZLEMESİ (Mockup Preview Box) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#70b62c] animate-ping" />
                  <h2 className="text-sm sm:text-base font-black text-[#1e2142] uppercase tracking-wider">
                    Canlı Ekran &amp; Modül Dizilim Önizlemesi
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[#292c64] font-mono text-[11px] font-bold">
                    {calc.aspectLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#70b62c]/15 text-[#467319] font-mono text-[11px] font-extrabold">
                    {panel.code} ({environment === 'indoor' ? 'İç Mekan' : 'IP65 Dış Mekan'})
                  </span>
                </div>
              </div>

              {/* Dark Illuminated Stage Canvas */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#0b0d17] via-[#151931] to-[#1e2142] p-6 sm:p-8 flex flex-col items-center justify-center min-h-[250px] overflow-hidden border border-slate-800 shadow-inner">
                {/* Ambient LED Glow */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#70b62c]/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-72 h-32 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Width Dimension Ruler */}
                <div className="relative z-10 flex items-center gap-2 text-[11px] font-mono font-bold text-[#8fd43a] mb-2.5">
                  <span>◄───</span>
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-white border border-white/15">
                    Genişlik: {calc.actualWidthM}m ({calc.modulesW} Modül)
                  </span>
                  <span>───►</span>
                </div>

                {/* Dynamic Aspect-Ratio LED Matrix Frame */}
                <div className="relative z-10 flex items-center gap-3">
                  <div
                    style={{
                      width: `${Math.min(320, Math.max(120, (calc.actualWidthM / Math.max(calc.actualWidthM, calc.actualHeightM)) * 300))}px`,
                      height: `${Math.min(200, Math.max(80, (calc.actualHeightM / Math.max(calc.actualWidthM, calc.actualHeightM)) * 190))}px`,
                      gridTemplateColumns: `repeat(${calc.previewCols}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${calc.previewRows}, minmax(0, 1fr))`,
                    }}
                    className="grid gap-[2px] p-2 rounded-xl bg-slate-950 border-2 border-[#70b62c]/80 shadow-[0_0_35px_rgba(112,182,44,0.35)] relative overflow-hidden transition-all duration-300"
                  >
                    {Array.from({ length: calc.previewCols * calc.previewRows }).map((_, idx) => (
                      <div
                        key={idx}
                        className="rounded-[2px] bg-gradient-to-br from-[#292c64]/90 via-[#1e2142] to-[#70b62c]/40 border border-white/10"
                      />
                    ))}

                    {/* Center Overlay Readout */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/55 backdrop-blur-[1px] text-center px-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8fd43a] font-bold">
                        ÇAMYAR LED MATRİS
                      </span>
                      <span className="text-sm sm:text-base font-mono font-black text-white drop-shadow">
                        {calc.pixelsW} × {calc.pixelsH} px
                      </span>
                      <span className="text-[11px] font-mono text-slate-300">
                        {calc.actualAreaM2} m² Net Alan
                      </span>
                    </div>
                  </div>

                  {/* Right Height Dimension Label */}
                  <div className="hidden sm:flex flex-col items-center text-[11px] font-mono font-bold text-sky-300">
                    <span>▲</span>
                    <span className="px-2 py-1 rounded bg-white/10 text-white border border-white/15 my-1 text-center leading-tight">
                      {calc.actualHeightM}m
                      <br />
                      <span className="text-[10px] text-slate-300">({calc.modulesH} Modül)</span>
                    </span>
                    <span>▼</span>
                  </div>
                </div>

                {/* Bottom Legend */}
                <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-[#70b62c]" />
                    Modül Ebatı: {(panel.moduleWidthM * 100).toFixed(0)}×{(panel.moduleHeightM * 100).toFixed(0)} cm
                  </span>
                  <span>•</span>
                  <span>Yenileme: {panel.refreshRate}</span>
                  <span>•</span>
                  <span>Parlaklık: {panel.brightness}</span>
                </div>
              </div>
            </div>

            {/* 2. SONUÇ PANELİ VE 4 ANA ESTETİK RAPOR KARTI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kart 1: Toplam Çözünürlük */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md hover:shadow-lg transition-all flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Toplam Çözünürlük
                  </span>
                  <div className="text-2xl font-black text-[#1e2142] font-mono tracking-tight">
                    {calc.pixelsW} × {calc.pixelsH} <span className="text-xs font-bold text-slate-500">px</span>
                  </div>
                  <p className="text-xs font-bold text-[#70b62c] mt-1.5">
                    Toplam {calc.totalPixels.toLocaleString('tr-TR')} aktif LED noktası
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#292c64]/10 text-[#292c64] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
              </div>

              {/* Kart 2: Gerekli Panel Sayısı */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md hover:shadow-lg transition-all flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Gerekli Panel Sayısı
                  </span>
                  <div className="text-2xl font-black text-[#1e2142] font-mono tracking-tight">
                    {calc.totalModules} <span className="text-sm font-bold text-slate-500">Adet Modül</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-1.5">
                    Yatayda {calc.modulesW} × Dikeyde {calc.modulesH} Adet ({panel.code})
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#70b62c]/15 text-[#467319] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
              </div>

              {/* Kart 3: Önerilen Güç Kaynağı */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md hover:shadow-lg transition-all flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Önerilen Güç Kaynağı
                  </span>
                  <div className="text-2xl font-black text-[#1e2142] font-mono tracking-tight">
                    {calc.psuCount} <span className="text-sm font-bold text-slate-500">Adet Adaptör</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-1.5">
                    5V 60A (300W) Slim Fanlı Endüstriyel PSU
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              {/* Kart 4: İdeal İzleme Mesafesi */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md hover:shadow-lg transition-all flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    İdeal İzleme Mesafesi
                  </span>
                  <div className="text-2xl font-black text-[#70b62c] font-mono tracking-tight">
                    {panel.minViewingM}m – {panel.optViewingM}m
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-1.5">
                    Min. {panel.minViewingM}m mesafeden itibaren keskin görüntü
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#292c64]/10 text-[#292c64] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 3. FİZİKSEL ÖLÇÜ & GÜÇ RAPORU (Koyu Lacivert Prestij Kutusu) */}
            <div className="bg-[#292c64] text-white rounded-2xl p-6 sm:p-7 shadow-md space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/15">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8fd43a] font-bold block">
                    MÜHENDİSLİK ŞARTNAME ÖZETİ
                  </span>
                  <h3 className="text-lg font-black tracking-tight">
                    Fiziksel Ölçü &amp; Elektrik Güç Raporu
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold">
                  {panel.ipRating}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[11px] text-slate-300 font-medium block">Net Kasa Boyutu</span>
                  <span className="font-mono text-sm sm:text-base font-black text-white mt-0.5 block">
                    {calc.actualWidthM} × {calc.actualHeightM}m
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[11px] text-slate-300 font-medium block">Toplam m² Alanı</span>
                  <span className="font-mono text-sm sm:text-base font-black text-[#8fd43a] mt-0.5 block">
                    {calc.actualAreaM2} m²
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[11px] text-slate-300 font-medium block">Ort. Tüketim</span>
                  <span className="font-mono text-sm sm:text-base font-black text-white mt-0.5 block">
                    ~{calc.avgPowerKw} kW/s
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[11px] text-slate-300 font-medium block">Maks. Güç Yükü</span>
                  <span className="font-mono text-sm sm:text-base font-black text-amber-300 mt-0.5 block">
                    ~{calc.maxPowerKw} kW
                  </span>
                </div>
              </div>

              {/* 4. KURUMSAL CRM TEKLİF & BAŞVURU MODALI TETİKLEYİCİ */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={openLeadModal}
                  id="calculator-lead-cta"
                  className="w-full py-4 px-6 rounded-2xl bg-[#70b62c] hover:bg-[#5ea022] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Teklif Al / Başvuru Gönder</span>
                </button>
                <p className="text-[11px] text-center text-slate-300 mt-2.5">
                  ⚡ Seçtiğiniz ölçü ({calc.actualWidthM}×{calc.actualHeightM}m — {calc.actualAreaM2} m²), {panel.code} model, {calc.totalModules} panel ve {calc.psuCount} güç kaynağı verisi doğrudan <strong>Çamyar Mühendislik Proje Yönetimine</strong> aktarılır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          KURUMSAL TEKLİF & MÜŞTERİ BAŞVURU MODALI (CRM Lead Capture)
         ══════════════════════════════════════════════════════════════════════ */}
      {showLeadModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              type="button"
              onClick={() => setShowLeadModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              ✕
            </button>

            {leadSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#70b62c]/15 text-[#70b62c] flex items-center justify-center mx-auto">
                  <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-[#1e2142]">
                  Teklif Başvurunuz Alındı!
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Sayın <strong>{leadFullName}</strong>, <strong>{calc.actualWidthM}m × {calc.actualHeightM}m ({calc.actualAreaM2} m²) {envLabel} {panel.code}</strong> teknik hesaplama dosyanız Çamyar LED Mühendislik Yönetim Paneline iletilmiştir. Uzman mühendislerimiz <strong>{leadPhone}</strong> numaranızdan en kısa sürede sizinle iletişime geçecektir.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLeadModal(false)
                      setLeadFullName('')
                      setLeadPhone('')
                      setLeadSuccess(false)
                    }}
                    className="px-6 py-3 rounded-xl bg-[#292c64] hover:bg-[#1e2142] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    Tamam, Hesaplama Aracına Dön
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#70b62c]/15 text-[#467319] text-xs font-extrabold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#70b62c]" />
                    Proje Teklif &amp; Keşif Başvurusu
                  </div>
                  <h3 id="lead-modal-title" className="text-xl sm:text-2xl font-black text-[#1e2142]">
                    Hesaplanan Proje İçin Teklif İste
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    İletişim bilgilerinizi girin; seçtiğiniz teknik parametreler otomatik olarak mühendislik ekranımıza düşsün.
                  </p>
                </div>

                {/* Otomatik Hesaplama Özeti Kutusu */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-6 text-xs space-y-2">
                  <div className="font-extrabold text-[#292c64] uppercase tracking-wider text-[11px] pb-1.5 border-b border-slate-200 flex items-center justify-between">
                    <span>Başvuruya Eklenecek Teknik Paket</span>
                    <span className="text-[#70b62c] font-mono">{panel.code}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-slate-500 block">Ortam &amp; Model:</span>
                      <span className="font-bold text-slate-900">{envLabel} • {panel.code}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Net Ölçü &amp; Alan:</span>
                      <span className="font-bold text-slate-900">{calc.actualWidthM}m × {calc.actualHeightM}m ({calc.actualAreaM2} m²)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Gerekli Panel Adedi:</span>
                      <span className="font-bold text-slate-900">{calc.totalModules} Adet ({calc.modulesW}×{calc.modulesH})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Güç Kaynağı (5V 60A):</span>
                      <span className="font-bold text-slate-900">{calc.psuCount} Adet PSU</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div>
                    <label
                      htmlFor="lead-fullname"
                      className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Adınız Soyadınız / Firma Adı *
                    </label>
                    <input
                      id="lead-fullname"
                      type="text"
                      required
                      placeholder="Örn: Mehmet Demir / Demir İnşaat"
                      value={leadFullName}
                      onChange={(e) => setLeadFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#292c64]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Telefon Numaranız *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      placeholder="Örn: 0532 000 00 00"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#292c64]"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowLeadModal(false)}
                      className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Vazgeç
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#70b62c] hover:bg-[#5ea022] text-white text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer"
                    >
                      Başvuruyu Gönder &rarr;
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
