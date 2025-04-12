import { useDispatch, useSelector } from "react-redux";
import { addPathPair, deletePathPair } from "../../Utils/Redux/locationSlice";
import React, { useEffect, useState } from "react";
import MapShowPath from "./MapShowPath";
import { Link } from "react-router-dom";
import DisplayUserFiles from "../../Utils/DisplayUserFiles";
import { emptyAddress } from "../../Utils/Redux/dataSlice";
import { deleteCoordinates } from "../../Utils/Redux/justPinsSlice";
import ShowCoordinates from "../Header/ShowCoordinates";
import Header from "../Header/Header";

const MapPath = () => {
    const dispatch = useDispatch();
    const ips = useSelector((state) => state.data.dataList); // IP pairs
    const [toggle, setToggle] = useState(false);

    const fetchData = async (ip) => {
        try {
            const response = await fetch(
                `https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
            );
            // console.log(response);
            return await response.json();
        } catch (error) {
            console.error("Error fetching IP data:", error);
            return null;
        }
    };

    useEffect(() => {
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


    }, []);

    const handleReRender = () => {
        setToggle((prev) => !prev);
    };

    const points = useSelector((state) => state.location.pathObjects);
    // console.log(points);

    const uniquePoints = new Set()
    // Add unique coordinates to the set
    points.filter((point) =>
                (point[0]?.location?.latitude && point[0]?.location?.longitude) ||
                (point[1]?.location?.latitude && point[1]?.location?.longitude)
        )
        .forEach((point) => {
            if (point[0]?.location?.latitude && point[0]?.location?.longitude) {
                uniquePoints.add(JSON.stringify([point[0].location.latitude, point[0].location.longitude]));
            }
            if (point[1]?.location?.latitude && point[1]?.location?.longitude) {
                uniquePoints.add(JSON.stringify([point[1].location.latitude, point[1].location.longitude]));
            }
        });

    // Convert Set to an array of parsed coordinates
    const coordinatesArray = Array.from(uniquePoints).map((coord) => JSON.parse(coord));
    // console.log(coordinatesArray);
    return (
        <div className="flex bg-black h-screen">

            <div className="w-[76%] h-[90vh]  mt-[4.15%]">
                <MapShowPath points={points} coordinatesArray={coordinatesArray} />
            </div>

            {/* Sidebar */}
            <div className="w-[22%] mr-[1.9em] h-full fixed right-0 top-0 pt-14 backdrop-blur-2xl text-white flex flex-col bg-black bg-opacity-70">
                {/* Header */}
                <div className="flex justify-between items-center pt-2 w-full">
                    <Header/>
                </div>

                {/* Coordinates */}
                <div className="flex-1 overflow-y-auto">

                    {/*<ShowCoordinates points={coordinatesArray} />*/}
                    <ShowCoordinates points={points} />
                    <div className="border-t p-3 text-center text-lg">
                        <p>
                            All the Path Routes Covered. Your file was automatically added to
                        </p>
                        <p>
                            <span className="text-[#E38A63] cursor-pointer">
                                <Link to={'/profile'}>YOUR FILES</Link>
                            </span>
                        </p>
                    </div>

                    <div className="bg-[#524CCE] p-2 border-t-2 py-4">
                        <h1 className="text-3xl leading-8">TRACE</h1>
                        <h1 className="text-3xl leading-8">FILE PACKETS</h1>
                        <h1 className="text-3xl leading-8">AROUND THE GLOBE</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPath;