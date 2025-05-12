import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './app/auth/session';
import { i18n } from './i18n-config';

const protectedRoutes = ['/client', '/history', '/variables'];
const authRoutes = ['/login', '/register'];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some(route => pathname.startsWith(route) || pathname.slice(3).startsWith(route));
}

function isAuthRoute(pathname: string) {
  return authRoutes.some(route => pathname.startsWith(route) || pathname.slice(3).startsWith(route));
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value ?? i18n.defaultLocale;
  const { pathname } = request.nextUrl;
  const user = await updateSession();

  if (!user && isProtectedRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }
  if (user && isAuthRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/client`;
    return NextResponse.redirect(url);
  }

  if (pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`) {
    request.nextUrl.pathname = `/${locale}/client`;
    return NextResponse.redirect(request.nextUrl);
  }

  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }
  if (pathname.includes('%3F')) {
    const [path, query] = pathname.split('%3F');
    const newUrl = new URL(path + '?' + query, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
