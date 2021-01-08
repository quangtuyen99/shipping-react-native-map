import React, { Component } from 'react'
import { Platform, KeyboardAvoidingView, SafeAreaView, LogBox } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from "./Fire"
export default class chat extends Component {
    state = {
        messages: []
    }


    get user() {
        return {
            _id: Fire.uid,
            name: "Shipper"
        }
    }

    componentDidMount() {
        Fire.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))

        )

    }

    componentWillUnmount() {
        Fire.off()
    }


    render() {
        LogBox.ignoreAllLogs();


        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />

        if (Platform.OS === "android") {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            )
        }

        return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>
    }
}


