import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, VictoryAxis, Bar, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';

const graphicColor = ['tomato', 'orange', 'gold', 'cyan', 'navy']; // Colors
const wantedGraphicData = [{ y: 10, label: 'test 1' }, { y: 50, label: 'test 2' }, { y: 30, label: 'test 3' }, { y: 10, label: 'test 4' }];

function getCategories(range, date) {
  var list = [];

  switch (range) {
    case "MONTH":
      var fixewdDate = date.split('/');
      // console.log(fixewdDate);
      for (var i = 1; i < 31 ; i = i + 5) {
        console.log(i);
        list.push(fixewdDate[0] + '/' + i +  '/20');
      }
      break;
    default:
      break;
  }

  return list;
}

function groupToBars(list, keyGetter) {
    var data = [];

    list.forEach((item) => {
         const key = keyGetter(item);
        //  console.log(item);
         const amount = (item.transactionType === 'INCOME' ? item.amount : (-item.amount));
         if (!data.some(t => t.label === key)) {
          data.push({label: key, y: amount});
         } else {
           const index = data.findIndex(t => t.label === key);
           data[index].y = data[index].y + amount;
          //  data[index].y0 = 20;
         }
    });
    // console.log('dataaa', data);
    return data;
}
function MoneyFlowCharts(props) {
    const currentRoute = props.navigation.state.key;

    const moneyFlowChart1 = (currentRoute) => {
      const dispatch = useDispatch();
      const mainCategoriesData = useSelector(state => state.dashboard.data.expances.mainCategoriesData);
      const transactionList = useSelector(state => state.transactions.transactions);

      const dateFixedTransactionList = (transactionList.length > 0 ? transactionList.map(item => {
        return Object.assign({}, item , { fixedDate: (new Date(item.date)).toLocaleDateString()})
      }) : []);

      // const currentRoute = props.navigation.state.key;
      console.log('dateFixedTransactionList', dateFixedTransactionList);
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
      }, [transactionList]);

      // const highY;
      // const lowY;

      const s = getCategories('MONTH', '04/20');
      const t = ['04/16/20', '04/01/20', '04/03/20', '04/10/20', '04/16/20', '04/02/20', '04/26/20', '04/30/20'];
      console.log('s', s);
      // console.log('xCategories', xCategories);
      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem>
            <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', backgroundColor: 'yellow'}}>
              <Svg width={400} height={400} viewBox="0 0 400 400">
              {/* <VictoryChart
                // domainPadding={{x: [-20, -20]}}
                categories={{ x: s }}
                style={{border: '1px solid #ccc'}}
                // padding={{ top: 20, bottom: 60 }}
                animate={{ duration: 2000, easing: 'linear' }}> */}
                    <VictoryAxis crossAxis
                  width={400}
                  height={400}
                  domain={[-1, 10]}
                  theme={VictoryTheme.material}
                  offsetY={50}
                  tickCount={10}
                  tickFormat={date => date.toLocaleString('en-us', { month:'short' })}
                  standalone={false}
                />
                {(mainCategoriesData.length > 0 && xCategories.length > 0) && <VictoryBar
                    barWidth={8}
                    alignment={'middle'}
                    animate={{ duration: 2000, easing: 'linear' }}
                    width={200}
                    categories={{ x: getCategories('MONTH', '04/20') }}
                    // categories={{ x: t }}
                    // labels={({ datum }) => datum.y}
                    labelComponent={<VictoryLabel text={(datum) => datum.datum.y} dx={0} verticalAnchor="start" />}
                    style={{ data: { fill: "#c43a31" }}}
                    data={mainCategoriesData}
                    />}

                <VictoryAxis dependentAxis crossAxis
                  width={400}
                  height={400}
                  domain={[-1000, 1000]}
                  theme={VictoryTheme.material}
                  offsetX={50}
                  standalone={false}
                />
                {/* </VictoryChart> */}
                {/* <VictoryChart
                  theme={VictoryTheme.material}
                  dependentAxis={true}
                  animate={{ duration: 2000, easing: 'linear' }}>
                  <VictoryBar
                    barWidth={8}
                    alignment={'middle'}
                    labels={({ datum }) => datum.y}
                    categories={{ x: xCategories }}
                    labelComponent={<VictoryLabel text={(datum) => datum.datum.y} dx={0} verticalAnchor="start" />}
                    style={{ data: { fill: "#c43a31" } }}
                    data={mainCategoriesData} />
                </VictoryChart> */}
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
        {moneyFlowChart1(currentRoute)}
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