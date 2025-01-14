import {Link} from "react-router-dom";

import data from "../Utils/test.json";
import {useDispatch, useSelector} from "react-redux";
import {addAddress} from "../Utils/dataSlice";
import {useEffect} from "react";
import {setCoordinates} from "../Utils/justPinsSlice";

const Body = () =>{

    const dispatch = useDispatch();

    useEffect(() => {
        // Use a Set to store unique stringified pairs
        const uniquePairs = new Set();

        data.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];

            const pair = JSON.stringify([src, dst].sort());     // both ips are sorted....order with remain same [a,b] and [b,a]

            if (!uniquePairs.has(pair)) {
                // Add the pair to the Set and dispatch it
                uniquePairs.add(pair);
                dispatch(addAddress([src, dst]));
            }
        });
    }, []);

    // console.log(data)
    const paths = useSelector(store=> store.data.dataList);

    // fetch latitude and longitute from api for each unque ip

    // making set of unique ips
    const places = new Set();
    paths.forEach(path => {
        places.add(path[0]);
        places.add(path[1]);
    });

    useEffect(() => {
        places.forEach(async (ip) => {
            const response = await fetch(
                `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
            );
            const json = await response.json();
            console.log(ip, json?.location);
            (json?.location && dispatch(setCoordinates(json)));
        })
    }, [dispatch,places]);

    return(
        <div>
            <h1>Want to know where does your request travel?</h1>
            <input type="file" accept=".json"/>
            <button className="border-2"><Link to="/map">Map</Link></button>
        </div>
    )
}
export default Body;