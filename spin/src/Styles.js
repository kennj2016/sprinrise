import {Dimensions, StyleSheet} from "react-native";

export const Orientation = StyleSheet.create({
    horizontal: {
        flexDirection: 'row'
    },
    vertical: {
        flexDirection: 'column'
    }
});

export class LayoutParams {
    static full_height = {
        height: "100%"
    };
    static full_width = {
        width: "100%"
    };

    static device_width() {
        return {
            width: this.deviceWidth()
        }
    };

    static device_height() {
        return {
            height: this.deviceHeight()
        }
    };

    static deviceWidth() {
        let {height, width} = Dimensions.get('window');
        return width;
    }

    static deviceHeight() {
        let {height, width} = Dimensions.get('window');
        return height;
    }

    static weight(value: number) {
        return {
            flex: value
        }
    }

    static size(value: number) {
        return {
            width: value,
            height: value
        }
    };

    static match_parent = {
        flex: 1
    };

    static fill_parent = {
        alignSelf: "stretch"
    };

    static wrap_content = {
        flexWrap: 'wrap'
    };
    static center = {
        alignItems: 'center'
    };

    static width(size) {
        return {
            width: size
        }
    }

    static height(size) {
        return {
            height: size
        }
    }

    static remainHeight(number) {
        let {height, width} = Dimensions.get('window');
        return height - number;
    }

    static heightByWidth(widthRatio: number, heightRatio: number, width: number) {
        return {
            height: heightRatio / widthRatio * width
        }
    }

    static heightBy(widthRatio: number, heightRatio: number) {
        return {
            height: heightRatio / widthRatio * this.deviceWidth()
        }
    }
}

export class Background {
    static bottomShadow = {
        backgroundColor: '#d9d9d9',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    };

    static color(color) {
        return {
            backgroundColor: color
        }
    }

    static debug = {
        backgroundColor: "red"
    };

    static image(url) {
        return {
            backgroundImage: url
        }
    }

    static colorIf(condition, colorChecked, colorUnChecked) {
        return {
            backgroundColor: condition ? colorChecked : colorUnChecked
        }
    }
}

export const TextAlign = {
    center: {
        textAlign: "center"
    },
    left: {
        textAlign: "left"
    },
    right: {
        textAlign: "right"
    }
};

export class Font {
    static size(size: number) {
        return {
            fontSize: size
        }
    };

    static defaultFamily = {
        fontFamily: 'Cochin'
    };

    static weight(style) {
        return {
            fontWeight: style
        }
    }

    static color(color) {
        return {
            color: color
        }
    }
}

export const Gravity = StyleSheet.create({
    spread: {
        justifyContent: 'space-around'
    },
    spreadInside: {
        justifyContent: 'space-between'
    },
    center: {
        justifyContent: 'center'
    },
    start: {
        justifyContent: 'flex-start'
    },
    end: {
        justifyContent: 'flex-end'
    }
});

export class Visible {
    static show(show: boolean, callback: () => any) {
        return show ? callback() : null;
    }
}

export const ItemGravity = StyleSheet.create({
    center: {
        alignItems: 'center'
    },
    start: {
        alignItems: 'flex-start'
    },
    end: {
        alignItems: 'flex-end'
    }
});

export const LayoutGravity = StyleSheet.create({
    top: {
        position: 'absolute',
        top: 0,
    },
    topRight: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    left: {
        position: 'absolute',
        left: 0,
    },
    right: {
        position: 'absolute',
        right: 0,
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
    },
    center: {
        position: 'absolute'
    }
});

export class Margin {
    static all(size: number) {
        return {
            margin: size
        }
    }

    static horizontal(size) {
        return {
            marginLeft: size,
            marginRight: size
        }
    }

    static top(size: number) {
        return {
            marginTop: size
        }
    }

    static bottom(size: number) {
        return {
            marginBottom: size
        }
    }

    static left(size: number) {
        return {
            marginLeft: size
        }
    }

    static right(size: number) {
        return {
            marginRight: size
        }
    }
}

export class Padding {
    static all(size: number) {
        return {
            padding: size
        }
    }

    static top(size: number) {
        return {
            paddingTop: size
        }
    }

    static bottom(size: number) {
        return {
            paddingBottom: size
        }
    }

    static horizontal(size: number) {
        return {
            paddingLeft: size,
            paddingRight: size
        }
    }

    static left(size: number) {
        return {
            paddingLeft: size
        }
    }

    static right(size: number) {
        return {
            paddingRight: size
        }
    }
}

export class Border {
    static radius(size) {
        return {
            borderRadius: size,
            overflow: 'hidden'
        }
    }
}
