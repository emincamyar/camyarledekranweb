import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { urunler, yazilimlar } from '@/lib/products'
import { blogArticles } from '@/lib/blog'
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from '@/lib/adminData'

const DATA_DIR = path.join(process.cwd(), 'data')
const STORE_FILE = path.join(DATA_DIR, 'cms-store.json')

function getDefaultServerStore() {
  return {
    products: urunler,
    blogs: blogArticles,
    projects: INITIAL_PROJECTS,
    inquiries: INITIAL_INQUIRIES,
    softwares: yazilimlar,
    updatedAt: '2026-10-20T00:00:00.000Z',
  }
}

function readServerStore() {
  try {
    if (!fs.existsSync(STORE_FILE)) {
      return getDefaultServerStore()
    }
    const raw = fs.readFileSync(STORE_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return {
      products: Array.isArray(parsed.products) ? parsed.products : urunler,
      blogs: Array.isArray(parsed.blogs) ? parsed.blogs : blogArticles,
      projects: Array.isArray(parsed.projects) ? parsed.projects : INITIAL_PROJECTS,
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : INITIAL_INQUIRIES,
      softwares: Array.isArray(parsed.softwares) ? parsed.softwares : yazilimlar,
      updatedAt: parsed.updatedAt || '2026-10-20T00:00:00.000Z',
    }
  } catch {
    return getDefaultServerStore()
  }
}

export async function GET() {
  const store = readServerStore()
  return NextResponse.json(store)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const current = readServerStore()

    const nextStore = {
      products: Array.isArray(body.products) ? body.products : current.products,
      blogs: Array.isArray(body.blogs) ? body.blogs : current.blogs,
      projects: Array.isArray(body.projects) ? body.projects : current.projects,
      inquiries: Array.isArray(body.inquiries) ? body.inquiries : current.inquiries,
      softwares: Array.isArray(body.softwares) ? body.softwares : current.softwares,
      updatedAt: body.updatedAt || new Date().toISOString(),
    }

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(nextStore, null, 2), 'utf8')

    return NextResponse.json({ success: true, store: nextStore })
  } catch {
    return NextResponse.json({ success: false, error: 'Veri kaydedilemedi.' }, { status: 400 })
  }
}
