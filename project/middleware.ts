import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users away from public paths
  if (session && isPublicPath) {
    return NextResponse.redirect(
      new URL(session.role === 'admin' ? '/admin' : '/dashboard', request.url)
    );
  }

  // Protect admin routes
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    session?.role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};