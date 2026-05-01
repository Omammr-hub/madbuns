import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAuth = request.cookies.has('admin_session')

  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (path === '/admin/login' && isAuth) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
