import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import {useNavigationState} from 'react-navigation-hooks';
import { VictoryPie, VictoryTooltip, VictoryLabel, VictoryAxis, Bar, LineSegment, VictoryStack, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import {Svg, Defs, Stop, LinearGradient} from 'react-native-svg';

import { DARK_MODE } from './../Styles';
import Panel from './../common/Panel';
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
    if (dashboard.data.flow.list.length > 0 &&
           dashboard.data.flow.mainFlowCategoriesData.length === 1 &&
           dashboard.data.flow.mainFlowCategoriesData[0].label === 'init') {

      const data = groupToBars(dashboard.data.flow.list, item => item.fixedDate);
      dispatch(dashboardActions.updateFlowData(data));
    }
  }, [dashboard]);

  // console.log(dashboard.data.flow);
    const moneyFlowChart1 = () => {
      const s = getCategories('MONTH', '04/20');
      var counter = 0;
      const tickVal = s.map(item => {
        return counter++;
      })

      return (
        <View style={styles.cardContainer}>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 0}} header>
            <Text>Money Flow</Text>
          </CardItem>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', marginRight: 10}}>
              <ScrollView horizontal={true}>
                <Svg width={500} height={300} viewBox="0 0 500 300">
                  <VictoryChart domainPadding={20} width={500} tick animate={{duration: 10}}>
                    {dashboard.data.flow.mainFlowCategoriesData.length > 0 &&
                    dashboard.data.flow.mainFlowCategoriesData[0].label !== 'init' &&
                    <VictoryAxis
                      style={{
                        tickLabels: {fill: "#fffdfd", fontSize: 13, padding: 15},
                        axis: {stroke: "#e8e8e8"},
                        grid: { strokeWidth: 2, stroke: "grey", strokeOpacity: 0.3, strokeDasharray: '5' }
                      }}
                      dependentAxis={true}/>}
                    <VictoryAxis
                      style={{
                        axis: {stroke: "#e8e8e8"},
                        tickLabels: {fill: "#fffdfd", fontSize: 13, padding: 15},
                        grid: { strokeWidth: 8, stroke: "grey", strokeOpacity: 0.3 }
                      }}
                      tickValues={tickVal} tickFormat={s} offsetY={50} />
                    <LinearGradient id="gradientDown" y1="0%" y2="100%" >
                      <Stop offset="0%" stopColor="red" stopOpacity={1}/>
                      <Stop offset="70%" stopColor="red" stopOpacity={1}/>
                      <Stop offset="100%" stopColor="red" stopOpacity={0.1}/>
                    </LinearGradient>
                    <LinearGradient id="gradientUp" y1="0%" y2="100%" >
                      <Stop offset="100%" stopColor="green" stopOpacity={1}/>
                      <Stop offset="30%" stopColor="green" stopOpacity={1}/>
                      <Stop offset="0%" stopColor="green" stopOpacity={0.1}/>
                    </LinearGradient>
                        {dashboard.data.flow.mainFlowCategoriesData.length > 0 &&
                        dashboard.data.flow.mainFlowCategoriesData[0].label !== 'init' &&
                        <VictoryBar
                          barWidth={8}
                          alignment={'middle'}
                          animate={{ duration: 2000, easing: 'linear' }}
                          // width={300}
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
                                            renderInPortal={false}
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
                                return 'url(#gradientDown)';
                                // return 'red';
                              } else if (datum.y > 0) {
                                return 'url(#gradientUp)';
                                // return 'green';
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
              </ScrollView>
            </View>
          </CardItem>
        </View>
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
        <View style={styles.cardContainer}>
        {/* <Card style={styles.cardContainer}> */}
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 0}} header>
            <Text>Total</Text>
          </CardItem>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <Body>
              <View style={{height: 120, width: '100%', backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND}}>
                <Text style={{ marginLeft: 10 }}>Total Income</Text>
                <View style={{ margin: 5, padding: 5, flexDirection: 'row', backgroundColor: '#a7d0e0', borderRadius: 3 }}>
                  <Progress.Bar
                    indeterminateAnimationDuration={2000}
                    // indeterminate={true}
                    animated={true}
                    useNativeDriver={true}
                    animationType={'timing'}
                    // progress={0.1}
                    progress={(totalMoneyFlow !== 0 ? totalIncome/totalMoneyFlow : 0)}
                    width={250}
                    height={20}
                    color={'green'}/>
                    {totalMoneyFlow !== 0 && <Text style={{ marginLeft: 10 }}>{Math.round(totalIncome/totalMoneyFlow * 100) +  '%'}</Text>}
                </View>
                <Text style={{ marginLeft: 10 }}>Total Expances</Text>
                <View style={{ margin: 5, padding: 5, flexDirection: 'row', backgroundColor: '#a7d0e0', borderRadius: 3 }}>
                  <Progress.Bar
                    indeterminateAnimationDuration={2000}
                    animated={true}
                    // progress={0.1}
                    progress={(totalMoneyFlow !== 0 ? totalExpance/totalMoneyFlow : 0)}
                    width={250}
                    borderWidth={0.5}
                    height={20}
                    color={'red'} />
                  {totalMoneyFlow !== 0 && <Text style={{ marginLeft: 10 }}>{Math.round(totalExpance/totalMoneyFlow * 100) +  '%'}</Text>}
                </View>
              </View>
            </Body>
          </CardItem>
        {/* </Card> */}
        </View>
      );
    };

    // const selectedCategory = useSelector(state => state.dashboard.data.expances.selectedSubCategory);
    return (
      <View style={[DARK_MODE.appContainer, styles.containerStyle]}>
        <ScrollView>
          {moneyFlowTotal({})}
          {moneyFlowChart1({})}
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    containerStyle: {
      justifyContent: 'center',
      flexDirection: 'column',
      // padding: 15
    },
    cardContainer: {
      // width: '90%',
      // height: 400,
      margin: 30,
      borderRadius: 10, shadowColor: '#1f7329',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 10,
      borderWidth: 1,
      borderColor: '#c5ffcc',
      elevation: 5
    },
  });

  export default MoneyFlowCharts;