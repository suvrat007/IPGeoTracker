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
        <div className=" h-screen">
            <div className={'flex  p-4 justify-between gap-4'}>
                <div className="flex items-center bg-gray-900 rounded-[2em] rounded-bl-none w-3/5 px-4">
                    {/* Search Icon */}
                    <svg
                        width="50"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_1172_1506)">
                            <rect
                                width="40"
                                height="40"
                                transform="translate(0.75)"
                                fill="#49454F"
                                fillOpacity="0.08"
                            />
                            <path
                                d="M28.35 29L22.05 22.7C21.55 23.1 20.975 23.4167 20.325 23.65C19.675 23.8833 18.9833 24 18.25 24C16.4333 24 14.8958 23.3708 13.6375 22.1125C12.3792 20.8542 11.75 19.3167 11.75 17.5C11.75 15.6833 12.3792 14.1458 13.6375 12.8875C14.8958 11.6292 16.4333 11 18.25 11C20.0667 11 21.6042 11.6292 22.8625 12.8875C24.1208 14.1458 24.75 15.6833 24.75 17.5C24.75 18.2333 24.6333 18.925 24.4 19.575C24.1667 20.225 23.85 20.8 23.45 21.3L29.75 27.6L28.35 29ZM18.25 22C19.5 22 20.5625 21.5625 21.4375 20.6875C22.3125 19.8125 22.75 18.75 22.75 17.5C22.75 16.25 22.3125 15.1875 21.4375 14.3125C20.5625 13.4375 19.5 13 18.25 13C17 13 15.9375 13.4375 15.0625 14.3125C14.1875 15.1875 13.75 16.25 13.75 17.5C13.75 18.75 14.1875 19.8125 15.0625 20.6875C15.9375 21.5625 17 22 18.25 22Z"
                                fill="#D9D9D9"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1172_1506">
                                <rect x="0.75" width="40" height="40" rx="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>


                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full text-lg  bg-transparent p-2 outline-none ml-5 text-white placeholder-gray-200"
                    />

                    {/* Close Icon */}
                    <button className="text-gray-400 p-3 hover:text-white focus:outline-none">
                        <FaTimes className="text-xl"/>
                    </button>
                </div   >
                <div
                    className={'w-2/5 flex items-center bg-gray-900 text-white rounded-[2em] rounded-bl-none  justify-between'}>
                    <h1
                        className="  hover:bg-gray-600 focus:outline-none text-lg text-gray-200 ml-5">
                        Upload another file

                    </h1>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={' cursor-pointer'}
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

            <div>
                {/*    files*/}
                {userId ? (
                    <SavedData userId={userId}/>
                ) : (
                    <h1>not logged in</h1>
                )}

            </div>
        </div>
    )
}
export default ShowSavedData