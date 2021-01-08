import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getPixelSize } from '../../../utils'
import { userLocation, userLocation1, clear } from '../../../constants/icons'
import global from '../../../constants/global';
import MapViewDirection from 'react-native-maps-directions';
import socketIO from 'socket.io-client'
import {
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall
} from '../Map/styles'


export default class FindDriver extends Component {
    state = {
        latitude: this.props.route.params.latitude,
        longitude: this.props.route.params.longitude,
        coordinates: this.props.route.params.coordinates,
        routes: this.props.route.params.routes,
        newLocation: this.props.route.params.newLocation,
        user: this.props.route.params.user,
        duration: null,
        lookingForDriver: false,
        buttonText: "Tìm kiếm tài xế",
        driverIsOnTheWay: false,
        driverLocation: null
    }

    async requestDriver() {
        this.setState({
            lookingForDriver: true
        })
        const socket = socketIO.connect("http://192.168.0.136:3000");

        // Connect với server
        socket.on("connect", () => {
            console.log("client connected");
            socket.emit("shipRequest", this.state.coordinates);
            socket.emit("user", this.state.user);
        });


        socket.on("driverLocation", driverLocation => {
            const pointCoords = [...this.state.coordinates, driverLocation];
            this.mapView.fitToCoordinates(pointCoords, {
                edgePadding: { top: 20, left: 20, right: 20, bottom: 20 }
            });
            this.setState({
                lookingForDriver: false,
                buttonText: "Tìm thấy tài xế! Tài xể đang trên đường đến",
                driverIsOnTheWay: true,
                driverLocation
            })
        })
    }

    render() {

        const { latitude, longitude, coordinates, routes, newLocation, duration } = this.state
        let lookForDriver = null
        let driverMarker = null
        if (this.state.driverIsOnTheWay) {
            driverMarker = (
                <Marker coordinate={this.state.driverLocation}>
                    <Image
                        source={require("../../../assets/icons/ic_motor.png")}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                </Marker>
            );

            lookForDriver = (
                <TouchableOpacity
                    style={styles.image}
                    onPress={() => { this.props.navigation.navigate("chat"), navigation = this.props.navigation }}
                >
                    <Image
                        source={require("../../../assets/icons/ic_chat.png")}
                    />
                </TouchableOpacity>
            )
        }




        return (
            <View style={styles.container}>

                <MapView
                    showsUserLocation
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    loadingEnabled
                    ref={el => this.mapView = el}
                >
                    {/* Nếu fetch dươc data và có được tọa độ điểm đến  */}
                    {global.destination.length != 0 && (
                        <Fragment>
                            <MapViewDirection
                                origin={coordinates[0]}
                                destination={coordinates[coordinates.length - 1]}
                                apikey='AIzaSyCAQXp08fMI5MUl-RA5pB6-m0nzDMVGjhk'
                                strokeWidth={3}
                                strokeColor="hotpink"
                                waypoints={coordinates.slice(1, -1)}
                                optimizeWaypoints={true}
                                splitWaypoints={true}
                                showsUserLocation
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
                                routes.map((routes, index) =>
                                    <Marker key={`coordinate_${index}`} coordinate={routes} title={routes.title + ' ' + routes.duration + ' phút'}>

                                    </Marker>
                                )
                            }

                            <Marker coordinate={coordinates[coordinates.length - 1]}>
                            </Marker>

                            {newLocation && (
                                <Marker coordinate={newLocation} icon={userLocation1} style={{ height: 50, width: 50 }}>

                                </Marker>
                            )}

                            {driverMarker}


                        </Fragment>

                    )}

                </MapView>

                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.clear}>
                    <Image
                        source={clear}
                    />
                </TouchableOpacity>

                {lookForDriver}

                <TouchableOpacity
                    onPress={() => this.requestDriver()}
                    style={styles.button}>
                    <View>
                        <Text style={styles.text}>{this.state.buttonText}</Text>
                        {this.state.lookingForDriver === true ?
                            <ActivityIndicator
                                animating={this.state.lookingForDriver}
                                size="large"
                                color="#ffffff"

                            /> : null}
                    </View>

                </TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    button: {

        margin: 20,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: "#EB7715",
        marginTop: "auto",
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 50
    },
    text: {
        color: "#ffffff",
        fontSize: 16

    },
    clear: {
        position: 'absolute',
        marginTop: 20,
        marginLeft: 20
    },
    image: {
        marginTop: 450,
        alignItems: "flex-end",

    }

})