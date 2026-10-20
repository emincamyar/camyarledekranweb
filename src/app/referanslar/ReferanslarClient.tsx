'use client'

import { useCmsStore } from '@/lib/dataStore'

const FALLBACK_PROJECT_IMAGE =
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80'

export default function ReferanslarClient() {
  const { store } = useCmsStore()
  const projects = store.projects

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-[#1e2142]">
          <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-pulse" />
          <span>Toplam {projects.length} Tamamlanan Proje</span>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Canlı Proje Portföyü • Samsun &amp; Karadeniz
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <p className="text-slate-600 text-sm font-medium">Henüz kayıtlı referans proje bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl || FALLBACK_PROJECT_IMAGE}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover text-[0px] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_PROJECT_IMAGE
                    e.currentTarget.onerror = null
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#292c64] text-white text-[11px] font-bold shadow-xs">
                  {p.location}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#70b62c] text-white text-[11px] font-bold shadow-xs">
                  Teslim Edildi
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <h2 className="text-lg font-black text-[#1e2142] leading-snug mb-4 group-hover:text-[#292c64] transition-colors">
                  {p.title}
                </h2>
                <dl className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-xs space-y-2">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500 font-semibold">Kullanılan Panel</dt>
                    <dd className="text-slate-900 font-bold text-right">{p.panelType}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500 font-semibold">Ekran Ebatı</dt>
                    <dd className="text-slate-900 font-bold text-right">{p.dimensions}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500 font-semibold">Teslim Tarihi</dt>
                    <dd className="text-slate-900 font-bold text-right">{p.completionDate}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
