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

import { DARK_MODE } from './../Styles';

function Panel(props) {
    const [panHeight, setPanHeight] = useState(70);
    const dropZoneValues = React.useRef(null);
    const pan = React.useRef(new Animated.ValueXY());
    const isDropZone = React.useCallback((gesture) => {
    // const dz = dropZoneValues.current;
    // return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }, []);

    const onMove = React.useCallback((_, gesture) => {
    // if (isDropZone(gesture)) setBgColor('red');
    // else setBgColor('#2c3e50');
    }, [isDropZone]);

    const setDropZoneValues = React.useCallback((event) => {
    dropZoneValues.current = event.nativeEvent.layout;
    });
    console.log(panHeight);
    const panResponder = React.useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderMove: Animated.event([null, {
          // dx  : pan.current.x,
          dy  : pan.current.y
        }], {
          listener: onMove
        }),
        onPanResponderRelease: (e, gesture) => {
            // console.log(gesture);
            setPanHeight(100);
        //   if (!isDropZone(gesture)) {
        //     console.log(gesture);
            Animated.spring(
              pan.current,
              {toValue:{x:0,y:0}}
            // {toValue:{x:0,y:-100}}
            ).start();
        //   }
        }
    }), []);
    console.log(pan.current.getLayout());
    return (
        <View style={styles.draggableContainer}>
            <Animated.View
                {...panResponder.panHandlers}
                style={[pan.current.getLayout(), styles.circle, {height: panHeight}]}
            >
                <Text style={styles.text}>Drag me!</Text>
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
        marginBottom: -30
      },
      circle: {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        // borderRadius        : CIRCLE_RADIUS
      }
});

export default Panel;