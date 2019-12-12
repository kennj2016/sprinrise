import {AppComponent} from "../AppComponent";
import {FlatList, Modal, Text} from "react-native";
import React from "react";
import type {Children} from "../Models";
import {Padding} from "../Styles";

export default class ChildPickerDialog extends AppComponent {
    constructor(props) {
        super(props);
        this.getControllerState()[ChildPickerDialog] = this;
        this.getControllerState().isShowPickerDialog = false;
    }

    getControllerState = () => this.getController().getState();

    show(show) {
        this.getController().invalidate({isShowPickerDialog: show});
    }

    onItemPressed(item) {
        this.show(false);
        this.props.onDismiss(item);
    }

    render() {
        return (
            <Modal animationType="slide"
                   transparent={false}
                   visible={this.getControllerState().isShowPickerDialog}
                   onRequestClose={() => this.onItemPressed()}>
                <FlatList
                    data={this.props.items}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Modal>
        )
    }

    renderItem(item: Children) {
        return (
            <Text style={[Padding.all(15)]}
                  onPress={() => this.onItemPressed(item)}>{item.firstName} {item.lastName}</Text>
        )
    }
}