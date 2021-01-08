import React, { Component, Fragment, useState } from 'react'
import { Text, StyleSheet, View, PermissionsAndroid, Platform, Dimensions, TouchableOpacity, Image, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getPixelSize } from '../../../utils';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import Directions from '../Directions'
import MapViewDirection from 'react-native-maps-directions';
import Driver from '../Drivers/driver'
import global from '../../../constants/global'
import Detail from './detail'
import {
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall
} from '../Map/styles'
import { userLocation, userLocation1 } from '../../../constants/icons'
import socketIO from 'socket.io-client'
import { ThemeConsumer } from 'styled-components';
import LottieView from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const list = global.user; //Mảng chứa địa điểm chuyển hàng
const coordinates = global.coordinates;
const routes = global.routes;
const destination = global.destination;
Geocoder.init("AIzaSyCAQXp08fMI5MUl-RA5pB6-m0nzDMVGjhk")

export default class Ship extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            destination: null,
            region: null,
            coordinates,
            routes,
            duration: null,
            location: null,
            newLocation: null
        };

    }


    componentDidMount() {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => {
                if (granted) {

                    if (global.userLocation.length == 0) {
                        this._getCurrentLocation();

                    }
                    else {
                        this.setUserLocation()

                    }
                }

            });
        } else {
            if (global.userLocation.length == 0)
                this._getCurrentLocation();
            else
                this.setUserLocation();
        }

        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        this.animation.play(30, 120);

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
                            id: global.coordinates.length + 1,
                            latitude: data.coords.latitude,
                            longitude: data.coords.longitude,
                            title: "vị trí của bạn"
                        }
                    ],

                    destination: destination
                });
                global.arr.push({
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                })

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

    }

    async requestDriver() {
        const socket = socketIO.connect("http://192.168.0.136:3000");

        socket.on("connect", () => {
            console.log("client connected");
            socket.emit("shipRequest", this.state.coordinates);
        });


    }

    setUserLocation() {
        const location = global.userLocation[global.userLocation.length - 1]
        this.setState({
            location: location.title,
            latitude: location.latitude,
            longitude: location.longitude,
            coordinates: [
                ...global.coordinates,
                {
                    id: global.coordinates.length + 1,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    // title: "vị trí của bạn"
                }
            ],
            newLocation: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            destination: destination
        })
    }



    render() {
        let button = null;

        // Kiểm tra có danh sách giao hàng chưa để có thể đi đến điểm khác
        if (list.length == 0) {
            button = (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => Alert.alert("Thông báo", "Danh sách giao hàng trống")}
                        style={styles.buttonNull}>
                        <Text style={styles.textButton}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            button = (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("FindDriver", {
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                coordinates: [...global.coordinates, { latitude: this.state.latitude, longitude: this.state.longitude }],
                                routes: global.routes,
                                newLocation: this.state.newLocation,
                                user: global.user,
                            }), navigation = this.props.navigation
                        }}
                        style={styles.button}>
                        <Text style={styles.textButton}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        const { latitude, longitude, destination, coordinates, routes, duration, location, newLocation } = this.state
        console.log("ABC " + JSON.stringify(global.userLocation))
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
                        {/* Nếu fetch dươc data và có được tọa độ điểm đến  */}
                        {global.coordinates.length != 0 && (
                            <Fragment>
                                <MapViewDirection
                                    origin={global.coordinates[0]}
                                    destination={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                                    apikey='AIzaSyCAQXp08fMI5MUl-RA5pB6-m0nzDMVGjhk'
                                    strokeWidth={3}
                                    strokeColor="hotpink"
                                    waypoints={[...global.coordinates, { latitude: this.state.latitude, longitude: this.state.longitude }].slice(1, -1)}
                                    optimizeWaypoints={true}
                                    splitWaypoints={true}
                                    precision="high"
                                    // fit google map vừa với màn hình
                                    onReady={result => {
                                        let route = [...this.state.routes];
                                        route[routes.length - 1] = { ...route[routes.length - 1], duration: Math.floor(result.duration) };

                                        this.setState({
                                            duration: Math.floor(result.duration),
                                            routes: route
                                        });

                                        this.mapView.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                right: getPixelSize(50),
                                                left: getPixelSize(50),
                                                top: getPixelSize(50),
                                                bottom: getPixelSize(50),
                                            }
                                        });
                                    }}
                                >

                                </MapViewDirection>
                                {/* Đặt một marker ngay điểm đến */}

                                {
                                    global.routes.map((routes, index) =>
                                        <Marker key={`coordinate_${index}`} coordinate={routes} title={routes.title}>

                                        </Marker>
                                    )
                                }

                                <Marker coordinate={coordinates[coordinates.length - 1]}>
                                    <LocationBox>
                                        <LocationTimeBox>
                                            <LocationTimeText>{duration}</LocationTimeText>
                                            <LocationTimeTextSmall>Phút</LocationTimeTextSmall>
                                        </LocationTimeBox>
                                        {/* <LocationText>Vị trí của bạn</LocationText> */}
                                    </LocationBox>
                                </Marker>

                            </Fragment>

                        )}
                        {global.userLocation[global.userLocation.length - 1] != null && (
                            <Marker coordinate={global.userLocation[global.userLocation.length - 1]} icon={userLocation1}>

                            </Marker>
                        )}
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


                        {/* Danh sách giao hàng */}
                        <Detail style={styles.ship} list={global.user} />
                    </View>

                    <View style={styles.bottom}>
                        <View style={styles.location} >
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => { this.props.navigation.navigate("Details", { location: location, latitude: latitude, longitude: longitude }), navigation = this.props.navigation }}
                            >
                                <Text style={styles.locationText}>Thêm điểm giao</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: "center" }}
                                onPress={() => { this.props.navigation.navigate("changeDetail", { list: global.user }), navigation = this.props.navigation }}
                            >
                                <Text style={styles.locationText}>Chỉnh sửa</Text>
                            </TouchableOpacity>


                        </View>

                        {button}
                    </View>
                </View>


            );
        } else {
            return (
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../../../assets/animations/ship.json')}
                    />
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

    },
    userLocation: {
        width: '100%',
        height: 40,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
    },
    buttonNull: {
        backgroundColor: "#808080",
        padding: 10,
        width: 350,
        height: 40,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center'
    },


})

