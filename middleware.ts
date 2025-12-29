import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { LOCAL_KEYS } from './app/helpers/local-storage';
import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token: string) {
  const decoded: any = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > decoded.exp;
}

export async function middleware(req: NextRequest) {
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const url = req.nextUrl.pathname;

  const token = req.cookies.get(LOCAL_KEYS.ACCESS_TOKEN)?.value;

  // if (protectedRoutes.some((route) => url.startsWith(route))) {
  //   if (!token) {
  //     const loginUrl = new URL("/", req.url);
  //     loginUrl.searchParams.set("redirect", url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  //   const isExpired = isTokenExpired(token);
  //   if (isExpired) {
  //     const loginUrl = new URL("/", req.url);
  //     loginUrl.searchParams.set("redirect", url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  return NextResponse.next();
}
