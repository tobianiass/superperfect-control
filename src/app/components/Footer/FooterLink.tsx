import Link from "next/link"

const FooterLink: React.FC<{url: string, title: string}> = ({ url, title }) => {
  return (
    <li className="leading-10">
        <Link className="u-link-hover-underline u-link-hover-underline--thin text-[15px]" href={url}>{title}</Link>
    </li>
  )
}

export default FooterLink