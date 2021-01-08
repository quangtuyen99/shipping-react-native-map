import React, { Component, Fragment } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    PermissionsAndroid,
    Linking,
    Platform,
    Alert
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import socketIO from 'socket.io-client'
import MapViewDirection from 'react-native-maps-directions'
import { getPixelSize } from "../../utils"
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import LottieView from 'lottie-react-native';
export default class Shipper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lookingForPassenger: false,
            coordinate: [],
            duration: null,
            location: null,
            error: null,
            buttonText: "Tìm khách hàng",
            passengerFound: false,
            latitude: null,
            longitude: null,
            user: null,
        };
        this.acceptPassengerRequest = this.acceptPassengerRequest.bind(this);
        this.lookForPassenger = this.lookForPassenger.bind(this);
        this.socket = null;
    }


    componentDidMount() {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => {
                if (granted) {
                    this._getCurrentLocation();
                }

            });
        } else {
            this._getCurrentLocation();
        }


        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            debug: false,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,

        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise alert may not be shown
                setTimeout(() =>
                    Alert.alert(
                        'App requires location tracking permission',
                        'Would you like to open app settings?',
                        [
                            {
                                text: 'Yes',
                                onPress: () => BackgroundGeolocation.showAppSettings()
                            },
                            {
                                text: 'No',
                                onPress: () => console.log('No Pressed'), style: 'cancel'
                            }
                        ]
                    ), 1000);
            }
        });

        BackgroundGeolocation.checkStatus(status => {
            // you don't need to check status before start (this is just the example)
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);
            if (status.isRunning != true) {
                BackgroundGeolocation.start(); //triggers start on start event

            }
        });
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        this.animation.play(30, 120);
    }


    async _getCurrentLocation() {


        this.watchId = Geolocation.watchPosition(
            async data => {

                const response = await Geocoder.from(data.coords.latitude, data.coords.longitude);
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(', Vietnam'));
                this.setState({
                    location: {
                        latitude: data.coords.latitude,
                        longitude: data.coords.longitude,
                    },
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    error: null,
                });


            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchId)
    }

    acceptPassengerRequest() {
        // this.socket.emit("driverLocation", {
        //     latitude: this.state.location.latitude,
        //     longitude: this.state.location.longitude
        // })


        //Di chuyển vị trí của shipper
        BackgroundGeolocation.on('location', location => {
            // Gửi đến socket.io
            // Gửi địa điểm tài xế cho người dùng
            console.log("AAAA");
            this.socket.emit("driverLocation", {
                latitude: location.latitude,
                longitude: location.longitude
            })
        });




    }

    async lookForPassenger() {
        this.setState({
            lookingForPassenger: true,

        })

        this.socket = socketIO.connect("http://192.168.0.136:3000");
        this.socket.on("connect", () => {

            this.socket.emit("lookingforPassenger");
        });
        let pointCoords = []
        this.socket.on("shipRequest", (coordinate) => {
            this.setState({
                coordinate,
                buttonText: "Tìm thấy khách hàng!",
                lookingForPassenger: false,
                passengerFound: true,
            }),
                pointCoords = [this.state.location, this.state.coordinate]
            this.mapView.fitToCoordinates(pointCoords, {
                edgePadding: { top: 20, left: 20, right: 20, bottom: 20 }
            });
        });

        this.socket.on("user", (user) => {
            this.setState({
                user
            })
        });


    }

    render() {
        let bottomButtonFuction = this.lookForPassenger;
        let buttonUser = null;
        let buttChat = null;

        let buttonMap = null
        if (this.state.passengerFound) {
            bottomButtonFuction = this.acceptPassengerRequest // Thay đổi hàm, tránh trùng
            buttonUser = (
                <TouchableOpacity
                    style={styles.image}
                    onPress={() => { this.props.navigation.navigate("detailPackage", { list: this.state.user }), navigation = this.props.navigation }}
                >
                    <Image
                        source={require("../../assets/icons/ic_package.png")}
                    />
                </TouchableOpacity>
            )

            if (bottomButtonFuction === this.acceptPassengerRequest) {
                buttChat = (
                    <TouchableOpacity
                        style={styles.image1}
                        onPress={() => { this.props.navigation.navigate("chat"), navigation = this.props.navigation }}
                    >
                        <Image
                            source={require("../../assets/icons/ic_chat.png")}
                        />
                    </TouchableOpacity>
                )


                buttonMap = (
                    <TouchableOpacity
                        style={styles.image2}
                        onPress={() => { // Chuyển đến google map
                            if (Platform.OS === "ios") {
                                Linking.openURL(`http://maps.apple.com?daddr=${this.state.coordinate.latitude}, ${this.state.coordinate.longitude}`)
                            } else {
                                Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${this.state.coordinate[this.state.coordinate.length - 1].latitude}, ${this.state.coordinate[this.state.coordinate.length - 1].longitude}`)
                            }
                        }
                        }
                    >
                        <Image
                            source={require("../../assets/icons/ic_round_map.png")}
                        />
                    </TouchableOpacity>
                )
            }

        }

        const { coordinate, location, duration, latitude, longitude } = this.state
        if (latitude) {
            return (
                <View
                    style={styles.container}
                >
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation
                        loadingEnabled
                        ref={el => this.mapView = el}
                    >

                        {coordinate.length != 0 && (
                            <Fragment>
                                <MapViewDirection
                                    origin={location}
                                    destination={coordinate[coordinate.length - 1]}
                                    apikey='AIzaSyCAQXp08fMI5MUl-RA5pB6-m0nzDMVGjhk'
                                    strokeWidth={3}
                                    strokeColor="hotpink"
                                    precision="high"
                                    // fit google map vừa với màn hình
                                    onReady={result => {

                                        this.setState({
                                            duration: Math.floor(result.duration),

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

                                <Marker
                                    coordinate={coordinate[coordinate.length - 1]}
                                >
                                    <Image
                                        source={require("../../assets/icons/person-marker.png")}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                </Marker>


                            </Fragment>
                        )}

                    </MapView>

                    {buttChat}
                    {buttonMap}
                    {buttonUser}
                    <TouchableOpacity
                        onPress={bottomButtonFuction}
                        style={styles.button}>
                        <View>
                            <Text style={styles.text}>{this.state.buttonText}</Text>
                            {this.state.lookingForPassenger === true ?
                                <ActivityIndicator
                                    animating={this.state.lookingForPassenger}
                                    size="large"
                                    color="#ffffff"

                                /> : null}
                        </View>

                    </TouchableOpacity>




                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../../assets/animations/ship.json')}
                    />
                </View>
            )
        }
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
    image: {
        marginTop: 450,
        position: 'absolute',
        alignItems: "flex-end",
        marginLeft: 340

    },
    image1: {
        marginTop: 300,
        marginLeft: 340,
        position: "absolute"

    },

    image2: {
        marginTop: 380,
        marginLeft: 340

    }
})