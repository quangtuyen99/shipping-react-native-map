import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { clear } from '../../../constants/icons'
import Geocoder from 'react-native-geocoding';
import global from '../../../constants/global'

export default class changeLocationSend extends Component {
    state = {
        markerData: {
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
        },
        mapData: {
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
        },
        marker: null,
        location: null,
        destination: null,
        coordinates: null,
        routes: null
    };

    getAddress(lat, long) {
        Geocoder.from(lat, long)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                var coor = json.results[0].address_components[0];
                global.destination = [];
                global.destination.push({
                    latitude: lat,
                    longitude: long,
                    title: addressComponent,
                });

                this.setState({

                    destination: {
                        latitude: lat,
                        longitude: long,
                        title: addressComponent,
                    },
                    coordinates:

                    {
                        latitude: lat,
                        longitude: long,
                        title: coor,
                    },

                    routes:
                    {
                        latitude: lat,
                        longitude: long,
                        title: coor,
                        duration: null,
                    },

                });
            })
            .catch(error => console.warn(error));

    }



    render() {
        const { markerData, mapData, marker, coordinates, routes, destination } = this.state
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: mapData.latitude, longitude: mapData.longitude, latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    onPress={(e) => {
                        this.setState({
                            marker: e.nativeEvent.coordinate,
                            mapData: {
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            }
                        })
                    }}

                >
                    {marker && <Marker coordinate={marker} />}
                </MapView>

                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.clear}>
                    <Image
                        source={clear}
                    />
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.getAddress(marker.latitude, marker.longitude),
                            this.props.navigation.navigate("UserReceiver",
                                {
                                    destination: this.state.destination,
                                    coordinates: this.state.coordinates,
                                    routes: this.state.routes
                                }),
                            navigation = this.props.navigate
                    }}

                >
                    <Text style={styles.textButton}>Đặt vị trí</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    clear: {
        position: 'absolute',
        marginTop: 20,
        marginLeft: 20
    },
    button: {
        position: 'absolute',
        justifyContent: 'center',
        width: 300,
        height: 40,
        backgroundColor: "#EB7715",
        padding: 10,
        alignItems: 'center',
        marginTop: 600,
        marginLeft: 60,
        borderRadius: 10
    },
    textButton: {
        fontSize: 16,
        color: "#ffffff"
    }

})