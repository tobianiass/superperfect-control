'use client'

import FooterLinks from "./FooterLinks"
import FooterDesignedBy from './FooterDesignedBy'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-t-darkGrey">
        <div className="wrapper flex justify-between items-end py-[40px] md:py-[100px]">
            <FooterLinks />
            <div className="hidden md:block">
                <FooterDesignedBy />
            </div>
        </div>
    </footer>
  )
}

export default Footer