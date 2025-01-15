import { useDispatch, useSelector } from "react-redux";
import { addPathPair } from "../Utils/locationSlice";
import {useEffect} from "react";
import MapShowPath from "./MapShowPath";

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
            const a =await fetchData(ip[0]);
            // console.log(a);
            const b = await fetchData(ip[1]);

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
            <MapShowPath points={points}  />
        </div>
    );
};

export default MapPath;
