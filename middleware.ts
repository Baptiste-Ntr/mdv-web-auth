import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import * as jose from 'jose'

const authPathnames = ['/login', "/register", "/totp", "/google-callback"]

export async function middleware(req: NextRequest) {

    const cookiesList = cookies()
    const cookie = cookiesList.get("jwtToken")

    const googleCookie = cookiesList.get('id')

    console.log(cookie)

    if ((!cookie?.value || !cookie) && (!googleCookie?.value || !googleCookie)) {
        console.log('No auth cookie')
        if (authPathnames.includes(req.nextUrl.pathname)) {
            console.log('Redirecting to login')
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', req.url))
    }

    try {

        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

        await jose.jwtVerify(cookie.value, secret)

    } catch (err) {
        console.log('Invalid auth cookie')
        if (authPathnames.includes(req.nextUrl.pathname)) {
            console.log('Redirecting to login')
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}