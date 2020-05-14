import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView, PanResponder, Animated, Dimensions} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {useNavigationState} from 'react-navigation-hooks';
import { VictoryPie, VictoryLabel, Slice, VictoryTheme, VictoryBar, VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from 'victory-native';
import Svg from 'react-native-svg';
import Drawer from 'react-native-draggable-view';
import SwipeablePanel from 'react-native-sheets-bottom';
import {createResponder} from 'react-native-gesture-responder';

import { DARK_MODE } from './../Styles';

class Panel extends Component {
// function Panel(props) {
    constructor() {
        super();
        this.state = {
            height: new Animated.Value(0),
            pan: new Animated.ValueXY(),
            pos: {x: 0, bottom: -60},
            open: false
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.state.pan.setOffset(this.state.pan.__getValue());
                this.state.pan.setValue({x: this.state.pan.x._value, y: this.state.pan.y._value});
            },

            //   onPanResponderMove: Animated.event([
            //     null, {dy: this.state.pan.y},
            //   ]),
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy > (-75) && gestureState.moveY > 510 && gestureState.moveY < 610) {
                    Animated.event([null, {
                        dy: this.state.pan.y
                    }])(evt, gestureState)
                    // this.state.pan.setValue({ x:0, y:this.state.pan.y._value})
                } else {
                    Animated.event([null, {
                        dy: 0
                    }])(evt, gestureState)
                    // this.state.pan.setValue({ x:0, y:0})
                }

                return;
            },
            onPanResponderRelease: (evt, gestureState) => {
                console.log(gestureState.dy < (-35) && gestureState.moveY > 410);
                console.log('onPanResponderRelease ', gestureState.moveY > 350);
                console.log('onPanResponderRelease', gestureState.dy < (-35));
                console.log('moveY', Number(gestureState.moveY));
                console.log('dy', Number(gestureState.dy));// this.state.pan.flattenOffset();

                if (!this.state.open && gestureState.dy < (-35) && gestureState.moveY > 390) {
                    console.log('here');
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: -60 },
                        // friction: 5
                    }).start();
                    this.setState({open: true})
                } else if (this.state.open && gestureState.dy > 40 && gestureState.moveY > 510 && gestureState.moveY < 685) {
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 60 },
                        // friction: 5
                    }).start();
                    this.setState({open: false})
                } else {
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        // friction: 5
                    }).start();
                    // this.setState({open: false})
                }
            }
        });
    }

    render() {
        // console.log(this);
        let { pan } = this.state;
        let [translateX, translateY] = [pan.x, pan.y];
        console.log('open', this.state.open);
        return (
            // <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
                <Animated.View
                    ref="panel"
                    // {...this._panResponder.panHandlers}
                    style={[styles.panelContainer, this.state.pos, {transform: [{translateX}, {translateY}]}, {height: 140, alignItems: 'center'}]} >
                    {/* <View style={{width: 280}}> */}
                        <View {...this._panResponder.panHandlers} style={{overflow: 'hidden', flexDirection: 'row', height: 20, width: 280, justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                            <View style={{borderWidth: 8,borderColor: 'yellow', width: 45, height: 45, borderRadius: 50, top: -18, position: 'relative'}} />

                            <View style={{backgroundColor: 'red', width: 240, height: 50}} >
                                <Text style={{width: 60}}>Drag me!</Text>
                            </View>

                            <View style={{backgroundColor: 'red', width: 40, height: 40, borderRadius: 50, marginTop: -20, position: 'relative'}} />
                            {/* <View style={{backgroundColor: 'red', width: 30, height: 30, borderRadius: 50}} /> */}
                            {/* <View style={{backgroundColor: 'red', width: 30, height: 30, borderRadius: 50}} /> */}
                            {/* <View style={{backgroundColor: 'red', width: 15, height: 15}} >
                                <View style={{borderRadius: 50, backgroundColor: 'yellow', width: 30, height: 30, marginLeft: -0 }} />
                            </View> */}
                            {/* <Text style={{widthy: 260, backgroundColor: 'blue'}}>Drag me!</Text> */}
                            {/* <View style={{borderRadius: 50, backgroundColor: 'red', width: 16, height: 16}} /> */}
                        </View>
                        <View style={{width: '100%', height: 110, backgroundColor: 'green' }}>

                        </View>
                    {/* </View> */}
                </Animated.View>
            // </View>
        );
    }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    panelContainer: {
        position    : 'absolute',
        // top         : Window.height/2 - CIRCLE_RADIUS,
        // left        : Window.width/2 - CIRCLE_RADIUS,
        // bottom: 80,
        // bottom: 100,
        // left: Window.width/2,
        // marginBottom: -30,
        width: '100%',
        // marginLeft: 10,
        // left: 20,
        right: 0,
        // marginRight: 10
        // height              : 250,
        // height: 100
      },
      circle: {
        backgroundColor     : '#1abc9c',
        width               : 180,
        height              : 250,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // borderRadius        : CIRCLE_RADIUS
      }
});

export default Panel;