import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';

import ExpanceCharts from './ExpancesChartsTab';
import MoneyFlowCharts from './MoneyFlowChartsTab';
import BalanceCharts from './BalanceChartsTab';
import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';
import * as homePageActions from './../homePage/homePageActions';
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function Header(props) {
  // const {navigate} = props.navigation;
  const {navigation} = props;
  const transactions = useSelector(state => state.transactions);
  const profile = useSelector(state => state.profile);
  const identity = useSelector(state => state.identity);
  const dispatch = useDispatch();
  // console.log(navigate);
  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
    dispatch(homePageActions.fetchProfileData(identity.uid, props.navigation));
  }, []);

  // useEffect(() => {
    // console.log("afsf");
  // }, [navigate]);
  // console.log(navigation);

  return (
    <View style={{height: 50, flexDirection: 'row', backgroundColor: "#08191f"}}>
      <TouchableOpacity
        style={{width: 130, flexDirection: 'column', alignSelf: "center"}}
        onPress={() => {
          // dispatch(dashboardActions.resetFlow());
          navigation.navigate('ExpanceCharts', {type: 'ReplaceCurrentScreen'})
          }}>
        <Text style={(navigation.state.index === 0
                      ? {color: "#ffffff", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                      : {color: "#b5c6cc", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Expances</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 130, flexDirection: 'column', alignSelf: "center"}}
        onPress={() => {
          // dispatch(dashboardActions.reset());
          navigation.navigate('MoneyFlowCharts', {type: 'ReplaceCurrentScreen'})
        }}>
        <Text style={(navigation.state.index === 1
                      ? {color: "#ffffff", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                      : {color: "#b5c6cc", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Money Flow</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 130, flexDirection: 'column', alignSelf: "center"}}
        onPress={() => {
          // dispatch(dashboardActions.reset());
          navigation.navigate('BalanceCharts', {type: 'ReplaceCurrentScreen'})
        }}>
        <Text style={(navigation.state.index === 2
                      ? {color: "#ffffff", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                      : {color: "#b5c6cc", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Balance</Text>
      </TouchableOpacity>
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
        title: 'Expance Charts'
      }
      // group: 'Weakly',
    },
    MoneyFlowCharts: {
      screen: MoneyFlowCharts,
      navigationOptions: {
        title: 'Money Flow Charts'

      }
      // group: 'Monthly',
    },
    BalanceCharts: {
      screen: BalanceCharts,
      navigationOptions: {
        title: 'Balance Charts'

      }
      // group: 'Monthly',
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#009acc',
      pressOpacity: true,
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
