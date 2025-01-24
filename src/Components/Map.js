import MapWithPins from "./MapWithPins";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {addLatitude, addLongitude} from "../Utils/locationSlice";
import {setCoordinates} from "../Utils/justPinsSlice";

const Map = () =>{

    // making set of unique ips
    const dispatch = useDispatch();
    const places = new Set();

    const paths = useSelector(store=> store.data.dataList);  // all the ips-->[src,dst]
    paths.map(p => {
        places.add(p.src);
        places.add(p.dst);
    });

    // storing only unique ip's data to redux
    // useEffect(() => {
    //     places.forEach(async (ip) => {
    //         const response = await fetch(
    //             "https://api.geoapify.com/v1/ipinfo?ip="+ip+"&apiKey="+process.env.REACT_APP_GEOAPIFY_API_KEY
    //         );
    //         const json = await response.json();
    //         // console.log(ip, json?.location);
    //         (json?.location && dispatch(setCoordinates(json)));   // to handle undefined output in api bcoz of private ip adressses
    //     })
    // }, [dispatch,places]);

    const fetchedIps = useRef(new Set());

    useEffect(() => {
        const fetchCoordinates = async () => {
            for (const ip of places) {
                if (!fetchedIps.current.has(ip)) {
                    fetchedIps.current.add(ip); // Mark as fetched
                    const response = await fetch(
                        `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
                    );
                    const json = await response.json();
                    if (json?.location) {
                        dispatch(setCoordinates(json));
                    }
                }
            }
        };

        fetchCoordinates();
    }, [dispatch, places]);

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