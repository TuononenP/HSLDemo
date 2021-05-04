import React, { Component } from 'react';
import { AddressSearch } from './AddressSearch';
import { MapView } from './MapView';
import L, { LatLng } from "leaflet";
import { Marker } from '../types/Marker'
import { SearchResult } from '../types/SearchResult'
import { SearchResults } from './SearchResults';
import { Alert } from 'reactstrap';
import { AddressSearchOptions } from './AddressSearchOptions';

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
            selectedResult: null,  // type SearchResult
            showResults: false,
            showOptions: false
        }
        this.placeholder = marker.label;
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
        this.state.markers.map((marker) => {
            if (marker.position === result.position) {
                    marker.highlighted = true;
                } else {
                    marker.highlighted = false;
                }
            return false;
        });
        this.moveToMarker(result.position);
    }

    setShowOptions = () => {
        this.setState(state => ({
            showOptions: !state.showOptions
        }));
    }

    setHideResults = () => {
        this.setState({ showResults: false });
    }

    setShowResults = () => {
        this.setState({ showResults: true });
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
        const { markers, searchResults, selectedLayerType, maxResults } = this.state;
        let isEmptyResult = false;
        await fetch("https://api.digitransit.fi/geocoding/v1/search?text=" + addressSearch
            + "&focus.point.lat=" + this.state.mapRef.getCenter().lat
            + "&focus.point.lon=" + this.state.mapRef.getCenter().lng
            + "&layers=" + selectedLayerType
            + "&size=" + maxResults)
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
                    this.setState({addressSearchErrorText: "No results"});
                    this.setState({showResults: false});
                } else {
                    this.setState({addressSearchErrorText: ""});
                    this.setState({showResults: true});
                }
                this.setState({ markers });
            });
    }

    addressSearchError() {
        return (
            this.state.addressSearchErrorText.length > 0 &&
            <Alert color="danger">
                {this.state.addressSearchErrorText}
            </Alert>
        )
    }

    render () {
        return (
            <div>
                <div id="address-search-action-container">
                    <AddressSearch address={this.state.label} placeholder={this.placeholder}
                        handleAddressSearch={this.fetchResults} handleShowOptions={this.setShowOptions} />
                    <AddressSearchOptions showOptions={this.state.showOptions} maxResults={this.state.maxResults}
                        selectedLayerType={this.state.selectedLayerType} handleSetMaxResults={this.setMaxResults}
                        handleTypeSelected={this.setTypeSelected} />
                    <SearchResults searchResults={this.state.searchResults} selectedResult={this.state.selectedResult}
                        showResults={this.state.showResults} handleSelectResult={this.setResultSelected}
                        handleHideResults={this.setHideResults} handleShowResults={this.setShowResults} />
                    {this.addressSearchError()}
                </div>
                <MapView bindMap={this.bindMap} markers={this.state.markers}
                    centerAroundCoordinates={this.state.centerAroundCoordinates} zoom={this.state.zoom}
                    scrollWheelZoomOn={this.state.scrollWheelZoomOn} tileSourceUrl={this.state.tileSourceUrl} />
            </div>
        );
    }
}
