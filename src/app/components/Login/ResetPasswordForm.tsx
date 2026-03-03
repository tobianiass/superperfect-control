"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ResetPasswordFormProps {
    token: string
    onLoadingChange?: (loading: boolean) => void
}

const ResetPasswordForm = ({ token, onLoadingChange }: ResetPasswordFormProps) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState("")
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
    const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null)
    const router = useRouter()

    const validatePassword = (value: string): boolean => {
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(value)
        const isLongEnough = value.length >= 8
        return hasUpperCase && hasLowerCase && hasSymbol && isLongEnough
    }

    const validateConfirmPassword = (value: string): boolean => {
        return value === password && value.length > 0
    }

    const getValidationColor = (isValid: boolean | null): string => {
        if (isValid === null) return '#D9D9D9'
        return isValid ? 'green' : 'red'
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordValid(validatePassword(value))
        // Re-validate confirm password if it has a value
        if (confirmPassword) {
            setConfirmPasswordValid(value === confirmPassword && confirmPassword.length > 0)
        }
    }

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value)
        setConfirmPasswordValid(value === password && value.length > 0)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')
        onLoadingChange?.(true)

        if (password !== confirmPassword) {
            setStatus('error')
            setMessage('Passwords do not match')
            onLoadingChange?.(false)
            return
        }

        if (password.length < 6) {
            setStatus('error')
            setMessage('Password must be at least 6 characters')
            onLoadingChange?.(false)
            return
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setMessage('Password reset successfully! Redirecting to login...')
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
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

    if (status === 'success') {
        return (
            <div className="text-center">
                <div className="mb-[30px] text-[60px]">✓</div>
                <p className="text-[25px] mb-[20px]">Password Reset Successfully!</p>
                <p className="text-[16px] text-textGrey mb-[30px]">{message}</p>
                <Link href='/login' className="o-button o-button--black">
                    Go to Login
                </Link>
            </div>
        )
    }

    return (
        <div className="text-center">
            <p className="text-[25px] mb-[20px]">Set new password</p>
            <p className="text-[16px] text-textGrey mb-[30px] max-w-[400px] m-auto">
                Enter your new password below.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-[340px] m-auto mb-[30px]">
                <div className="relative mb-[20px]">
                    <input 
                        className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]" 
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        type="password" 
                        placeholder="New Password"
                        required 
                        disabled={status === 'loading'}
                    />
                    <div 
                        className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                        style={{ backgroundColor: getValidationColor(passwordValid) }}
                    />
                </div>
                
                <div className="relative mb-[20px]">
                    <input 
                        className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]" 
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        type="password" 
                        placeholder="Confirm New Password"
                        required 
                        disabled={status === 'loading'}
                    />
                    <div 
                        className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                        style={{ backgroundColor: getValidationColor(confirmPasswordValid) }}
                    />
                </div>
                
                {status === 'error' && message && (
                    <div className="p-[15px] mb-[20px]">
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
                    ) : 'Reset Password'}
                </button>

                <div>
                    <Link href='/login' className="text-[18px] text-textGrey">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm
