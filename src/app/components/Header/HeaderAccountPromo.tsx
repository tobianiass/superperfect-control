import Link from "next/link"
import ArrowRight from "@public/icons/arrow-right.svg"

const HeaderAccountPromo: React.FC = () => {
    return (
        <div className="bg-black text-white md:text-center py-4">
            <div className="wrapper wrapper--account relative font-[12px] md:font-[18px]">
                20 days left on trial
                <Link href='' className="absolute right-[20px] top-0 group">
                    Choose plan now
                    <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-all" />
                </Link>
            </div>
        </div>
    )
}

export default HeaderAccountPromo