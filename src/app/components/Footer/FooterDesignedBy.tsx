import { FooterDesignedByText } from "@/contentData/footerData"
import Link from "next/link"

const FooterDesignedBy: React.FC = () => {
    return (
        <p className="text-[15px] leading-[36px]">
            {FooterDesignedByText.title} <Link className="text-darkGrey hover:text-[#999] transition-colors" href={FooterDesignedByText.url}>{FooterDesignedByText.urlTitle}</Link>
        </p>
    )
}

export default FooterDesignedBy