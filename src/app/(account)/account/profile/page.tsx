import LeftNavigation from "@/app/components/Account/LeftNavigation"

const Profile: React.FC = () => {
    return (
        <div className="wrapper wrapper--account pt-[120px] pb-[100px]">
            <h1 className="mb-16">Account</h1>
            <div className="flex justify-between">
                <div>
                    <LeftNavigation />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[800px] text-[#797979] text-[18px]">
                    <div className="flex justify-between mb-8">
                        <div className="w-[200px]">Name</div>
                        <div className="flex-1">Cosmo Kramer</div>
                        <div className="w-[200px]">Change Name</div>
                    </div>
                    <div className="flex justify-between mb-8">
                        <div className="w-[200px]">Email</div>
                        <div className="flex-1">cosmokramer@gmail.com</div>
                        <div className="w-[200px]">Change Email</div>
                    </div>
                    <div className="flex justify-between mb-8">
                        <div className="w-[200px]">Password</div>
                        <div className="flex-1">********</div>
                        <div className="w-[200px]">Change Password</div>
                    </div>
                    <div className="flex justify-between mb-8">
                        <div className="w-[200px]">Two-factor auth</div>
                        <div className="flex-1"></div>
                        <div className="w-[200px]">Enable</div>
                    </div>
                    <div className="flex justify-between mb-8">
                        <div className="w-[200px]">Email newsletter</div>
                        <div className="flex-1"></div>
                        <div className="w-[200px]">Subscribed</div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Profile