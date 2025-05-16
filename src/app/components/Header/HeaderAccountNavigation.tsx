import { getServerSession, AuthOptions } from "next-auth"
import { authOptions } from "@/app/api/lib/auth"
import ChevronDown from "@public/icons/chevron-down.svg"

const HeaderAccountNavigation: React.FC = async () => {
    const session = await getServerSession(authOptions as AuthOptions)

    const userLogo = session?.user?.name || '0'

    return (
        <div className="c-navigation">
            <div className="flex items-center cursor-pointer">
                {!!session ?
                    <div className="flex justify-center items-center rounded-full size-[43px] bg-yellow">
                        {userLogo.charAt(0)}
                    </div> :
                    <div>Loading</div>
                }
                <ChevronDown className="ml-2" />
            </div>
            
        </div>
    )
}

export default HeaderAccountNavigation