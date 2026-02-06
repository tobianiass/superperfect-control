"use client"

import ForgotPasswordForm from "@/app/components/Login/ForgotPasswordForm";
import { useState } from "react";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="wrapper flex flex-col md:flex-row justify-between pt-[40px] md:pt-[120px] pb-[100px]">
            <h1 className="md:max-w-[600px] pb-[40px] md:pb-[0]">Forgot your password?</h1>
            <div className="w-full max-w-[670px] px-[20px] py-[35px] bg-grey rounded-[10px] relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/70 z-10 rounded-[10px]"></div>
                )}
                <ForgotPasswordForm onLoadingChange={setIsLoading} />
            </div>
        </div>
    )
}

export default ForgotPassword;
