import {useEffect} from "react";
// import data from "../Utils/test4.json";
import {addAddress} from "../Utils/dataSlice";
import {useDispatch} from "react-redux";

const useDataLoader = (data) =>{
    const dispatch = useDispatch();
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
}
export default useDataLoader;
