/**
 * @format
 * https://github.com/abbasfreestyle/react-native-af-video-player
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import MainScreen from "./src/views/MainScreen";
import LoginScreen from "./src/views/LoginScreen";
import {Repository} from "./src/Repository";
import {Injector} from "./src/Injector";
import VideoScreen from "./src/views/VideoScreen";
import {AppCache} from "./src/AppCache";

Injector.single(Repository, () => new Repository());
Injector.single(AppCache, () => new AppCache());

const AppContainer = createAppContainer(createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    MainScreen: {
        screen: MainScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    VideoScreen: {
        screen: VideoScreen,
        navigationOptions: () => ({
            header: null
        })
    }
}, {
    initialRouteName: "LoginScreen"
}));

class App extends Component {
    render() {
        return (
            <AppContainer/>
        );
    }
}

AppRegistry.registerComponent(appName, () => App);
