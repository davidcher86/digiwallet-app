import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Easing, ScrollView, Animated} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import VerticalSwipe from 'react-native-vertical-swipe';
// import SwipeablePanel from "rn-swipeable-panel";
import SwipeUpDown from 'react-native-swipe-up-down';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SlidingPanel from 'react-native-sliding-panels';
import SwipeablePanel from 'react-native-sheets-bottom';

import Panel from './../common/Panel';
import ExpanceCharts from './ExpancesChartsTab';
import MoneyFlowCharts from './MoneyFlowChartsTab';
import BalanceCharts from './BalanceChartsTab';
import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';
import * as homePageActions from './../homePage/homePageActions';
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function Header(props) {
  const {navigation} = props;
  const [open, setOpen] = useState(false);
  const transactions = useSelector(state => state.transactions);
  const profile = useSelector(state => state.profile);
  const identity = useSelector(state => state.identity);
  const dashboard = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  // console.log(navigate);
  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
    dispatch(homePageActions.fetchProfileData(identity.uid, props.navigation));
  }, []);

  const panelHeight = new Animated.Value(0);
  const panelPadding = new Animated.Value(0);

  const expandPanel = () => {
    Animated.timing(panelHeight, {
      toValue: 80,
      duration: 300,
      easing: Easing.linear,
    }).start();

    Animated.timing(panelPadding, {
      toValue: 6,
      duration: 100,
      easing: Easing.linear,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(panelHeight, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start();

    Animated.timing(panelPadding, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
    }).start();
  };
  // useEffect(() => {
  //   console.log("afsf");
  // }, [navigation]);
  // console.log(Drawer);

  return (
    <View style={{flexDirection: 'column'}}>
      {/* {Panel()} */}
      <Panel />
    <View style={{flexDirection: 'row', width: '100%', bottom: 0, position:'absolute', backgroundColor: "#08191f"}}>
      <TouchableOpacity
        style={{height: 50, width: 130, flexDirection: 'column', alignSelf: "center"}}
        onPress={() => {
          // dispatch(dashboardActions.resetFlow());
          navigation.navigate('ExpanceCharts', {type: 'ReplaceCurrentScreen'})
          }}>
        <Text style={(navigation.state.index === 0
                      ? {color: "#7ed3e0", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                      : {color: "#a0a0a0", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Expances</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{height: 50, width: 130, flexDirection: 'column', alignSelf: "center"}}
        onPress={() => {
          // dispatch(dashboardActions.reset());
          navigation.navigate('MoneyFlowCharts', {type: 'ReplaceCurrentScreen'})
        }}>
        <Text style={(navigation.state.index === 1
                      ? {color: "#7ed3e0", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                      : {color: "#a0a0a0", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Money Flow</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{height: 50, width: 130, flexDirection: 'column', alignSelf: "center"}}
        onPress={() => {
          // dispatch(dashboardActions.reset());
          navigation.navigate('BalanceCharts', {type: 'ReplaceCurrentScreen'})
        }}>
        <Text style={(navigation.state.index === 2
                      ? {color: "#7ed3e0", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                      : {color: "#a0a0a0", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Balance</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    // flex: 1,
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
    // padding: 10,
  },
  cardContainer: {
    // width: '90%',
    // height: 400,
    margin: 15,
  },
});

const DashboardStack = createMaterialTopTabNavigator(
// const DashboardStack = createBottomTabNavigator(
  {
    ExpanceCharts: {
      screen: ExpanceCharts,
      navigationOptions: {
        mode: 'modal',
        title: 'Expance Charts'
      }
      // group: 'Weakly',
    },
    MoneyFlowCharts: {
      screen: MoneyFlowCharts,
      navigationOptions: {
        mode: 'modal',
        title: 'Money Flow Charts'

      }
      // group: 'Monthly',
    },
    BalanceCharts: {
      screen: BalanceCharts,
      navigationOptions: {
        mode: 'modal',
        title: 'Balance Charts'

      }
      // group: 'Monthly',
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#009acc',
      pressOpacity: true,
      mode: 'modal',
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 140,
      },
      style: {
        backgroundColor: 'blue',
      },
    },
    // initialRouteName: 'ExpanceCharts',
    tabBarComponent: Header,
    swipeEnabled: false,
    activeColor: '#f0edf6',
    inactiveColor: '#fffff',
    tabBarPosition: 'bottom',
    resetOnBlur: true,
    lazy: true,
    // barStyle: {backgroundColor: '#694fad'},
  },
);

export default DashboardStack;
