import MapWithPins from "./MapWithPins";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addLatitude, addLongitude} from "../Utils/locationSlice";
import {setCoordinates} from "../Utils/justPinsSlice";

const Map = () =>{
    // const paths = useSelector(store=> store.data.dataList);
    // const dispatch = useDispatch();
    //
    // // fetch latitude and longitute from api for each ip
    //
    // const places = new Set();
    // paths.forEach(path => {
    //     places.add(path[0]);
    //     places.add(path[1]);
    // });
    //
    //
    //
    // useEffect(() => {
    //     places.forEach(async (ip) => {
    //         const response = await fetch(
    //             `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    //         );
    //         const json = await response.json();
    //         console.log(ip, json?.location);
    //         dispatch(setCoordinates(json?.location));
    //     })
    // }, [dispatch,places]);




    // useEffect(() => {
    //     paths.map((item) => {
    //         fetchData(item[0]) && (fetchData(item[1]))
    //     })
    //
    // },[])

        // const fetchData = async (a) =>{
        //     const data = await fetch("https://api.geoapify.com/v1/ipinfo?ip="+a+"&apiKey="+process.env.REACT_APP_GEOAPIFY_API_KEY);
        //     const json = await data.json();
        //     // console.log(json?.location?.latitude);
        //     if (json?.location?.latitude && json?.location?.longitude) {
        //         dispatch(addLatitude(json?.location?.latitude));
        //         dispatch(addLongitude(json?.location?.latitude));
        //     }
        //
        //     // return json;
        // }


    const points = useSelector(state => state.justPins.coordinates);
    console.log(points);

    return (
        <div>
            <h1>Map with Multiple Points</h1>
            {points.map((point, index) => (<MapWithPins points={points} key={index} />))}

        </div>
    );
}

export default Map;