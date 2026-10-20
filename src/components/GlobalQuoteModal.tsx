'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  OPEN_QUOTE_MODAL_EVENT,
  addLeadToBrowser,
  type QuoteModalPayload,
} from '@/lib/dataStore'

export default function GlobalQuoteModal() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [payload, setPayload] = useState<QuoteModalPayload>({})
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [projectNote, setProjectNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const custom = e as CustomEvent<QuoteModalPayload>
      setPayload(custom.detail || {})
      setSubmitted(false)
      setOpen(true)
    }

    window.addEventListener(OPEN_QUOTE_MODAL_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_QUOTE_MODAL_EVENT, handleOpen)
  }, [])

  if (pathname?.startsWith('/admin') || !open) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !phone.trim()) return

    const envType = payload.environmentType || 'Dış Mekan'
    const pitch = payload.pitchCode || 'Genel'
    const model = payload.modelName || payload.title || 'Genel LED Ekran Teklif Talebi'
    const summaryBase =
      payload.dimensionsSummary ||
      (payload.title ? `${payload.title} (${pitch})` : 'Genel Proje & Keşif Talebi')
    const finalSummary = projectNote.trim()
      ? `${summaryBase} — Not: ${projectNote.trim()}`
      : summaryBase

    addLeadToBrowser({
      fullName: fullName.trim(),
      phone: phone.trim(),
      environmentType: envType,
      pitchCode: pitch,
      modelName: model,
      widthM: payload.widthM || 0,
      heightM: payload.heightM || 0,
      areaM2: payload.areaM2 || 0,
      dimensionsSummary: finalSummary,
      panelCount: payload.panelCount || 0,
      modulesLayout: payload.modulesLayout || (payload.modelName ? payload.modelName : 'Keşif Sonrası Belirlenecek'),
      psuCount: payload.psuCount || 0,
      resolution: payload.resolution || '-',
    })

    setSubmitted(true)
  }

  const handleClose = () => {
    setOpen(false)
    setFullName('')
    setPhone('')
    setProjectNote('')
    setSubmitted(false)
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-quote-modal-title"
    >
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#70b62c]/15 text-[#70b62c] flex items-center justify-center mx-auto">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-[#1e2142]">
              Teklif Başvurunuz Kaydedildi!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Sayın <strong>{fullName}</strong>, başvurunuz Çamyar LED Mühendislik CRM sistemimize (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">Gelen Başvurular</code>) başarıyla iletilmiştir. Uzman ekibimiz <strong>{phone}</strong> numaranızdan en kısa sürede sizinle iletişime geçecektir.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-xl bg-[#292c64] hover:bg-[#1e2142] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Tamam, Pencereyi Kapat
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#70b62c]/15 text-[#467319] text-xs font-extrabold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#70b62c]" />
                Çamyar LED • Kurumsal Teklif &amp; Keşif Formu
              </div>
              <h3 id="global-quote-modal-title" className="text-xl sm:text-2xl font-black text-[#1e2142]">
                {payload.title || 'Hızlı Fiyat Teklifi & Keşif Başvurusu'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Bilgilerinizi bırakın; mühendislik ekibimiz projenize özel fiyat çalışmasıyla sizi arasın.
              </p>
            </div>

            {payload.dimensionsSummary && (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-5 text-xs space-y-1.5">
                <div className="font-extrabold text-[#292c64] uppercase tracking-wider text-[11px] flex items-center justify-between">
                  <span>Seçilen Ürün / Hesaplama Detayı</span>
                  {payload.pitchCode && (
                    <span className="px-2 py-0.5 rounded bg-[#70b62c]/15 text-[#467319] font-mono font-bold">
                      {payload.pitchCode}
                    </span>
                  )}
                </div>
                <div className="font-bold text-slate-800">{payload.dimensionsSummary}</div>
                {(payload.panelCount ? payload.panelCount > 0 : false) && (
                  <div className="text-slate-600">
                    {payload.panelCount} Adet Panel • {payload.psuCount} Adet 5V 60A Güç Kaynağı
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="global-lead-name"
                  className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Adınız Soyadınız / Firma Adı *
                </label>
                <input
                  id="global-lead-name"
                  type="text"
                  required
                  placeholder="Örn: Ahmet Yılmaz / Yılmaz Grup"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#292c64]"
                />
              </div>

              <div>
                <label
                  htmlFor="global-lead-phone"
                  className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Telefon Numaranız *
                </label>
                <input
                  id="global-lead-phone"
                  type="tel"
                  required
                  placeholder="Örn: 0546 240 90 77"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#292c64]"
                />
              </div>

              <div>
                <label
                  htmlFor="global-lead-note"
                  className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Proje Notu / Ölçü veya İlçe (Opsiyonel)
                </label>
                <input
                  id="global-lead-note"
                  type="text"
                  placeholder="Örn: İlkadım cephe montajı, 4x2 metre dış mekan ekran..."
                  value={projectNote}
                  onChange={(e) => setProjectNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#292c64]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#70b62c] hover:bg-[#5ea022] text-white text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer"
                >
                  Teklif Talebini Gönder &rarr;
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
