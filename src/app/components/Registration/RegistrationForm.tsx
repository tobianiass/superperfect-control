"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"

interface RegistrationFormProps {
    onLoadingChange?: (loading: boolean) => void
}

const RegistrationForm = ({ onLoadingChange }: RegistrationFormProps = {}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userRegistered, setUserRegistred] = useState(false)
    const [userExistError, setUserExistError] = useState("")
    const [requiredFieldsError, setRequiredFieldsError] = useState("")
    const [serverError, setServerError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    // Validation states
    const [nameValid, setNameValid] = useState<boolean | null>(null)
    const [emailValid, setEmailValid] = useState<boolean | null>(null)
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
    
    // Validation functions
    const validateName = (value: string) => {
        return value.length >= 1
    }
    
    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    }
    
    const validatePassword = (value: string) => {
        const hasUppercase = /[A-Z]/.test(value)
        const hasLowercase = /[a-z]/.test(value)
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(value)
        return hasUppercase && hasLowercase && hasSymbol && value.length >= 8
    }
    
    const handleNameChange = (value: string) => {
        setName(value)
        setNameValid(validateName(value))
    }
    
    const handleEmailChange = (value: string) => {
        setEmail(value)
        setEmailValid(validateEmail(value))
    }
    
    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordValid(validatePassword(value))
    }
    
    const getValidationColor = (isValid: boolean | null) => {
        if (isValid === null) return "#D9D9D9"
        return isValid ? "#22c55e" : "#ef4444"
    }
    
    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/account/dashboard' })
    }
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Clear all errors
        setRequiredFieldsError("")
        setUserExistError("")
        setServerError("")

        if(!name || !email || !password) {
            setRequiredFieldsError("All Fields are necessary")
            return
        }

        setIsLoading(true)
        onLoadingChange?.(true)

        try {
            const resUserExists = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const {user} = await resUserExists.json();

            if(user) {
                setUserExistError("User with such email address already exist")
                setIsLoading(false)
                onLoadingChange?.(false)
                return
            }

            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if(res.ok) {
                const data = await res.json()
                setName("")
                setEmail("")
                setPassword("")
                setUserRegistred(true)
                
                console.log("User registration successful!")
            } else {
                // Handle server errors
                let errorMessage = "Something went wrong. Please try again later."
                try {
                    const data = await res.json()
                    errorMessage = data.message || errorMessage
                } catch (e) {
                    // If response is not JSON, use default error message
                    console.error("Server returned non-JSON response:", e)
                }
                setServerError(errorMessage)
                console.log("User registration failed")
            }
        } catch (error) {
            console.log("Error during Registration", error)
            setServerError("Something went wrong. Please try again later.")
        } finally {
            setIsLoading(false)
            onLoadingChange?.(false)
        }

    }

    return (
        <div className="max-w-[340px] m-auto">  
            <p className="text-[25px] mb-[20px] text-center">Join Controler</p>
            
            {userRegistered ? (
                <div className="text-center">
                    <div className="mb-[30px] text-[60px]">✓</div>
                    <h2 className="text-[25px] mb-[20px]">Registration Successful!</h2>
                    <p className="text-[16px] text-textGrey mb-[30px]">
                        Please check your email to activate your account. We've sent you a verification link that will expire in 10 minutes.
                    </p>
                    <Link href="/login" className="o-button o-button--black">
                        Back to Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mb-[30px]">
                    <div className="relative mb-[20px]">
                        <input type="text" 
                                className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]"
                                placeholder="Username" 
                                value={name} 
                                onChange={(e) => handleNameChange(e.target.value)}
                                disabled={isLoading} 
                                />
                        <div 
                            className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                            style={{ backgroundColor: getValidationColor(nameValid) }}
                        />
                    </div>
                    
                    <div className="relative mb-[20px]">
                        <input type="email" 
                                className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]"
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => handleEmailChange(e.target.value)}
                                disabled={isLoading} 
                                />
                        <div 
                            className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                            style={{ backgroundColor: getValidationColor(emailValid) }}
                        />
                    </div>
                    
                    <div className="relative mb-[10px]">
                        <input type="password" 
                                className="w-full h-[58px] border rounded-[6px] px-[20px] pr-[50px]"
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                disabled={isLoading} 
                                />
                        <div 
                            className="absolute right-[10px] top-[10px] w-[12px] h-[12px] rounded-full transition-colors"
                            style={{ backgroundColor: getValidationColor(passwordValid) }}
                        />
                    </div>
                    
                    <div className="text-[12px] text-textGrey mb-[20px]">
                        <p className="mb-[5px]">Password must contain:</p>
                        <ul className="list-disc pl-[20px]">
                            <li>At least 8 characters</li>
                            <li>Uppercase letter</li>
                            <li>Lowercase letter</li>
                            <li>Symbol (!@#$%^&*()_+-=[]{}|;:,.)</li>
                        </ul>
                    </div>
                    
                    {!!requiredFieldsError && (
                        <div className="bg-red-50 rounded-[6px] pl-[15px] mb-[20px]">
                            <p className="text-[#FA5C5C] text-[14px]"><span className="font-bold pr-1">!</span> {requiredFieldsError}</p>
                        </div>
                    )}
                    
                    {userExistError && (
                        <div className="bg-red-50 rounded-[6px] pl-[15px] mb-[20px]">
                            <p className="text-[#FA5C5C] text-[14px]"><span className="font-bold">!</span> {userExistError}</p>
                        </div>
                    )}
                    
                    {serverError && (
                        <div className="bg-red-50 rounded-[6px] pl-[15px] mb-[20px]">
                            <p className="text-[#FA5C5C] text-[14px]"><span className="font-bold">!</span> {serverError}</p>
                        </div>
                    )}
                    
                    <button type="submit" className="o-button o-button--black mb-[15px]" disabled={isLoading}>
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Register"}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full h-[58px] border border-black rounded-[6px] px-[20px] flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                    >
                        <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.6093 18.6214C26.5594 18.6214 27.8748 19.465 28.6248 20.1699L31.5557 17.3041C29.7556 15.6285 27.4132 14.6001 24.6093 14.6001C20.5476 14.6001 17.0398 16.9343 15.332 20.3317L18.6898 22.9432C19.5322 20.4357 21.863 18.6214 24.6093 18.6214Z" fill="black"/>
                            <path d="M34.579 25.2312C34.579 24.3761 34.5097 23.7521 34.3597 23.105H24.6094V26.9645H30.3327C30.2173 27.9236 29.5942 29.3681 28.2095 30.3388L31.4865 32.881C33.4482 31.0668 34.579 28.3974 34.579 25.2312Z" fill="black"/>
                            <path d="M18.7015 27.0569C18.4822 26.4098 18.3553 25.7164 18.3553 25C18.3553 24.2835 18.4822 23.5902 18.6899 22.9431L15.3321 20.3315C14.6282 21.7413 14.2244 23.3244 14.2244 25C14.2244 26.6755 14.6282 28.2587 15.3321 29.6684L18.7015 27.0569Z" fill="black"/>
                            <path d="M24.6095 35.4002C27.4134 35.4002 29.7674 34.4758 31.4866 32.8811L28.2096 30.3389C27.3326 30.9514 26.1557 31.3789 24.6095 31.3789C21.8632 31.3789 19.5324 29.5647 18.7016 27.0571L15.3438 29.6687C17.0515 33.066 20.5478 35.4002 24.6095 35.4002Z" fill="black"/>
                        </svg>
                        <span className="text-[16px] font-medium">Continue with Google</span>
                    </button>
                </form>
            )}
        </div>
    )
}

export default RegistrationForm