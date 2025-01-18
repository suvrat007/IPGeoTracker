import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../Utils/dataSlice";
import { useEffect, useState } from "react";
import FileUploader from "./FileUploader"; // Adjust path
import { firestore } from "../Utils/firebaseConfig";
import {addDoc, collection} from "firebase/firestore";

const Body = () => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState([]); // Initialize with an empty array
    const [checkInput, setCheckInput] = useState(false);
    const isLoggedin = useSelector((state) => state.login.isLoggedin);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    console.log(json);
                    setInputData(json); // Update state with the parsed JSON
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            };

            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if (!inputData || inputData.length === 0) return;

        const uniquePairs = new Set();
        inputData.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];

            if (src && dst) {
                const pair = JSON.stringify([src, dst].sort()); // Sort to ensure consistent ordering
                if (!uniquePairs.has(pair)) {
                    uniquePairs.add(pair);
                    dispatch(addAddress([src, dst]));
                }
            }
        });
    }, [inputData, dispatch]);


    const usid = useSelector(store=>store.login.uid);
    const handleSaveData =async(usid) => {
        try{
            const docRef = await addDoc(collection(firestore, "users"), {
                uid: usid,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="flex justify-center relative top-[25%]">
            <div className="absolute flex flex-col text-center text-lg justify-center w-[50%] backdrop-blur p-4 border-2 rounded-xl">
                <div className=" m-2 p-2 text-4xl font-bold">
                    <h1>Want to know where your request travels?</h1>
                </div>
                <div className="flex flex-col text-center">
                    <div className="relative flex origin-center left-[30%] ">
                        {/*<img src="https://www.svgrepo.com/show/533718/upload.svg" className="w-[8rem]" />*/}
                        <input type="file" accept=".json" onChange={handleFileChange} className="p-2 m-2 ml-10"/>
                    </div>

                    <div className="flex flex-row justify-center">
                        <button className="border-2 text-black bg-white p-2 m-2 mr-10 rounded-lg">
                            {(checkInput) ? "Map with only pins" : <Link to="/map">Map with only pins</Link>}
                        </button>
                        <button className="border-2 text-black bg-white p-2 m-2 rounded-lg">
                            {(checkInput) ? "Map with path" : <Link to="/mapPath">Map with path</Link>}
                        </button>
                    </div>
                </div>

                {!isLoggedin ? (
                    <div className="p-2 m-2 text-white">
                        <p>Want to save your searches?</p>
                        <p><Link className="text-blue-300" to="/login">SIGN UP</Link></p>
                    </div>
                ) : (
                    <div className="p-2 m-2 text-white">
                        <h3>Save Your Data</h3>
                        <FileUploader inputData={inputData} onClick={handleSaveData(usid)}/>
                        {/*<button onClick={handleSaveData(usid)}>try</button>*/}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Body;
