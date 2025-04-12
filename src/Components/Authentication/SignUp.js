import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Utils/firebaseConfig';
import { checkValidateData } from '../../Utils/Validate';
import { useDispatch } from 'react-redux';
import { switchLogin } from '../../Utils/Redux/loggedinSlice';
import {data, useNavigate} from 'react-router';
import { FiLock, FiMail, FiUser } from "react-icons/fi"; // Added FiUser for name field
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../Utils/firebaseConfig';

const SignUp = () => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleForm = () => {
        navigate('/login');
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!name || !email || !password) {
            setErrorMessage("All fields are required!");
            return;
        }

        const validationMsg = checkValidateData(email, password);
        if (validationMsg) {
            setErrorMessage(validationMsg);
            return;
        }

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCred.user;

            // Save user details to Firestore
            await setDoc(doc(firestore, "users", user.uid), {
                name: name,
                email: email,
                userName:userName,
                createdAt: new Date(),
            });

            dispatch(switchLogin(user.uid));
            navigate('/');
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("This email is already in use.");
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className={'w-full h-screen flex absolute top-0 bg-black text-white'}>
            <div className={'bg-[#D9D9D9] w-[50%]'}>
                <div className={'absolute top-0 left-[15em]'}>
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
                <div className={'absolute top-[8em] left-0'}>
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
                                <stop offset="0.14" stopColor="#524CCE" />
                                <stop offset="0.63" stopColor="#E38A63" />
                                <stop offset="1" stopColor="#453FAC" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className={'absolute bottom-0 left-[10em]'}>
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
                                <stop offset="0.14" stopColor="#524CCE" />
                                <stop offset="0.63" stopColor="#E38A63" />
                                <stop offset="1" stopColor="#453FAC" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className={'relative w-full h-screen flex flex-col justify-center items-center text-black'}>
                    <h1 className={'text-[9em]'}>PacketLENS</h1>
                </div>
            </div>
            <div className={'relative flex flex-col justify-center items-center w-[50%]'}>
                <form className="flex flex-col w-[75%] h-full justify-center items-center">
                    <div className={'flex flex-col justify-center items-center w-full mb-10'}>
                        <h1 className="text-6xl text-white pb-2">Sign Up</h1>
                        <h1 className="text-2xl text-white">Join us to find packets around the globe</h1>
                    </div>
                    <div className={'flex flex-col justify-center text-xl items-center w-full'}>
                        <div
                            className="flex items-center border-2 w-full m-4 border-gray-300 rounded px-3 py-2 bg-black text-white">
                            <FiUser className="text-gray-500 mr-2" size={20}/>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="bg-black w-full focus:outline-none ml-10"
                            />
                        </div>

                        <div
                            className="flex items-center border-2 w-full m-4 border-gray-300 rounded px-3 py-2 bg-black text-white">
                            <FiUser className="text-gray-500 mr-2" size={20}/>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="@username"
                                className="bg-black w-full focus:outline-none ml-10"
                            />
                        </div>
                        <div
                            className="flex items-center border-2 w-full m-4 border-gray-300 rounded px-3 py-2 bg-black text-white">
                            <FiMail className="text-gray-500 mr-2" size={20}/>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Id"
                                className="bg-black w-full focus:outline-none ml-10"
                            />
                        </div>
                        <div
                            className="flex items-center border-2 border-gray-300 w-full m-4 rounded px-3 py-2 bg-black text-white">
                            <FiLock className="text-gray-500 mr-2" size={20}/>
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
                        onClick={handleSignup}
                        className="p-3 my-3 w-full bg-blue-800 text-white rounded-md text-xl"
                    >
                        Sign Up
                    </button>
                    <p className="my-3 text-white cursor-pointer hover:underline hover:text-blue-800"
                       onClick={toggleForm}>
                        Already a user? Log In here!
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;