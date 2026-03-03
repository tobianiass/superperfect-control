import { NextResponse } from "next/server";
import connectMongoDB from "@/utils/mongodb";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/utils/emailService";
import crypto from "crypto";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const user = await User.findOne({ email });

        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json(
                { message: "If an account exists with this email, a password reset link has been sent" },
                { status: 200 }
            );
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send reset email
        await sendPasswordResetEmail(email, resetToken);

        return NextResponse.json(
            { message: "If an account exists with this email, a password reset link has been sent" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { message: "An error occurred. Please try again later" },
            { status: 500 }
        );
    }
}
