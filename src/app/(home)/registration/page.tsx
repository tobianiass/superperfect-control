import RegistrationForm from "@/app/components/Registration/RegistrationForm";
import { LoginPageText } from "@/contentData/loginPageData";
import { getServerSession, AuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/lib/auth";

const Registration = async () => {
    const session = await getServerSession(authOptions as AuthOptions)

    if(session) redirect("/account/dashboard")
    
    return (
        <div className="wrapper flex-col md:flex-row flex justify-between pt-[40px] md:pt-[120px] pb-[100px]">
            <h1 className="md:max-w-[600px] pb-[40px] md:pb-[0]">{LoginPageText.text}</h1>
            <div className="w-full max-w-[670px] px-[20px] py-[35px] bg-grey rounded-[10px]">
                <RegistrationForm />
            </div>
        </div>
    )
}

export default Registration;