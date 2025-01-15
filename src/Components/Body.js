import {Link} from "react-router-dom";

import data from "../Utils/test4.json";
import {useDispatch, useSelector} from "react-redux";
import {addAddress} from "../Utils/dataSlice";
import {useEffect} from "react";
import {setCoordinates} from "../Utils/justPinsSlice";

const Body = () =>{

    const dispatch = useDispatch();


    // grp ips as [src, dst]
    useEffect(() => {
        // Use a Set to store unique stringified pairs
        const uniquePairs = new Set();

        data.map((item) => {
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

    return(
        <div className="absolute flex flex-col border-2 text-lg top-1/2 left-1/2 origin-center">
            <div className="flex flex-col">
                <h1>Want to know where does your request travel?</h1>
            </div>
            <div className="flex flex-col text-center">
                <input type="file" accept=".json"/>
                <div className="flex flex-row">
                    <button className="border-2"><Link to="/map">Map with only pins</Link></button>
                    <button className="border-2"><Link to="/mapPath">Map with path</Link></button>
                </div>

            </div>

        </div>
    )
}
export default Body;