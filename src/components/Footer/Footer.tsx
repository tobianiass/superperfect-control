import FooterLinks from "./FooterLinks"
import FooterDesignedBy from './FooterDesignedBy'

const Footer: React.FC = () => {
  return (
    <div className="border-t border-t-darkGrey">
        <div className="wrapper flex justify-between items-end py-[100px]">
            <FooterLinks />
            <FooterDesignedBy />
        </div>
    </div>
  )
}

export default Footer