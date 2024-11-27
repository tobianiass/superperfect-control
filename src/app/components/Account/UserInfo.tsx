'use client'

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

const UserInfo = () => {
    const {data: session} = useSession()

    return (
        <>
            {!!session ? <h1 className="text-[#c1c1c1]">{session?.user?.name}</h1> : <h1>Loading</h1>}
            <div className="max-w-[400px]">
                <button onClick={() => signOut()} className="o-button o-button--black">Sign Out</button>
            </div>
        </>
    )
}

export default UserInfo