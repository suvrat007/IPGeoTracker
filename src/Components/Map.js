import MapWithPins from "./MapWithPins";
import {useSelector} from "react-redux";
import store from "../Utils/store";
const Map = () =>{
    const paths = useSelector(store=> store.data.dataList);
    console.log(paths);



    return (
        <div>
            <h1>Map with Multiple Points</h1>
            <MapWithPins />
        </div>
    );
}

export default Map;