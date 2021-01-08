import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Image, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'
import axios from "axios"; // fetch API
import baseURL from "../../../baseUrl"
axios.defaults.baseURL = baseURL;
export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            passWord: "",
            errorMessage: "",
            repassWord: ""
        }
    }

    isEmailValid = () => {
        let email = this.state.email
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(String(email).toLowerCase())
    }

    // Đăng ký
    async handleSignUp() {
        if (!this.isEmailValid) {
            Alert.alert("Lỗi", "Email không đúng định dạng")
        } else if (this.state.passWord !== this.state.repassWord) {
            Alert.alert("Lỗi", "Mật khẩu không giống")
        }
        else {
            try {
                const { email, passWord } = this.state;
                const res = await axios.post("/auth/signup", { email, passWord })// Lấy token từ tk và mk

                this.props.navigation.navigate("Login")
                // this.handleSignIn();
            } catch (error) {
                // this.setState({
                //     errorMessage: error.response.data.message
                // });
                console.log("AAA" + error)
                Alert.alert("Alo", "Email tồn tại");
            }
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


    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TouchableWithoutFeedback style={{ flex: 1 }}
                    onPress={Keyboard.dismiss}>
                    <View style={styles.logoContainer}>
                        {/* <View style={styles.logoContainer}> */}
                        <Image style={styles.logo} source={require('../../assets/icons/logo.png')} />

                        <Text style={styles.title}>Đăng ký</Text>

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

                        <TextInput style={styles.input}
                            placeholder="Nhập lại mật khẩu"
                            placeholderTextColor='white'
                            returnKeyType='go'
                            secureTextEntry={true}
                            autoCorrect={false}
                            ref={(input) => { this.txtrepassword = input; }}
                            value={this.state.repassWord}
                            onChangeText={(repassWord) => {
                                this.setState({
                                    repassWord
                                })
                            }}
                        />


                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.handleSignUp()}
                        >
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
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
