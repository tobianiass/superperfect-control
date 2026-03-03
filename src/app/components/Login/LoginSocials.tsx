"use client"

import { LoginSocialLogins } from "@/contentData/loginPageData"
import Link from "next/link"
import { signIn } from "next-auth/react"

const LoginSocials = () => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/account/dashboard' })
  }

  return (
    <div className="text-center mb-[40px]">
        <p className="pb-3 text-[25px]">Log in using</p>
        <ul className="flex justify-center gap-4">
            {LoginSocialLogins.map((loginItem, index) =>
                <li key={loginItem.id}>
                    {index === 0 ? (
                      <button 
                        onClick={handleGoogleSignIn}
                        className="hover:opacity-50 transition"
                      >
                        <i dangerouslySetInnerHTML={{ __html: loginItem.icon }} />
                      </button>
                    ) : (
                      <Link className="hover:opacity-50 transition" href={loginItem.url}>
                        <i dangerouslySetInnerHTML={{ __html: loginItem.icon }} />
                      </Link>
                    )}
                </li>
                
            )}
        </ul>
    </div>
  )
}

export default LoginSocials