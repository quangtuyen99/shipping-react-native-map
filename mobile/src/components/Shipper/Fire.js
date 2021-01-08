import firebase from "firebase"

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCNnv5yEQmkNQwGnKOPotiYQRyB4Q3OP7Y",
                authDomain: "react-native-chat-4fe78.firebaseapp.com",
                databaseURL: "https://react-native-chat-4fe78-default-rtdb.firebaseio.com",
                projectId: "react-native-chat-4fe78",
                storageBucket: "react-native-chat-4fe78.appspot.com",
                messagingSenderId: "845640718923",
                appId: "1:845640718923:web:4794a0560c0b13b596cbce"
            })
        }
    }

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }


            this.db.push(message)
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val()

        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    off() {
        this.db.off()
    }



    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }


}

export default new Fire();