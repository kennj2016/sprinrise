import React, {Component} from 'react';
import {Injector} from "./Injector";
import type {ViewController} from "./Models";
import {NavigationParams} from "react-navigation";

export class AppComponent extends Component implements ViewController {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: ""
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.state = null;
    }

    launch(call: () => Promise, loading: boolean = true) {
        if (loading) this.state.isLoading = true;
        this.state.error = "";
        this.invalidate();
        call().catch((e) => {
            this.state.error = e.toString();
            this.onError(e);
        }).finally(() => {
            if (loading) this.state.isLoading = false;
            this.invalidate();
        });
    }

    onError(e) {

    }

    //Override
    getState() {
        return this.state;
    }

    //Override
    getController(): ViewController {
        return this.props.controller;
    }

    //Override
    invalidate(payload): void {
        if (this.state == null) return;
        if (payload !== undefined && payload != null) {
            for (let key in payload) {
                // noinspection JSUnfilteredForInLoop
                this.state[key] = payload[key];
            }
        }
        this.setState(this.state);
    }

    showError(text) {
        this.state.error = text;
        this.invalidate();
    }

    inject = (type) => Injector.inject(type);

    navigate(path: String, params?: NavigationParams) {
        this.props.navigation.navigate(path, params)
    }

    getParams(key: String, defaultValue: any) {
        return this.props.navigation.getParam(key, defaultValue)
    }
}