import createMiddleware from 'next-intl/middleware';

 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});
 
export const config = {
  // Match only internationalized pathnames, exclude static files
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)).*)'
  ]
};