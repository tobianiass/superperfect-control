'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"

const LeftNavigation = () => {
    return (
        <ul>
            <li className="mb-2 text-[25px]"><Link href="/account/profile" title="Go to Profile Details">Profile details</Link></li>
            <li className="mb-2 text-[25px]"><Link href="/account/subscription" title="Subscription">Subscription</Link></li>
            <li className="mb-2 text-[25px]"><Link href="/account/contact-us" title="Contact Us">Contact us</Link></li>
            <li className="mb-2 text-[25px]"><Link href="/account/delete-account" title="Go to Profile Details">Delete account</Link></li>
        </ul>
    )
}

export default LeftNavigation