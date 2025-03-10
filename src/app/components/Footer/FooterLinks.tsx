import { FooterLinksColumnOne, FooterLinksColumnTwo } from '@/contentData/footerData'
import FooterLink from './FooterLink'
import FooterDesignedBy from './FooterDesignedBy'

const FooterLinks: React.FC = () => {
  return (
    <div className="flex md:items-end">
        <ul className="mr-[80px]">
            {FooterLinksColumnOne.map(link =>
                <FooterLink key={link.id} url={link.url} title={link.title} />
            )}
        </ul>
        <ul className="flex justify-between flex-col">
            {FooterLinksColumnTwo.map(link =>
                <FooterLink key={link.id} url={link.url} title={link.title} />
            )}
            <li className="md:hidden"><FooterDesignedBy /></li>
        </ul>
    </div>
    
  )
}

export default FooterLinks