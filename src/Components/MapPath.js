import { useDispatch, useSelector } from "react-redux";
import { addPathPair } from "../Utils/locationSlice";
import React, {useEffect} from "react";
import MapShowPath from "./MapShowPath";
import {Link} from "react-router-dom";

const MapPath = () => {
    const ips = useSelector((state) => state.data.dataList); // import pairs of ips
    const dispatch = useDispatch();


    const fetchData = async (ip) => {
        try {
            const response = await fetch(
                `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
            );
            const json = await response.json();
            // console.log("Fetched data for IP:", ip, json);
            return json;
        } catch (error) {
            console.error("Error fetching data for IP:", ip, error);
            return null; // Return null on error to handle gracefully
        }
    };


    useEffect(() => {
        const set = new Set();

        ips.map(async (ip) => {
            set.add(ip);
            const a =await fetchData(ip.src);
            // console.log(a);
            const b = await fetchData(ip.dst);

            const pair= JSON.stringify([a,b].sort());
            if (!set.has(pair)) {
                set.add(pair);
                // console.log([a,b]);
                dispatch(addPathPair([a,b]));
            }

        })
    },[])

    const points = useSelector((state) => state.location.pathObjects);
    // console.log(points);
    return(
        <div>
            <div><MapShowPath points={points}/></div>

            <div
                className="fixed translate-z-2 top-0 right-0 w-[20%] h-[100vh] backdrop-blur text-white z-20 flex items-center px-4 shadow-md">
                <div className="flex fixed justify-between w-[90%] p-2 mt-4 border-2 top-0 rounded-xl">

                    <h1 className="text-xl font-bold"><Link to="/">Home</Link></h1>
                    <button
                        className=" bg-white text-black p-2 rounded-lg shadow-md hover:bg-gray-200"
                    ><Link to="/map">See Pins Only</Link></button>

                </div>
                <div>

                </div>
            </div>
        </div>

    );
};

export default MapPath;
