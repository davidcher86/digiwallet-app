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

function BalanceCharts(props) {
    const dispatch = useDispatch();
    const transactionList = useSelector(state => state.transactions.transactions);
    const selectedExpanseSubCategory = useSelector(state => state.dashboard.data.expances.selectedExpanseSubCategory);
    const dashboard = useSelector(state => state.dashboard);
    const subExpanseCategoriesData = useSelector(state => state.dashboard.data.expances.subExpanseCategoriesData);
    const mainExpanseCategoriesData = useSelector(state => state.dashboard.data.expances.mainExpanseCategoriesData);
    const navigation = props.navigation;

    // useEffect(() => {
    //     if (!navigation.isFocused()) {
    //       dispatch(dashboardActions.resetFlow());
    //     } else {
    //       const fixedList = (transactionList.length > 0 ? transactionList.map(item => {
    //         return Object.assign({}, item , { fixedDate: (new Date(item.date)).toLocaleDateString()})
    //       }) : []);

    //       dispatch(dashboardActions.updateBalanceList(fixedList));
    //     }
    //   }, [navigation, transactionList]);

      return (
        <View/>
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

export default BalanceCharts;