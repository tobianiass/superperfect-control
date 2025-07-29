import HeaderAccountLogo from "./HeaderAccountLogo"
import HeaderAccountNavigation from "./HeaderAccountNavigation"

const HeaderAccount: React.FC = () => {
    return (
        <div className="relative bg-white">
            <div className="wrapper wrapper--account flex justify-between h-[67px] items-center">
                <HeaderAccountLogo />
                <HeaderAccountNavigation />
            </div>
        </div>
    )
}

export default HeaderAccount