import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

export class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: props.markers,
            centerAroundCoordinates: props.centerAroundCoordinates,
            address: props.address,
            zoom: props.zoom,
            scrollWheelZoomOn: props.scrollWheelZoomOn,
            tileSourceUrl: props.tileSourceUrl,
        }
        this.finlandTopLeftCornerCoordinates = [70.007, 17.983];
        this.finlandBottomRightCornerCoordinates = [59.565, 31.683];
    }

    render() {
        const defaultIcon = L.divIcon({
            html: '<span class="default-icon-style"><i class="fa fa-map-marker fa-4x"></i></span>',
                iconSize: [40, 40],
                className: 'map-marker-icon'
            });
        const highlightedIcon = L.divIcon({
            html: '<span class="highlighted-icon-style"><i class="fa fa-map-marker fa-4x"></i></span>',
            iconSize: [40, 40],
            className: 'map-marker-icon'
            });
        return (
            <MapContainer zoomControl={false} center={this.state.centerAroundCoordinates} zoom={this.state.zoom} minZoom={10}
                maxBounds={[this.finlandTopLeftCornerCoordinates, this.finlandBottomRightCornerCoordinates]}
                scrollWheelZoom={this.state.scrollWheelZoomOn} whenCreated={mapInstance => this.props.bindMap(mapInstance)}
            >
                <ZoomControl position="topright" />
                <TileLayer
                    tileSize={512}
                    zoomOffset={-1}
                    attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                    url={this.state.tileSourceUrl}
                />
                {this.state.markers.map((marker, idx) =>
                    <Marker key={`marker-${idx}`} position={marker.position} icon={marker.highlighted ? highlightedIcon : defaultIcon}>
                        <Popup>
                            {marker.label}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        );
    }
}
