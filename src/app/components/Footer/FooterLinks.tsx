import { FooterLinksColumnOne, FooterLinksColumnTwo } from '@/contentData/footerData'
import FooterLink from './FooterLink'

const FooterLinks: React.FC = () => {
  return (
    <div className="flex items-end">
        <ul className="mr-[80px]">
            {FooterLinksColumnOne.map(link =>
                <FooterLink key={link.id} url={link.url} title={link.title} />
            )}
        </ul>
        <ul>
            {FooterLinksColumnTwo.map(link =>
                <FooterLink key={link.id} url={link.url} title={link.title} />
            )}
        </ul>
    </div>
    
  )
}

export default FooterLinks