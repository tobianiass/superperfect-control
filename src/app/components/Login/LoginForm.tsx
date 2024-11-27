"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const result: any = await signIn('credentials', {
                redirect: false,
                email, 
                password, 
            })

            if(result.error) {
                setError("Invalid credentials")
                return
            }

            router.replace("/account/dashboard")
            
        } catch (error) {
            console.log('ErrorTest: ', error)
        }
    }

    return (
        <div className="text-center">
            <p className="text-[25px] mb-[20px]">Log in with email</p>
            <form onSubmit={handleSubmit} className="max-w-[340px] m-auto mb-[30px]">
                <input className="w-full h-[58px] border rounded-[6px] px-[20px] mb-[20px]" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        placeholder="Email" />
                <input className="w-full h-[58px] border rounded-[6px] px-[20px] mb-[20px]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="Password" />
                <button className="o-button o-button--black">Log In</button>
            </form>
            {error && (
                <p>{error}</p>
            )}
            <Link href='/' className="text-[18px] text-textGrey">I forgot my password</Link> / <Link href='/registration' className="text-[18px] text-textGrey">Registration</Link>
        </div>
    )
}

export default LoginForm