import React, {Component, useEffect} from 'react';
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
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function Header(props) {
  const {navigate} = props.navigation;
  const transactions = useSelector(state => state.transactions);
  const identity = useSelector(state => state.identity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
  }, []);

  return (
    <View style={{height: 50, flexDirection: 'row'}}>
      <TouchableOpacity
        style={{width: 130}}
        onPress={() => {
          // dispatch(dashboardActions.resetFlow());
          navigate('ExpanceCharts', {type: 'ReplaceCurrentScreen'})
          }}>
        <Text>Expances</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 130}}
        onPress={() => {
          // dispatch(dashboardActions.reset());
          navigate('MoneyFlowCharts', {type: 'ReplaceCurrentScreen'})
        }}>
        <Text>Money Flow</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 130}}
        onPress={() => {
          // dispatch(dashboardActions.reset());
          navigate('BalanceCharts', {type: 'ReplaceCurrentScreen'})
        }}>
        <Text>Balance</Text>
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
