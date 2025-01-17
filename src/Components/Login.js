import React, {useState} from 'react';
import {auth} from "../Utils/firebaseConfig";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {checkValidateData} from "../Utils/Validate";
import {useDispatch} from "react-redux";
import {switchLogin} from "../Utils/loggedinSlice";

const Login = () => {
    // const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name , setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSignInForm, setIsSignInForm] = useState(false);


    const dispatch = useDispatch();
    const handleButtonClick = (e) => {

        // Validate Data
        const message = checkValidateData(email, password);
        setErrorMessage(message);
        if(message) return;

        e.preventDefault(); // Prevent form from reloading the page
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(dispatch(switchLogin))
                .then((value) => console.log("User created:", value))
                .catch((error) => setErrorMessage(error.message)); // Handle errors
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(dispatch(switchLogin))
                .then((value) => console.log("User signed in:", value))
                .catch((error) => setErrorMessage(error.message)); // Handle errors
        }
    };

    const toggleSignIn = () =>{
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div className="w-3/12">
            <form className="flex flex-col">
                <h1 className="font-bold text-3xl py-3 my-2 text-white">{isSignInForm ? "Log In" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" placeholder="Full Name" onChange={(e)=> setName(e.target.value)} className="p-3 my-3 "/>}
                <input type="email" value={email} className="p-3 my-3" placeholder="EmailId" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Password" className="p-3 my-3" onChange={(e) => setPassword(e.target.value)}/>
                <p>{errorMessage}</p>
                <button type="submit"
                        onClick={handleButtonClick}
                        className="p-3 my-3 w-full bg-red-700 text-white rounded-lg">{isSignInForm ? "Log In" : "Sign Up"
                }</button>
                {!isSignInForm &&
                    <div className="p-2 m-2">
                        <p className="text-gray-500  font-medium">
                            Password must contain :
                            <ul className="text-gray-500 text-[12px] leading-4  font-medium">
                                <li>Atleast 8 Characters</li>
                                <li>Atleast 1 Uppercase character</li>
                                <li>Atleast 1 Special character</li>
                                <li>Atleast 1 Number</li>

                            </ul>
                        </p>
                    </div>
                }
                <p className="my-3 text-white cursor-pointer" onClick={toggleSignIn}>
                    {isSignInForm ? "New here? Sign Up NOW !" : "Already a user? Log In here."}</p>
            </form>
        </div>

    )
        ;
}
export default Login;