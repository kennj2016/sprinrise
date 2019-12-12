import React from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import {AppComponent} from "../AppComponent";

import {Background, Gravity, ItemGravity, LayoutGravity, LayoutParams, Margin, Orientation} from "../Styles";
import VideoPlayer from 'react-native-video-player';
import type {Timeline} from "../Models";
import {Assets} from "../AppStyles";

export default class VideoScreen extends AppComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const item: Timeline = this.getParams("timeline");
        return (
            <View style={[
                LayoutParams.weight(1),
                Background.color("black"),
                Gravity.center,
                ItemGravity.center,
                Orientation.vertical
            ]}>
                {this.showCloseIfNeeded()}
                <View style={[LayoutParams.device_width(),
                    LayoutParams.heightBy(16, 9),
                    Background.color("whitesmoke")]}
                >
                    <VideoPlayer
                        style={[LayoutParams.full_width, LayoutParams.full_height]}
                        customStyles={{
                            playIcon: Assets.ic_btn_play
                        }}
                        video={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
                    />
                </View>
            </View>
        );
    }

    showCloseIfNeeded() {
        if (Platform.OS === "ios") return (
            <View style={[LayoutGravity.topRight, Margin.right(20), Margin.top(20)]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image style={[LayoutParams.size(32), {resizeMode: 'contain'}]}
                           source={Assets.ic_cancel}
                    />
                </TouchableOpacity>
            </View>
        ); else return null;
    }
}