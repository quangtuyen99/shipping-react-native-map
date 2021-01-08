import React, { Component } from 'react'
import { MapViewDirection } from 'react-native-maps-directions'

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirection
        origin={origin}
        destination={destination}
        apikey= 'AIzaSyCAQXp08fMI5MUl-RA5pB6-m0nzDMVGjhk'
        strokeWidth={3}
        waypoints = {
            {
               location: new google.maps.LatLng(14.546748, 121.05455)
            },
            {
               location: new google.maps.LatLng(14.552444,121.044488)
            }
        }
        splitWaypoints={true}
        strokeColor="hotpink"
        onReady = {onReady}
    />
);


export default Directions;
