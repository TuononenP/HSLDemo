import React, { Component } from 'react';
import { AddressSearch } from './AddressSearch';
import { MapView } from './MapView';
import L from "leaflet";
import { Marker } from '../types/Marker'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        // default marker
        const marker = new Marker();
        marker.position = [60.1719, 24.9414];
        marker.address = "Helsingin päärautatieasema";
        marker.show = true;

        this.state = {
            mapRef: null,
            markers: [marker],
            centerAroundCoordinates: [60.1719, 24.9414], // Helsinki
            zoom: 14,
            scrollWheelZoomOn: true,
            tileSourceUrl: "https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}@2x.png", //alternative: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}@2x.png
            addressSearchError: ""
        }
        this.placeholder = marker.address;
    }

    bindMap = (map) => {
        this.setState({ mapRef: map });
    }

    selectAddress = (address) => {
        if (address.length > 0) {
            this.findCoordinates(address);
        }
    }

    async findCoordinates(addressSearch) {
        const { markers } = this.state;
        let isEmptyResult = false;
        let moveToLatlng;
        await fetch("https://api.digitransit.fi/geocoding/v1/search?text=" + addressSearch
            + "&focus.point.lat=" + this.state.mapRef.getCenter().lat
            + "&focus.point.lon=" + this.state.mapRef.getCenter().lng
            + "&size=1")
            .then(function (response) {
                let json = response.json();
                console.log(json);
                return json;
            })
            .then(function (geojson) {
                if (geojson.features.length === 0) {
                    isEmptyResult = true;
                }
                // docs: https://leafletjs.com/reference-1.7.1.html
                L.geoJSON(geojson, {
                    pointToLayer: function (feature, latlng) {
                        markers.splice(0, markers.length);

                        const marker = new Marker();
                        marker.position = latlng;
                        marker.address = feature.properties.label;
                        marker.show = true;
                        markers.push(marker);

                        moveToLatlng = latlng;
                    }
                });
            })
            .then(() => {
                if (isEmptyResult) {
                    markers.splice(0, markers.length);
                    this.state.addressSearchError = "Place not found";
                } else {
                    this.state.addressSearchError = "";
                }

                this.setState({ markers });
                // move map to new marker
                if (moveToLatlng) {
                    var southWest = L.latLng(moveToLatlng.lat, moveToLatlng.lng),
                        northEast = L.latLng(moveToLatlng.lat, moveToLatlng.lng),
                        bounds = L.latLngBounds(southWest, northEast);
                    this.state.mapRef.flyToBounds(bounds);
                }
            });
    }

  render () {
    return (
        <div>
            <AddressSearch address={this.state.address} placeholder={this.placeholder} addressSearchError={this.state.addressSearchError}
                handleAddressSearch={this.selectAddress} />
            <MapView bindMap={this.bindMap} markers={this.state.markers} centerAroundCoordinates={this.state.centerAroundCoordinates}
                zoom={this.state.zoom} scrollWheelZoomOn={this.state.scrollWheelZoomOn} tileSourceUrl={this.state.tileSourceUrl} />
        </div>
    );
  }
}
