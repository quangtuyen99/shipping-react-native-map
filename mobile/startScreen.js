import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    Platform,
    TouchableOpacity
} from "react-native";

export default class Start extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("Shipper"), navigation = this.props.navigation }}
                    style={[styles.choiceContainer, { borderBottomWidth: 1 }]}
                >
                    <Text style={styles.choiceText}>Tài xế</Text>
                    <Image
                        source={require("../mobile/src/assets/icons/wheel.png")}
                        style={styles.selectionImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("Ship"), navigation = this.props.navigation }}
                    style={styles.choiceContainer}
                >
                    <Text style={styles.choiceText}>Khách hàng</Text>
                    <Image
                        source={require("../mobile/src/assets/icons/passenger.png")}
                        style={styles.selectionImage}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3A3743"
    },
    choiceText: {
        fontSize: 32,
        marginBottom: 20,
        fontWeight: "200",
        color: "#FFF",
        fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined
    },
    choiceContainer: {
        flex: 1,
        borderColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    },
    selectionImage: {
        height: 200,
        width: 200
    }
});