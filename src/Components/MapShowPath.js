import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import React from "react";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapShowPath = ({ points }) => {
    const defaultPosition = [28.6139, 77.2090]; // Center position (Delhi, India)

    return (
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
            style={{ width: "100%", height: "100vh" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {points.map((point, index) => (
                (point[0]?.location || point[1]?.location) ? (
                    <React.Fragment key={index}>
                        {point[0]?.location?.latitude && point[0]?.location?.longitude && (
                            <Marker position={[point[0]?.location?.latitude, point[0]?.location?.longitude]}>
                                <Popup>{point[0]?.city?.name}</Popup>
                            </Marker>
                        )}
                        {point[1]?.location?.latitude && point[1]?.location?.longitude && (
                            <Marker position={[point[1]?.location?.latitude, point[1]?.location?.longitude]}>
                                <Popup>{point[1]?.city?.name}</Popup>
                            </Marker>
                        )}
                    </React.Fragment>
                ) : null
            ))}
            <Polyline
                positions={points
                    .filter(point => point[0]?.location?.latitude && point[0]?.location?.longitude &&
                        point[1]?.location?.latitude && point[1]?.location?.longitude)
                    .map(point => [
                        [point[0]?.location?.latitude, point[0]?.location?.longitude],
                        [point[1]?.location?.latitude, point[1]?.location?.longitude]
                    ])}
            />
        </MapContainer>
    );
};

export default MapShowPath;
