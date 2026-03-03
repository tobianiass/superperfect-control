"use client"

import LoginForm from "@/app/components/Login/LoginForm";
import LoginSocials from "@/app/components/Login/LoginSocials";
import { LoginPageText } from "@/contentData/loginPageData";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/account/dashboard")
        }
    }, [status, router])

    if (status === "loading") {
        return null
    }

    return (
        <div className="wrapper flex flex-col md:flex-row justify-between pt-[40px] md:pt-[120px] pb-[100px]">
            <div className="flex flex-col justify-between md:max-w-[500px]">
                <h1 className="md:max-w-[600px] pb-[40px] md:pb-[0]">{LoginPageText.text}</h1>
                <div className="text-[25px] font-medium text-black text-center mb-[40px] md:mb-0">
                    Don't have Controler account yet?<br />
                    <Link href='/registration' className="underline">Sign in here</Link>
                </div>
            </div>
            <div className="w-full max-w-[670px] px-[20px] py-[35px] bg-grey rounded-[10px] relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/70 z-10 rounded-[10px]"></div>
                )}
                <LoginSocials />
                <LoginForm onLoadingChange={setIsLoading} />
            </div>
        </div>
    )
}

export default Login;