import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import { headers } from 'next/headers';

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/prices", "/api/apply-promo-code"];
const authRoutes = ["/login"]; // "/register"
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log({ isLoggedIn, path: nextUrl.pathname });

  // Permitir todas las rutas de API de autenticación
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Verificar el origen para /api/apply-promo-code
  if (nextUrl.pathname === '/api/apply-promo-code') {
    const headersList = headers();
    const origin = headersList.get('origin');
    const referer = headersList.get('referer');

    if (origin !== process.env.NEXTAUTH_URL && !referer?.startsWith(process.env.NEXTAUTH_URL!)) {
      return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
    }
    return NextResponse.next();
  }

  // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
