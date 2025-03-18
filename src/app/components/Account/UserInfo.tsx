'use client'

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

const UserInfo = () => {
    const {data: session} = useSession()

    return (
        <>    
            <div className="max-w-[400px]">
                <button onClick={() => signOut()} className="o-button o-button--black">Sign Out</button>
            </div>
        </>
    )
}

export default UserInfo