'use client'

import { useState } from 'react'
import Link from 'next/link'
import { openQuoteModal } from '@/lib/dataStore'

type Env = 'outdoor' | 'indoor'

const MODULE_W = 0.32 // m
const MODULE_H = 0.16 // m
const MODULE_AREA = MODULE_W * MODULE_H

function clamp(v: number, min: number, max: number) {
  if (Number.isNaN(v)) return min
  return Math.min(max, Math.max(min, v))
}

export default function CalculatorTeaser() {
  const [env, setEnv] = useState<Env>('outdoor')
  const [width, setWidth] = useState(4)
  const [height, setHeight] = useState(3)

  const area = width * height
  const panels = Math.ceil(width / MODULE_W) * Math.ceil(height / MODULE_H)

  const recommendation =
    env === 'outdoor'
      ? { pitch: 10, label: 'P10 RGB Dış Mekan 1/4 Scan', note: '6.500+ nit, IP65 — 10 m ve üzeri izleme mesafesi' }
      : area <= 6
        ? { pitch: 2.5, label: 'P2.5 İç Mekan', note: '1.5 – 4 m yakın izleme, ultra HD netlik' }
        : { pitch: 3, label: 'P3 İç Mekan', note: '3 – 8 m izleme, fiyat/performans dengesi' }

  const resW = Math.round((width * 1000) / recommendation.pitch)
  const resH = Math.round((height * 1000) / recommendation.pitch)

  const waText = encodeURIComponent(
    `Merhaba, ${width} m x ${height} m (${area.toFixed(1)} m²) ${
      env === 'outdoor' ? 'dış mekan' : 'iç mekan'
    } LED ekran için (${recommendation.label}) fiyat teklifi almak istiyorum.`
  )

  return (
    <div className="bg-[#292c64] rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-3 p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#70b62c] uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-[#70b62c] animate-pulse" />
          Hızlı LED Hesaplayıcı
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Ekranınız Kaç m² ve Kaç Panel?</h2>
        <p className="text-sm text-slate-300 mb-8">Ölçüleri seçin, tahmini sonuç anında güncellensin.</p>

        {/* Env toggle */}
        <div className="inline-flex p-1 rounded-xl bg-white/10 mb-8" role="group" aria-label="Mekan tipi">
          {(['outdoor', 'indoor'] as Env[]).map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEnv(e)}
              aria-pressed={env === e}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                env === e ? 'bg-[#70b62c] text-white shadow-sm' : 'text-slate-200 hover:text-white'
              }`}
            >
              {e === 'outdoor' ? 'Dış Mekan' : 'İç Mekan'}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { id: 'calc-width', label: 'En (metre)', value: width, set: setWidth, max: 20 },
            { id: 'calc-height', label: 'Boy (metre)', value: height, set: setHeight, max: 10 },
          ].map((f) => (
            <div key={f.id}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={f.id} className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {f.label}
                </label>
                <input
                  type="number"
                  min={0.5}
                  max={f.max}
                  step={0.1}
                  value={f.value}
                  onChange={(ev) => f.set(clamp(parseFloat(ev.target.value), 0.5, f.max))}
                  className="w-20 px-2 py-1 rounded-lg bg-white text-[#292c64] text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#70b62c]"
                  aria-label={f.label}
                />
              </div>
              <input
                id={f.id}
                type="range"
                min={0.5}
                max={f.max}
                step={0.1}
                value={f.value}
                onChange={(ev) => f.set(parseFloat(ev.target.value))}
                className="w-full accent-[#70b62c] cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 bg-[#1e2142] p-6 sm:p-10 flex flex-col justify-between gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-slate-400 font-semibold">Toplam Alan</div>
            <div className="text-3xl font-black text-white mt-1">
              {area.toFixed(1)} <span className="text-base text-[#70b62c]">m²</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <div className="text-xs text-slate-400 font-semibold">Tahmini Panel</div>
            <div className="text-3xl font-black text-white mt-1">
              {panels} <span className="text-base text-[#70b62c]">adet</span>
            </div>
          </div>
          <div className="col-span-2 rounded-2xl bg-[#70b62c]/10 border border-[#70b62c]/30 p-4">
            <div className="text-xs text-[#70b62c] font-bold uppercase tracking-wider">Tavsiye Edilen Piksel</div>
            <div className="text-lg font-black text-white mt-1">{recommendation.label}</div>
            <div className="text-xs text-slate-300 mt-1">{recommendation.note}</div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              Çözünürlük ≈ {resW} × {resH} px
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() =>
              openQuoteModal({
                title: `${width}m × ${height}m LED Ekran Teklif Başvurusu`,
                environmentType: env === 'outdoor' ? 'Dış Mekan' : 'İç Mekan',
                pitchCode: `P${recommendation.pitch}`,
                modelName: recommendation.label,
                widthM: width,
                heightM: height,
                areaM2: Number(area.toFixed(2)),
                dimensionsSummary: `${width}m × ${height}m - ${env === 'outdoor' ? 'Dış Mekan' : 'İç Mekan'} P${recommendation.pitch} - ${area.toFixed(1)} m²`,
                panelCount: panels,
                modulesLayout: `${panels} Adet Panel (${recommendation.label})`,
                psuCount: Math.max(1, Math.ceil(panels / 12)),
                resolution: `${resW} × ${resH} px`,
              })
            }
            className="w-full block text-center px-5 py-3 rounded-xl bg-[#70b62c] hover:bg-[#5da022] text-white text-sm font-bold transition-colors cursor-pointer"
          >
            Bu Ölçü İçin Teklif Al
          </button>
          <Link
            href="/hesaplama-araci"
            className="block text-center text-sm font-semibold text-slate-200 hover:text-[#70b62c] transition-colors"
          >
            Detaylı Çözünürlük ve Güç Hesabı İçin Hesaplama Aracına Git →
          </Link>
          <p className="text-[11px] text-slate-500 text-center">
            Tahmini değerdir; modül ölçüsü {MODULE_W * 1000}×{MODULE_H * 1000} mm ({(MODULE_AREA * 100).toFixed(0)} dm²)
            baz alınmıştır. Kesin teklif keşif sonrası verilir.
          </p>
        </div>
      </div>
    </div>
  )
}
