import { NextResponse } from "next/server"
import connectMongoDB from "@/utils/mongodb"
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request) {
    try {
        const {name, email, password} = await request.json()

        await connectMongoDB();
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        }) 

        return NextResponse.json(
            {message: "Registration success"},
            {status: 201})

    } catch (error) {
        return NextResponse.json(
            {message: "Internal Server Error while Registration"}, 
            {staus: 500})
    }
}