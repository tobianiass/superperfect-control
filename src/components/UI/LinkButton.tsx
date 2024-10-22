import Link from "next/link"

const LinkButton: 
    React.FC<{
        buttonText: string, 
        buttonLink: string, 
        buttonType?: string
    }> = ({buttonText, buttonLink, buttonType}) => {

  return (
    <Link className={`o-button ${buttonType === 'black' ? 'o-button--black' : ''}`} href={buttonLink}>{buttonText}</Link>
  )
}

export default LinkButton