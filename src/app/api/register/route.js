import { NextResponse } from "next/server"
import connectMongoDB from "@/utils/mongodb"
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendVerificationEmail } from "@/utils/emailService"

export async function POST(request) {
    try {
        const {name, email, password} = await request.json()

        await connectMongoDB();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await User.create({
            name,
            email,
            password: hashedPassword,
            emailVerified: false,
            verificationToken,
            verificationTokenExpiry
        })

        // Send verification email
        const emailResult = await sendVerificationEmail(email, verificationToken);
        
        if (!emailResult.success) {
            console.error("Failed to send verification email:", emailResult.error);
        }

        return NextResponse.json(
            {message: "Registration success. Please check your email to verify your account."},
            {status: 201})

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            {message: "Internal Server Error while Registration"}, 
            {status: 500})
    }
}