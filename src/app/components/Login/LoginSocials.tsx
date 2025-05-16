import { LoginSocialLogins } from "@/contentData/loginPageData"
import Link from "next/link"

const LoginSocials = () => {
  return (
    <div className="text-center mb-[40px]">
        <p className="pb-3 text-[25px]">Log in using</p>
        <ul className="flex justify-center gap-4">
            {LoginSocialLogins.map(loginItem =>
                <li key={loginItem.id}>
                    <Link className="hover:opacity-50 transition" href={loginItem.url}>
                        <i dangerouslySetInnerHTML={{ __html: loginItem.icon }} />
                    </Link>
                </li>
                
            )}
        </ul>
    </div>
  )
}

export default LoginSocials