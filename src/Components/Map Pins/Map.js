import MapWithPins from "./MapWithPins";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { setCoordinates } from "../../Utils/Redux/justPinsSlice";
import ShowCoordinates from "../Header/ShowCoordinates";
import Header from "../Header/Header";
import {Link} from "react-router-dom";

const Map = () => {
    const dispatch = useDispatch();
    const places = useRef(new Set());
    const fetchedIp = useRef(new Set());
    const [toggle, setToggle] = useState(false);

    const paths = useSelector(store => store.data.dataList);
    paths.forEach(ip => {
        places.current.add(ip.src);
        places.current.add(ip.dst);
    });

    useEffect(() => {
        const fetchCoordinates = async () => {
            for (const ip of places.current) {
                if (!fetchedIp.current.has(ip)) {
                    fetchedIp.current.add(ip);
                    const response = await fetch(
                        `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
                    );
                    const json = await response.json();
                    if (json?.location) {
                        dispatch(setCoordinates(json));
                    }
                }
            }
        };
        fetchCoordinates();
    }, [dispatch]);

    const points = useSelector(state => state.justPins.coordinates);
    const handleReRender = () => setToggle(prev => !prev);

    console.log(points);
    return (
        <div className="flex bg-black h-screen">
            {/* Map Section */}
            <div className="w-[80%] h-[91vh] mt-[4.5%] -ml-[1.8em]">
                <MapWithPins points={points} />
            </div>

            {/* Sidebar */}
            <div className="w-[22%] mr-[1.9em] h-full fixed right-0 top-0 pt-14 backdrop-blur-2xl text-white flex flex-col  bg-black bg-opacity-70">
                {/* Header */}
                <div className="flex justify-between items-center pt-2 w-full">
                    <Header/>
                </div>

                {/* Coordinates */}
                <div className="flex-1 overflow-y-auto">
                    <ShowCoordinates points={points}/>
                    <div className="border-t p-3 text-center text-lg">
                        <p>
                            All the Packet pins Covered. Your file was automatically added to
                        </p>
                        <p>
                            <span className="text-[#E38A63] cursor-pointer">
                                <Link to={'/profile'}>YOUR FILES</Link>
                            </span>
                        </p>
                    </div>

                    <div className="bg-[#524CCE] p-2 border-t-2 py-4 ">
                        <h1 className="text-3xl  leading-8">TRACE</h1>
                        <h1 className="text-3xl  leading-8">FILE PACKETS</h1>
                        <h1 className="text-3xl  leading-8">AROUND THE GLOBE</h1>
                    </div>
                </div>

                {/* Footer */}

            </div>
        </div>
    );
};

export default Map;
