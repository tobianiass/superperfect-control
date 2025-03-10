'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

const HeaderNavigationLink: React.FC<{url: string, name: string, style?: string}> = ({url, name, style}) => {
    const pathname = usePathname()

    return (
        <li className={`md:pl-[80px] text-[18px] my-[10px] md:my-[0] font-medium ${style}`}>
            <Link className={`u-link-hover-underline ${pathname === url ? 'italic' : ''}`} href={url}>{name}</Link>
        </li>
    )
}

export default HeaderNavigationLink