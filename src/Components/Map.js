import MapWithPins from "./MapWithPins";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {deleteCoordinates, setCoordinates} from "../Utils/justPinsSlice";
import {Link} from "react-router-dom";
import DisplayUserFiles from "./DisplayUserFiles";
import {emptyAddress} from "../Utils/dataSlice";
import {deletePathPair} from "../Utils/locationSlice";


const Map = () =>{

    // making set of unique ips
    const dispatch = useDispatch();
    const places = useRef(new Set());// Use useRef to persist data across renders without re-initialization


    const [toggle, setToggle] = useState(false);

    const paths = useSelector(store=> store.data.dataList);  // all the ips-->[src,dst]
    paths.forEach((ip ) => {
        places.current.add(ip.src);
        places.current.add(ip.dst);
    });


    const fetchedIp = useRef(new Set()); // Tracks fetched IPs to prevent redundant API calls.

    // storing only unique ip's data to redux
    useEffect(() => {
        const fetchCoordinates = async () => {
            for (const ip of places.current) {
                if (!fetchedIp.current.has(ip)) {
                    fetchedIp.current.add(ip); // Mark IP as fetched
                    const response = await fetch(
                        `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
                    );
                    const json = await response.json();
                    if (json?.location) {
                        dispatch(setCoordinates(json)); // Dispatch valid location data
                    }
                }
            }
        };
        fetchCoordinates();
    }, [dispatch]); // Only runs once since `places` is stable with useRef.

    const points = useSelector(state => state.justPins.coordinates);

    const handleReRender=()=>{
        setToggle(prev=>!prev);
    }


    return (
        <div>
            <div>
                <MapWithPins points={points}/>
            </div>
            <div
                className="fixed top-0 right-0 w-[20%] h-[100vh] rounded-2xl backdrop-blur-2xl text-white z-20 flex items-center  px-4 shadow-md">
                <div className="flex fixed justify-between w-[90%] p-2 mt-4 border-2 top-0 rounded-xl">
                    <Link to="/">
                        <h1 className="text-xl font-bold cursor-pointer"
                            onClick={() => {
                                dispatch(emptyAddress());
                                dispatch(deleteCoordinates());
                                dispatch(deletePathPair());
                            }}>
                            Home
                        </h1>
                    </Link>
                    <Link to="/mapPath">
                        <button className=" bg-white text-black p-2 rounded-lg shadow-md hover:bg-gray-200">See Path
                        </button>
                    </Link>
                </div>
                <div style={{display: "none"}}>{toggle.toString()}</div>
                <DisplayUserFiles trigger={handleReRender}/>
                {/*<DisplayUserFiles />*/}

            </div>


        </div>

    );
}

export default Map;