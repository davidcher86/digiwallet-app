import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {useNavigationState} from 'react-navigation-hooks';
import { VictoryPie, VictoryLabel, Slice, VictoryBar, VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from 'victory-native';
import Svg from 'react-native-svg';

import * as dashboardActions from './dashboardActions';

function getFixedList(range, date) {
  const fixedDate = date.split('/');
  var list = [date[1] + '/1'];

  switch (range) {
    case "MONTH":
      for (var i = 0; i <= 31 ; i++) {
        if (i !== 0) {
          if (i % 10 === 0) {
          list.push(fixedDate[0] + '/' + i);
          } else {
            list.push(' ');
          }
        }
      }
      break;
    default:
      break;
  }

  return list;
}

function groupToLine(list, keyGetter) {
    var data = [];
    if (list !== undefined) {
      list.forEach((item) => {
        const key = keyGetter(item);
        var fixedDate = key.split('/');
        // console.log(fixedDate);
        if (!data.some(t => t.label === key)) {
          data.push({label: key, y: item.ballance, date: item.date, x: Number(fixedDate[1])});
        } else {
          const index = data.findIndex(t => t.label === key);
          const itemDt = new Date(item.date);
          const existingDt = new Date(data[index].date);
          // console.log('itemDt', itemDt);
          // console.log('existingDt', existingDt);
          // console.log('compare', itemDt < existingDt);
          if (itemDt > existingDt) {
            data[index].y = item.ballance;
            data[index].x = Number(fixedDate[1]);
            data[index].date = item.date;
          }
        }
      });
    }

    return data;
}

function BalanceCharts(props) {
    const dispatch = useDispatch();
    const transactionList = useSelector(state => state.transactions.transactions);
    const dashboard = useSelector(state => state.dashboard);
    const profile = useSelector(state => state.profile);
    const mainBallanceCategoriesData = useSelector(state => state.dashboard.data.balance.mainBallanceCategoriesData);
    const navigation = props.navigation;

    useEffect(() => {
        if (!navigation.isFocused()) {
          dispatch(dashboardActions.resetBalance());
        } else {
          const fixedList = (Object.keys(profile.balanceTrend).length > 0 ? Object.entries(profile.balanceTrend).map(item => {
            return Object.assign({}, item[1] , { fixedDate: (new Date(item[1].date)).toLocaleDateString()})
          }) : []);

          dispatch(dashboardActions.updateBalanceList(fixedList));
        }
    }, [navigation, profile]);

    useEffect(() => {
      if (dashboard.data.balance.list.length > 0 && dashboard.data.balance.mainBallanceCategoriesData.length === 1) {
        const data = groupToLine(dashboard.data.balance.list, item => item.fixedDate);
        // console.log('data', data);
        dispatch(dashboardActions.updateBalanceData(data));
      }
    }, [dashboard]);

    const balanceCard = (data) => {
      const s = getFixedList('MONTH', '04/20');
      // console.log('s', s);
      var counter = 0;
      const tickVal = s.map(item => {
        return counter++;
      })

      console.log(dashboard.data.balance);
        // console.log('groupToLine', groupToLine(dashboard.data.balance.list, item => item.mainCategory));
      return (
          <Card style={styles.cardContainer}>
              <CardItem header>
                  <Text>Balance</Text>
              </CardItem>
              <CardItem>
                  <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', backgroundColor: 'yellow'}}>
                      <Svg width={400} height={300} viewBox="0 0 400 300">
                        <VictoryChart domainPadding={30} tick>
                          {dashboard.data.balance.mainBallanceCategoriesData.length > 1 && <VictoryAxis
                            dependentAxis={true}/>}
                          <VictoryAxis
                            style={{
                              grid: { strokeWidth: 5, stroke: "grey", strokeOpacity: 0.3 }
                            }}
                            tickValues={tickVal} tickFormat={s} offsetY={50} />
                          <VictoryLine
                            style={{
                              data: { stroke: "#c43a31" },
                              parent: { border: "1px solid #ccc"}
                            }}
                            data={dashboard.data.balance.mainBallanceCategoriesData}
                          />
                        </VictoryChart>
                      </Svg>
                  </View>
              </CardItem>
          </Card>
        );
      };

      return (
        <View style={styles.containerStyle}>
            <ScrollView>
            {balanceCard({})}
            </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10
    },
    cardContainer: {
        // width: '90%',
        // height: 400,
        margin: 15,
    },
});

export default BalanceCharts;