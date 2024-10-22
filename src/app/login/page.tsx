import LoginForm from "@/components/LoginPage/LoginForm";
import LoginSocials from "@/components/LoginPage/LoginSocials";
import { LoginPageText } from "@/contentData/loginPageData";

const Login = () => {
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