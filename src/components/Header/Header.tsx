import HeaderLogo from "./HeaderLogo"
import HeaderNavigation from "./HeaderNavigation"

const Header: React.FC = () => {
  return (
    <div className="bg-yellow">
        <div className="wrapper flex justify-between h-[104px] items-center">
            <HeaderLogo />
            <HeaderNavigation />
        </div>
    </div>
  )
}

export default Header