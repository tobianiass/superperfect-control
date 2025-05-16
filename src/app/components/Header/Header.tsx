import HeaderLogo from "./HeaderLogo"
import HeaderNavigation from "./HeaderNavigation"
import HeaderMobileNavIcon from "./HeaderMobileNavIcon"

const Header: React.FC = () => {
    return (
        <>
        <header className="bg-yellow sticky top-0 z-50">
            <div className="wrapper flex justify-between h-[78px] md:h-[104px] items-center">
                <HeaderLogo />
                <HeaderMobileNavIcon />
                <div className="hidden md:block">
                    <HeaderNavigation />
                </div>
            </div>
        </header>
        <div className="c-mobile-nav md:hidden">
            <HeaderNavigation />
        </div>
        </>
    )
}

export default Header