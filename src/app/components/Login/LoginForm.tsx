"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

interface LoginFormProps {
    onLoadingChange?: (loading: boolean) => void
}

const LoginForm = ({ onLoadingChange }: LoginFormProps = {}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [emailValid, setEmailValid] = useState<boolean | null>(null)
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const validateEmail = (value: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    }

    const validatePassword = (value: string): boolean => {
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(value)
        const isLongEnough = value.length >= 8
        return hasUpperCase && hasLowerCase && hasSymbol && isLongEnough
    }

    const getValidationColor = (isValid: boolean | null): string => {
        if (isValid === null) return '#D9D9D9'
        return isValid ? 'green' : 'red'
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setEmailValid(validateEmail(value))
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordValid(validatePassword(value))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Check if fields are empty
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setIsLoading(true)
        setError("")
        onLoadingChange?.(true)

        try {
            const result: any = await signIn('credentials', {
                redirect: false,
                email, 
                password, 
            })

            if(result.error) {
                // Map common error messages to more user-friendly text
                if (result.error === "CredentialsSignin") {
                    setError("Invalid email or password")
                } else {
                    setError(result.error)
                }
                setIsLoading(false)
                onLoadingChange?.(false)
                return
            }

            router.replace("/account/dashboard")
            
        } catch (error) {
            console.log('ErrorTest: ', error)
            setError("Something went wrong. Please try again.")
            setIsLoading(false)
            onLoadingChange?.(false)
        }
    }

    return (
        <div className="text-center">
            <p className="text-[25px] mb-[20px]">Log in with email</p>
            <form onSubmit={handleSubmit} className="max-w-[340px] m-auto mb-[30px]">
                <div className="relative mb-[20px]">
                    <input className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]" 
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            type="email" 
                            placeholder="Email"
                            disabled={isLoading} />
                    <div 
                        className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                        style={{ backgroundColor: getValidationColor(emailValid) }}
                    />
                </div>
                <div className="relative mb-[20px]">
                    <input className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            type="password" 
                            placeholder="Password"
                            disabled={isLoading} />
                    <div 
                        className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                        style={{ backgroundColor: getValidationColor(passwordValid) }}
                    />
                </div>
                <button className="o-button o-button--black" disabled={isLoading}>
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : "Log In"}
                </button>
            </form>
            {error && (
                <div className="mb-[20px] max-w-[340px] m-auto">
                    <p className="text-[#FA5C5C] text-[14px]"><span className="font-bold">!</span> {error}</p>
                </div>
            )}
            <Link href='/forgot-password' className="text-[18px] text-textGrey">I forgot my password</Link>
        </div>
    )
}

export default LoginForm