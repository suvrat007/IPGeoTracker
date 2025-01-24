import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../Utils/dataSlice";
import { useEffect, useState } from "react";
import { firestore } from "../Utils/firebaseConfig";
import { addDoc, collection,query, getDocs , doc,setDoc} from "firebase/firestore";
import SavedData from "./SavedData";

const Body = () => {
    const dispatch = useDispatch();

    const [inputData, setInputData] = useState([]);
    const isLoggedin = useSelector((state) => state.login.isLoggedin);
    const usid = useSelector((store) => store.login.uid);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    console.log("Parsed JSON: ", json);
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
console.log(coordinateList);

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

            // setSaveCoords(coordinateList);
            const userRef = await collection(firestore , usid );
            const userQuery = await query(userRef);
            const userDocSnapshot=await getDocs(userQuery);

            if (userDocSnapshot.empty){
                await setDoc(doc(userRef,"default"),{
                    data:coordinateList,
                })
            }else{
                await addDoc(userRef, {
                    data: coordinateList,
                });
            }

            // console.log(`Document written with ID: ${fileDocRef.id}`);
        } catch (e) {
            console.error("Error adding document to Firestore: ", e);
        }
    };



    return (
        <div className="flex justify-center relative top-[25%]">
            <div className="absolute flex flex-col text-center text-lg justify-center w-[50%] backdrop-blur p-4 border-2 rounded-xl">
                <div className="m-2 p-2 text-4xl font-bold">
                    <h1>Want to know where your request travels?</h1>
                </div>
                <div className="flex flex-col text-center">
                    <div className="relative flex flex-col items-center">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            className="p-2  ml-10"
                        />
                    </div>
                    <div className="flex flex-row justify-center">
                        <Link to="/map">
                            <button className="border-2 text-black bg-white p-2 m-2 mr-10 rounded-lg">
                                Map with only pins
                            </button>
                        </Link>
                        <Link to="/mapPath">
                            <button className="border-2 text-black bg-white p-2 m-2 rounded-lg">
                                Map with path
                            </button>
                        </Link>
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
                    <div className="p-2 m-2 text-white">
                        <h3>Save Your Data</h3>
                        <button
                            onClick={handleSaveData}
                            className="p-2 bg-blue-500 text-white rounded-md"
                        >
                            Save File to Firestore for user ID: {usid}
                        </button>
                    </div>
                )}
            </div>
            {isLoggedin ? <SavedData userId={usid} /> : null}
        </div>
    );
};

export default Body;
