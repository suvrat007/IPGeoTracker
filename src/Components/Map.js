import MapWithPins from "./MapWithPins";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {setCoordinates} from "../Utils/justPinsSlice";
import {Link} from "react-router-dom";
import useFetchCollection from "../hooks/useFetchCollection";


const Map = () =>{

    // making set of unique ips
    const dispatch = useDispatch();
    const places = useRef(new Set());// Use useRef to persist data across renders without re-initialization

    const paths = useSelector(store=> store.data.dataList);  // all the ips-->[src,dst]
    paths.forEach((ip ) => {
        places.current.add(ip.src);
        places.current.add(ip.dst);
    });


    // console.log(fetchedData);

    const fetchedIp = useRef(new Set()); // Tracks fetched IPs to prevent redundant API calls.
    // storing only unique ip's data to redux
    useEffect(() => {
        const fetchCoordinates = async () => {
            for (const ip of places.current) {
                // console.log(ip);
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


    const userId = useSelector(store=> store.login.uid);
    const { data: fetchedData } = useFetchCollection(userId);

    const points = useSelector(state => state.justPins.coordinates);

    // console.log(places);

    return (
        <div>


            <div>
                <MapWithPins points={points}/>
            </div>

            <div className="fixed top-0 right-0 w-[20%] h-[100vh] rounded-2xl backdrop-blur-2xl text-white z-20 flex items-center  px-4 shadow-md">
                <div className="flex fixed justify-between w-[90%] p-2 mt-4 border-2 top-0 rounded-xl">

                    <h1 className="text-xl font-bold"><Link to="/">Home</Link></h1>
                    <button
                        className=" bg-white text-black p-2 rounded-lg shadow-md hover:bg-gray-200"
                    ><Link to="/mapPath">See Path</Link></button>

                </div>

                <div className="w-full justify-start ">
                    {fetchedData.length > 0 ? (
                        <div className="p-2 flex flex-row flex-wrap border-2 rounded-xl ">
                            <h1 className="text-lg">Saved Files:</h1>
                            {fetchedData.map((id) => (
                                <p
                                    className="p-2 m-2 cursor-pointer border-2 rounded-lg text-white text-center backdrop-blur w-full"
                                    key={id}
                                    // onClick={() => handleClick(id)}
                                >
                                    {id}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p>No files found.</p>
                    )}
                </div>
            </div>


        </div>

    );
}

export default Map;