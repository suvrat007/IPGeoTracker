import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { addAddress } from "../Utils/dataSlice";
import { useEffect, useState } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState([]); // Initialize with an empty array

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
        if (!inputData || inputData.length === 0) return; // Only proceed if inputData is valid

        // Use a Set to store unique stringified pairs
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
    }, [inputData, dispatch]); // Add dispatch as a dependency to ensure best practices

    

    return (
        <div className="absolute flex flex-col border-2 text-lg top-1/2 left-1/2 origin-center">
            <div className="flex flex-col">
                <h1>Want to know where your request travels?</h1>
            </div>
            <div className="flex flex-col text-center">
                <input type="file" accept=".json" onChange={handleFileChange}/>
                <div className="flex flex-row">
                    <button className="border-2 text-black bg-white p-2 m-2 rounded-lg">
                        <Link to="/map">Map with only pins</Link>
                    </button>
                    <button className="border-2 text-black bg-white p-2 m-2 rounded-lg">
                        <Link to="/mapPath">Map with path</Link>
                    </button>
                </div>
            </div>

            {!isLoggedin ?
                <div><p>Want to save your searches?</p>
                    <p><Link to="/login">SIGN UP NOW</Link></p></div>
                : null}
        </div>
    );
};

export default Body;
