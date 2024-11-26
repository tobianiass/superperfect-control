import { 
    ControlerIntroductionText, 
    GetFreeAccessText
} from "@/contentData/homePageData"
import Link from "next/link"

const ControlerIntroduction: React.FC = () => {
  return (
    <div className="wrapper flex justify-between pt-[120px] pb-[100px]">
        <h1 className="max-w-[650px]">{ControlerIntroductionText.text}</h1>
        <div className="max-w-[450px] pt-[15px]">
            <p className="text-[25px] mb-[50px] leading-8" dangerouslySetInnerHTML={{ __html: GetFreeAccessText.text }} />
            <div className="max-w-[300px]">
                <Link href="/" className="o-button">Get free access</Link>
            </div>
        </div>
    </div>
  )
}

export default ControlerIntroduction