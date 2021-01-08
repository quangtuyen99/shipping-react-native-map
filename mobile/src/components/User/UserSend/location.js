import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import { markerBlack, ship } from '../../../constants/icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Location extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>
                        Địa chỉ lấy hàng
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("UserLocation", { location: this.props.location, latitude: this.props.latitude, longitude: this.props.longitude })}
                    >
                        <Text style={{ color: "#EB7715", alignSelf: 'flex-end' }}>
                            Đổi địa chỉ
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.location}>
                    <Image source={markerBlack} />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text>{this.props.location}</Text>

                        <TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#757F8C' }}>
                                Thêm chi tiết địa chỉ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: windowHeight / 5,
    },
    header: {
        width: '100%',
        height: 30,
        backgroundColor: '#D1D8E1',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between'
    },
    location: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#ffffff'
    },
})