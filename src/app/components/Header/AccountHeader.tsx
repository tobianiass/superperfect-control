import HeaderLogo from "./HeaderLogo"
import HeaderNavigation from "./HeaderNavigation"

const AccountHeader: React.FC = () => {
    return (
        <div className="bg-grey">
            <div className="wrapper flex justify-between h-[104px] items-center">
                <HeaderLogo />
                <HeaderNavigation />
            </div>
        </div>
    )
}

export default AccountHeader