import * as z from 'zod'
import { verifySlug } from '~/service/project'
import { NextRequest, NextResponse } from 'next/server'

const GET = async (req: NextRequest) => {
  const url = new URL(req.nextUrl)
  const unsafeSlug = url.searchParams.get('slug') 
  const slug = z.string().safeParse(unsafeSlug)
  if (slug.success) {
    const result = await verifySlug(slug.data)
    if (result) {
      return NextResponse.json({ used: true })
    }
    return NextResponse.json({ used: false })
  }
  return new Response('Invalid slug', { status: 400 })
}


export {
  GET
}