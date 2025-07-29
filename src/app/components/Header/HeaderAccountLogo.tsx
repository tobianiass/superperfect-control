'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import ArrowLeft from "@public/icons/arrow-left.svg"
import LogoSiteMobileAccount from "@public/icons/logo-mobile-account.svg"

const Logo: React.FC = () => {
    const pathname = usePathname();

    return (
        <Link href='/account/dashboard' >
            {pathname !== '/account/dashboard' ? (
                <div className="text-[#797979]">
                    <ArrowLeft className="mr-2 inline-block ml-2 group-hover:translate-x-1 transition-all color-black" />
                    Back to projects</div>
            ) : <LogoSiteMobileAccount />}
        </Link>
    )
}

export default Logo