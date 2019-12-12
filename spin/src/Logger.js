export class Log {

    static i(tag: String, message: String) {
        console.log(tag + "/ " + message);
    };

    static e(tag: String, message: String) {
        console.log(tag + "/ " + message);
    };

    static d(tag: String, message: any) {
        console.log("___________________" + tag + "___________________");
        console.log(message);
    };
}