import { NextResponse } from "next/server";
import connectMongoDB from "@/utils/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/utils/emailService";
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

        if (!user) {
            return NextResponse.json(
                { message: "No account found with this email" },
                { status: 404 }
            );
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { message: "Email is already verified" },
                { status: 400 }
            );
        }

        // Generate new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = verificationTokenExpiry;
        await user.save();

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        return NextResponse.json(
            { message: "Verification email sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Resend verification error:", error);
        return NextResponse.json(
            { message: "An error occurred. Please try again later" },
            { status: 500 }
        );
    }
}
