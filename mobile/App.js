import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Ship from './src/components/User/Ship/index'
import Details from './src/components/User/Details/index';
import UserReceiver from './src/components/User/UserReceiver/index'
import UserSend from './src/components/User/UserSend/index'
import UserLocation from './src/components/User/UserSend/userLocation'
import ChangeLocationSend from './src/components/User/UserSend/changeLocationSend'
import ChangeLocationReceiver from './src/components/User/UserReceiver/changeLocationReceiver'
import Start from './startScreen'
import Shipper from './src/components/Shipper/index'
import FindDriver from './src/components/User/FindDriver/index'
import Login from './src/components/Login/index';
import GenericContainer from "./src/components/Shipper/genericContainer"
import Splash from "./src/components/Login/splash"
import changeDetail from "./src/components/User/Ship/changeDetail"
import detailPackage from "./src/components/Shipper/detailPackage"
import chat from "./src/components/Shipper/chat"
import signup from "./src/components/Login/signup"
const DriverWithGenericContainer = GenericContainer(Shipper);

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,

                }}
                initialRouteName={Splash}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="signup" component={signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="FindDriver" component={FindDriver} />
                <Stack.Screen name="Shipper" component={Shipper} />
                <Stack.Screen name="detailPackage" component={detailPackage} />
                <Stack.Screen name="chat" component={chat} />
                <Stack.Screen name="Ship" component={Ship} />
                <Stack.Screen name="changeDetail" component={changeDetail} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="UserReceiver" component={UserReceiver} />
                <Stack.Screen name="UserSend" component={UserSend} />
                <Stack.Screen name="UserLocation" component={UserLocation} />
                <Stack.Screen name="ChangeLocationSend" component={ChangeLocationSend} />
                <Stack.Screen name="ChangeLocationReceiver" component={ChangeLocationReceiver} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
