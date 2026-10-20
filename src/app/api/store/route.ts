import { NextResponse } from 'next/server'
import { urunler, yazilimlar } from '@/lib/products'
import { blogArticles } from '@/lib/blog'
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from '@/lib/adminData'

// Bellekte tutulan geçici store (Vercel sunucusu ayakta olduğu sürece ve anlık isteklerde veri taşır)
let memoryStore = {
  products: urunler,
  blogs: blogArticles,
  projects: INITIAL_PROJECTS,
  inquiries: INITIAL_INQUIRIES,
  softwares: yazilimlar,
  updatedAt: new Date().toISOString(),
}

export async function GET() {
  return NextResponse.json(memoryStore)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    memoryStore = {
      products: Array.isArray(body.products) ? body.products : memoryStore.products,
      blogs: Array.isArray(body.blogs) ? body.blogs : memoryStore.blogs,
      projects: Array.isArray(body.projects) ? body.projects : memoryStore.projects,
      inquiries: Array.isArray(body.inquiries) ? body.inquiries : memoryStore.inquiries,
      softwares: Array.isArray(body.softwares) ? body.softwares : memoryStore.softwares,
      updatedAt: body.updatedAt || new Date().toISOString(),
    }

    return NextResponse.json({ success: true, store: memoryStore })
  } catch {
    return NextResponse.json({ success: false, error: 'Veri kaydedilemedi.' }, { status: 400 })
  }
}