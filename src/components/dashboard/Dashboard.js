import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function Header(props) {
  const transactions = useSelector(state => state.transactions);
  const identity = useSelector(state => state.identity);

  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>header</Text>
    </View>
  );
}

function ExpanceCharts(props) {
  const transactions = useSelector(state => state.transactions);

  const expanceChart1 = (data) => {
    return (
      <Card style={styles.cardContainer}>
        <CardItem header>
          <Text>NativeBase</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              //Your text here
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>GeekyAnts</Text>
        </CardItem>
      </Card>
    );
  };

  const expanceChart2 = (data) => {
    return (
      <Card style={styles.cardContainer}>
        <CardItem header>
          <Text>NativeBase</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              //Your text here
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>GeekyAnts</Text>
        </CardItem>
      </Card>
    );
  };

  return (
    <View>
      {expanceChart1({})}
      {expanceChart2({})}
      <Text>ExpanceCharts</Text>
    </View>
  );
}

const graphicColor = ['#388087', '#007a71', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ y: 10, label: 'test 1' }, { y: 50, label: 'test 2' }, { y: 30, label: 'test 3' }, { y: 10, label: 'test 4' }];

function MoneyFlowCharts(props) {
  const transactions = useSelector(state => state.transactions);
  const dashboard = useSelector(state => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardActions.updateData(wantedGraphicData));
  }, []);

  const moneyFlowChart1 = (data) => {
    return (
      <Card style={styles.cardContainer}>
        <CardItem header>
          <Text>NativeBase</Text>
        </CardItem>
        <CardItem>
          <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', backgroundColor: 'yellow'}}>
              <VictoryPie
                padding={100}
                // labelRadius
                // padAngle={7}
                // padAngle={({ datum }) => datum.y}
                innerRadius={68}
                style={{backgroundColor: 'green'}}
                duration={2000}
                animate={{ duration: 2000, easing: 'linear' }}                
                colorScale={graphicColor}
                data={dashboard.data} />
          </View>
        </CardItem>
        <CardItem footer>
          <Text>GeekyAnts</Text>
        </CardItem>
      </Card>
    );
  };

  const moneyFlowChart2 = (data) => {
    return (
      <Card style={styles.cardContainer}>
        <CardItem header>
          <Text>NativeBase</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              //Your text here
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>GeekyAnts</Text>
        </CardItem>
      </Card>
    );
  };
  
  return (
    <View style={styles.cardContainer}>
      {moneyFlowChart1({})}
      {moneyFlowChart2({})}
      <Text>MoneyFlowCharts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
    // padding: 10,
  },
  cardContainer: {
    // width: '90%',
    margin: 15,
  },
});

const DashboardStack = createMaterialTopTabNavigator(
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
    // tabBarComponent: Header,
    // tabBarComponent: BottomTransactionsStack,
    activeColor: '#f0edf6',
    inactiveColor: '#fffff',
    tabBarPosition: 'bottom',
    lazy: true,
    // barStyle: {backgroundColor: '#694fad'},
  },
);

export default DashboardStack;

// const mapStateToProps = state => {
//   return {settings: state.settings};
// };

// export default connect(
//   mapStateToProps,
//   {},
// )(Dashboard);
