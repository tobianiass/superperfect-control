"use client"

import RegistrationForm from "@/app/components/Registration/RegistrationForm";
import { LoginPageText } from "@/contentData/loginPageData";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Registration = () => {
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
        <div className="wrapper flex-col md:flex-row flex justify-between pt-[40px] md:pt-[120px] pb-[100px]">
            <h1 className="md:max-w-[600px] pb-[40px] md:pb-[0]">{LoginPageText.text}</h1>
            <div className="w-full max-w-[670px] px-[20px] py-[35px] bg-grey rounded-[10px] relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/70 z-10 rounded-[10px]"></div>
                )}
                <RegistrationForm onLoadingChange={setIsLoading} />
            </div>
        </div>
    )
}

export default Registration;