import React, { Component } from 'react'
import { Text, View, Platform, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { clear } from '../../../constants/icons'
export default class Search extends Component {
    state = {
        searchFocus: false
    }


    render() {
        const { onLocationSelected, searchFocus } = this.props;
        return (
            <GooglePlacesAutocomplete
                placeholder="Viet Nam?"
                placeholderTextColor="#333"
                onPress={onLocationSelected} // Xử lý khi có thao tác chọn địa điểm
                query={{
                    key: 'AIzaSyCAQXp08fMI5MUl-RA5pB6-m0nzDMVGjhk',
                    language: 'vie'
                }}

                textInputProps={{
                    // Kiểm tra có đang nhập vào thanh tìm kiếm không
                    onFocus: () => this.setState({ searchFocus: true }),
                    onBlur: () => this.setState({ searchFocus: false }),
                    clearButtonMode: 'never',
                    autoCapitalize: "none",
                    autoCorrect: false,
                    ref: input => {
                        this.textInput = input;
                    }
                }}

                renderRightButton={() => (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => {
                            this.textInput.clear();
                        }}
                    >
                        <Image
                            source={clear}
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />
                    </TouchableOpacity>
                )}

                listViewDisplayed={searchFocus}

                fetchDetails // Dữ liệu trả v
                enablePoweredByContainer={false}

                styles={{
                    container: {
                        position: 'absolute',
                        marginTop: 50,
                        top: Platform.select({ ios: 60, android: 20 }),
                        width: "100%",
                    },
                    textInputContainer: {
                        flex: 1,
                        backgroundColor: "transparent",
                        height: 54,
                        marginHorizontal: 20,
                        borderTopWidth: 0,
                        borderBottomWidth: 0
                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        padding: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 0,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { x: 0, y: 0 },
                        shadowRadius: 15,
                        borderWidth: 1,
                        borderColor: "#DDD",
                        fontSize: 18
                    },
                    listView: {
                        borderWidth: 1,
                        borderColor: "#DDD",
                        backgroundColor: "#FFF",
                        marginHorizontal: 20,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { x: 0, y: 0 },
                        shadowRadius: 15,
                        marginTop: 10,
                        marginRight: 55

                    },
                    description: {
                        fontSize: 16
                    },
                    row: {
                        padding: 20,
                        height: 60
                    }
                }}
            />
        )
    }
}


const styles = StyleSheet.create({
    clearButton: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,

    }
})
