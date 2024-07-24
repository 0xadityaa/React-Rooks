import createHttpError from 'http-errors';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const token = cookies().get('token')
    const refreshToken = cookies().get('refreshToken')

    try {
        if( refreshToken && token) {
            cookies().delete('token')
            cookies().delete('refreshToken')
        } else if(refreshToken) {
            cookies().delete('refreshToken')
        } else if(token) {
            cookies().delete('token')
        }
    } catch (err) {
        throw createHttpError(500, "Internal Server Error")
    }
    redirect('/signin')
}