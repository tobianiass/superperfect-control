import LoginForm from "@/app/components/Login/LoginForm";
import LoginSocials from "@/app/components/Login/LoginSocials";
import { LoginPageText } from "@/contentData/loginPageData";

import { getServerSession, AuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route"

const Login = async () => {
    const session = await getServerSession(authOptions as AuthOptions)

    if(session) redirect("/account/dashboard")
    return (
        <div className="wrapper flex justify-between pt-[120px] pb-[100px]">
            <h1 className="max-w-[600px]">{LoginPageText.text}</h1>
            <div className="w-full max-w-[670px] py-[35px] bg-grey rounded-[10px]">
                <LoginSocials />
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;