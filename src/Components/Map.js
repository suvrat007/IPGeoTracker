import MapWithPins from "./MapWithPins";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {setCoordinates} from "../Utils/justPinsSlice";

const Map = () =>{

    // making set of unique ips
    const dispatch = useDispatch();
    const places = useRef(new Set());// Use useRef to persist data across renders without re-initialization

    const paths = useSelector(store=> store.data.dataList);  // all the ips-->[src,dst]
    // console.log(paths);
    paths.forEach((ip ) => {
        // console.log(ip[key]);
        places.current.add(ip.src);
        places.current.add(ip.dst);
    });
    console.log(places.current);

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


    const points = useSelector(state => state.justPins.coordinates);

    // console.log(places);

    return (
        <div>
            {/*<h1>Map with Multiple Points</h1>*/}
            <MapWithPins points={points}/>
        </div>
    );
}

export default Map;