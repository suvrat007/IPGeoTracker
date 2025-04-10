import {Outlet, useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../Utils/firebaseConfig";
import {loggedIn} from "../Utils/Redux/loggedinSlice";
import Body from "./HomePage/Body";
import Spline from "@splinetool/react-spline";
import NavBar from "./NavBar/NavBar";

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
        <>
            <div className={'w-[93%] m-auto'}>
                <div className="absolute flex flex-row top-0 left-0 bg-black w-full z-50">
                    <NavBar/>
                </div>
                <Outlet/>
            </div>
        </>

    )
}
export default RouteComp;