'use client'

import { signOut } from "next-auth/react"

const SignOutLink = () => {
    return (
        <button onClick={() => signOut()}>Log out</button>
    )
}

export default SignOutLink