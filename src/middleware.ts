import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es',
  localePrefix: 'always'
});

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Verificar si ya tiene locale
  const hasLocale = /^\/(en|es)(\/|$)/.test(pathname);
  
  // Si tiene locale o es raíz, usar middleware normal
  if (hasLocale || pathname === '/') {
    return intlMiddleware(request);
  }
  
  // Para rutas sin locale, hacer rewrite interno al locale por defecto
  // Esto permite que Next.js use el 404 del locale sin cambiar la URL visible
  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  
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