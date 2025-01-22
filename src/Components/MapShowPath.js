import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import React from "react";
import {Link} from "react-router-dom";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    // shadowUrl: markerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapShowPath = ({ points }) => {
    const defaultPosition = [28.6139, 77.2090]; // Center position (Delhi, India)

    const uniquePoints = new Set()
    // Add unique coordinates to the set
    points
        .filter(
            (point) =>
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

    return (
        <div className="relative">
            <button className="absolute top-4 right-4 z-10 bg-white text-black p-2 rounded-lg shadow-md hover:bg-gray-200"
            ><Link to="/map">See Pins Only</Link></button>
            <MapContainer
                center={defaultPosition}
                zoom={3}
                minZoom={3}
                maxZoom={10}
                worldCopyJump={true}
                maxBounds={[
                    [-90, -180],
                    [90, 180],
                ]}
                maxBoundsViscosity={1.0}
                style={{width: "100%", height: "100vh"}}

            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {points.map((point, index) => (
                    (point[0]?.location || point[1]?.location) ? (
                        <>
                            {point[0]?.location?.latitude && point[0]?.location?.longitude && (
                                <Marker position={[point[0]?.location?.latitude, point[0]?.location?.longitude]}>
                                    <Popup>{point[0]?.city?.name}, {point[0]?.id}</Popup>
                                </Marker>
                            )}
                            {point[1]?.location?.latitude && point[1]?.location?.longitude && (
                                <Marker position={[point[1]?.location?.latitude, point[1]?.location?.longitude]}>
                                    <Popup>{point[1]?.city?.name}, {point[1]?.id}</Popup>
                                </Marker>
                            )}
                        </>
                    ) : null
                ))}

                {/*<Polyline*/}
                {/*    positions={points*/}
                {/*        .filter(point => point[0]?.location?.latitude && point[0]?.location?.longitude &&*/}
                {/*            point[1]?.location?.latitude && point[1]?.location?.longitude)*/}
                {/*        .map(point => [*/}
                {/*            [point[0]?.location?.latitude, point[0]?.location?.longitude],*/}
                {/*            [point[1]?.location?.latitude, point[1]?.location?.longitude]*/}
                {/*        ])}*/}
                {/*/>*/}

                {/*working code*/}
                {/*<Polyline*/}
                {/*positions={points.map((point) =>*/}
                {/*    (point[0].location)? [point[0]?.location?.latitude,point[0]?.location?.longitude] : [point[1]?.location?.latitude,point[1]?.location?.longitude]*/}
                {/*)}*/}
                {/*/>*/}


                {coordinatesArray.length > 1 && (
                    <Polyline positions={coordinatesArray}/>
                )}


            </MapContainer>
        </div>

    );
};

export default MapShowPath;
