import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import * as Progress from 'react-native-progress';
import {useNavigationState} from 'react-navigation-hooks';
import { VictoryPie, VictoryTooltip, VictoryLabel, VictoryAxis, Bar, LineSegment, VictoryStack, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';

function getCategories(range, date) {
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

function groupToBars(list, keyGetter) {
    var data = [];

    if (list.length > 0) {
      list.forEach((item) => {
        const key = keyGetter(item);
        if (key !== undefined) {
          var fixedDate = key.split('/');
          const amount = (item.transactionType === 'INCOME' ? item.amount : (-item.amount));
          if (!data.some(t => t.label === key)) {
            data.push({label: key, y: amount, x: Number(fixedDate[1])});
          } else {
            const index = data.findIndex(t => t.label === key);
            data[index].y = data[index].y + amount;
            data[index].x = Number(fixedDate[1]);
          }
        }
      });
    }

    return data;
}

function MoneyFlowCharts(props) {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const dashboard = useSelector(state => state.dashboard);
  const mainFlowCategoriesData = useSelector(state => state.dashboard.data.flow.mainFlowCategoriesData);
  const transactionList = useSelector(state => state.transactions.transactions);

  useEffect(() => {
    console.log(navigation);
    if (!navigation.isFocused()) {
      dispatch(dashboardActions.resetFlow());
    } else {
      const fixedList = (transactionList.length > 0 ? transactionList.map(item => {
        return Object.assign({}, item , { fixedDate: (new Date(item.date)).toLocaleDateString()})
      }) : []);

      dispatch(dashboardActions.updateFlowList(fixedList));
    }
  }, [navigation, transactionList]);

  useEffect(() => {
    if (dashboard.data.flow.list.length > 0 && dashboard.data.flow.mainFlowCategoriesData.length === 1) {
      // console.log('sdfsdf');
      const data = groupToBars(dashboard.data.flow.list, item => item.fixedDate);
      dispatch(dashboardActions.updateFlowData(data));
    }
  }, [dashboard]);

  // console.log(dashboard);
    const moneyFlowChart1 = () => {
      const s = getCategories('MONTH', '04/20');
      var counter = 0;
      const tickVal = s.map(item => {
        return counter++;
      })

      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>Money Flow</Text>
          </CardItem>
          <CardItem>
            <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', backgroundColor: 'yellow'}}>
              <Svg width={400} height={300} viewBox="0 0 400 300">
                <VictoryChart domainPadding={30} tick>
                  {dashboard.data.flow.mainFlowCategoriesData.length > 1 && <VictoryAxis
                    dependentAxis={true}/>}
                  <VictoryAxis
                    style={{
                      grid: { strokeWidth: 5, stroke: "grey", strokeOpacity: 0.3 }
                    }}
                    tickValues={tickVal} tickFormat={s} offsetY={50} />
                      {dashboard.data.flow.mainFlowCategoriesData.length > 1 && <VictoryBar
                        barWidth={8}
                        alignment={'middle'}
                        animate={{ duration: 2000, easing: 'linear' }}
                        width={400}
                        // events={[{
                        //   target: "data",
                        //   eventHandlers: {
                        //     onPress: () => {
                        //       return [
                        //         {
                        //           target: "data",
                        //           mutation: (props) => {
                        //             const fill = props.style && props.style.fill;
                        //             // console.log(props);
                        //             dispatch(dashboardActions.updateSelected(props.datum.label))
                        //             return null;
                        //             // return fill === "black" ? null : { style: { fill: "black" } };
                        //           }
                        //         }
                        //       ];
                        //     }
                        //   }
                        // }]}
                        labels={({ datum }) => {datum.y}}
                        labelComponent={<VictoryTooltip
                                          pointerLength={0}
                                          text={(datum) => datum.datum.y}
                                          cornerRadius={4}/>}
                        // labelComponent={<VictoryLabel
                        //                   text={(datum) => datum.datum.y}
                        //                   dy={(datum) => {
                        //                     if (datum.datum.y > 0) {
                        //                       return -15;
                        //                     } else {
                        //                       return 10;
                        //                     }
                        //                   }}
                        //                   verticalAnchor="start" />}
                        style={{
                          data: { fill: ({datum}) => {
                            if (datum.y < 0) {
                              return 'red';
                            } else if (datum.y > 0) {
                              return 'green';
                            }
                          }, opacity: 0.7 },
                        //   data: { paddingLeft: 50, fill: "#c43a31", opacity: 0.7 },
                          labels: { fontSize: 12 },
                          parent: { border: "1px solid #ccc" }
                        }}
                        // events={[{
                        //   target: "data",
                        //   eventHandlers: {
                        //     onPress: () => {
                        //       return console.log('sdfdsf');
                        //     }
                        //   }
                        // }]}
                        // style={{ data: { fill: "#c43a31" }, backgroundColor: "green"}}
                        data={mainFlowCategoriesData} />}
                </VictoryChart>
              </Svg>
            </View>
          </CardItem>
        </Card>
      );
    };

    const moneyFlowTotal = (data) => {
      var totalIncome = 0;
      var totalExpance = 0;
      var totalMoneyFlow = 0;

      if (dashboard.data.flow.list.length > 0) {
        dashboard.data.flow.list.forEach(item => {
          if (item.transactionType === 'EXPANSE') {
            totalExpance = totalExpance + item.amount;
          } else if (item.transactionType === 'INCOME') {
            totalIncome = totalIncome + item.amount;
          }
          totalMoneyFlow = totalMoneyFlow + item.amount;
        });
      }
      // console.log('totalMoneyFlow', totalMoneyFlow);
      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>Total</Text>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{height: 100, width: '100%', backgroundColor: '#d2d2d2'}}>
                <Text style={{ marginLeft: 10 }}>Total Income</Text>
                <View style={{ margin: 5, flexDirection: 'row' }}>
                  <Progress.Bar
                    indeterminateAnimationDuration={2000}
                    // indeterminate={true}
                    animated={true}
                    useNativeDriver={true}
                    animationType={'timing'}
                    // progress={0.1}
                    progress={(totalMoneyFlow !== 0 ? totalIncome/totalMoneyFlow : 0)}
                    width={300}
                    height={18}
                    color={'green'}/>
                    {totalMoneyFlow !== 0 && <Text style={{ marginLeft: 10 }}>{Math.round(totalIncome/totalMoneyFlow * 100) +  '%'}</Text>}
                </View>
                <Text style={{ marginLeft: 10 }}>Total Expances</Text>
                <View style={{ margin: 5, flexDirection: 'row' }}>
                  <Progress.Bar
                    indeterminateAnimationDuration={2000}
                    animated={true}
                    // progress={0.1}
                    progress={(totalMoneyFlow !== 0 ? totalExpance/totalMoneyFlow : 0)}
                    width={300}
                    borderWidth={0.5}
                    height={18}
                    color={'red'} />
                  {totalMoneyFlow !== 0 && <Text style={{ marginLeft: 10 }}>{Math.round(totalExpance/totalMoneyFlow * 100) +  '%'}</Text>}
                </View>
              </View>
            </Body>
          </CardItem>
        </Card>
      );
    };

    // const selectedCategory = useSelector(state => state.dashboard.data.expances.selectedSubCategory);
    return (
      <View style={styles.containerStyle}>
        <ScrollView>
          {moneyFlowTotal({})}
          {moneyFlowChart1({})}
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

  export default MoneyFlowCharts;