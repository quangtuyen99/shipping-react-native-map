import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import Location from './location'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { back, userLocation, marker } from "../../../constants/icons";
export default class UserSend extends Component {
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
                            Thông tin người gửi
                        </Text>
                    </View>
                </View>
                <Location
                    location={this.props.route.params.location}
                    navigation={this.props.navigation}
                    latitude={this.props.route.params.latitude}
                    longitude={this.props.route.params.longitude}
                />

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
})