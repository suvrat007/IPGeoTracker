import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addAddress, emptyAddress} from "../Utils/dataSlice";
import { useEffect, useState } from "react";
import {auth, firestore} from "../Utils/firebaseConfig";
import {collection , doc,setDoc} from "firebase/firestore";
import SavedData from "./SavedData";
import {deleteCoordinates} from "../Utils/justPinsSlice";
import {deletePathPair} from "../Utils/locationSlice";
import {logout} from "../Utils/loggedinSlice";
import {ToastContainer, toast, Slide} from 'react-toastify';
import Spline from "@splinetool/react-spline";
import Earth from "./Earth";

const Body = () => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState([]);
    const isLoggedin = useSelector((state) => state.login.isLoggedin);
    const usid = useSelector((store) => store.login.uid);
    const [fileName, setFileName] = useState("");
    const [refresh, setRefresh] = useState(true);



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name.split(".")[0]);
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
    }; // reading and extracting data from file to state
    useEffect(() => {
        if (!inputData || inputData.length === 0) return;

        const uniquePairs = new Set();
        inputData.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];

            if (src && dst) {
                const pair = JSON.stringify([src, dst].sort());
                if (!uniquePairs.has(pair)) {
                    uniquePairs.add(pair);
                    dispatch(addAddress({src, dst}));
                }
            }
        });
    }, [inputData, dispatch]);

    const coordinateList = useSelector((state) => state.data.dataList);
    const handleSaveData = async () => {
        try {
            if (!coordinateList || coordinateList.length === 0) {
                console.error("No input data to save.");
                return;
            }
            if (!usid) {
                console.error("User ID (usid) is undefined.");
                return;
            }

            const userRef = await collection(firestore , usid );
            await setDoc(doc(userRef,fileName),{
                data:coordinateList,
            })
            // call for rerender
            setRefresh(prev=>!prev);
        } catch (e) {
            console.error("Error adding document to Firestore: ", e);
        }
    };

    const handleLogout=()=>{
        auth.signOut();
        dispatch(logout());
    }

    const handleNoInputMapping = () => {
        toast("No input for mapping!");
    }

    const checker = useSelector((state) => state.data.dataList);

    return (
        <div className="relative flex flex-row justify-between">
            <div className="w-[60%] justify-between">
                <div className="flex flex-col items-center">
                    <div
                        className=" mt-20 flex flex-col text-white text-center text-lg items-center w-[45rem] backdrop-blur-[3px] p-4 border-2 rounded-xl">

                        <div className="m-2 p-2 text-4xl font-bold ">
                            <h1>Want to know where your request travels?</h1>
                        </div>

                        <div className="flex flex-col text-center">
                            <div className="flex flex-row items-center justify-between">
                                <div className="w-1/3">
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={handleFileChange}
                                        onClick={() => {
                                            dispatch(emptyAddress());
                                            dispatch(deleteCoordinates());
                                            dispatch(deletePathPair());
                                        }}
                                        className="p-2 cursor-pointer "
                                    />
                                </div>

                                {(checker.length != 0) ?
                                    <div className="flex flex-row justify-between text-lg">
                                        <Link to="/map">
                                            <button className="text-black bg-white p-2 m-2 rounded-lg"
                                                    onClick={() => {
                                                        dispatch(deleteCoordinates());
                                                    }}>
                                                Map with only pins
                                            </button>
                                        </Link>
                                        <Link to="/mapPath">
                                            <button className="text-black bg-white p-2 m-2 rounded-lg"
                                                    onClick={() => {
                                                        dispatch(deletePathPair());
                                                    }}>
                                                Map with path
                                            </button>
                                        </Link>
                                    </div>
                                    :
                                    <div className="flex flex-row  justify-between">
                                        <button className="text-black bg-gray-400 p-2 m-2 rounded-lg "
                                                onClick={() => {
                                                    handleNoInputMapping();
                                                }}>
                                            Map with only pins
                                        </button>
                                        <button className="text-black bg-gray-400 p-2 m-2 rounded-lg"
                                                onClick={
                                                    handleNoInputMapping
                                                }>
                                            Map with path
                                            <ToastContainer
                                                position="top-left"
                                                autoClose={3000}
                                                limit={10}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable={false}
                                                pauseOnHover={false}
                                                theme="dark"
                                                transition={Slide}
                                            />
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>

                        {!isLoggedin ? (
                            <div className="p-2 m-2 text-white">
                                <p>Want to save your searches?</p>
                                <p>
                                    <Link className="text-blue-300" to="/login">
                                        SIGN UP
                                    </Link>
                                </p>
                            </div>
                        ) : (
                            <div className="p-2 m-2 text-white ">
                                <h3 className="text-grey">Save Your Data</h3>
                                <button
                                    onClick={handleSaveData}
                                    className="p-2 mt-2 bg-gradient-to-tr from-blue-700 from-0% to-violet-700 to-100% text-white rounded-md cursor-pointer"
                                >
                                    Save File to Firestore
                                </button>
                                <button className="p-2 mt-2 ml-4 bg-gradient-to-tr from-blue-700 from-0% to-violet-700 to-100% text-white rounded-md cursor-pointer"
                                        onClick={handleLogout}>Log Out
                                </button>
                            </div>
                        )}

                    </div>
                </div>
                {isLoggedin ?
                    <div className="flex items-center mt-4">
                        <SavedData userId={usid} refresh={refresh} setRefresh={setRefresh}/>
                    </div> : null}
            </div>

            <div className=" w-[40%] h-screen bg-cover bg-center font-montserrat overflow-x-hidden">
                <Earth/>
            </div>
        </div>

    );
};

export default Body;
