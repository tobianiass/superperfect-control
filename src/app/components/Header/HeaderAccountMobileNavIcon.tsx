'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const HeaderAccountMobileNavIcon: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const history = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [history])

    return (
        <button className={`absolute right-0 top-0 w-[120px] md:w-full h-full z-10 ${isOpen ? 'is-account-navigation-open' : ''}`} onClick={() => setIsOpen(!isOpen)}></button>
    )
}

export default HeaderAccountMobileNavIcon