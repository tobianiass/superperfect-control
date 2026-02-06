import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If no token (session expired), user will be redirected
        return !!token
      },
    },
    pages: {
      signIn: "/", // Redirect to home page when session expires
    },
  }
)

export const config = {matcher: ["/account/:path*"]}
