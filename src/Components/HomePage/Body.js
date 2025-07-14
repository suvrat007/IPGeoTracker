import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, emptyAddress } from "../../Utils/Redux/dataSlice";
import { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../../Utils/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { deleteCoordinates } from "../../Utils/Redux/justPinsSlice";
import { deletePathPair } from "../../Utils/Redux/locationSlice";
import { logout } from "../../Utils/Redux/loggedinSlice";
import { ToastContainer, toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { addFile } from "../../Utils/Redux/fileSlice";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState([]);
    const isLoggedin = useSelector((state) => state.login.isLoggedin);
    const usid = useSelector((store) => store.login.uid);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);
    const coordinateList = useSelector((state) => state.data.dataList);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const name = file.name.split(".")[0];
            dispatch(addFile(name));
            setFileName(name);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setInputData(json);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            };
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if (!inputData.length) return;

        const uniquePairs = new Set();
        inputData.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];

            if (src && dst) {
                const pair = JSON.stringify([src, dst].sort());
                if (!uniquePairs.has(pair)) {
                    uniquePairs.add(pair);
                    dispatch(addAddress({ src, dst }));
                }
            }
        });
    }, [inputData, dispatch]);

    const handleSvgClick = () => {
        dispatch(emptyAddress());
        dispatch(deleteCoordinates());
        dispatch(deletePathPair());
        fileInputRef.current.click();
    };

    const handleSaveData = async () => {
        if (!coordinateList?.length || !usid) return;
        try {
            const userRef = collection(firestore, usid);
            await setDoc(doc(userRef, fileName), {
                data: coordinateList,
            });
            toast.success("Your data has been saved", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });
        } catch (e) {
            console.error("Error saving to Firestore:", e);
        }
    };

    const handleLogout = () => {
        auth.signOut();
        dispatch(logout());
    };

    return (
        <div className="relative w-full min-h-[20rem] sm:min-h-[24rem] overflow-hidden">
            <ToastContainer />
            <div className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end w-full  mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 bg-[linear-gradient(97.25deg,_#524CCE_32.1%,_#E38A63_51.39%,_#524BCE_98.5%)]">
                <div className="flex flex-col md:flex-row justify-between w-full relative -bottom-4 sm:-bottom-6 md:-bottom-8">
                    {/* Left Text */}
                    <div className="text-white text-left mb-6 md:mb-0 md:w-1/2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                            TRACE
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                            FILE PACKETS
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                            AROUND THE GLOBE
                        </h1>
                    </div>

                    {/* Right Upload Box */}
                    <div className="bg-black/90 text-white flex flex-col justify-center mb-10 px-4 sm:px-5 md:px-6 py-6 rounded-[2rem] rounded-r-none rounded-bl-none w-full md:w-[45%]">
                        <h2 className="text-base sm:text-lg md:text-xl p-2">Upload your file here</h2>
                        <div className="flex items-center justify-between mb-4 bg-[#1a1a1a] rounded-3xl rounded-bl-none pl-4">
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <p className="text-xs sm:text-sm md:text-base truncate">{fileName}</p>
                            <button
                                onClick={handleSvgClick}
                                className="p-2 hover:bg-white/10 rounded-full transition"
                            >
                                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                                    <g clipPath="url(#clip0)">
                                        <rect width="40" height="40" fill="#49454F" fillOpacity="0.08" />
                                        <path
                                            d="M19 24V15.85L16.4 18.45L15 17L20 12L25 17L23.6 18.45L21 15.85V24H19ZM14 28C13.45 28 12.9792 27.8042 12.5875 27.4125C12.1958 27.0208 12 26.55 12 26V23H14V26H26V23H28V26C28 26.55 27.8042 27.0208 27.4125 27.4125C27.0208 27.8042 26.55 28 26 28H14Z"
                                            fill="#D9D9D9"
                                        />
                                    </g>
                                    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#D9D9D9" />
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="40" height="40" rx="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                            <Link to="/mapPath">
                                <button
                                    disabled={!fileName}
                                    onClick={() => dispatch(deleteCoordinates())}
                                    className={`flex items-center gap-2 px-3 py-2 border-2 rounded-full text-xs sm:text-sm font-medium transition ${
                                        fileName
                                            ? "bg-black text-white border-white hover:scale-105"
                                            : "bg-gray-600 text-gray-300 border-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Map With Path
                                </button>
                            </Link>

                            <Link to="/map">
                                <button
                                    disabled={!fileName}
                                    onClick={() => dispatch(deletePathPair())}
                                    className={`flex items-center gap-2 px-3 py-2 border-2 rounded-full text-xs sm:text-sm font-medium transition ${
                                        fileName
                                            ? "bg-black text-white border-white hover:scale-105"
                                            : "bg-gray-600 text-gray-300 border-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Map With Pins
                                </button>
                            </Link>

                            {isLoggedin && (
                                <>
                                    <button
                                        disabled={!fileName}
                                        onClick={handleSaveData}
                                        className={`flex items-center gap-2 px-3 py-2 border-2 rounded-full text-xs sm:text-sm font-medium transition ${
                                            fileName
                                                ? "bg-black text-white border-white hover:scale-105"
                                                : "bg-gray-600 text-gray-300 border-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        <FaSave className="text-sm sm:text-base" />
                                        Save Data
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-3 py-2 bg-black text-white border-2 border-white rounded-full text-xs sm:text-sm font-medium hover:scale-105 transition"
                                    >
                                        <FiLogOut className="text-sm sm:text-base" />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;