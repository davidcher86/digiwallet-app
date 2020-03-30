import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';

const graphicColor = ['tomato', 'orange', 'gold', 'cyan', 'navy']; // Colors
const wantedGraphicData = [{ y: 10, label: 'test 1' }, { y: 50, label: 'test 2' }, { y: 30, label: 'test 3' }, { y: 10, label: 'test 4' }];

function groupToPie(list, keyGetter) {
    var data = [];

    list.forEach((item) => {
         const key = keyGetter(item);
         if (!data.some(t => t.label === key)) {
          data.push({label: key, y: item.amount});
         } else {
           const index = data.findIndex(t => t.label === key);
           data[index].y = data[index].y + item.amount;
         }
    });

    return data;
}
function MoneyFlowCharts(props) {
    const transactionList = useSelector(state => state.transactions.transactions);
    // const state = useSelector(state => state);
    const dashboard = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    // const newData = transactions.transactions.f;
    useEffect(() => {
      dispatch(dashboardActions.updateData(wantedGraphicData));
    }, []);
    console.log('newData', transactionList);
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
      <ScrollView>
        {moneyFlowChart1({})}
        {moneyFlowChart2({})}
        <Text>MoneyFlowCharts</Text>
      </ScrollView>
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

  export default MoneyFlowCharts;