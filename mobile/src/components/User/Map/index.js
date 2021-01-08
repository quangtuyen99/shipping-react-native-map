import React, { Component, Fragment, useState } from 'react'
import { Text, StyleSheet, View, PermissionsAndroid, Platform, Dimensions, TouchableOpacity, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getPixelSize } from '../../utils';
import Geocoder from 'react-native-geocoding';
import Search from '../Search'
import Geolocation from '@react-native-community/geolocation';
import { userLocation } from '../../constants/icons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

Geocoder.init("AIzaSyCAQXp08fMI5MUl-RA5pB6-m0nzDMVGjhk")

export default class Map extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        destination: null,
        region: null,
        coordinates: [],
        routes: [],
        duration: null,
        location: null,
        user: {
            name: null,
            phone: null,
            cod: null,
            des: null,
            timeStart: null,
            timeEnd: null
        }
    }

    componentDidMount() {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => {
                if (granted) this._getCurrentLocation();
            });
        } else {
            this._getCurrentLocation();
        }

    }

    async _getCurrentLocation() {

        Geolocation.getCurrentPosition(
            async data => {

                const response = await Geocoder.from(data.coords.latitude, data.coords.longitude);
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(', Vietnam'));
                this.setState({
                    location,
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    error: null,
                    coordinates: [
                        ...this.state.coordinates,
                        {
                            latitude: data.coords.latitude,
                            longitude: data.coords.longitude,
                            title: "vị trí của bạn"
                        }
                    ]
                });


            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;

        this.setState({
            destination: {
                latitude: latitude,
                longitude: longitude,
                title: data.structured_formatting.main_text,
            },
            coordinates: [
                ...this.state.coordinates,
                {
                    latitude: latitude,
                    longitude: longitude,
                    title: data.structured_formatting.main_text,
                }
            ],

            routes: [
                ...this.state.routes,
                {
                    latitude: latitude,
                    longitude: longitude,
                    title: data.structured_formatting.main_text,
                    duration: null,
                }
            ],

        });
    }

    render() {
        const { latitude, longitude, destination, coordinates, routes, duration, location, user } = this.state

        if (latitude) {
            return (
                <View style={styles.container}>

                    <MapView
                        showsUserLocation
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        loadingEnabled
                        ref={el => this.mapView = el}
                    >

                    </MapView>



                    <View style={styles.MainContainer}>
                        <TouchableOpacity
                            style={styles.userLocation}
                            onPress={() => { this.props.navigation.navigate("UserSend", { location: location, latitude: latitude, longitude: longitude }), navigation = this.props.navigation }}
                        >
                            <Image source={userLocation} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14 }}>{location}</Text>
                            </View>

                        </TouchableOpacity>
                        {/* <Ship style={styles.ship} /> */}
                    </View>

                    <View style={styles.bottom}>
                        <View style={styles.location} >
                            <TouchableOpacity
                                style={{ flex: 2 }}
                                onPress={() => { this.props.navigation.navigate("Details", { location: location }), navigation = this.props.navigation }}
                            >
                                <Text style={styles.locationText}>Thêm điểm giao</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, marginLeft: 30 }}>
                                <Text style={styles.locationText}>Tối ưu chi phí</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.textButton}>Tiếp tục</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            );
        } else {
            return (
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <Text>Đang load bản đồ</Text>
                </View>
            )
        }


    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: windowHeight / 2
    },
    ship: {

        height: 100
    },
    bottom: {
        width: '100%',
        height: 100,

        backgroundColor: '#ffffff'

    },
    location: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 10
    },
    locationText: {
        color: "#EB7715",
        fontSize: 16
    },
    button: {
        backgroundColor: "#EB7715",
        padding: 10,
        width: 350,
        height: 40,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: '#ffffff',
        fontSize: 16
    },
    MainContainer: {
        width: '100%',
        height: 100,
        marginBottom: 100,
        alignItems: 'center'
    },
    userLocation: {
        width: '100%',
        height: 40,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
    }


})

