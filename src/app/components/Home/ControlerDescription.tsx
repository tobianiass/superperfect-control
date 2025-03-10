import { ControlerDescriptionText } from '@/contentData/homePageData'

const ControlerDescription = () => {
  return (
    <ul className="wrapper flex justify-between text-[18px] md:text-[25px] text-center leading:4 md:leading-8 mb-[40px] md:mb-[100px] flex-col md:flex-row">
        {ControlerDescriptionText.map(text => 
            <li key={text.id} className="px-[20px] md:px-[70px] py-[40px] md:py-[80px] bg-grey rounded-[10px] md:w-[32%] mb-[20px]">
                <p className="font-medium">{text.introText}</p>
                <div className="[&>p]:mt-[20px] md:[&>p]:mt-[40px]" dangerouslySetInnerHTML={{ __html:text.text}} />
            </li>    
        )}
    </ul>
  )
}

export default ControlerDescription