import { ControlerDescriptionText } from '@/contentData/homePageData'

const ControlerDescription = () => {
  return (
    <ul className="wrapper flex justify-between text-[25px] text-center leading-8 mb-[100px]">
        {ControlerDescriptionText.map(text => 
            <li key={text.id} className="px-[70px] py-[80px] bg-grey rounded-[10px] w-[32%]">
                <p className="font-medium">{text.introText}</p>
                <div className="[&>p]:mt-[40px]" dangerouslySetInnerHTML={{ __html:text.text}} />
            </li>    
        )}
    </ul>
  )
}

export default ControlerDescription