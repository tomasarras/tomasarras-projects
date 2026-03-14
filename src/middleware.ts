import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Verificar si ya tiene locale
  const hasLocale = /^\/(en|es)(\/|$)/.test(pathname);
  
  // Si es la raíz (/), hacer rewrite interno a /en sin cambiar la URL
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.rewrite(url);
  }
  
  // Si tiene locale, usar middleware normal
  if (hasLocale) {
    return intlMiddleware(request);
  }
  
  // Para rutas sin locale, hacer rewrite interno al locale por defecto (en)
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  
  // Rewrite interno (no cambia la URL del navegador)
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|ads.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)).*)'
  ]
};