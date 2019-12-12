import type {Children, Timeline, Token} from "./Models";
import {Error, UrlFormData} from "./Models";
import {AppConst} from "./AppConst"
import {Log} from "./Logger";
import {AppCache} from "./AppCache";
import {Injector} from "./Injector";

export class Repository {
    _appCache: AppCache;

    constructor() {
        this._appCache = Injector.inject(AppCache);
    }

    /**
     * @param userName
     * @param password
     * @param isRemember
     * @returns {Promise<Token>}
     */
    async login(userName: String, password: String, isRemember: boolean): Token {
        let result: Token = await this._convert(() => fetch(AppConst.token, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new UrlFormData({
                username: userName,
                password: password,
                grant_type: 'password',
                scope: 'openid'
            }).build(),
        }));
        await this._appCache.saveToken(result);
        await this._appCache.saveRemember(isRemember);
        if (isRemember) await this._appCache.saveLoginForm(userName, password);
        return result
    }

    logout() {
        this._appCache.clearToken().finally();
    }

    async isLogged() {
        return await this._appCache.getToken() != null;
    }

    async isRemember() {
        return await this._appCache.isRemember();
    }

    async getLoginForm() {
        return await this._appCache.getLoginForm();
    }

    /**
     *
     * @returns {Promise<Array<Children>>}
     */
    async getChildrens(): Array<Children> {
        return await this._get(AppConst.list_children)
    }

    /**
     * @param childId
     * @param fromDate
     * @param toDate
     * @returns {Promise<Array<Timeline>>}
     */
    async getTimeLines(childId: number, fromDate: String, toDate: String): Promise<Array<Timeline>> {
        return await this._get(AppConst.time_line(
            childId, fromDate, toDate
        ));
    }

    _convert(callback: () => Promise) {
        return new Promise(async (res, rej) => {
            try {
                let result = await callback();
                let resultJson = await result.json();
                Log.d("Response", resultJson);
                if (resultJson.error !== undefined) rej(resultJson);
                else res(resultJson);
            } catch (e) {
                rej(e)
            }
        });
    }

    _get(path: String) {
        Log.i("GET", path);
        if (this._appCache.getToken() == null) throw new Error("Token null, please login again!");
        return this._convert(() => fetch(path, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this._getAuthorization(),
            }
        }));
    }

    _getAuthorization() {
        let token: Token = this._appCache.getToken();
        if (token == null) return "";
        return token.token_type + " " + token.access_token;
    }
}