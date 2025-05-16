'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const HeaderMobileNavIcon: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const history = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [history])

    return (
        <button id="nav-icon2" className={`md:hidden ${isOpen ? 'is-navigation-open' : ''}`} onClick={() => setIsOpen(!isOpen)} >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default HeaderMobileNavIcon