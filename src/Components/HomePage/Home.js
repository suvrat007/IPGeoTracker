import Body from "./Body";
import Information from "./Information";
import { useEffect } from "react";
import { emptyAddress } from "../../Utils/Redux/dataSlice";
import { deleteCoordinates } from "../../Utils/Redux/justPinsSlice";
import { deletePathPair } from "../../Utils/Redux/locationSlice";
import { useDispatch } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const clearData = () => {
            dispatch(emptyAddress());
            dispatch(deleteCoordinates());
            dispatch(deletePathPair());
        };
        clearData();
    }, [dispatch]);

    return (
        <div className="flex flex-col w-full">
            <Body />
            <Information />
        </div>
    );
};

export default Home;