import { NextRequest, NextResponse } from "next/server";

export function middleware(req : NextRequest) {
    const token =  window.localStorage.getItem("token")

    if (!token && !req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    return NextResponse.redirect(new URL('/login', req.url))
    // return NextResponse.next()
}
    
export const config = {
    matcher: ['/profile', '/dashboarh', '/settings', '/protected-page/:path*']
}