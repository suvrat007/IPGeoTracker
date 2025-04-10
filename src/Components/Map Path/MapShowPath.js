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

const MapShowPath = ({ points , coordinatesArray}) => {
    const defaultPosition = [28.6139, 77.2090]; // Center position (Delhi, India)

    return (

            <MapContainer
                center={defaultPosition}
                zoom={3}
                minZoom={2}
                maxZoom={12}
                worldCopyJump={true}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
                style={{ width: "100%", height: "100%" }}

            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
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


    );
};

export default MapShowPath;
