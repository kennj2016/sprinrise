import {Background, Font, Gravity, ItemGravity, LayoutGravity, LayoutParams, Margin, TextAlign} from "../Styles";
import {Image, Platform, ProgressBarAndroid, ProgressViewIOS, Text, TouchableOpacity, View} from "react-native";
import {AppStyles, Assets} from "../AppStyles";
import React from "react";

export class AppWidgets {
    static ActionBar(onBackPressed: () => any) {
        return (
            <View
                elevation={3}
                style={[
                    LayoutParams.height(50),
                    ItemGravity.center,
                    Gravity.center,
                    Margin.top(Platform.OS === "ios" ? 20 : 0),
                    Background.bottomShadow]}>
                <TouchableOpacity
                    style={[LayoutGravity.left, LayoutParams.size(56), Gravity.center, ItemGravity.center]}
                    onPress={() => onBackPressed()}>
                    <Image style={[LayoutParams.size(24), {resizeMode: 'contain'}, Margin.left(15)]}
                           source={Assets.ic_back}/>
                </TouchableOpacity>

                <Text style={[
                    LayoutGravity.center,
                    TextAlign.center,
                    Font.defaultFamily,
                    Font.size(20),
                    Font.weight("bold")
                ]}>Timeline</Text>
            </View>
        );
    }

    static ProgressBar(style: any) {
        if (Platform.OS === "ios") {
            if (style !== undefined) return (<ProgressViewIOS color={AppStyles.colorPrimary}
                                                              style={style}/>);
            else return (<ProgressViewIOS color={AppStyles.colorPrimary}/>);
        }
        else {
            if (style !== undefined) return (<ProgressBarAndroid color={AppStyles.colorPrimary} style={style}/>);
            else return (<ProgressBarAndroid color={AppStyles.colorPrimary}/>);
        }
    }
}