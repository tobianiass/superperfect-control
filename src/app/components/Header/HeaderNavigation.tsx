import { HeaderNavigationLinks } from '@/contentData/headerData'
import HeaderNavigationLink from './HeaderNavigationLink'
import { getServerSession, AuthOptions } from "next-auth";
import { authOptions } from "@/app/api/lib/auth";

const HeaderNavigation: React.FC = async () => {
    const session = await getServerSession(authOptions as AuthOptions)

    return (
        <ul className="flex justify-between">
            {HeaderNavigationLinks.map(link => 
                <HeaderNavigationLink key={link.id} url={link.url} name={link.title} />
            )}
            {!!session ? 
                (<HeaderNavigationLink url="/account/dashboard" name="Account" />) :
                (<HeaderNavigationLink url="/login" name="Log in" />)
            }
        </ul>
    )
}

export default HeaderNavigation