import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {emptyAddress} from "../../Utils/Redux/dataSlice";
import {deleteCoordinates} from "../../Utils/Redux/justPinsSlice";
import {deletePathPair} from "../../Utils/Redux/locationSlice";
import {auth} from "../../Utils/firebaseConfig";
import {logout} from "../../Utils/Redux/loggedinSlice";

const NavBar = () => {
    const isLoggedIn = useSelector(state => state.login.isLoggedin)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout=()=>{
        auth.signOut();
        dispatch(logout());
    }
    const handleClick = () => {
        dispatch(emptyAddress());
        dispatch(deleteCoordinates());
        dispatch(deletePathPair());
        navigate('/')
    }
    return (
        <div className="absolute flex flex-row top-0 left-0 bg-black w-full z-50">
            <div className="flex flex-row text-white w-full h-15 justify-between p-1 items-center mx-20">
                <div className="flex">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                         onClick={handleClick} className={'cursor-pointer'}>
                        <circle cx="14" cy="14" r="14" fill="url(#paint0_linear_774_3855)"/>
                        <defs>
                            <linearGradient id="paint0_linear_774_3855" x1="3.5" y1="24.5" x2="21.5" y2="9.5"
                                            gradientUnits="userSpaceOnUse">
                                <stop offset="0.14" stopColor="#524CCE"/>
                                <stop offset="0.63" stopColor="#E38A63"/>
                                <stop offset="1" stopColor="#453FAC"/>
                            </linearGradient>
                        </defs>
                    </svg>

                    <h1 className={'ml-4 text-xl'}>PacketLens</h1>

                    <div className="flex flex-col justify-center items-center text-md ml-20 cursor-pointer">
                        <Link to={"/"} onClick={() => {
                            dispatch(emptyAddress());
                            dispatch(deleteCoordinates());
                            dispatch(deletePathPair());
                        }}>
                            <p>Home</p>
                        </Link>

                    </div>
                </div>

                <div className={'flex '}>
                    {isLoggedIn ? (
                        <div className={'flex flex-row items-center justify-center'}>
                            <p className={'m-2 bg-[#453FAC] px-4 py-2 rounded-[100px] cursor-pointer'}
                               onClick={handleLogout}>SignOut</p>
                            <div >
                                <img src="https://www.svgrepo.com/show/335455/profile-default.svg"
                                     className={'w-10 cursor-pointer'}
                                     onClick={() => {
                                         dispatch(emptyAddress());
                                         dispatch(deleteCoordinates());
                                         dispatch(deletePathPair());
                                         navigate('/profile');
                                     }}/>
                            </div>
                        </div>

                    ) : (
                        <>
                            <p className={'px-4 py-2 m-2 cursor-pointer'}>
                                <Link to={'/login'}>SignIn</Link>
                            </p>
                            <p className={'bg-[#453FAC] px-4 py-2 m-2 rounded-[100px] cursor-pointer'}>
                                <Link to={'/signup'}>SignUp</Link>
                            </p>
                        </>

                    )}

                </div>
            </div>
        </div>
    )
}

export default NavBar