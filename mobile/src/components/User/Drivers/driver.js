import React, { Component } from 'react'
import { Image, View } from 'react-native'

import MapView, { PROVIDER_GOOGLE, Marker, Animated } from 'react-native-maps';


export default class Driver extends Component {
    constructor(props) {
        super(props);

        const driver = this.props.driver ? this.props.driver :
            {
                uid: "noDriverPassed",
                location: { latitude: 0, longitude: 0 }
            }

        const coordinate = new MapView.AnimatedRegion({
            latitude: driver.location.latitude,
            longitude: driver.location.longitude
        })

        this.state = {
            driver: driver,
            coordinate: coordinate
        }


    }


    componentWillReceiveProps(nextProps) {
        const duration = new Animated.Value(500);

        if (this.props.coordinate !== nextProps.coordinate) {
            if (Platform.OS === 'android') {
                if (this.marker) {
                    this.marker.animateMarkerToCoordinate(
                        nextProps.coordinate,
                        duration
                    );
                }
            } else {
                this.state.coordinate.timing({
                    ...nextProps.coordinate,
                    duration
                }).start();
            }
        }
    }

    render() {
        return (

            <MapView.Marker.Animated
                ref={marker => { this.marker = marker }}
                coordinate={this.state.coordinate}
                anchor={{ x: 0.35, y: 0.32 }}
            >
                <Image
                    source={require('../../../assets/icons/ic_car.png')}
                    style={{ width: 32, height: 32 }}
                />
            </MapView.Marker.Animated>

        );
    }


}