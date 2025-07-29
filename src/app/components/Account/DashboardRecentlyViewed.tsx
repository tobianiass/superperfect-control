'use client'

import Link from "next/link"
import Image from "next/image"

const DashboardRecentlyViewd = () => {
    return (
        <div className="bg-white">
            <div className="wrapper wrapper--account pt-[60px] pb-[60px]">
                <h1 className="text-[25px]">RECENT</h1>
                <ul className="flex flex-wrap justify-between gap-4 mt-8">
                    <li>
                        <Link href="/recently-viewed/1" className="block">
                            <Image src="/img/recently_1.jpg" alt="Recently Viewed" width={368} height={198} />
                            <p className="text-[15px] text-[#797979] pt-2">export_statistics</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/recently-viewed/2" className="block">
                            <Image src="/img/recently_2.jpg" alt="Recently Viewed" width={368} height={198} />
                            <p className="text-[15px] text-[#797979] pt-2">EASA_2024_Architecture</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/recently-viewed/3" className="block">
                            <Image src="/img/recently_3.jpg" alt="Recently Viewed" width={368} height={198} />
                            <p className="text-[15px] text-[#797979] pt-2">PA_new season</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardRecentlyViewd