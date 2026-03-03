"use client"

import { useSearchParams } from "next/navigation"
import ResetPasswordForm from "@/app/components/Login/ResetPasswordForm"
import Link from "next/link"
import { useState } from "react"

const ResetPassword = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [isLoading, setIsLoading] = useState(false)

    if (!token) {
        return (
            <div className="wrapper flex flex-col md:flex-row justify-between pt-[40px] md:pt-[120px] pb-[100px]">
                <h1 className="md:max-w-[600px] pb-[40px] md:pb-[0]">Reset your password</h1>
                <div className="w-full max-w-[670px] px-[20px] py-[35px] bg-grey rounded-[10px] text-center">
                    <div className="mb-[30px] text-[60px]">✕</div>
                    <p className="text-[25px] mb-[20px]">Invalid Reset Link</p>
                    <p className="text-[18px] text-textGrey mb-[30px]">
                        This password reset link is invalid or has expired.
                    </p>
                    <Link href='/forgot-password' className="o-button o-button--black">
                        Request New Reset Link
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="wrapper flex flex-col md:flex-row justify-between pt-[40px] md:pt-[120px] pb-[100px]">
            <h1 className="md:max-w-[600px] pb-[40px] md:pb-[0]">Reset your password</h1>
            <div className="w-full max-w-[670px] px-[20px] py-[35px] bg-grey rounded-[10px] relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/70 z-10 rounded-[10px]"></div>
                )}
                <ResetPasswordForm token={token} onLoadingChange={setIsLoading} />
            </div>
        </div>
    )
}

export default ResetPassword
