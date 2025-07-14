import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const ProtectedRouteMaps = ({ children }) => {
    const data = useSelector(state=>state.data.dataList)
    if (data.length === 0) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRouteMaps;