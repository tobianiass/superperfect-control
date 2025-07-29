import DashboardRecentlyViewd from "@/app/components/Account/DashboardRecentlyViewed";

const Dashboard = () => {
    return (
        <>
            <div className="wrapper pt-[120px] pb-[100px] text-center">
                <div className="w-full max-w-[750px] mx-auto">
                    <div className="mb-4">
                        <input type="text" className="w-full h-[58px] rounded-[6px] border-[1px] indent-6 border-[#000]" placeholder="Add new Google Slides presentation" />
                    </div>
                    <button className="max-w-[368px] o-button o-button--black">Continue</button>
                </div>
                
            </div>
            <DashboardRecentlyViewd />
        </>
    )
}

export default Dashboard;