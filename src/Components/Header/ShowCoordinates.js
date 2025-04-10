import React, { useMemo, useState } from 'react';

const ShowCoordinates = ({ points }) => {
    const filteredPoints = useMemo(() => {
        if (!points || !Array.isArray(points)) return [];

        const flattened = points
            .flat()
            .filter(point =>
                point &&
                point.location &&
                typeof point.location.latitude === 'number' &&
                typeof point.location.longitude === 'number'
            );

        const seen = new Set();
        return flattened.filter(point => {
            const key = `${point.location.latitude.toFixed(6)},${point.location.longitude.toFixed(6)}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [points]);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    console.log('Filtered Points:', filteredPoints);

    return (
        <div>
            {filteredPoints.length > 0 ? (
                <div className="flex flex-row flex-wrap bg-black">
                    {filteredPoints.map((pin, index) => (
                        <div key={index} className="flex flex-row border-t-2 w-full">
                            <div className="w-[4em] flex flex-col justify-center items-center">
                                {expandedIndex !== index ? (
                                    <svg width="27" height="39" viewBox="0 0 27 39" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.1829 38.5342L1.76633 16.5146L24.5996 16.5146L13.1829 38.5342Z"
                                              fill="#453FAC"/>
                                        <ellipse cx="13.1826" cy="11.9273" rx="12.2411" ry="11.9273" fill="#453FAC"/>
                                        <ellipse cx="13.1825" cy="11.9273" rx="5.64976" ry="5.5049" fill="#D9D9D9"/>
                                    </svg>
                                ) : (<svg
                                    width="31"
                                    height="44"
                                    viewBox="0 0 31 44"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.5 44L2.07661 18.8571L28.9234 18.8571L15.5 44Z"
                                        fill="url(#paint0_linear)"
                                    />
                                    <ellipse
                                        cx="15.4998"
                                        cy="13.619"
                                        rx="14.3929"
                                        ry="13.619"
                                        fill="url(#paint1_linear)"
                                    />
                                    <ellipse
                                        cx="15.4998"
                                        cy="13.619"
                                        rx="6.64286"
                                        ry="6.28571"
                                        fill="white"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear"
                                            x1="15.5"
                                            y1="44"
                                            x2="15.5"
                                            y2="27.7895"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#453FAC"/>
                                            <stop offset="1" stopColor="#E38A63"/>
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear"
                                            x1="15.4998"
                                            y1="0"
                                            x2="15.4998"
                                            y2="27.2381"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#453FAC"/>
                                            <stop offset="1" stopColor="#E38A63"/>
                                        </linearGradient>
                                    </defs>
                                </svg>)}


                            </div>

                            <div className="flex flex-col justify-center w-full">
                                <div
                                    className="border-l-2 text-lg cursor-pointer hover:bg-gray-800"
                                    onClick={() => handleToggle(index)}
                                >
                                    <p className="p-2 pb-0 text-white backdrop-blur w-full">
                                        Lat: {pin.location.latitude.toFixed(6)}°
                                    </p>
                                    <p className="p-2 pt-0 text-white backdrop-blur w-full">
                                        Lng: {pin.location.longitude.toFixed(6)}°
                                    </p>
                                </div>
                                {/* Dropdown with transition */}
                                <div
                                    className={`border-l-2 text-lg bg-black bg-opacity-90 overflow-hidden transition-all duration-300 ease-in-out ${
                                        expandedIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="p-2 w-full border-b-2 border-t-2 flex items-center gap-2">
                                        <svg
                                            className="w-6 h-6 stroke-white"
                                            viewBox="0 0 23 23"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.66683 17.2501L0.958496 21.0834V5.75008L7.66683 1.91675M7.66683 17.2501L15.3335 21.0834M7.66683 17.2501V1.91675M15.3335 21.0834L22.0418 17.2501V1.91675L15.3335 5.75008M15.3335 21.0834V5.75008M15.3335 5.75008L7.66683 1.91675"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <span>{pin.country.name}</span>
                                    </div>
                                    <div className="p-2 w-full flex items-center gap-2">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.3335 16.2501C4.3335 16.2501 5.41683 15.1667 8.66683 15.1667C11.9168 15.1667 14.0835 17.3334 17.3335 17.3334C20.5835 17.3334 21.6668 16.2501 21.6668 16.2501V3.25008C21.6668 3.25008 20.5835 4.33341 17.3335 4.33341C14.0835 4.33341 11.9168 2.16675 8.66683 2.16675C5.41683 2.16675 4.3335 3.25008 4.3335 3.25008V16.2501ZM4.3335 16.2501V23.8334"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <span>{pin.city.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No valid coordinates found.</p>
            )}
        </div>
    );
};

export default ShowCoordinates;