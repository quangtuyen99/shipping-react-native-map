import React, { Component } from 'react'
import { Text, View, PermissionsAndroid, StyleSheet } from 'react-native'

import MapView,  { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import Map from "./components/Map"; // GoogleMap


export default class App extends Component {

    render() {
        return(
            <Map/>
        )
    }

    
}

