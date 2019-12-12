import type {LoginForm, Token} from "./Models";
import {AsyncStorage} from "react-native";

export class AppCache {
    _token: Token;
    _loginForm: LoginForm;

    async saveToken(token: Token) {
        await AsyncStorage.setItem('Token', JSON.stringify(token));
        this._token = token;
    }

    async saveRemember(isRemember: boolean) {
        await AsyncStorage.setItem('isRemember', isRemember ? "true" : "false");
    }

    async isRemember() {
        try {
            return await AsyncStorage.getItem('isRemember') === "true";
        } catch (e) {
            return false;
        }
    }

    async clearToken() {
        await AsyncStorage.removeItem('Token');
        this._token = null;
    }

    async getToken() {
        return this._get("Token");
    }

    async saveLoginForm(userName: String, password: String) {
        let form = {
            userName: userName,
            password: password
        };
        await AsyncStorage.setItem('LoginForm', JSON.stringify(form));
        this._loginForm = form;
    }

    async _get(key: String) {
        try {
            if (this._loginForm != null) return null;
            let json = await AsyncStorage.getItem(key);
            if (json === "") return null;
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    }

    async getLoginForm() {
        return this._get("LoginForm")
    }
}