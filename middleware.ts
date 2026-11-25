import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('admin_session')?.value;
  const isAuthenticated = session === 'authenticated';

  // 1. Protect Admin Pages
  if (pathname.startsWith('/admin')) {
    // If already logged in, redirect away from /admin/login to /admin
    if (pathname === '/admin/login') {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Require authentication for all other /admin routes
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protect Admin API endpoints (like /api/admin/upload)
  if (pathname.startsWith('/api/admin')) {
    const publicAdminApis = ['/api/admin/login', '/api/admin/logout', '/api/admin/check-session'];
    if (!publicAdminApis.includes(pathname)) {
      if (!isAuthenticated) {
        return NextResponse.json(
          { error: 'Unauthorized. Admin session required.' },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
