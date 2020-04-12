import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';

const graphicColor = ['tomato', 'orange', 'gold', 'cyan', 'navy']; // Colors
const wantedGraphicData = [{ y: 10, label: 'test 1' }, { y: 50, label: 'test 2' }, { y: 30, label: 'test 3' }, { y: 10, label: 'test 4' }];

function groupToBars(list, keyGetter) {
    var data = [];

    list.forEach((item) => {
         const key = keyGetter(item);
         console.log(item);
         if (!data.some(t => t.label === key)) {
          // data.push({label: key, y: (item.transactionType === 'INCOME' ? item.amount : (-item.amount))});
          data.push({label: key, y: (item.transactionType === 'INCOME' ? item.amount : (-item.amount))});
         } else {
           const index = data.findIndex(t => t.label === key);
           data[index].y = data[index].y + (item.transactionType === 'INCOME' ? item.amount : (-item.amount));
          //  data[index].y0 = 20;
         }
    });

    return data;
}
function MoneyFlowCharts(props) {
    // const transactionList = useSelector(state => state.transactions.transactions);
    // const state = useSelector(state => state);
    // const dashboard = useSelector(state => state.dashboard);
    // const dispatch = useDispatch();

    // const newData = transactions.transactions.f;
    // useEffect(() => {
    //   const data = groupToBars(transactionList, item => item.mainCategory);
    //   console.log('MoneyFlow data', data);
    //   // dispatch(dashboardActions.updateData(wantedGraphicData));
    // }, [transactionList, currentRoute]);
    // console.log('newData', transactionList);
    // const sampleData = [
    //   { x: 1, y: 2, y0: 1 },
    //   { x: 2, y: 3, y0: 2 },
    //   { x: 3, y: 5, y0: 2 },
    //   { x: 4, y: 4, y0: 3 },
    //   { x: 5, y: 6, y0: 3 }
    // ];

    const moneyFlowChart1 = (data) => {
      const dispatch = useDispatch();
      const mainCategoriesData = useSelector(state => state.dashboard.data.expances.mainCategoriesData);
      const transactionList = useSelector(state => state.transactions.transactions);

      const dateFixedTransactionList = transactionList.map(item => {
        return Object.assign({}, item , { fixedDate: (new Date(item.date)).toLocaleDateString()})
      });
      const currentRoute = props.navigation.state.key;
      // const xCategories = dateFixedTransactionList.map(item => item.fixedDate);
      var xCategories = [];
      dateFixedTransactionList.forEach(item => {
        if (xCategories.length === 0) {
          xCategories.push(item.fixedDate);
        } else if (!xCategories.some(val => val === item.fixedDate)) {
          xCategories.push(item.fixedDate);
        }
      });
      useEffect(() => {
        const data = groupToBars(dateFixedTransactionList, item => item.fixedDate);
        console.log('MoneyFlow data', data);
        dispatch(dashboardActions.updateData(data));
      }, [transactionList, currentRoute]);
      console.log('xCategories', xCategories);

      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem>
            <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', backgroundColor: 'yellow'}}>
              <Svg width={400} height={320} viewBox="0 40 400 200" style={{ width: "100%", height: "auto" }}>
                <VictoryChart
                  theme={VictoryTheme.material}
                  dependentAxis={true}
                  // domain={{x: xCategories, y: [0, 1000]}}
                  animate={{ duration: 2000, easing: 'linear' }}>
                  <VictoryBar
                    key
                    barWidth={8}
                    alignment={'middle'}
                    // labels={({ datum }) => console.log(datum)}
                    // domain={{x: xCategories}}
                    categories={{ x: xCategories }}
                    // maxDomain={{ x: 43 }}
                    // labelPlacement={'parallel'}
                    // labelComponent={<VictoryLabel dx={0} dy={5} key={datum} verticalAnchor="start" />}
                    style={{ data: { fill: "#c43a31" } }}
                    data={mainCategoriesData} />
                </VictoryChart>
              </Svg>
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