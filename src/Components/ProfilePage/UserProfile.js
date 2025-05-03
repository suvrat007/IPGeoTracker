import React from 'react';
import {auth} from "../../Utils/firebaseConfig";
import {logout} from "../../Utils/Redux/loggedinSlice";
import {useDispatch} from "react-redux";
import { doc, getDoc } from 'firebase/firestore';
import {firestore } from '../../Utils/firebaseConfig';
import { useEffect, useState } from 'react';



const UserProfile = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) return;

                const userDocRef = doc(firestore, "users", currentUser.uid);
                const userSnap = await getDoc(userDocRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                } else {
                    console.log("No user document found!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout=()=>{
        auth.signOut();
        dispatch(logout());
    }


    return (

        <div className="bg-[#453FAC] min-h-screen p-12 text-white relative">
            {/* Header with Profile Picture, Name, and Buttons */}
            <div className="flex items-center space-x-6 mb-10">
                {/* Profile Picture */}
                <div className="w-32 h-32">
                    <svg
                        width="124"
                        height="124"
                        viewBox="0 0 124 124"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="124" height="124" rx="62" fill="#EADDFF" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M80.6008 49.6C80.6008 59.8725 72.2733 68.2 62.0008 68.2C51.7283 68.2 43.4008 59.8725 43.4008 49.6C43.4008 39.3275 51.7283 31 62.0008 31C72.2733 31 80.6008 39.3275 80.6008 49.6ZM74.4008 49.6C74.4008 56.4483 68.8491 62 62.0008 62C55.1524 62 49.6008 56.4483 49.6008 49.6C49.6008 42.7517 55.1524 37.2 62.0008 37.2C68.8491 37.2 74.4008 42.7517 74.4008 49.6Z"
                            fill="#4F378A"
                        />
                        <path
                            d="M62.0008 77.5C41.9302 77.5 24.8295 89.3681 18.3154 105.995C19.9023 107.571 21.574 109.062 23.3229 110.459C28.1736 95.1939 43.3906 83.7 62.0008 83.7C80.611 83.7 95.8279 95.1939 100.679 110.459C102.428 109.062 104.099 107.571 105.686 105.995C99.1721 89.3681 82.0714 77.5 62.0008 77.5Z"
                            fill="#4F378A"
                        />
                    </svg>
                </div>
                <div className="flex flex-col justify-between gap-6">

                    <div>
                        <h1 className="text-3xl font-bold">{userData?.name || ""}</h1>
                            <h2 className="text-lg text-gray-300">@{userData?.userName || ""}</h2>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-gray-500 text-white px-6 py-2 rounded-full">
                            Edit Profile
                        </button>
                        <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-200"
                                onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Details Section */}
            <div className="flex flex-col gap-6">
                <div className="border border-gray-300 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-200">First Name</label>
                    <input
                        type="text"
                        value={userData?.name?.split(" ")[0] || ""}
                        readOnly
                        className="w-full bg-transparent text-white border-none focus:outline-none text-lg"
                    />
                </div>
                <div className="border border-gray-300 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-200">Middle name + Last Name</label>
                    <input
                        type="text"
                        value={userData?.name?.split(" ").slice(1).join(" ") || ""}
                        readOnly
                        className="w-full bg-transparent text-white border-none focus:outline-none text-lg"
                    />
                </div>
                <div className="border border-gray-300 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-200">Email Id</label>
                    <input
                        type="text"
                        value={userData?.email?.split("@")[0] || ""}
                        readOnly
                        className="w-full bg-transparent text-white border-none focus:outline-none text-lg"
                    />
                </div>

            </div>

            {/* Footer with PacketLens Text */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                <h1 className="text-[8.5rem] font-bold text-black">PacketLENS</h1>
            </div>
        </div>
    );
};

export default UserProfile;