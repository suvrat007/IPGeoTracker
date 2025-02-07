import {Outlet, useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../Utils/firebaseConfig";
import {loggedIn} from "../Utils/loggedinSlice";
import Body from "./Body";
import Spline from "@splinetool/react-spline";

const RouteComp = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(loggedIn(user.uid))
                navigate('/');
            }
        });
        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, [dispatch, navigate]);
    return (
        <div >
            <Outlet/>
        </div>
    )
}
export default RouteComp;