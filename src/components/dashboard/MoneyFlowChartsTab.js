import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, VictoryAxis, Bar, LineSegment, VictoryStack, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';

const graphicColor = ['tomato', 'orange', 'gold', 'cyan', 'navy']; // Colors
const wantedGraphicData = [{ y: 10, label: 'test 1' }, { y: 50, label: 'test 2' }, { y: 30, label: 'test 3' }, { y: 10, label: 'test 4' }];

function getCategories(range, date) {
  const fixedDate = date.split('/');
  var list = [date[1] + '/1'];

  switch (range) {
    case "MONTH":
      // console.log(fixedDate);
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
  // console.log(list);
  return list;
}

function groupToBars(list, keyGetter) {
    var data = [];

    list.forEach((item) => {
         const key = keyGetter(item);
        //  console.log(item);
        var fixedDate = key.split('/');
         const amount = (item.transactionType === 'INCOME' ? item.amount : (-item.amount));
         if (!data.some(t => t.label === key)) {
          data.push({label: key, y: amount, x: Number(fixedDate[1])});
         } else {
           const index = data.findIndex(t => t.label === key);
           data[index].y = data[index].y + amount;
           data[index].x = Number(fixedDate[1]);
         }
    });
    // console.log('dataaa', data);
    return data;
}
function MoneyFlowCharts(props) {
    const currentRoute = props.navigation.state.key;
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.dashboard.data.expances.selectedSubCategory);
    const mainCategoriesData = useSelector(state => state.dashboard.data.expances.mainCategoriesData);
    const transactionList = useSelector(state => state.transactions.transactions);

    const moneyFlowChart1 = (currentRoute) => {
      const dateFixedTransactionList = (transactionList.length > 0 ? transactionList.map(item => {
        return Object.assign({}, item , { fixedDate: (new Date(item.date)).toLocaleDateString()})
      }) : []);

      // const currentRoute = props.navigation.state.key;
      // console.log('dateFixedTransactionList', dateFixedTransactionList);
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

      const s = getCategories('MONTH', '04/20');
      var counter = 0;
      const tickVal = s.map(item => {
        return counter++;
      })
      // console.log('s', s);
      console.log('selectedCategory', selectedCategory);
      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem>
            <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', backgroundColor: 'yellow'}}>
              <Svg width={400} height={300} viewBox="0 0 400 300">
                <VictoryChart domainPadding={30} tick>
                  <VictoryAxis
                    dependentAxis={true}
                    // style={{
                    //   grid: { stroke: "grey" }
                    // }}
                  />
                  <VictoryAxis
                    style={{
                      grid: { strokeWidth: 5, stroke: "grey", strokeOpacity: 0.3 }
                    }}
                    tickValues={tickVal} tickFormat={s} offsetY={50} />
                      {mainCategoriesData.length > 1 && <VictoryBar
                        barWidth={8}
                        alignment={'middle'}
                        animate={{ duration: 2000, easing: 'linear' }}
                        width={400}
                        events={[{
                          target: "data",
                          eventHandlers: {
                            onPress: () => {
                              return [
                                {
                                  target: "data",
                                  mutation: (props) => {
                                    const fill = props.style && props.style.fill;
                                    // console.log(props);
                                    dispatch(dashboardActions.updateSelected(props.datum.label))
                                    return null;
                                    // return fill === "black" ? null : { style: { fill: "black" } };
                                  }
                                }
                              ];
                            }
                          }
                        }]}
                        labels={({ datum }) => {datum.y}}
                        labelComponent={<VictoryLabel
                                          text={(datum) => datum.datum.y}
                                          dy={(datum) => {
                                            console.log(datum);
                                            if (datum.datum.y > 0) {
                                              return -15;
                                            } else {
                                              return 10;
                                            }
                                          }}
                                          verticalAnchor="start" />}
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
                                        // style={{ data: { fill: "#c43a31" }, backgroundColor: "green"}}
                                        data={mainCategoriesData}
                                        />}
                </VictoryChart>
              </Svg>
            </View>
          </CardItem>
        </Card>
      );
    };

    const moneyFlowChart2 = (data) => {
      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>Details</Text>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{height: 100, width: '100%', backgroundColor: 'green'}}>
                <View><Text>{'selected:' + selectedCategory}</Text></View>
              </View>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>GeekyAnts</Text>
          </CardItem>
        </Card>
      );
    };

    // const selectedCategory = useSelector(state => state.dashboard.data.expances.selectedSubCategory);
    return (
      <ScrollView>
        {moneyFlowChart1(currentRoute)}
        {selectedCategory !== '' && moneyFlowChart2({})}
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