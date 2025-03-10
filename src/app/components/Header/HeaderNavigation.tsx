import { HeaderNavigationLinks } from '@/contentData/headerData'
import HeaderNavigationLink from './HeaderNavigationLink'
import { getServerSession, AuthOptions } from "next-auth";
import { authOptions } from "@/app/api/lib/auth";
import LoginForm from "../Login/LoginForm"
import LoginSocials from '../Login/LoginSocials';
import { LoginPageText } from "@/contentData/loginPageData";

const HeaderNavigation: React.FC = async () => {
    const session = await getServerSession(authOptions as AuthOptions)

    return (
        <div className="c-navigation">
            <ul className="text-center justify-between flex-col md:flex-row flex my-[28px] md:my-[0]">
                {HeaderNavigationLinks.map(link => 
                    <HeaderNavigationLink key={link.id} url={link.url} name={link.title} />
                )}
                {!!session ? 
                    (<HeaderNavigationLink url="/account/dashboard" name="Account" />) :
                    (<HeaderNavigationLink url="/login" name="Log in" style="hidden md:block" />)
                }
            </ul>
            {!session && 
            (<div className='md:hidden'>
                <LoginSocials />
                <LoginForm />
                <h3 className="title-h1 text-center px-[20px] py-[30px]">{LoginPageText.text}</h3>
            </div>)
            }
        </div>
    )
}

export default HeaderNavigation