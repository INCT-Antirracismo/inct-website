import { NextResponse } from 'next/server';

const locales = ['pt-BR', 'es'];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = 'pt-BR';
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match only pages that:
     * - don't start with /_next
     * - don't start with /api
     * - don't start with /admin
     * - don't contain a file extension (e.g. .png, .css, .js)
     */
    '/((?!_next|api|admin|.*\\..*).*)'
  ]
};
