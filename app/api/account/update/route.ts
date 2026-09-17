import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url), 303)
  }

  const formData = await request.formData()
  const fullNameValue = formData.get('full_name')
  const fullName = typeof fullNameValue === 'string' ? fullNameValue.trim() : ''

  if (!fullName || fullName.length > 100) {
    return NextResponse.redirect(new URL('/account?error=invalid_name', request.url), 303)
  }

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: fullName, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) {
    return NextResponse.redirect(new URL('/account?error=update_failed', request.url), 303)
  }

  return NextResponse.redirect(new URL('/account?updated=1', request.url), 303)
}
