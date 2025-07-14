import { useDispatch, useSelector } from "react-redux";
import { addPathPair, deletePathPair } from "../../Utils/Redux/locationSlice";
import React, { useEffect, useState } from "react";
import MapShowPath from "./MapShowPath";
import { Link } from "react-router-dom";
import ShowCoordinates from "../Header/ShowCoordinates";
import Header from "../Header/Header";

const MapPath = () => {
    const dispatch = useDispatch();
    const ips = useSelector((state) => state.data.dataList);
    const fileName = useSelector((state) => state.fileName);
    const points = useSelector((state) => state.location.pathObjects);

    const fetchData = async (ip) => {
        try {
            const response = await fetch(
                `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error("Error fetching IP data:", error);
            return null;
        }
    };

    useEffect(() => {
        dispatch(deletePathPair());
        const set = new Set();

        ips.forEach(async (ip) => {
            const a = await fetchData(ip.src);
            const b = await fetchData(ip.dst);

            const pair = JSON.stringify([a, b].sort());
            if (!set.has(pair)) {
                set.add(pair);
                dispatch(addPathPair([a, b]));
            }
        });
    }, [ips, fileName]);

    const uniquePoints = new Set();
    points
        .filter(
            (point) =>
                (point[0]?.location?.latitude && point[0]?.location?.longitude) ||
                (point[1]?.location?.latitude && point[1]?.location?.longitude)
        )
        .forEach((point) => {
            if (point[0]?.location) {
                uniquePoints.add(JSON.stringify([point[0].location.latitude, point[0].location.longitude]));
            }
            if (point[1]?.location) {
                uniquePoints.add(JSON.stringify([point[1].location.latitude, point[1].location.longitude]));
            }
        });

    const coordinatesArray = Array.from(uniquePoints).map((coord) => JSON.parse(coord));

    return (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-black">
            <div className="hidden md:flex h-full">
                <div className="w-3/4 h-full">
                    <MapShowPath points={points} coordinatesArray={coordinatesArray} />
                </div>

                <div className="w-1/4 h-full text-white flex flex-col bg-black border-l border-gray-700">
                    <div className="flex-shrink-0 border-b border-gray-700">
                        <Header fileName={fileName} />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <ShowCoordinates points={points} />

                        <div className="border-t border-gray-700 p-4 text-center">
                            <p className="text-lg leading-relaxed">
                                All the Path Routes Covered. Your file was automatically added to{" "}
                                <span className="text-[#E38A63]">
                                    <Link to="/profile" className="underline hover:text-orange-400 transition">
                                        YOUR FILES
                                    </Link>
                                </span>
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
                    <MapShowPath points={points} coordinatesArray={coordinatesArray} />
                </div>

                <div className="h-1/2 w-full text-white flex flex-col bg-black border-t border-gray-700">
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex-shrink-0 border-b border-gray-700">
                            <Header fileName={fileName} />
                        </div>

                        <ShowCoordinates points={points} />

                        <div className="border-t border-gray-700 p-4 text-center">
                            <p className="text-sm leading-relaxed">
                                All the Path Routes Covered. Your file was automatically added to{" "}
                                <span className="text-[#E38A63]">
                                    <Link to="/profile" className="underline hover:text-orange-400 transition">
                                        YOUR FILES
                                    </Link>
                                </span>
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

export default MapPath;
