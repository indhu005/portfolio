import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple pass-through middleware - no authentication needed for portfolio site
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
