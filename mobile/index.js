/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from "./App";
import Login from "./src/components/Login/index"
import { name as appName } from './app.json';
import Chat from "./src/components/Shipper/chat"
AppRegistry.registerComponent(appName, () => App);
