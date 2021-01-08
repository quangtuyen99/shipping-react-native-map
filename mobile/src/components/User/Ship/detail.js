import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import global from '../../../constants/global'
import Swipeout from 'react-native-swipeout';
// const user = global.user;


export default class Detail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            activateRowKey: null, // Lưu key được chọn xóa
            user: this.props.list,
            refresh: false
        }

    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }

    GetItem(item) {

        Alert.alert(item);

    }



    render() {
        const { user, activateRowKey, refresh } = this.state

        if (user) {
            return (

                <View style={styles.container}>
                    <FlatList

                        data={user}

                        width='100%'

                        contentContainerStyle={{ paddingBottom: 30 }}

                        key={(index) => index}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state.refresh}
                        renderItem={({ item, index }) =>


                            <View style={styles.containerItem} >
                                <TouchableOpacity
                                    style={styles.containerTouchable}


                                >
                                    <View style={styles.wrap}>
                                        <Text style={styles.text}>{item.name}</Text>
                                        <Text style={styles.text}> - </Text>
                                        <Text style={styles.text}>{item.phone}</Text>
                                    </View>

                                    <View style={styles.wrap}>
                                        <Text style={styles.text}>Địa chỉ: </Text>
                                        <Text style={styles.textDestination}>{item.destination}</Text>
                                    </View>

                                    <View style={styles.wrap}>
                                        <Text style={styles.text}>Mô tả: </Text>
                                        <Text style={styles.textItem}>{item.des}</Text>
                                    </View>


                                    <View style={styles.wrap}>
                                        <Text style={styles.text}>Thu hộ: </Text>
                                        <Text style={styles.textItem}>{item.cod}</Text>
                                    </View>

                                    <View style={styles.wrap}>
                                        <Text style={styles.text}>Thời gian nhận: </Text>
                                        <Text style={styles.textItem}>{item.timeStart}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            // </Swipeout>

                        }
                    />
                </View>


            );
        }
        else {
            return (
                <View style={{ width: '100%', height: 180, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Chưa có dữ liệu</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({

    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },


    button: {

        width: '90%',
        height: 40,
        padding: 10,
        borderRadius: 8,

    },
    container: {
        width: '100%',
        height: 180,
        marginTop: 10,
        paddingRight: 10,

    },
    containerItem: {
        flex: 1,
        marginTop: 5,
        borderBottomWidth: 1
    },
    containerTouchable: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 5,

    },
    wrap: {
        flexDirection: 'row',

        justifyContent: 'flex-start'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
    },
    textItem: {
        fontSize: 16
    },
    textDestination: {
        fontSize: 16,
        width: "80%"
    }


});