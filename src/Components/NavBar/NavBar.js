import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { auth } from "../../Utils/firebaseConfig";
import { logout } from "../../Utils/Redux/loggedinSlice";
import { emptyAddress } from "../../Utils/Redux/dataSlice";
import { deleteCoordinates } from "../../Utils/Redux/justPinsSlice";
import { deletePathPair } from "../../Utils/Redux/locationSlice";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        auth.signOut();
        dispatch(logout());
        setIsMenuOpen(false);
    };

    const handleClick = () => {
        navigate("/");
        setIsMenuOpen(false);
    };

    const handleProfileClick = () => {
        dispatch(emptyAddress());
        dispatch(deleteCoordinates());
        dispatch(deletePathPair());
        navigate("/profile");
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-black w-full z-50 sticky top-0">
            <div className="flex justify-between items-center text-white px-4 sm:px-6 md:px-10 md:py-3 py-5 max-w-[1440px] mx-auto">
                <div className="flex items-center">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClick} className="cursor-pointer">
                        <circle cx="14" cy="14" r="14" fill="url(#paint0_linear_774_3855)" />
                        <defs>
                            <linearGradient id="paint0_linear_774_3855" x1="3.5" y1="24.5" x2="21.5" y2="9.5" gradientUnits="userSpaceOnUse">
                                <stop offset="0.14" stopColor="#524CCE" />
                                <stop offset="0.63" stopColor="#E38A63" />
                                <stop offset="1" stopColor="#453FAC" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <h1 className="ml-4 text-lg sm:text-xl font-semibold">PacketLens</h1>
                </div>

                <div className="hidden md:flex flex-row items-center gap-8 text-sm sm:text-base">
                    <Link to="/" onClick={() => { dispatch(emptyAddress()); dispatch(deleteCoordinates()); dispatch(deletePathPair()); }} className="hover:text-gray-300">Home</Link>
                    {isLoggedIn ? (
                        <>
                            <button onClick={handleLogout} className="bg-[#453FAC] px-4 py-2 rounded-full hover:bg-[#524CCE] transition">SignOut</button>
                            <img src="https://www.svgrepo.com/show/335455/profile-default.svg" className="w-8 h-8 cursor-pointer" onClick={handleProfileClick} alt="Profile" />
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">SignIn</Link>
                            <Link to="/signup" className="bg-[#453FAC] px-4 py-2 rounded-full hover:bg-[#524CCE] transition">SignUp</Link>
                        </>
                    )}
                </div>

                <button className="md:hidden text-2xl" onClick={toggleMenu} aria-label="Toggle menu">
                    <FiMenu />
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center md:hidden">
                    <button className="absolute top-4 right-4 text-3xl text-white" onClick={toggleMenu} aria-label="Close menu">
                        <FiX />
                    </button>
                    <div className="flex flex-col items-center gap-6 text-lg text-white">
                        <Link to="/" onClick={() => { dispatch(emptyAddress()); dispatch(deleteCoordinates()); dispatch(deletePathPair()); setIsMenuOpen(false); }} className="hover:text-gray-300">Home</Link>
                        {isLoggedIn ? (
                            <>
                                <button onClick={handleLogout} className="bg-[#453FAC] px-6 py-3 rounded-full hover:bg-[#524CCE] transition text-lg">SignOut</button>
                                <p onClick={handleProfileClick}>Profile</p>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>SignIn</Link>
                                <Link to="/signup" className="bg-[#453FAC] px-6 py-3 rounded-full hover:bg-[#524CCE] transition text-lg" onClick={() => setIsMenuOpen(false)}>SignUp</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
