"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const RegistrationForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userRegistered, setUserRegistred] = useState(false)
    const [userExistError, setUserExistError] = useState("")
    const [requiredFieldsError, setRequiredFieldsError] = useState("")

    const router = useRouter();
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(!name || !email || !password) {
            setRequiredFieldsError("All Fields are necessary")
            return
        } else {
            setRequiredFieldsError("")
        }

        try {
            const resUserExists = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const {user} = await resUserExists.json();

            if(user) {
                setUserExistError("User with such email address already exist")
                return
            }

            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if(res.ok) {
                setName("")
                setEmail("")
                setPassword("")
                setUserRegistred(true)
                setUserExistError("")
                
                console.log("User registration successful!")

                router.push('/login')
            } else {
                console.log("User registration faild")
            }
        } catch (error) {
            console.log("Error durin Registration", error)
        }

    }

    return (
        <div className="max-w-[340px] m-auto">  
            <p className="text-[25px] mb-[20px] text-center">Register your Account</p>
            {userRegistered && (<div className="text-[green] pb-2">User Successfully registred!</div>)}
            <form onSubmit={handleSubmit} className="mb-[30px]">
                <input type="text" 
                        className="w-full h-[58px] border rounded-[6px] px-[20px] mb-[20px]"
                        placeholder="Username" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        />
                <input type="email" 
                        className="w-full h-[58px] border rounded-[6px] px-[20px] mb-[20px]"
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                <input type="password" 
                        className="w-full h-[58px] border rounded-[6px] px-[20px] mb-[20px]"
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                {!!requiredFieldsError && (
                    <div className="text-[red]">requiredFieldsError</div>
                )}
                {userExistError && (
                    <div className="text-[red]">{userExistError}</div>
                )}
                <button type="submit" className="o-button o-button--black">Register</button>
            </form>
        </div>
    )
}

export default RegistrationForm