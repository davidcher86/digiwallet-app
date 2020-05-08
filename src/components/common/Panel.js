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

function Panel(props) {
    const [panHeight, setPanHeight] = useState(80);
    const [panY, setPanY] = useState(0);
    const dropZoneValues = React.useRef(null);
    const pan = React.useRef(new Animated.ValueXY());
    const position = React.useRef(new Animated.ValueXY()).current;
    const isDropZone = React.useCallback((gesture) => {
    // const dz = dropZoneValues.current;

    // return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }, []);

    // const onMove = React.useCallback((_, gesture) => {
    //     console.log('pan', pan);
    // // if (isDropZone(gesture)) setBgColor('red');
    // // else setBgColor('#2c3e50');
    // }, [isDropZone]);

    const onMove = React.useCallback((_, gesture) => {
        // console.log('pan', pan);
        setPanY(pan.y);
        // if (pan.current.y < -80) {
        //     return;
        // }
    // if (isDropZone(gesture)) setBgColor('red');
    // else setBgColor('#2c3e50');
    }, []);

    const setDropZoneValues = React.useCallback((event) => {
    dropZoneValues.current = event.nativeEvent.layout;
    });
    console.log(panHeight);
    const panResponder = React.useMemo(() => PanResponder.create({
    // const panResponder = React.useMemo(() => createResponder({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            console.log('onMoveShouldSetPanResponderCapture', gestureState);
            return false;
        },
        // onMoveShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            console.log('onMoveShouldSetPanResponder', gestureState);
            // Listen for your events and show UI feedback here
            return false;
        },
        onPanResponderMove: (e, gestureState) => {
            position.setValue({x: gestureState.dx, y: gestureState.dy});
        },
        onPanResponderGrant: (e, gestureState) => {
            console.log('onPanResponderGrant', gestureState);
            // this.state.drag.setOffset({x: this.state.drag.x._value, y: this.state.drag.y._value});
            // this.state.drag.setValue({x: 0, y: 0})

        },
        // onPanResponderMove: Animated.event([null, {
        //     // dx  : pan.current.x,
        //     dy: pan.current.y
        //   }], {
        //     listener: onMove
        //   }),
        onPanResponderRelease: (e, gesture) => {
            // console.log('e', e);
            console.log('gesture', gesture.dy);
            console.log('panHeight', panHeight);
            if (panHeight === 80 && gesture.dy < -40) {
                setPanHeight(140);
            } else if (panHeight === 140 && gesture.dy > 40) {
                setPanHeight(80);
            }

        //   if (!isDropZone(gesture)) {
        //     console.log(gesture);
            Animated.spring(
              pan.current,
              {toValue:{x:0,y:0}}
            // {toValue:{x:0,y:-100}}
            ).start();
        //   }
        }}), []);
    // console.log(pan.current.getLayout());
    return (
        <View style={styles.draggableContainer}>
            <Animated.View
                {...panResponder.panHandlers}
                style={[pan.current.getLayout(), styles.circle, {height: panHeight}]} >
                <View style={{backgroundColor: 'yellow', height: 30, justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                    <Text>Drag me!</Text>
                </View>
            </Animated.View>
        </View>
    );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    draggableContainer: {
        position    : 'absolute',
        // top         : Window.height/2 - CIRCLE_RADIUS,
        // left        : Window.width/2 - CIRCLE_RADIUS,
        bottom: 30,
        left: Window.width/2,
        marginBottom: -30,
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