import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {useNavigationState} from 'react-navigation-hooks';
import { VictoryPie, VictoryLabel, Slice, VictoryTheme, VictoryBar, VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from 'victory-native';
import Svg from 'react-native-svg';

import { DARK_MODE } from './../Styles';
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
        if (item.type !== 'INITIAL') {
          const key = keyGetter(item);
          var fixedDate = key.split('/');
          if (!data.some(t => t.label === key)) {
            data.push({label: key, y: item.ballance, date: item.date, x: Number(fixedDate[1])});
          } else {
            const index = data.findIndex(t => t.label === key);
            const itemDt = new Date(item.date);
            const existingDt = new Date(data[index].date);
            if (itemDt > existingDt) {
              data[index].y = item.ballance;
              data[index].x = Number(fixedDate[1]);
              data[index].date = item.date;
            }
          }
        } else {
          data.push({label: '', y: item.ballance, x: 0});
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
      console.log('data', dashboard.data.balance);
      if (dashboard.data.balance.list.length > 0 &&
        dashboard.data.balance.mainBallanceCategoriesData.length === 1 &&
        dashboard.data.balance.mainBallanceCategoriesData[0].label === 'init') {
          console.log('heerrere');
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
              <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND}} header>
                  <Text>Balance</Text>
              </CardItem>
              <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND}}>
                  <View style={{flex: 1, flexDirection: 'column', alignContent: 'center'}}>
                    <ScrollView horizontal={true}>
                      <Svg width={500} height={300} viewBox="0 0 500 300">
                        <VictoryChart domainPadding={30} width={500} tick animate={{duration: 10}}>
                          {dashboard.data.balance.mainBallanceCategoriesData.length > 1 &&
                            <VictoryAxis
                            theme={VictoryTheme.material}
                            style={{
                              axis: {stroke: "#e8e8e8"},
                              tickLabels: {fill: "#fffdfd", fontSize: 13, padding: 15},
                              grid: { strokeWidth: 2, stroke: "grey", strokeOpacity: 0.3, strokeDasharray: '5' }
                            }}
                              dependentAxis={true}/>}
                          <VictoryAxis
                            style={{
                              axis: {stroke: "#e8e8e8"},
                              ticks: {stroke: "#fbf7f7", size: 3},
                              tickLabels: {fill: "#fffdfd", fontSize: 13, padding: 15}
                              // grid: { strokeWidth: 5, stroke: "grey", strokeOpacity: 0.3 }
                            }}
                            tickValues={tickVal}
                            // tickFormat={(x) => x}
                            tickFormat={s}
                            // tickLabelComponent={<VictoryLabel angle={45}/>}
                            offsetY={50} />
                          <VictoryLine
                          labels={({ datum }) => datum.y}
                            animate={{duration: 2000}}
                            animate={{
                              onLoad: { duration: 2000 }
                            }}
                            style={{
                              data: { stroke: "#4abec3", strokeWidth: 7, strokeLinecap: "round" },
                              parent: { border: "1px solid #ccc"}
                            }}
                            data={dashboard.data.balance.mainBallanceCategoriesData}
                          />
                        </VictoryChart>
                      </Svg>
                    </ScrollView>
                  </View>
              </CardItem>
          </Card>
        );
      };

      return (
        <View style={[DARK_MODE.appContainer, styles.containerStyle]}>
          <ScrollView>
            {balanceCard({})}
          </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 15
    },
    cardContainer: {
        backgroundColor: '#1e7571',
        // width: '90%',
        // height: 400,
        margin: 15,
    },
});

export default BalanceCharts;