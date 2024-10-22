import Link from "next/link"

const LoginForm = () => {
  return (
    <div className="text-center">
        <p className="text-[25px] mb-[20px]">Log in with email</p>
        <form action="" className="max-w-[340px] m-auto mb-[30px]">
            <input className="w-full h-[58px] border rounded-[6px] px-[20px] mb-[20px]" type="text" placeholder="Email" />
            <input className="w-full h-[58px] border rounded-[6px] px-[20px] mb-[20px]" type="password" placeholder="Password" />
            <button className="o-button o-button--black">Log In</button>
        </form>
        <Link href='/' className="text-[18px] text-textGrey">I forgot my password</Link>
    </div>
  )
}

export default LoginForm