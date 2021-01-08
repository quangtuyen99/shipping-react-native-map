import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import CheckBox from '@react-native-community/checkbox'
import { markerBlack, ship } from '../../../constants/icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Location extends Component {
    render() {


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>
                        Giao hàng đến
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={{ color: "#EB7715", alignSelf: 'flex-end' }}>
                            Đổi địa chỉ
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.location}>
                    <Image source={markerBlack} />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text>{this.props.destination.title}</Text>

                        <TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#757F8C' }}>
                                Thêm chi tiết địa chỉ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.extra}>
                    <Image
                        source={ship}
                        style={{ width: 30, height: 30 }}
                    />

                    <View style={{ flex: 1, marginLeft: 5, justifyContent: 'center' }}>
                        <Text style={{ color: '#000000' }}>
                            Giao hàng tận tay
                        </Text>

                        <Text style={{ fontSize: 12, color: '#757F8C' }}>
                            10,000đ
                        </Text>
                    </View>

                    <View style={{ alignSelf: 'flex-end' }}>
                        <CheckBox
                            disabled={false}
                        />
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
    extra: {
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        marginTop: 2,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        padding: 10,

    }
})

