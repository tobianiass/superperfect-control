"use client"

import DashboardRecentlyViewd from "@/app/components/Account/DashboardRecentlyViewed";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const Dashboard = () => {
    const [embedUrl, setEmbedUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (status !== "authenticated") {
            return alert("Please log in first");
        }

        let input = embedUrl.trim();
        let presentationId = null;
        const match = input.match(/presentation\/d(?:\/e)?\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) presentationId = match[1];
        if (!presentationId && /^[a-zA-Z0-9_-]{20,}$/.test(input)) presentationId = input;

        if (!presentationId) return alert("Invalid link or ID");

        setLoading(true);

        const res = await fetch("/api/presentations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ presentationId, embedUrl: input }),
        });

        setLoading(false);

        if (res.ok) {
            router.push(`https://superperfect-remote.onrender.com/host/${presentationId}`);
        } else {
            alert("Failed to save presentation");
        }
    };

    return (
        <>
            <div className="wrapper pt-[120px] pb-[100px] text-center">
                <div className="w-full max-w-[750px] mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input type="text" value={embedUrl}
                                onChange={(e) => setEmbedUrl(e.target.value)} 
                                className="w-full h-[58px] rounded-[6px] border-[1px] indent-6 border-[#000]" 
                                placeholder="Add new Google Slides presentation" 
                                disabled={loading} />
                        </div>
                        <button type="submit" className="max-w-[368px] o-button o-button--black" disabled={loading}>
                            {loading ? "Saving..." : "Continue"}
                        </button>
                    </form>
                </div>
            </div>
            <DashboardRecentlyViewd />
        </>
    )
}

export default Dashboard;