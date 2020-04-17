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

import * as dashboardActions from './dashboardActions';

function groupToLine(list, keyGetter) {
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

function BalanceCharts(props) {
    const dispatch = useDispatch();
    const transactionList = useSelector(state => state.transactions.transactions);
    const selectedExpanseSubCategory = useSelector(state => state.dashboard.data.expances.selectedExpanseSubCategory);
    const dashboard = useSelector(state => state.dashboard);
    const subExpanseCategoriesData = useSelector(state => state.dashboard.data.expances.subExpanseCategoriesData);
    const mainExpanseCategoriesData = useSelector(state => state.dashboard.data.expances.mainExpanseCategoriesData);
    const navigation = props.navigation;

    useEffect(() => {
        console.log(navigation);
        if (!navigation.isFocused()) {
          dispatch(dashboardActions.resetBalance());
        } else {
          const fixedList = (transactionList.length > 0 ? transactionList.map(item => {
            return Object.assign({}, item , { fixedDate: (new Date(item.date)).toLocaleDateString()})
          }) : []);

          dispatch(dashboardActions.updateBalanceList(fixedList));
        }
    }, [navigation, transactionList]);

    useEffect(() => {
        if (dashboard.data.expances.list.length > 0 && dashboard.data.expances.mainExpanseCategoriesData.length === 1) {
          const data = groupToLine(dashboard.data.expances.list, item => item.mainCategory);
          dispatch(dashboardActions.updateExpanceData(data));
        }
    }, [dashboard]);

    const balanceCard = (data) => {
        // console.log('totalMoneyFlow', totalMoneyFlow);
        return (
            <Card style={styles.cardContainer}>
                <CardItem header>
                    <Text>Balance</Text>
                </CardItem>
                <CardItem>
                    <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', backgroundColor: 'yellow'}}>
                        <Svg width={400} height={300} viewBox="0 0 400 300">

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