import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Dimensions,
    Easing
} from 'react-native'
import LottieView from 'lottie-react-native';
export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => this.props.navigation.navigate("Login"));



    }

    render() {
        return (
            <LottieView source={require('../../assets/animations/ship.json')} progress={this.state.progress} />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(32,53,70)',
    },
    logo: {
        width: 130,
        height: 130,
        borderRadius: 130 / 2,
    },
    title: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        width: 400,
        fontSize: 21
    }
})