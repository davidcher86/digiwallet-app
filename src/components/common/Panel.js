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
            pos: {x: 0, bottom: -70},
            open: false
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.state.pan.setOffset(this.state.pan.__getValue());
                // this.state.pan.setValue({x: this.state.pan.x._value, y: this.state.pan.y._value});
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
                // console.log(gestureState.dy < (-35) && gestureState.moveY > 410);
                // console.log('onPanResponderRelease ', gestureState.moveY > 350);
                // console.log('onPanResponderRelease', gestureState.dy < (-35));
                // console.log('moveY', Number(gestureState.moveY));
                // console.log('dy', Number(gestureState.dy));// this.state.pan.flattenOffset();

                if (!this.state.open && gestureState.dy < (-35) && gestureState.moveY > 390) {
                    console.log('here');
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: -75 },
                        // friction: 5
                    }).start();
                    this.setState({open: true})
                } else if (this.state.open && gestureState.dy > 40 && gestureState.moveY > 510 && gestureState.moveY < 685) {
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 75 },
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
        let { pan } = this.state;
        let [translateX, translateY] = [pan.x, pan.y];
        // console.log(this.props);
        return (
                <Animated.View
                    ref="panel"
                    style={[styles.panelContainer, this.state.pos, {transform: [{translateX}, {translateY}]}, {height: 140, alignItems: 'center'}]} >
                        <View {...this._panResponder.panHandlers} style={{borderColor: '#187b72',flexDirection: 'row', height: 20, width: 280, justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 0}}>
                            <View style={{elevation: 12,width: 40, height: 20, position: 'relative'}} >
                                <View style={{borderColor: '#187b72', borderBottomWidth: 6, borderRightWidth: 3, width: 22, height: 17, borderBottomRightRadius: 28, position: 'relative', right: -22, top: 10}} />
                            </View>
                            <View style={{shadowColor: 'black',elevation: 12,
                                            shadowOpacity: 0.9,
                                            shadowOffset: { width: 0, height: -3},backgroundColor: '#187b72', width: 220, height: 40, zIndex: 4000, borderTopLeftRadius: 16, borderTopRightRadius: 16, alignItems: 'center'}} >
                                <View style={{shadowColor: 'black',elevation: 2,
                                            shadowOpacity: 0.6,
                                            shadowOffset: { width: 0, height: -2},
                                            shadowRadius: 10,borderColor: '#187b72',height: 4, width: 200, backgroundColor: '#b3f1eb', position: 'relative', top: 8, borderRadius: 8}} />
                            </View>
                            <View style={{elevation: 12,width: 40, height: 20, position: 'relative'}} >
                                <View style={{borderColor: '#187b72', borderBottomWidth: 6, borderLeftWidth: 3, width: 22, height: 17, borderBottomLeftRadius: 28, position: 'relative', right: 4, top: 10}} />
                            </View>
                        </View>
                        <View style={{shadowColor: 'black',elevation: 12,
                                                shadowOpacity: 0.9,
                                                shadowOffset: { width: 0, height: -3},width: '100%', height: 110, backgroundColor: '#187b72' }}>
                            {this.props.content}
                        </View>
                </Animated.View>
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