import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, Slice, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';

const graphicColor = ['tomato', 'orange', 'gold', 'cyan', 'navy']; // Colors

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

function ExpanceCharts(props) {
    const transactions = useSelector(state => state.transactions);

    const expanceChart1 = (data) => {
      const transactionList = useSelector(state => state.transactions.transactions);
      const currentRoute = props.navigation.state.key;
    //   console.log('currentRoute', currentRoute);
      const dashboard = useSelector(state => state.dashboard);
      const dispatch = useDispatch();
      const mainCategoriesData = useSelector(state => state.dashboard.data.expances.mainCategoriesData);
      useEffect(() => {
        var data = groupToPie(transactionList, item => item.mainCategory);
        // console.log('data', data);
        dispatch(dashboardActions.updateData(data));
      }, [transactionList]);
      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>Expances</Text>
          </CardItem>
          <CardItem>
            <View style={{flexDirection: 'row', width: '82%', justifyContent: 'center', margin: 30}}>
            <Svg width={300} height={220} viewBox="0 30 400 200" style={{ width: "100%", height: "auto" }}>
                <VictoryPie
                  // padding={100}
                  standalone={false}
                  data={mainCategoriesData}
                  height={300}
                  dataComponent={<Slice id={'label'} events={{ onClick: (e) => console.log(e.target.id) }}/>}
                  labelComponent={<VictoryLabel events={() => console.log('sdf')} dy={-10} dy={-10}/>}
                  // labelRadius
                  // padAngle={7}
                  // padAngle={({ datum }) => datum.y}
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onPress: (e) => {
                          return [
                            {
                              target: "data",
                              mutation: (props) => {
                                  console.log(props.datum.y);
                                return props.style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                              }
                            }, {
                              target: "labels",
                              mutation: ({ text }) => {
                                return text === "clicked" ? null : { text: "clicked" };
                              }
                            },
                          ];
                        }
                      }
                    }
                  ]}
                  innerRadius={66}
                  style={{backgroundColor: 'green'}}
                  duration={2000}
                  animate={{ duration: 2000, easing: 'linear' }}
                  colorScale={graphicColor} />
                  </Svg>
            </View>
          </CardItem>
          <CardItem footer>
            <Text>GeekyAnts</Text>
          </CardItem>
        </Card>
      );
    };

    const expanceChart2 = (data) => {
      const transactionList = useSelector(state => state.transactions.transactions);
      const dashboard = useSelector(state => state.dashboard);
      const dispatch = useDispatch();
      const subCategoriesData = useSelector(state => state.dashboard.data.expances.subCategoriesData);

      return (
        <Card style={styles.cardContainer}>
          <CardItem header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem>
            <View style={{flexDirection: 'row', width: '82%', justifyContent: 'center', margin: 30}}>
              <VictoryPie
                // padding={100}
                height={260}
                labelComponent={<VictoryLabel dy={-10} dy={-10}/>}
                // labelRadius
                // padAngle={7}
                // padAngle={({ datum }) => datum.y}
                innerRadius={66}
                style={{backgroundColor: 'green'}}
                duration={2000}
                animate={{ duration: 2000, easing: 'linear' }}
                colorScale={graphicColor}
                data={subCategoriesData} />
            </View>
          </CardItem>
          <CardItem footer>
            <Text>GeekyAnts</Text>
          </CardItem>
        </Card>
      );
    };

    return (
      <ScrollView style={styles.cardContainer}>
        {expanceChart1({})}
        {expanceChart2({})}
        <Text>ExpanceCharts</Text>
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

export default ExpanceCharts;