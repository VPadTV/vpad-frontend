import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from './utils/api';

const publicPaths = ['/signin', '/signup', '/'];
const publicAssets = [
  '/images',
  '/assets',
  '/browse',
  '/_next',

  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
];

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;
  
  if (publicAssets.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  const token =  await getToken()
  const isAuthenticated = !!token;
  const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
  
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const url = new URL('/signin', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (!isPublicPath && !isAuthenticated) {
    const url = new URL('/signin', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  if (isPublicPath && isAuthenticated && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
