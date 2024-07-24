import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'jose'
import { JWTExpired } from 'jose/errors';

interface ExtendedRequest extends NextRequest {
    id?: string;
}

export async function middleware(request: ExtendedRequest) {
    const path = request.nextUrl.pathname

    const publicPath =
     path === '/signin' || 
     path === '/signup' ||
    path === ('/api/auth/signin') ||
    path === ('/api/auth/signup') ||
    path === ('/api/auth/signout')

    const token = request.cookies.get('token')?.value || null
    const refreshToken = request.cookies.get('refreshToken')?.value || null

    if (publicPath) {
        return NextResponse.next()
    }

    if ((token && refreshToken) && (path === ('/api/auth/refreshToken'))) {
        return NextResponse.next()
    }


    if (typeof token == "string") {
        console.log('middleware')
        const enc = new TextEncoder(); // always utf-8
        
        
        try {
            const decoded = await jwt.jwtVerify(token, enc.encode(process.env.JWT_SECRET!), {
                maxTokenAge : Number.parseInt(process.env.JWT_TOKEN_EXPIRY!)
            })
            
            if (decoded) {
                request.id = decoded.payload.sub
                return NextResponse.next()
            }

        } catch (err) {
            if (err) {
                console.log('middleware error : ', err)
                if (err instanceof JWTExpired) {
                    return NextResponse.redirect(new URL('/api/auth/refreshToken', request.nextUrl))
                } else {
                    return NextResponse.redirect(new URL('/signin', request.nextUrl))
                }
            }
        }
    } else {
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/api/auth/:path',
        '/api/chess',
        '/signin',
        '/signup',
        '/',
        '/Ai/:path',
        '/game'
    ],
}