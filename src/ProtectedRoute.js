import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state=>state.login.isLoggedin)

    if (!isAuthenticated) {

        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;