export class AppStyles {
    static colorPrimary = "#0087C1";
    static borderRadius = 5;

    static button(isLoading: boolean) {
        return {
            borderRadius: this.borderRadius,
            backgroundColor: isLoading ? "whitesmoke" : this.colorPrimary,
            color: "white"
        }
    }

    static editText = {
        backgroundColor: "whitesmoke",
        marginTop: 10,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    };
}

export const Assets = {
    logo_app: require("./assets/logo_app.png"),
    ic_btn_play: require("./assets/ic_btn_play.png"),
    ic_back: require("./assets/ic_back.png"),
    ic_cancel: require("./assets/ic_cancel.png"),
};