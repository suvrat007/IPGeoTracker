import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebaseConfig";
import { checkValidateData } from "../../Utils/Validate";
import { useDispatch } from "react-redux";
import { switchLogin } from "../../Utils/Redux/loggedinSlice";
import { useNavigate } from "react-router";
import { FiLock, FiMail } from "react-icons/fi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleForm = () => navigate("/signup");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Email and password are required!");
            return;
        }

        const validationMsg = checkValidateData(email, password);
        if (validationMsg) {
            setErrorMessage(validationMsg);
            return;
        }

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            dispatch(switchLogin(userCred.user.uid));
            navigate("/");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setErrorMessage("No account found with this email.");
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage("Incorrect password.");
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-black text-white overflow-hidden mx-auto">
            <div className="hidden sm:flex flex-row min-h-screen">
                {/* Left Section (Original) */}
                <div className="relative w-[50%] bg-[#D9D9D9]">
                    <div className="absolute top-0 left-[15em]">
                        <svg
                            width="460"
                            height="298"
                            viewBox="0 0 460 298"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="230" cy="68" r="230" fill="url(#paint0_linear_782_5453)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_782_5453"
                                    x1="57.5"
                                    y1="240.5"
                                    x2="353.214"
                                    y2="-5.92861"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.14" stopColor="#524CCE" />
                                    <stop offset="0.63" stopColor="#E38A63" />
                                    <stop offset="1" stopColor="#453FAC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="absolute top-[8em] left-0">
                        <svg
                            width="176"
                            height="460"
                            viewBox="0 0 176 460"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="-54" cy="230" r="230" fill="url(#paint0_linear_782_5459)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_782_5459"
                                    x1="-226.5"
                                    y1="402.5"
                                    x2="69.2143"
                                    y2="156.071"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.14" stopColor="#524CCE" />
                                    <stop offset="0.63" stopColor="#E38A63" />
                                    <stop offset="1" stopColor="#453FAC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-[10em]">
                        <svg
                            width="460"
                            height="294"
                            viewBox="0 0 460 294"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="230" cy="230" r="230" fill="url(#paint0_linear_782_5456)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_782_5456"
                                    x1="57.5"
                                    y1="402.5"
                                    x2="353.214"
                                    y2="156.071"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.14" stopColor="#524CCE" />
                                    <stop offset="0.63" stopColor="#E38A63" />
                                    <stop offset="1" stopColor="#453FAC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="relative w-full h-full flex flex-col justify-center items-center text-black">
                        <h1 className="text-[9em] ">PacketLENS</h1>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div className="relative w-[50%] flex flex-col justify-center items-center">
                    <form className="flex flex-col w-[75%] h-full justify-center items-center">
                        <div className="flex flex-col justify-center items-center w-full mb-10">
                            <h1 className="text-6xl font-semibold text-white pb-2">Sign In</h1>
                            <h2 className="text-2xl text-white text-center leading-tight">
                                Welcome Back, find the packets around the globe
                            </h2>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full text-base sm:text-lg">
                            <div className="flex items-center border-2 w-full m-2 sm:m-4 border-gray-300 rounded-lg px-3 py-2 bg-black">
                                <FiMail className="text-gray-300 mr-2" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Id"
                                    className="bg-black w-full focus:outline-none ml-2 sm:ml-4"
                                    aria-label="Email"
                                />
                            </div>
                            <div className="flex items-center border-2 w-full m-2 sm:m-4 border-gray-300 rounded-lg px-3 py-2 bg-black">
                                <FiLock className="text-gray-300 mr-2" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="bg-black w-full focus:outline-none ml-2 sm:ml-4"
                                    aria-label="Password"
                                />
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-xs sm:text-sm mt-2">{errorMessage}</p>
                            )}
                        </div>
                        <button
                            onClick={handleLogin}
                            className="p-3 my-3 w-full bg-[#453FAC] text-white rounded-md text-base sm:text-lg font-medium hover:bg-[#524CCE] hover:scale-105 transition"
                            aria-label="Log In"
                        >
                            Log In
                        </button>
                        <p
                            className="my-3 text-center text-sm sm:text-base text-white cursor-pointer hover:underline hover:text-[#E38A63]"
                            onClick={toggleForm}
                        >
                            New here? Sign Up NOW!
                        </p>
                    </form>
                </div>
            </div>

            <div className="sm:hidden w-full min-h-screen relative flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-40 opacity-20">
                        <svg
                            width="256"
                            height="166"
                            viewBox="0 0 460 298"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="230" cy="68" r="230" fill="url(#paint0_linear_1)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_1"
                                    x1="57.5"
                                    y1="240.5"
                                    x2="353.214"
                                    y2="-5.92861"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.14" stopColor="#524CCE" />
                                    <stop offset="0.63" stopColor="#E38A63" />
                                    <stop offset="1" stopColor="#453FAC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="absolute top-32 left-0 opacity-20">
                        <svg
                            width="98"
                            height="256"
                            viewBox="0 0 176 460"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="-54" cy="230" r="230" fill="url(#paint0_linear_2)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_2"
                                    x1="-226.5"
                                    y1="402.5"
                                    x2="69.2143"
                                    y2="156.071"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.14" stopColor="#524CCE" />
                                    <stop offset="0.63" stopColor="#E38A63" />
                                    <stop offset="1" stopColor="#453FAC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="absolute bottom-0 right-40 opacity-20">
                        <svg
                            width="256"
                            height="164"
                            viewBox="0 0 460 294"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="230" cy="230" r="230" fill="url(#paint0_linear_3)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_3"
                                    x1="57.5"
                                    y1="402.5"
                                    x2="353.214"
                                    y2="156.071"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.14" stopColor="#524CCE" />
                                    <stop offset="0.63" stopColor="#E38A63" />
                                    <stop offset="1" stopColor="#453FAC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className="z-10 w-full max-w-md px-6 py-10 bg-black bg-opacity-90 rounded-lg shadow-lg backdrop-blur-md">
                    <form className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold mb-2">Sign In</h1>
                        <p className="text-lg text-center mb-8">
                            Welcome Back, find the packets around the globe
                        </p>
                        <div className="w-full space-y-4">
                            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-3 bg-black focus-within:border-[#524CCE] transition-colors">
                                <FiMail className="text-gray-300 mr-2" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="bg-black w-full focus:outline-none text-white"
                                    aria-label="Email"
                                />
                            </div>
                            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-3 bg-black focus-within:border-[#524CCE] transition-colors">
                                <FiLock className="text-gray-300 mr-2" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="bg-black w-full focus:outline-none text-white"
                                    aria-label="Password"
                                />
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                            )}
                            <button
                                onClick={handleLogin}
                                className="w-full py-3 mt-4 bg-[#453FAC] hover:bg-[#524CCE] hover:scale-105 transition-colors text-white rounded-md font-semibold text-lg"
                                aria-label="Log In"
                            >
                                Log In
                            </button>
                            <p
                                className="mt-4 text-center text-white hover:underline hover:text-[#E38A63] cursor-pointer"
                                onClick={toggleForm}
                            >
                                New here? Sign Up NOW!
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;