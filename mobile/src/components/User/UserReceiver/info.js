import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import '../../../constants/global'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import global from '../../../constants/global'
export default class Info extends Component {

    state = {
        dateStart: new Date(),
        mode: 'date',
        show: false,
        showStart: false,
        showEnd: false,
        dateEnd: new Date(),
        name: null,
        phone: null,
        cod: null,
        des: null,
        user: [],
        newUser: [],
    }


    setDateStart = (event, date) => {
        date = date || this.state.dateStart
        this.setState({
            show: Platform.OS == 'ios' ? true : false,
            dateStart: date,
            showStart: true
        })
    };



    showStart = mode => {
        this.setState({
            show: true,
            mode,
            showStart: true
        })
    }




    timepickerStart = () => {
        this.showStart('time');
    }





    render() {
        const { show, dateStart, mode, dateEnd, showStart, showEnd, name, phone, cod, des, user, example } = this.state
        const { navigate } = this.props
        let textStart, textEnd;

        if (showStart) {
            textStart = <Text>{dateStart.getHours()} : {dateStart.getMinutes()}</Text>
        } else {
            textStart = <Text>Giờ nhận</Text>
        }





        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    textContentType='name'
                    placeholder="Tên ngưởi nhận"
                    onChangeText={(name) => this.setState({ name })}
                />

                <TextInput
                    style={styles.textInput}
                    textContentType='telephoneNumber'
                    placeholder="Số điện thoại"
                    onChangeText={(phone) => this.setState({ phone })}
                />

                <TextInput
                    style={styles.textInput}
                    textContentType='telephoneNumber'
                    placeholder="COD"
                    onChangeText={(cod) => this.setState({ cod })}

                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Thông tin mô tả"
                    onChangeText={(des) => this.setState({ des })}
                />

                <Text style={{ marginBottom: 5 }}>Thời gian nhận: </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={styles.textInputTimeStart}
                        onPress={this.timepickerStart}
                    >
                        <Text>{textStart}</Text>
                    </TouchableOpacity>



                </View>

                <Text >Mức đền bù tối đa cho sự cố hư hỏng, mất hàng là 3 triệu. Xem </Text>

                <TouchableOpacity>
                    <Text style={{ color: "#EB7715" }}>Chính sách đền bù</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            global.user.push({
                                id: global.user.length + 1,
                                name: name,
                                phone: phone,
                                cod: cod,
                                des: des,
                                timeStart: dateStart.getHours() + " : " + dateStart.getMinutes(),
                                destination: this.props.destination.title
                            }),
                                global.coordinates.push({
                                    id: global.coordinates.length + 1,
                                    latitude: this.props.coordinates.latitude,
                                    longitude: this.props.coordinates.longitude,
                                    title: this.props.coordinates.title,
                                }),
                                global.routes.push({
                                    id: global.routes.length + 1,
                                    latitude: this.props.routes.latitude,
                                    longitude: this.props.routes.longitude,
                                    title: this.props.routes.title,
                                    duration: null,
                                }),
                                navigate.push('Ship'),
                                console.log("123 " + JSON.stringify(global.coordinates))


                        }}
                    >
                        <Text style={styles.textButton}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>


                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateStart}
                        mode={mode}
                        is24Hour={false}
                        display="default"
                        onChange={this.setDateStart}

                    />
                )}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 15,
        backgroundColor: '#ffffff',
        padding: 10,

    },
    textInput: {
        height: 45,
        borderRadius: 5,
        backgroundColor: '#D1D8E1',
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: "#EB7715",
        padding: 10,
        width: 380,
        height: 40,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textButton: {
        color: '#ffffff',
        fontSize: 16
    },

    textInputTimeStart: {
        height: 45,
        borderRadius: 5,
        backgroundColor: '#D1D8E1',
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInputTimeEnd: {
        height: 45,
        borderRadius: 5,
        backgroundColor: '#D1D8E1',
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        width: 170,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
});