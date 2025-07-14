// FileUpload.js
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, emptyAddress } from "../../Utils/Redux/dataSlice";
import { useEffect, useState, useRef } from "react";
import { auth, firestore } from "../../Utils/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { deleteCoordinates } from "../../Utils/Redux/justPinsSlice";
import { deletePathPair } from "../../Utils/Redux/locationSlice";
import { logout } from "../../Utils/Redux/loggedinSlice";
import { addFile } from "../../Utils/Redux/fileSlice";

const FileUpload = ({ onFileProcessed, setFile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [inputData, setInputData] = useState([]);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    const isLoggedin = useSelector((state) => state.login.isLoggedin);
    const usid = useSelector((state) => state.login.uid);
    const coordinateList = useSelector((state) => state.data.dataList);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const name = file.name.split(".")[0];
        setFileName(name);
        setFile(name);
        dispatch(addFile(name));

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                setInputData(json);
                if (onFileProcessed) onFileProcessed(json);

                const fileKey = Date.now();
                const currentPath = location.pathname;

                if (currentPath === "/map" || currentPath === "/mapPath") {
                    navigate(currentPath, { state: { fileKey } });
                }

            } catch (err) {
                console.error("Error parsing JSON:", err);
            }
        };
        reader.readAsText(file);
    };

    const handleSvgClick = () => {
        dispatch(deleteCoordinates());
        dispatch(deletePathPair());
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (!inputData.length) return;
        dispatch(emptyAddress());
        const uniquePairs = new Set();
        inputData.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];

            if (src && dst) {
                const pairKey = JSON.stringify([src, dst].sort());
                if (!uniquePairs.has(pairKey)) {
                    uniquePairs.add(pairKey);
                    dispatch(addAddress({ src, dst }));
                }
            }
        });
    }, [inputData, dispatch]);

    const handleSaveData = async () => {
        if (!coordinateList?.length || !usid) return;
        try {
            const userRef = collection(firestore, usid);
            await setDoc(doc(userRef, fileName), {
                data: coordinateList,
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
        <div
            className="text-white flex flex-col justify-center rounded-[2rem] px-2 py-4 rounded-tr-none rounded-bl-none rounded-br-none mr-6 w-full">
            <div className="flex items-center bg-[#1a1a1a] rounded-3xl rounded-bl-none mb-4 p-2">
                <h2 className="text-lg flex-1 ml-6">
                    {fileName ? fileName : "Upload another file"}
                </h2>

                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                />

                <button onClick={handleSvgClick} className="ml-2">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_1116_1398)">
                            <rect width="40" height="40" fill="#49454F" fillOpacity="0.08"/>
                            <path
                                d="M19 24V15.85L16.4 18.45L15 17L20 12L25 17L23.6 18.45L21 15.85V24H19ZM14 28C13.45 28
                                12.9792 27.8042 12.5875 27.4125C12.1958 27.0208 12 26.55 12 26V23H14V26H26V23H28V26C28
                                26.55 27.8042 27.0208 27.4125 27.4125C27.0208 27.8042 26.55 28 26 28H14Z"
                                fill="#D9D9D9"
                            />
                        </g>
                        <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#D9D9D9"/>
                        <defs>
                            <clipPath id="clip0_1116_1398">
                                <rect width="40" height="40" rx="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>

            <div className="w-full flex justify-between">
                <button
                    disabled={!fileName}
                    onClick={() => {
                        dispatch(deleteCoordinates());
                        navigate("/mapPath");
                    }}
                    className={`flex items-center gap-2 px-9 py-2 rounded-full text-sm font-medium transition
            ${!fileName
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-black text-white hover:scale-105"}`}
                >
                    <span>Map With Path</span>
                </button>

                <button
                    disabled={!fileName}
                    onClick={() => {
                        dispatch(deletePathPair());
                        navigate("/map");
                    }}
                    className={`flex items-center gap-2 px-9 py-2 rounded-full text-sm font-medium transition
            ${!fileName
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-black text-white hover:scale-105"}`}
                >
                    <span>Map With Pins</span>
                </button>

                {(location.pathname !== "/map" && location.pathname !== "/mapPath") && isLoggedin && (
                    <>
                        <button
                            onClick={handleSaveData}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white border-2 border-white rounded-full text-sm font-medium hover:scale-105 transition"
                        >
                            Save Data
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white border-2 border-white rounded-full text-sm font-medium hover:scale-105 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
