"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

const VerifyEmail = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('error')
                setMessage('Invalid verification link')
                return
            }

            try {
                const response = await fetch('/api/auth/verify-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                })

                const data = await response.json()

                if (response.ok) {
                    setStatus('success')
                    setMessage('Email verified successfully! Redirecting to login...')
                    setTimeout(() => {
                        router.push('/login')
                    }, 3000)
                } else {
                    setStatus('error')
                    setMessage(data.message || 'Verification failed')
                }
            } catch (error) {
                setStatus('error')
                setMessage('An error occurred during verification')
            }
        }

        verifyEmail()
    }, [token, router])

    return (
        <div className="wrapper flex items-center justify-center min-h-[60vh] pt-[40px] md:pt-[120px] pb-[100px]">
            <div className="max-w-[600px] w-full px-[20px] py-[60px] bg-grey rounded-[10px] text-center">
                {status === 'loading' && (
                    <>
                        <div className="mb-[30px]">
                            <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h1 className="text-[30px] mb-[20px]">Verifying your email...</h1>
                        <p className="text-[18px] text-textGrey">Please wait a moment</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="mb-[30px] text-[60px]">✓</div>
                        <h1 className="text-[30px] mb-[20px]">Email Verified!</h1>
                        <p className="text-[18px] text-textGrey mb-[30px]">{message}</p>
                        <Link href="/login" className="o-button o-button--black">
                            Go to Login
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="mb-[30px] text-[60px]">✕</div>
                        <h1 className="text-[30px] mb-[20px]">Verification Failed</h1>
                        <p className="text-[18px] text-textGrey mb-[30px]">{message}</p>
                        <div className="flex gap-[15px] justify-center">
                            <Link href="/login" className="o-button o-button--black">
                                Back to Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail
