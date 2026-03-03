import { NextResponse } from "next/server";
import connectMongoDB from "@/utils/mongodb";
import User from "@/models/User";

export async function POST(req) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { message: "Verification token is required" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // Find user with valid token
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired verification token" },
                { status: 400 }
            );
        }

        // Update user as verified
        user.emailVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiry = null;
        await user.save();

        return NextResponse.json(
            { message: "Email verified successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { message: "An error occurred during verification" },
            { status: 500 }
        );
    }
}
