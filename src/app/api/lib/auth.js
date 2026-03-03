import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/utils/mongodb"
import User from '@/models/User'
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {},

            async authorize(credentials) {
                const {email, password} = credentials
                
                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })

                    if(!user) {
                        return null
                    }

                    console.log(`Login attempt for ${email}: emailVerified = ${user.emailVerified}`)

                    // Check if email is verified
                    if(user.emailVerified !== true) {
                        throw new Error("Please verify your email before logging in")
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(!passwordMatch) {
                        return null
                    }

                    return user

                } catch (error) {
                    throw error
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
}