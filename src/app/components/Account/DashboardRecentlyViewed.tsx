'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const DashboardRecentlyViewd = () => {
    const [presentations, setPresentations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/presentations")
            .then(res => res.json())
            .then(data => {
                setPresentations(data.presentations || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="bg-white">
                <div className="wrapper wrapper--account pt-[60px] pb-[60px]">
                    <h1 className="text-[25px]">RECENT</h1>
                    <p className="mt-8">Loading...</p>
                </div>
            </div>
        );
    }

    if (!presentations.length) {
        return (
            <div className="bg-white">
                <div className="wrapper wrapper--account pt-[60px] pb-[60px]">
                    <h1 className="text-[25px]">RECENT</h1>
                    <p className="mt-8 text-[#797979]">No presentations yet. Add one above!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="wrapper wrapper--account pt-[60px] pb-[60px]">
                <h1 className="text-[25px]">RECENT</h1>
                <ul className="flex flex-wrap justify-between gap-4 mt-8">
                    {presentations.map((pres) => (
                        <li key={pres._id}>
                            <Link 
                                href={`https://superperfect-remote.onrender.com/host/${pres.presentationId}`}
                                target="_blank"
                                className="block"
                            >
                                <Image 
                                    src={pres.thumbnail} 
                                    alt={pres.title} 
                                    width={368} 
                                    height={198} 
                                />
                                <p className="text-[15px] text-[#797979] pt-2">{pres.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DashboardRecentlyViewd