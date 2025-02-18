import React from "react";
import {MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issues
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import {Link} from "react-router-dom";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapWithPins = ({ points }) => {
        const defaultPosition = [28.6139, 77.2090]; // Center position (Delhi, India)
        // console.log(points);
        return (

            <div >

                <MapContainer
                    center={defaultPosition}
                    zoom={3}
                    minZoom={3}
                    maxZoom={10}
                    worldCopyJump={true} // Prevents horizontal tiling
                    maxBounds={[
                        [-90, -180], // Southwest corner
                        [90, 180],   // Northeast corner
                    ]}
                    maxBoundsViscosity={1.0} // Prevents panning outside bounds
                    style={{width: "80%", height: "100vh"}} // Fullscreen height
                    className="bottom-0"
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    />
                    {points.map((point, index) => (
                        (point?.location && point?.location) ? ( // Ensure valid lat/lng
                            <Marker key={index} position={[point.location.latitude, point.location.longitude]}>
                                <Popup>{point.city.name}, {point.ip}</Popup>
                            </Marker>
                        ) : null
                    ))}

                    {/*<Polyline*/}
                    {/*    positions={[points?.location?.latitude, points?.location?.longitude]}*/}
                    {/*/>*/}
                </MapContainer>
            </div>

        );
}
// (prevProps, nextProps) => JSON.stringify(prevProps.points) === JSON.stringify(nextProps.points) // Avoid re-render if points are unchanged


export default MapWithPins;
