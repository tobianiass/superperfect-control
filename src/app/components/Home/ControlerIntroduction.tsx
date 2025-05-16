import { 
    ControlerIntroductionText, 
    GetFreeAccessText
} from "@/contentData/homePageData"
import Link from "next/link"

const ControlerIntroduction: React.FC = () => {
  return (
    <div className="c-page wrapper flex justify-between pt-[40px] md:pt-[120px] pb-[40px] md:pb-[100px] flex-col md:flex-row">
        <h1 className="max-w-[650px] text-center md:text-left">{ControlerIntroductionText.text}</h1>
        <div className="max-w-[450px] pt-[15px] text-center md:text-left">
            <p className="text-[25px] mb-[50px] leading-8" dangerouslySetInnerHTML={{ __html: GetFreeAccessText.text }} />
            <div className="md:max-w-[300px]">
                <Link href="/" className="o-button">Get free access</Link>
            </div>
        </div>
    </div>
  )
}

export default ControlerIntroduction