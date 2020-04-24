import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {useNavigationState} from 'react-navigation-hooks';
import { VictoryPie, VictoryLabel, Slice, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

import { DARK_MODE } from './../Styles';
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
  const dispatch = useDispatch();
  const transactionList = useSelector(state => state.transactions.transactions);
  const selectedExpanseSubCategory = useSelector(state => state.dashboard.data.expances.selectedExpanseSubCategory);
  const dashboard = useSelector(state => state.dashboard);
  const subExpanseCategoriesData = useSelector(state => state.dashboard.data.expances.subExpanseCategoriesData);
  const mainExpanseCategoriesData = useSelector(state => state.dashboard.data.expances.mainExpanseCategoriesData);
  const navigation = props.navigation;

  useEffect(() => {
    if (!navigation.isFocused()) {
      dispatch(dashboardActions.resetExpance());
    } else {
      const fixedList = (transactionList.length > 0 ? transactionList.map(item => {
        return Object.assign({}, item , { fixedDate: (new Date(item.date)).toLocaleDateString()})
      }) : []);

      dispatch(dashboardActions.updateExpanceList(fixedList));
    }
  }, [navigation, transactionList]);

  useEffect(() => {
    if (dashboard.data.expances.list.length > 0 && dashboard.data.expances.mainExpanseCategoriesData.length === 1) {
      const data = groupToPie(dashboard.data.expances.list, item => item.mainCategory);
      dispatch(dashboardActions.updateExpanceData(data));
    }
  }, [dashboard]);

  useEffect(() => {
    if (selectedExpanseSubCategory !== '') {
      const list = dashboard.data.expances.list.filter(item => item.mainCategory === selectedExpanseSubCategory);
      const data = groupToPie(list, item => item.subCategory);
      dispatch(dashboardActions.updateExpanceSubData(data));
    }
  }, [selectedExpanseSubCategory]);

  const expanceChart1 = (data) => {
      return (
        <View style={styles.cardContainer}>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomRightRadius: 0}} header>
            <Text>Expances</Text>
          </CardItem>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
            <View style={{flexDirection: 'row', width: '82%', justifyContent: 'center', margin: 30}}>
              <Svg width={300} height={220} viewBox="0 30 400 200" style={{ width: "100%", height: "auto" }}>
                <VictoryPie
                  // padding={100}
                  standalone={false}
                  data={mainExpanseCategoriesData}
                  height={300}
                  // dataComponent={<Slice id={'label'} events={{ onClick: (e) => console.log(e.target.id) }}/>}
                  // labelComponent={<VictoryLabel events={() => console.log('sdf')} dy={-10} dy={-10}/>}
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
                                // console.log(props);
                                dispatch(dashboardActions.updateExpanceSelected(props.datum.label))
                                  // console.log(props.datum.label);
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
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND}} footer>
            <Text>GeekyAnts</Text>
          </CardItem>
        </View>
      );
    };

    const expanceChart2 = (data) => {
      return (
        <View style={styles.cardContainer}>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomRightRadius: 0}} header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
            <View style={{flexDirection: 'row', width: '82%', justifyContent: 'center', margin: 30}}>
              <Svg width={300} height={220} viewBox="0 30 400 200" style={{ width: "100%", height: "auto" }}>
                <VictoryPie
                  // padding={100}
                  height={300}
                  labelComponent={<VictoryLabel dy={-10} dy={-10}/>}
                  // labelRadius
                  // padAngle={7}
                  // padAngle={({ datum }) => datum.y}
                  innerRadius={66}
                  style={{backgroundColor: 'green'}}
                  duration={2000}
                  animate={{ duration: 2000, easing: 'linear' }}
                  colorScale={graphicColor}
                  data={subExpanseCategoriesData} />
              </Svg>
            </View>
          </CardItem>
          <CardItem style={{backgroundColor: DARK_MODE.COLORS.CARD_BACKGROUND}} footer>
            <Text>GeekyAnts</Text>
          </CardItem>
        </View>
      );
    };

    return (
      <View style={[DARK_MODE.appContainer, styles.containerStyle]}>
        <ScrollView>
            {expanceChart1({})}
            {expanceChart2({})}
            <Text>ExpanceCharts</Text>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  containerStyle: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      // padding: 15,
  },
  cardContainer: {
      margin: 30,
      // width: '90%',
      // height: 400,

      borderRadius: 5, shadowColor: '#1f7329',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 5,
      borderWidth: 1,
      borderColor: '#c5ffcc',
      elevation: 5
  },
});

export default ExpanceCharts;