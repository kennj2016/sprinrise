import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AppComponent} from "../AppComponent";
import {Repository} from "../Repository";
import {
    Background,
    Border,
    Font,
    Gravity,
    ItemGravity,
    LayoutGravity,
    LayoutParams,
    Margin,
    Orientation,
    Padding,
    TextAlign,
    Visible
} from "../Styles";
import {AppStyles, Assets} from "../AppStyles";
import MainScreen from "./MainScreen";
import type {LoginForm} from "../Models";
import {AppWidgets} from "../widgets/AppWidgets";

export default class LoginScreen extends AppComponent {
    _appRepo: Repository;

    constructor(props) {
        super(props);
        this._appRepo = this.inject(Repository);
        this.state.userName = "admin";
        this.state.password = "tempP@ss123";
        this.state.isRemember = false;
    }

    _login() {
        this.launch(async () => {
            await this._appRepo.login(this.state.userName, this.state.password, this.state.isRemember);
            this.navigate("MainScreen");
        });
    }

    componentDidMount() {
        super.componentDidMount();
        this.launch(async () => {
            this.state.isRemember = await this._appRepo.isRemember();
            if (this.state.isRemember) {
                let loginForm: LoginForm = await this._appRepo.getLoginForm();
                if (loginForm != null) {
                    this.state.userName = loginForm.userName;
                    this.state.password = loginForm.password;
                }
            }
            if (await this._appRepo.isLogged()) this.navigate("MainScreen");
        }, false);
    }

    toggleRemember() {
        this.state.isRemember = !this.state.isRemember;
        this.invalidate()
    }

    render() {
        return (
            <View style={[
                LayoutParams.weight(1),
                Orientation.vertical,
                Background.color(AppStyles.colorPrimary),
            ]}>
                <View style={[LayoutParams.weight(1), Gravity.center, ItemGravity.center]}>
                    <Image style={[{resizeMode: 'contain'}, LayoutParams.width(250), LayoutParams.heightByWidth(16, 9, 250)]}
                           source={Assets.logo_app}/>
                </View>
                <View style={[LayoutParams.weight(3.5), Orientation.vertical,]}>
                    <View style={[
                        Orientation.vertical,
                        Background.color("white"),
                        Border.radius(AppStyles.borderRadius),
                        Padding.top(20),
                        Padding.bottom(30),
                        Padding.horizontal(20),
                        Margin.horizontal(30),
                    ]}>
                        <Text style={[
                            TextAlign.center,
                            Padding.all(10),
                            Font.size(20),
                            Font.weight("bold")
                        ]}>Login</Text>

                        <Text style={Margin.top(10)}>Email</Text>

                        <TextInput
                            value={this.state.userName}
                            style={AppStyles.editText}
                            placeholder={"Email"}
                            disabled={this.state.isLoading}
                            editable={true}
                        />

                        <Text style={Margin.top(10)}>Password</Text>

                        <TextInput
                            value={this.state.password}
                            disabled={this.state.isLoading}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            style={AppStyles.editText}
                            editable={true}
                        />
                        <View style={[Margin.top(15), Orientation.horizontal, ItemGravity.center, Gravity.center]}>
                            <TouchableOpacity
                                onPress={() => this.toggleRemember()}
                                style={[Background.colorIf(this.state.isRemember, AppStyles.colorPrimary, "whitesmoke"),
                                    Border.radius(AppStyles.borderRadius),
                                    Margin.right(10),
                                    LayoutParams.size(24)
                                ]}/>
                            <Text onPress={() => this.toggleRemember()}>Remember me</Text>
                        </View>

                        {Visible.show(this.state.error !== "", () => (
                            <View style={[Gravity.center, Margin.top(5)]}>
                                <Text style={Font.color("red")}>{this.state.error}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={[Margin.horizontal(30), Margin.top(25), Gravity.center, ItemGravity.center]}>
                        <TouchableOpacity
                            disabled={this.state.isLoading}
                            style={LayoutParams.fill_parent}
                            onPress={() => this._login()}>
                            <Text style={[
                                Padding.all(15),
                                Font.weight("bold"),
                                Font.color(AppStyles.colorPrimary),
                                Font.size(18),
                                Border.radius(AppStyles.borderRadius),
                                Background.color("white"),
                                TextAlign.center
                            ]}>Login</Text>
                        </TouchableOpacity>
                        {Visible.show(this.state.isLoading, () => AppWidgets.ProgressBar(LayoutGravity.center))}
                    </View>
                </View>
            </View>
        );
    }
}