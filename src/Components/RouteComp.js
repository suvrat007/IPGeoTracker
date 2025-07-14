import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebaseConfig";
import { loggedIn } from "../Utils/Redux/loggedinSlice";
import NavBar from "./NavBar/NavBar";

const RouteComp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(loggedIn(user.uid));
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [dispatch, navigate]);

    return (
        <div className="w-full  mx-auto">
            <NavBar />
            <Outlet />
        </div>
    );
};

export default RouteComp;