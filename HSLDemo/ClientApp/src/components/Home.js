import React, { Component } from 'react';
import { AddressSearch } from './AddressSearch';
import { MapView } from './MapView';
import L, { LatLng } from "leaflet";
import { Marker } from '../types/Marker'
import { SearchResult } from '../types/SearchResult'

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        // default marker
        const marker = new Marker();
        marker.position = [60.1719, 24.9414];
        marker.label = "Helsingin päärautatieasema";
        marker.show = true;

        this.state = {
            mapRef: null, // Leaflet Map
            markers: [marker], // type Marker
            searchResults: [], // type SearchResult
            centerAroundCoordinates: [60.1719, 24.9414], // Helsinki
            zoom: 14,
            scrollWheelZoomOn: true,
            tileSourceUrl: "https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}@2x.png", //alternative: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}@2x.png
            addressSearchErrorText: "",
            maxResults: 5,
            selectedLayerType: "coarse,address,venue", // list of layers: https://github.com/pelias/documentation/blob/master/search.md#filter-by-data-type
            selectedResult: null  // type SearchResult
        }
        this.placeholder = "";
    }

    bindMap = (map) => {
        this.setState({ mapRef: map });
    }

    fetchResults = (address) => {
        if (address && address.length > 0) {
            this.findCoordinates(address);
        }
    }

    selectLabelOption = (label) => {
        if (label && label.length > 0) {
            this.state.markers.map((marker) => {
                if (marker.label === label) {
                    marker.show = true;
                } else {
                    marker.show = false;
                }
                return true;
            });
        }
    }

    setMaxResults = (event) => {
        this.setState({ maxResults: event.target.value });
    }

    setTypeSelected = (event) => {
        this.setState({ selectedLayerType: event.target.value });
    }

    setResultSelected = (result) => {
        this.setState({ selectedResult: result });
        this.moveToMarker(result.position);
    }

    moveToMarker = (latLng) => {
        if (latLng) {
            var southWest = L.latLng(latLng.lat, latLng.lng),
                northEast = L.latLng(latLng.lat, latLng.lng),
                bounds = L.latLngBounds(southWest, northEast);
            this.state.mapRef.flyToBounds(bounds);
        }
    }
 
    async findCoordinates(addressSearch) {
        const { markers, searchResults, selectedLayerType } = this.state;
        let isEmptyResult = false;
        await fetch("https://api.digitransit.fi/geocoding/v1/search?text=" + addressSearch
            + "&focus.point.lat=" + this.state.mapRef.getCenter().lat
            + "&focus.point.lon=" + this.state.mapRef.getCenter().lng
            + "&layers=" + selectedLayerType
            + "&size=" + this.state.maxResults)
            .then(function (response) {
                return response.json();
            })
            .then(function (geojson) {
                if (geojson.features.length === 0) {
                    isEmptyResult = true;
                }
                markers.splice(0, markers.length);
                searchResults.splice(0, searchResults.length);
                // docs: https://leafletjs.com/reference-1.7.1.html
                L.geoJSON(geojson, {
                    pointToLayer: function (feature, latlng) {
                        return L.marker(latlng);
                    },
                    filter: function (feature) {
                        return true;
                    },
                    onEachFeature: function (feature, layer) {
                        const marker = new Marker();
                        marker.position = new LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                        marker.label = feature.properties.label;
                        marker.layer = layer;
                        marker.show = true;
                        markers.push(marker);
                        const result = new SearchResult(feature.properties.label, marker.position, false);
                        searchResults.push(result);
                    }
                });
            })
            .then(() => {
                if (isEmptyResult) {
                    markers.splice(0, markers.length);
                    this.state.addressSearchErrorText = "No results";
                } else {
                    this.state.addressSearchErrorText = "";
                }

                this.setState({ markers });
            });
    }

  render () {
    return (
        <div>
            <AddressSearch address={this.state.label} placeholder={this.placeholder} addressSearchErrorText={this.state.addressSearchErrorText}
                searchResults={this.state.searchResults} maxResults={this.state.maxResults} selectedLayerType={this.state.selectedLayerType}
                selectedResult={this.state.selectedResult} handleSelectResult={this.setResultSelected}
                handleAddressSearch={this.fetchResults} setMaxResults={this.setMaxResults} handleTypeSelected={this.setTypeSelected} />
            <MapView bindMap={this.bindMap} markers={this.state.markers} centerAroundCoordinates={this.state.centerAroundCoordinates}
                zoom={this.state.zoom} scrollWheelZoomOn={this.state.scrollWheelZoomOn} tileSourceUrl={this.state.tileSourceUrl} />
        </div>
    );
  }
}
