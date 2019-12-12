import {Log} from "./Logger";

export interface Token {
    token_type: String;
    access_token: String;
    expires_in: number;
    id_token: String;
}

export interface Timeline {
    id: number;
    dataType: String;
    data: String;
    createdOn: String;
    createdBy: String;
    childrenId: String;
    children: String;
}

export interface Children {
    childrenId: String;
    firstName: String;
    lastName: number;
    dob: String;
    address: String;
    zip: String;
    city: String;
    country: String;
    parentId: String;
    caregiverId: String;
    devices: String;
    timeLines: String;
}

export interface LoginForm {
    userName: String;
    password: String;
}

export class VideoManager {
    items: VideoPlayer[] = [];

    add(item: Timeline) {
        this.items[item.id] = new VideoPlayer()
    }

    isPaused(item: Timeline) {
        if (this.items[item.id] === undefined) return true;
        return this.items[item.id].isPaused;
    }

    setPlayer(item: Timeline, player) {
        this.items[item.id].player = player;
    }

    togglePlay(item: Timeline) {
        let isPaused = !this.items[item.id].isPaused;
        let player = this.items[item.id].player;
        Log.d("Player", player)
        // if (!isPaused) player.play();
        // else player.pause();
    }

    clear() {
        this.items = [];
    }
}

export class VideoPlayer {
    player: any;
    isPaused: boolean;

    constructor() {
        this.isPaused = true;
    }
}

export interface ViewController {

    getController(): ViewController;

    getState(): any;

    invalidate(): void;
}

export class Error {
    constructor(message: String) {
        this.message = message;
    }

    toString() {
        return this.message;
    }
}

export class UrlFormData {

    constructor(data: any) {
        this.data = data;
    }

    build() {
        let formBody = [];
        for (let key in this.data) {
            let value = this.data[key];
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(value);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }
}