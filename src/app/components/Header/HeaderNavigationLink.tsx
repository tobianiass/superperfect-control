'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

const HeaderNavigationLink: React.FC<{url: string, name: string}> = ({url, name}) => {
    const pathname = usePathname()

    return (
        <li className="pl-[80px] text-[18px] font-medium">
            <Link className={`u-link-hover-underline ${pathname === url ? 'italic' : ''}`} href={url}>{name}</Link>
        </li>
    )
}

export default HeaderNavigationLink