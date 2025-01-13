import {Link} from "react-router-dom";

import data from "../Utils/test.json";
import {useDispatch} from "react-redux";
import {addAddress} from "../Utils/dataSlice";
import {useEffect} from "react";

const Body = () =>{

    const dispatch = useDispatch();



    useEffect(() => {
        // Use a Set to store unique stringified pairs
        const uniquePairs = new Set();

        data.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];

            const pair = JSON.stringify([src, dst]);

            if (!uniquePairs.has(pair)) {
                // Add the pair to the Set and dispatch it
                uniquePairs.add(pair);
                dispatch(addAddress([src, dst]));
            }
        });
    }, []);

    // console.log(data)

    return(
        <div>
            <h1>Want to know where does your request travel?</h1>
            <input type="file" accept=".json"/>
            {/*{data.map((i) => {*/}
            {/*    dispatch(addAddress([i?._source?.layers?.ip["ip.src"], i?._source?.layers?.ip["ip.dst"]]));*/}
            {/*})}*/}
            <button className="border-2"><Link to="/map">Map</Link></button>
        </div>
    )
}
export default Body;