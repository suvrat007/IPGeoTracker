import MapWithPins from "./MapWithPins";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addLatitude, addLongitude} from "../Utils/locationSlice";
import {setCoordinates} from "../Utils/justPinsSlice";

const Map = () =>{


    const points = useSelector(state => state.justPins.coordinates);
    // console.log(points);

    return (
        <div>
            {/*<h1>Map with Multiple Points</h1>*/}
            {points.map((point, index) => (<MapWithPins points={points} key={index} />))}

        </div>
    );
}

export default Map;