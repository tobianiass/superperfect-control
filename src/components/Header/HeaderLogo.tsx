import Link from "next/link"
import LogoIcon from "../../../public/icons/logo.svg"

const Logo: React.FC = () => {
    return (
        <Link href='/' >
            <LogoIcon />
        </Link>
    )
}

export default Logo