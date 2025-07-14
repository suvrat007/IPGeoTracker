import UserProfile from "./UserProfile";
import ShowSavedData from "./ShowSavedData";

const ProfilePage = () => {
    return (
        <div className="md:h-[89.2vh] h-full bg-black flex flex-col lg:flex-row overflow-hidden">
            <div className="w-full lg:w-[46%] flex-shrink-0">
                <UserProfile/>
            </div>
            <div className="w-full lg:w-[54%] flex-shrink-0">
                <ShowSavedData/>
            </div>
        </div>
    )
}
export default ProfilePage;