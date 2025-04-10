import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Utils/firebaseConfig';
import { checkValidateData } from '../../Utils/Validate';
import { useDispatch } from 'react-redux';
import { switchLogin } from '../../Utils/Redux/loggedinSlice';
import { useNavigate } from 'react-router';
import {FiLock, FiMail} from "react-icons/fi";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleForm = () => {
        navigate('/signup');
    }

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
            navigate('/');
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
        <div className={'w-full h-screen flex absolute top-0 bg-black text-white '}>
            <div className={'bg-[#D9D9D9] w-[50%]'}>
                <div className={'absolute top-0 left-[15em] '}>
                    <svg
                        width="460"
                        height="298"
                        viewBox="0 0 460 298"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="230"
                            cy="68"
                            r="230"
                            fill="url(#paint0_linear_782_5453)"
                        />
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
                <div className={'absolute top-[8em] left-0 '}>
                    <svg
                        width="176"
                        height="460"
                        viewBox="0 0 176 460"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="-54"
                            cy="230"
                            r="230"
                            fill="url(#paint0_linear_782_5459)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_782_5459"
                                x1="-226.5"
                                y1="402.5"
                                x2="69.2143"
                                y2="156.071"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0.14" stopColor="#524CCE"/>
                                <stop offset="0.63" stopColor="#E38A63"/>
                                <stop offset="1" stopColor="#453FAC"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className={'absolute bottom-0 left-[10em] '}>
                    <svg
                        width="460"
                        height="294"
                        viewBox="0 0 460 294"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="230"
                            cy="230"
                            r="230"
                            fill="url(#paint0_linear_782_5456)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_782_5456"
                                x1="57.5"
                                y1="402.5"
                                x2="353.214"
                                y2="156.071"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0.14" stopColor="#524CCE"/>
                                <stop offset="0.63" stopColor="#E38A63"/>
                                <stop offset="1" stopColor="#453FAC"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className={'relative w-full h-screen flex flex-col justify-center items-center text-black'}>
                    <h1 className={'text-[9em]'}>PacketLENS</h1>
                </div>

            </div>
            <div className={'relative flex flex-col  justify-center items-center w-[50%] '}>
                <form className="flex flex-col w-[75%] h-full justify-center items-center">
                    <div className={'flex flex-col justify-center items-center w-full mb-10'}>
                        <h1 className="text-6xl text-white pb-2">Sign In</h1>
                        <h1 className="text-2xl text-white">Welcome Back, find the packets around the globe</h1>
                    </div>
                    <div className={'flex flex-col justify-center text-xl items-center w-full '}>
                        <div className="flex items-center border-2 w-full m-4 border-gray-300 rounded px-3 py-2 bg-black text-white">
                            <FiMail className="text-gray-500 mr-2" size={20}/>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Id"
                                className="bg-black w-full focus:outline-none ml-10"
                            />
                        </div>

                        <div className="flex items-center border-2 border-gray-300 w-full m-4 rounded px-3 py-2 bg-black text-white">
                            <FiLock className="text-gray-500 mr-2" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="bg-black w-full focus:outline-none ml-10"
                            />
                        </div>


                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    </div>


                    <button
                        onClick={handleLogin}
                        className="p-3 my-3 w-full bg-blue-800 text-white rounded-md text-xl"
                    >
                        Log In
                    </button>

                    <p className="my-3 text-white cursor-pointer hover:underline hover:text-blue-800" onClick={toggleForm}>
                        New here? Sign Up NOW!
                    </p>
                </form>

            </div>
        </div>
    );
};


export default Login;