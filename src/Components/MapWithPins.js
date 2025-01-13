import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issues
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapWithPins = ({ points }) => {
    const defaultPosition = [28.6139, 77.2090]; // Default position (Delhi, India)

    return (
        <MapContainer center={defaultPosition} zoom={5} style={{ height: "100%", width: "100%" }}>

            {/* Add the map tiles */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Add markers for each point */}

            {/*{points.map((point, index) => (*/}
            {/*    <Marker key={index} position={[point.lat, point.lng]}>*/}
            {/*        <Popup>*/}
            {/*            <strong>{point.label}</strong>*/}
            {/*        </Popup>*/}
            {/*    </Marker>*/}
            {/*))}*/}
        </MapContainer>
    );
};

export default MapWithPins;
