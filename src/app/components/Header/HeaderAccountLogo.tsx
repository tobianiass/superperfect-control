import Link from "next/link"
import LogoSite from "@public/icons/logo.svg"
import LogoSiteMobileAccount from "@public/icons/logo-mobile-account.svg"

const Logo: React.FC = () => {
    return (
        <Link href='/account/dashboard' >
            <LogoSite className="hidden md:block" />
            <LogoSiteMobileAccount className="md:hidden" />
        </Link>
    )
}

export default Logo