import {FaSearch, FaTimes} from "react-icons/fa";
import SavedData from "./SavedData";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const ShowSavedData = () => {
    const userId = useSelector(state => state.login.uid);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className=" flex p-4 justify-between items-center gap-4 flex-shrink-0">
                <div className="w-full sm:w-[49%] flex items-center bg-gray-900 text-white rounded-[2em] rounded-bl-none justify-between min-h-[50px] pl-4 sm:pl-5">
                    <h1 className="hover:bg-gray-600 focus:outline-none text-sm sm:text-base md:text-lg text-gray-200 flex-1 text-center sm:text-left">
                        Upload another file
                    </h1>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer flex-shrink-0 ml-2 sm:ml-4 h-8 sm:w-10 sm:h-10"
                        onClick={handleClick}
                    >
                        <g clipPath="url(#clip0_1116_1398)">
                            <rect width="40" height="40" fill="#49454F" fillOpacity="0.08"/>
                            <path
                                d="M19 24V15.85L16.4 18.45L15 17L20 12L25 17L23.6 18.45L21 15.85V24H19ZM14 28C13.45 28 12.9792 27.8042 12.5875 27.4125C12.1958 27.0208 12 26.55 12 26V23H14V26H26V23H28V26C28 26.55 27.8042 27.0208 27.4125 27.4125C27.0208 27.8042 26.55 28 26 28H14Z"
                                fill="#D9D9D9"
                            />
                        </g>
                        <rect
                            x="0.5"
                            y="0.5"
                            width="39"
                            height="39"
                            rx="19.5"
                            stroke="#D9D9D9"
                        />
                        <defs>
                            <clipPath id="clip0_1116_1398">
                                <rect width="40" height="40" rx="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {userId ? (
                    <SavedData userId={userId}/>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-lg sm:text-xl text-gray-500">Not logged in</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ShowSavedData;