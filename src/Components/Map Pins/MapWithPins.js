import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapWithPins = ({ points }) => {
    const defaultPosition = [28.6139, 77.2090]; // Delhi center
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
            {points.map((point, index) =>
                point?.location ? (
                    <Marker
                        key={index}
                        position={[point.location.latitude, point.location.longitude]}
                    >
                        <Popup>{point.city.name}, {point.ip}</Popup>
                    </Marker>
                ) : null
            )}
        </MapContainer>
    );
};

export default MapWithPins;
