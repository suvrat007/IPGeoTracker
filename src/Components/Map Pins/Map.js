import MapWithPins from "./MapWithPins";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {deleteCoordinates, setCoordinates} from "../../Utils/Redux/justPinsSlice";
import ShowCoordinates from "../Header/ShowCoordinates";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const Map = () => {
    const dispatch = useDispatch();
    const places = useRef(new Set());
    const fetchedIp = useRef(new Set());
    const [toggle, setToggle] = useState(false);
    const fileName = useSelector(state => state.fileName);
    const paths = useSelector(store => store.data.dataList);

    paths.forEach(ip => {
        places.current.add(ip.src);
        places.current.add(ip.dst);
    });

    useEffect(() => {
        const fetchCoordinates = async () => {
            dispatch(deleteCoordinates());
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
    }, [dispatch, fileName, paths]);

    const points = useSelector(state => state.justPins.coordinates);


    return (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-black">
            <div className="hidden md:flex h-full">
                <div className="w-3/4 h-full">
                    <MapWithPins points={points} />
                </div>
                <div className="w-1/4 h-full text-white flex flex-col bg-black border-l border-gray-700">
                    <div className="flex-shrink-0 border-b border-gray-700">
                        <Header fileName={fileName} />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <ShowCoordinates points={points} />
                        <div className="border-t border-gray-700 p-4 text-center">
                            <p className="text-lg leading-relaxed">
                                All the Packet pins Covered. You can now see where all your{' '}
                                <span className="text-orange-300">TCP packets</span> travelled.
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 bg-[#524CCE] p-4 border-t-2 border-[#524CCE]">
                        <h1 className="text-3xl leading-8">TRACE</h1>
                        <h1 className="text-3xl leading-8">FILE PACKETS</h1>
                        <h1 className="text-3xl leading-8">AROUND THE GLOBE</h1>
                    </div>
                </div>
            </div>

            <div className="md:hidden flex flex-col h-full">
                <div className="h-1/2 w-full">
                    <MapWithPins points={points} />
                </div>

                <div className="h-1/2 w-full text-white flex flex-col bg-black border-t border-gray-700 ">

                    <div className="flex-1 overflow-y-auto">
                        <div className="flex-shrink-0 border-b border-gray-700">
                            <Header fileName={fileName} />
                        </div>
                        <ShowCoordinates points={points}/>
                        <div className="border-t border-gray-700 p-4 text-center">
                            <p className="text-sm leading-relaxed">
                                All the Packet pins Covered. You can now see where all your{' '}
                                <span className="text-orange-300">TCP packets</span> travelled.
                            </p>
                        </div>
                        <div className="flex-shrink-0 bg-[#524CCE] p-3 border-t-2 border-[#524CCE]">
                            <h1 className="text-2xl leading-7">TRACE</h1>
                            <h1 className="text-2xl leading-7">FILE PACKETS</h1>
                            <h1 className="text-2xl leading-7">AROUND THE GLOBE</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Map;