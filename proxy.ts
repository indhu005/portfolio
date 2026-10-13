import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BLOCKED = ['AE', 'JP']

export function proxy(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country')
  if (country && BLOCKED.includes(country)) {
    return new NextResponse('Not available in your region', { status: 403 })
  }

  if (request.nextUrl.searchParams.has('notrack')) {
    const url = new URL(request.nextUrl)
    url.searchParams.delete('notrack')
    const response = NextResponse.redirect(url)
    response.cookies.set('exclude-analytics', '1', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    return response
  }

  return NextResponse.next()
}
