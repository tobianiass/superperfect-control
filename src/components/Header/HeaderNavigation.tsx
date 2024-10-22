import { HeaderNavigationLinks } from '@/contentData/headerData'
import HeaderNavigationLink from './HeaderNavigationLink'

const HeaderNavigation: React.FC = () => {
  return (
    <ul className="flex justify-between">
        {HeaderNavigationLinks.map(link => 
            <HeaderNavigationLink key={link.id} url={link.url} name={link.title} />
        )}
    </ul>
  )
}

export default HeaderNavigation