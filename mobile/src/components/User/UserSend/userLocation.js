import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import { back, userLocation, marker } from "../../../constants/icons";
import Search from "../Search"
import global from '../../../constants/global'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const locationUser = global.userLocation;


export default class Details extends Component {
    state = {
        latitude: null,
        longitude: null,
        destination: null,
        coordinates: null,
        routes: null,
        duration: null,
        location: this.props.location,
        locationUser
    }

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        const title = data.structured_formatting.main_text + " " + data.structured_formatting.secondary_text
        global.userLocation = []
        global.userLocation.push({
            latitude: latitude,
            longitude: longitude,
            title,
        })
        this.setState({

            destination: {
                latitude: latitude,
                longitude: longitude,
                title: title.substring(0, title.indexOf(", Ho Chi Minh")),
            },
            coordinates:

            {
                latitude: latitude,
                longitude: longitude,
                title: data.structured_formatting.main_text,
            }
            ,

            routes:

            {
                latitude: latitude,
                longitude: longitude,
                title: data.structured_formatting.main_text,
                duration: null,
            }
            ,

        });

        this.props.navigation.push("Ship", { destination: null, coordinates: null, routes: null });
        navigation = this.props.navigate;
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <TouchableOpacity
                        style={{ justifyContent: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image
                            source={back}
                            style={{ tintColor: '#ffffff' }}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 20
                        }}
                    >
                        <Text style={styles.textHeader} >
                            Địa điểm
                        </Text>
                    </View>
                </View>

                <Search onLocationSelected={this.handleLocationSelected} />


                <View style={styles.viewMarker}>
                    <TouchableOpacity
                        style={styles.marker}
                        onPress={() => this.props.navigation.push("ChangeLocationSend",
                            {
                                latitude: this.props.route.params.latitude,
                                longitude: this.props.route.params.longitude
                            })}>
                        <Image
                            source={marker}
                            style={{
                                height: 40,
                                width: 40
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
                            <Text>
                                Đặt địa điểm
                            </Text>


                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',

    },
    headerBar: {
        width: '100%',
        height: windowHeight / 13,
        backgroundColor: '#14437C',
        flexDirection: 'row',
        padding: 10
    },
    textHeader: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    userLocation: {
        width: '100%',
        height: 80,
        backgroundColor: '#ffffff',
        marginTop: 400,

    },
    touchUserLocation: {
        flexDirection: 'row',
        padding: 10
    },
    viewMarker: {
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        marginTop: 100,

    },
    marker: {
        flexDirection: 'row',
        padding: 10
    }


});