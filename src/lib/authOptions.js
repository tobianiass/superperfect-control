import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "@/utils/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) return null;
        
        // Check if email is verified
        if (user.emailVerified !== true) {
          throw new Error("Please verify your email before logging in");
        }
        
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        
        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectMongoDB();
        
        // Check if user exists
        let existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Create new user for Google sign-in
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            emailVerified: true, // Google emails are pre-verified
            provider: "google",
            providerId: account.providerAccountId,
          });
        } else if (!existingUser.provider) {
          // Link Google account to existing email/password account
          existingUser.provider = "google";
          existingUser.providerId = account.providerAccountId;
          existingUser.emailVerified = true;
          await existingUser.save();
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" }
};

// Helper to build NextAuth handler (used only in route file)
export const nextAuthHandler = NextAuth(authOptions);