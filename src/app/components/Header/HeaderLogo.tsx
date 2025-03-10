import Link from "next/link"
import LogoSite from "../../../../public/icons/logo.svg"
import LogoSiteMobile from "../../../../public/icons/logo-mobile.svg"

const Logo: React.FC = () => {
    return (
        <Link href='/' >
            <LogoSite className="hidden md:block" />
            <LogoSiteMobile className="md:hidden" />
        </Link>
    )
}

export default Logo