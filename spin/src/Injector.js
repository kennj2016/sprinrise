class Bean {
    _instance: any;

    constructor(invokable: () => any, isSingleton: boolean) {
        this._invokable = invokable;
        this._isSingleton = isSingleton;
    }

    getInstance() {
        if (!this._isSingleton) return this._invokable();
        if (this._instance == null) this._instance = this._invokable();
        return this._instance;
    }
}

export class Injector {
    _cache: Bean[] = [];
    static _instance: Injector = null;

    inject(type) {
        return this._cache[type].getInstance();
    }

    single(type, invokable: () => any) {
        this._cache[type] = new Bean(invokable, true)
    }

    static _getInstance() {
        if (this._instance == null) this._instance = new Injector();
        return this._instance;
    }

    static single(type, invokable: () => any) {
        this._getInstance().single(type, invokable)
    }

    static inject(type) {
        return this._getInstance().inject(type);
    }

}