import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const fallback = new URL('/', request.url)
  const destination = appUrl ? new URL('/', appUrl) : fallback

  return NextResponse.redirect(destination, 303)
}
