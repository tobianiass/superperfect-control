import Link from "next/link"
import LogoSite from "../../../../public/icons/logo.svg"

const Logo: React.FC = () => {
    return (
        <Link href='/' >
            <LogoSite />
        </Link>
    )
}

export default Logo