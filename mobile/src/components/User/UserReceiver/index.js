import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { back, userLocation, marker } from "../../../constants/icons";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Location from '../UserReceiver/location'
import Info from '../UserReceiver/info'
export default class UserReceiver extends Component {
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.headerBar}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center'
                                }}

                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Image
                                    source={back}
                                    style={{ tintColor: '#ffffff' }}
                                />
                            </TouchableOpacity>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 20
                            }}  >
                                <Text style={styles.textHeader} >
                                    Thông tin người nhận
                            </Text>
                            </View>
                        </View>

                        <Location destination={this.props.route.params.destination} navigation={this.props.navigation} />

                        <Info
                            navigate={this.props.navigation}
                            destination={this.props.route.params.destination}
                            coordinates={this.props.route.params.coordinates}
                            routes={this.props.route.params.routes}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#A6AEB9'
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

});