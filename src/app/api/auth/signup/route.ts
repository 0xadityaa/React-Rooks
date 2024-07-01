import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/user'
import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

interface SignUpDto {
    username: string;
    email: string;
    password: string;
}

connect()

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')


    if (!username || !email) {
        throw createHttpError(400, "username and email must be provided")
    }

    try {
        const userByUsername = await User.findOne({ username: username }).exec()
        if (userByUsername) {
            throw createHttpError(400, "username already exists")
        }

        const userByEmail = await User.findOne({ email: email }).exec()
        if (userByEmail) {
            throw createHttpError(400, "email already taken")
        }

        const newUser = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password as string, 8),
            messageArray: [{
                message: "Welcome to the Application!"
            }]
        });

        await newUser.save();
    } catch (error) {
        console.log(error)
        throw createHttpError(500, "Internal Server Error")
    }
    return redirect('/signin')
}