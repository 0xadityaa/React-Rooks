import User from '@/models/user'
import RefreshToken, {RefreshTokenType} from "@/models/refreshToken";
import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface SignInDto {
    username: string;
    password: string;
}

connect()

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const username  = data.get('username')
    const password = data.get('password')

    try {
        const user = await User.findOne({ username: username }).exec()
        if (!user) {
            throw createHttpError(404, "User not found")
        }

        const passwordIsValid = bcrypt.compareSync(
            password as string,
            user.password
        );

        if (!passwordIsValid) {
            throw createHttpError(401, "Unauthorized: Incorrect password")
        }

        const token = jwt.sign({ sub : user._id }, process.env.JWT_SECRET!, {
            expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRY!)
        });

        const refreshTokenToSend = await (RefreshToken as RefreshTokenType).createToken({_id : user._id})

        cookies().set('token', token, {
            httpOnly:true,
            sameSite: 'lax'
        })

        cookies().set('refreshToken', refreshTokenToSend, {
            httpOnly:true,
            sameSite: 'lax'
        })

        // return NextResponse.redirect(new URL('/', req.url))

    } catch (error) {
        console.log(error)
        throw createHttpError(500, "Internal Server Error")
    }
    redirect("/")
}
