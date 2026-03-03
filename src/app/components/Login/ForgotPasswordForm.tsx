"use client"

import { useState } from "react"
import Link from "next/link"

interface ForgotPasswordFormProps {
    onLoadingChange?: (loading: boolean) => void
}

const ForgotPasswordForm = ({ onLoadingChange }: ForgotPasswordFormProps = {}) => {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState("")
    const [emailValid, setEmailValid] = useState<boolean | null>(null)

    const validateEmail = (value: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    }

    const getValidationColor = (isValid: boolean | null): string => {
        if (isValid === null) return '#D9D9D9'
        return isValid ? 'green' : 'red'
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setEmailValid(validateEmail(value))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')
        onLoadingChange?.(true)

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setMessage(data.message)
                setEmail('')
                onLoadingChange?.(false)
            } else {
                setStatus('error')
                setMessage(data.message || 'An error occurred')
                onLoadingChange?.(false)
            }
        } catch (error) {
            setStatus('error')
            setMessage('An error occurred. Please try again later.')
            onLoadingChange?.(false)
        }
    }

    return (
        <div className="text-center">
            <p className="text-[25px] mb-[20px]">Reset your password</p>
            <p className="text-[16px] text-textGrey mb-[30px] max-w-[400px] m-auto">
                Enter your email address and we'll send you a link to reset your password.
            </p>
            
            {status === 'success' ? (
                <div className="max-w-[340px] m-auto">
                    <div className="bg-green-50 border border-green-200 rounded-[6px] p-[20px] mb-[30px]">
                        <p className="text-green-800">{message}</p>
                    </div>
                    <Link href='/login' className="text-[18px] text-textGrey underline">
                        Back to Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-[340px] m-auto mb-[30px]">
                    <div className="relative mb-[20px]">
                        <input 
                            className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]" 
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            type="email" 
                            placeholder="Email"
                            required 
                            disabled={status === 'loading'}
                        />
                        <div 
                            className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                            style={{ backgroundColor: getValidationColor(emailValid) }}
                        />
                    </div>
                    
                    {status === 'error' && message && (
                        <div className="bg-red-50 border border-red-200 rounded-[6px] mb-[20px]">
                            <p className="text-[#FA5C5C] text-[14px]"><span className="font-bold">!</span> {message}</p>
                        </div>
                    )}

                    <button 
                        className="o-button o-button--black mb-[20px]" 
                        type="submit"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? (
                            <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Send Reset Link'}
                    </button>

                    <div>
                        <Link href='/login' className="text-[18px] text-textGrey">
                            Back to Login
                        </Link>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ForgotPasswordForm
