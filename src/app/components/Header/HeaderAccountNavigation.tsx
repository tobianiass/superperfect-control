import Link from "next/link"
import { getServerSession, AuthOptions } from "next-auth"
import { authOptions } from "@/app/api/lib/auth"
import SignOutLink from "../Account/SignOutLink"

import ChevronDown from "@public/icons/chevron-down.svg"
import ArrowRight from "@public/icons/arrow-right.svg"
import HeaderAccountMobileNavIcon from "./HeaderAccountMobileNavIcon"

const HeaderAccountNavigation: React.FC = async () => {
    const session = await getServerSession(authOptions as AuthOptions)

    const userLogo = session?.user?.name || '0'

    return (
        <div className="md:relative c-account-mobile-nav">
            <div className="c-account-mobile-nav__logo flex items-center cursor-pointer">
                <HeaderAccountMobileNavIcon />
                {!!session ?
                    <div className="flex justify-center items-center rounded-full size-[43px] bg-yellow">
                        {userLogo.charAt(0)}
                    </div> :
                    <div>Loading</div>
                }
                <ChevronDown className="ml-2 transition" />
            </div>
            <ul
                className="
                    c-account-mobile-nav__dropdown
                    absolute
                    right-0
                    md:right-[-10px]
                    top-[65px]
                    transition
                    shadow-xl
                    bg-lightGrey
                    md:bg-white
                    p-4
                    w-full
                    h-[calc(100vh-65px)]
                    md:h-auto
                    md:w-auto
                    min-w-[214px]
                    rounded-[10px]
                    md:before:absolute
                    before:w-full
                    before:h-[22px]
                    before:top-[-22px]
                    before:left-0
                    text-black
                    md:text-textGrey
                    text-center
                    md:text-left
                "
            >
                <li className="md:hidden pb-7 text-[30px]">
                    <h3>Account</h3>
                </li>
                <li className="md:hidden pb-4 text-[22px]">
                    <Link href="/profile" title="Go to Profile Details">Profile Details</Link>
                </li>
                <li className="md:hidden pb-4 text-[22px]">
                    <Link href="/subscription" title="Go to Subscription">Subscription</Link>
                </li>
                <li className="hidden md:block pb-4">
                    <Link href="profile" className="md:hover:underline" title="Go to My Account">Account</Link>
                </li>
                <li className="pb-4 text-[22px] md:text-[16px]">
                    <Link href="/account/help" className="md:hover:underline" title="Help">Help</Link>
                </li>
                <li className="
                    o-sign-out-item
                    flex
                    items-center
                    w-full
                    md:hover:underline
                    justify-center
                    md:justify-start
                    pb-4
                    text-[22px]
                    md:text-[16px]
                ">
                    <SignOutLink />
                    <div className="hidden md:block ml-2 w-[23px]">
                        <ArrowRight />
                    </div>
                </li>
                <li className="md:hidden text-[22px]">
                    <Link href="/delete-account" title="Delete Account">Delete Account</Link>
                </li>
            </ul>
        </div>
    )
}

export default HeaderAccountNavigation