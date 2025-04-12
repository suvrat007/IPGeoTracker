import UserProfile from "./UserProfile";
import ShowSavedData from "./ShowSavedData";

const ProfilePage = () => {
    return (
        <div className="w-screen h-screen bg-black flex pt-12 overflow-hidden ">
            <div className="w-[46%]">
                <UserProfile/>
            </div>
            <div className="w-[54%]">
                <ShowSavedData/>
            </div>
        </div>
    )
}
export default ProfilePage