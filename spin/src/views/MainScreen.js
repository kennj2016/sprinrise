import React from 'react';
import {
    Alert,
    DatePickerAndroid,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {AppComponent} from "../AppComponent";
import {
    Background,
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
} from "../Styles"
import {Repository} from "../Repository";
import ChildPickerDialog from "../widgets/ChildPickerDialog";
import type {Children, Timeline} from "../Models";
import {AppStyles, Assets} from "../AppStyles";
import Video from "react-native-video";
import {AppWidgets} from "../widgets/AppWidgets";

export default class MainScreen extends AppComponent {
    appRepo: Repository;

    constructor(props) {
        super(props);
        this.appRepo = this.inject(Repository);
        this.state.timeline = [];
        this.state.childrens = [];
        this.state.currentChildren = null;
        this.state.dateFrom = new Date(2018, 5, 5);
        this.state.dateTo = new Date();
    }

    //Override
    componentDidMount() {
        super.componentDidMount();
        this.launch(async () => {
            this.state.childrens = await this.appRepo.getChildrens();
            this.state.currentChildren = this.state.childrens[0];
        });
    }

    loadTimeline() {
        let child: Children = this.state.currentChildren;
        if (child == null) {
            this.showChildDialog();
            return;
        }
        this.launch(async () => {
            this.state.timeline = await this.appRepo.getTimeLines(child.childrenId,
                this.state.dateFrom.toISOString(),
                this.state.dateTo.toISOString());
        });
    }

    //Override
    onError(e) {
        Alert.alert(e.toString());
    }

    getChildText() {
        let children: Children = this.state.currentChildren;
        if (children == null) return "";
        return children.firstName + " " + children.lastName;
    }

    onChildrenPicked(children: Children) {
        if (children === undefined) return;
        this.invalidate({currentChildren: children});
    }

    showChildDialog() {
        this.state[ChildPickerDialog].show(true);
    }

    openVideo(item: Timeline) {
        this.navigate("VideoScreen", {timeline: item})
    }

    showDatePickerDialog(dateFrom: boolean) {
        DatePickerAndroid.open({
            date: new Date(),
        }).then((result) => {
            const {action, year, month, day} = result;
            if (action === DatePickerAndroid.dismissedAction) return;

            let date = new Date(year, month, day);
            let dateObject = dateFrom ? {dateFrom: date} : {dateTo: date};
            this.invalidate(dateObject);
        }).catch((e) => {
            console.warn('Cannot open date picker', e);
        });
    }

    showLogoutDialog() {
        Alert.alert("Logout", "Are you sure you want to logout?",
            [{
                text: "Cancel", onPress: () => {
                }, style: "cancel"
            }, {
                text: "Ok", onPress: () => {
                    this.appRepo.logout();
                    this.props.navigation.goBack();
                }
            },
            ], {cancelable: false})
    }

    render() {
        return (
            <View style={[Orientation.vertical, LayoutParams.match_parent]}>
                <ChildPickerDialog
                    controller={this}
                    items={this.state.childrens}
                    onDismiss={(children) => this.onChildrenPicked(children)}
                />
                {AppWidgets.ActionBar(() => this.showLogoutDialog())}
                <ScrollView style={LayoutParams.match_parent}>
                    <View style={[Orientation.vertical, Padding.all(20)]}>
                        <Text style={Margin.top(10)}>Children</Text>

                        <Text onPress={() => this.showChildDialog()}
                              style={[AppStyles.editText, LayoutParams.weight(2)]}>
                            {this.getChildText()}
                        </Text>

                        <Text style={Margin.top(10)}>Date From</Text>

                        <Text style={[AppStyles.editText, LayoutParams.weight(2)]}
                              onPress={() => this.showDatePickerDialog(true)}>
                            {this.state.dateFrom.toDateString()}
                        </Text>

                        <Text style={Margin.top(10)}>Date To</Text>

                        <Text style={[AppStyles.editText, LayoutParams.weight(2)]}
                              onPress={() => this.showDatePickerDialog(false)}>
                            {this.state.dateTo.toDateString()}
                        </Text>

                        <TouchableOpacity
                            disabled={this.state.isLoading}
                            onPress={() => this.loadTimeline()}
                            style={[Gravity.center, Margin.top(15)]}>
                            <Text style={[
                                AppStyles.button(this.state.isLoading),
                                Padding.all(10),
                                Font.size(16),
                                TextAlign.center]}>View Timeline</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[Margin.bottom(10)]}>
                        {Visible.show(this.state.isLoading, () => AppWidgets.ProgressBar(Margin.top(10)))}
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.timeline}
                            renderItem={({item}) => (
                                <View style={Margin.top(10)}>{this.renderTimeline(item)}</View>
                            )}/>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderTimeline(item: Timeline) {
        if (item.dataType === "Video") return this.renderVideo(item);
        if (item.dataType === "Image") return (
            <Image
                style={[LayoutParams.full_width, LayoutParams.heightBy(16, 9)]}
                source={{uri: item.data}}
            />
        );
        return (
            <Text style={Margin.horizontal(10)}>{item.data}</Text>
        )
    }

    renderVideo(item: Timeline) {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.openVideo(item)}>
                    <View style={[Gravity.center, ItemGravity.center]}>
                        <Video
                            style={[LayoutParams.full_width, LayoutParams.heightBy(16, 9), Background.color("whitesmoke")]}
                            // source={{uri: item.data}}
                            paused={true}
                            resizeMode={"cover"}
                            source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
                        />
                        <View style={[LayoutParams.size(48), LayoutGravity.center]}>
                            <Image source={Assets.ic_btn_play}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}