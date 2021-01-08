import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView
} from 'react-native'
import axios from "axios"; // fetch API
import baseURL from "../../../baseUrl"
axios.defaults.baseURL = baseURL;

import global from "../../constants/global";

Keyboard.dismiss();
export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            passWord: "",
            errorMessage: ""
        }
    }

    // Đăng nhập
    async handleSignIn() {
        try {
            const { email, passWord } = this.state;
            const result = await axios.post("/auth/login", { email, passWord })// Lấy token từ tk và mk

            if (result.data.token != null) {

                global.token = result.data.token;
                this.props.navigation.navigate("Start")
                navigation = this.props.navigation
            } else {
                Alert.alert("ALo", result.data);

            }
        } catch (error) {
            this.setState({
                errorMessage: error.response.data.message
            });

        }

    }

    // Đăng ký
    async handleSignUp() {
        try {
            const { email, passWord } = this.state;
            const res = await axios.post("/auth/signup", { email, passWord })// Lấy token từ tk và mk
            console.log(res);
            Alert.alert("Alo", res.data);
            // this.handleSignIn();
        } catch (error) {
            this.setState({
                errorMessage: error.response.data.message
            });
            Alert.alert("Alo", "1");
        }

    }

    render() {
        return (



            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TouchableWithoutFeedback style={{ flex: 1 }}
                    onPress={Keyboard.dismiss}>
                    <View style={styles.logoContainer}>
                        {/* <View style={styles.logoContainer}> */}
                        <Image style={styles.logo} source={require('../../assets/icons/logo.png')} />

                        <Text style={styles.title}>Thông tin tài khoản</Text>

                        <TextInput style={styles.input}
                            placeholder="Nhập email"
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCorrect={false}
                            onSubmitEditing={() => this.txtPassword.focus()}
                            blurOnSubmit={false}
                            value={this.state.email}

                            onChangeText={(email) => {
                                this.setState({
                                    email
                                })
                            }}
                        />
                        <TextInput style={styles.input}
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor='white'
                            returnKeyType='go'
                            secureTextEntry={true}
                            autoCorrect={false}
                            ref={(input) => { this.txtPassword = input; }}
                            value={this.state.passWord}
                            onChangeText={(passWord) => {
                                this.setState({
                                    passWord
                                })
                            }}
                        />
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.handleSignIn()}
                        >
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 50 }}
                            onPress={() => { this.props.navigation.navigate("signup"), navigation = this.props.navigation }}
                        >
                            <Text style={{ color: "#ffffff", fontSize: 16 }}>Đăng ký</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: "center",
    // },
    // inner: {
    //     padding: 24,
    //     flex: 1,
    //     justifyContent: "center"
    // },
    // header: {
    //     fontSize: 36,
    //     marginBottom: 48
    // },
    // textInput: {
    //     height: 40,
    //     borderColor: "#000000",
    //     borderBottomWidth: 1,
    //     marginBottom: 36
    // },
    // btnContainer: {
    //     backgroundColor: "white",
    //     marginTop: 12
    // },
    // btnSignIn: {
    //     backgroundColor: "#333333",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: 50,
    //     width: 200,
    //     marginBottom: 50,
    //     marginLeft: 100
    // },
    // textButton: {
    //     color: "#ffffff",
    //     fontSize: 16
    // }

    container: {
        flex: 1,
        backgroundColor: 'rgb(32,53,70)',

        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        color: '#f7c744',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 18,
        opacity: 0.9,
    },
    logo: {
        width: 150,
        height: 140,
    },
    infoCotainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        //backgroundColor:'red',
        height: 200,
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        width: 350,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15,
        width: 150,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32,53,70)',
        fontWeight: 'bold',
        fontSize: 18
    }
})
