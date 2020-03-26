import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function Header(props) {
  const transactions = useSelector(state => state.transactions);
  const identity = useSelector(state => state.identity);

  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>header</Text>
    </View>
  );
}

function ExpanceCharts(props) {
  const transactions = useSelector(state => state.transactions);

  return (
    <View>
      <Text>ExpanceCharts</Text>
    </View>
  );
}

function MoneyFlowCharts(props) {
  const transactions = useSelector(state => state.transactions);

  return (
    <View>
      <Text>MoneyFlowCharts</Text>
    </View>
  );
}

// function Dashboard(props) {
//   const dashboard = useSelector(state => state.dashboard);
//   const transactions = useSelector(state => state.transactions);
//   const identity = useSelector(state => state.identity);
//   const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(transactionsActions.fetchTransactions(identity.uid));
  // }, []);

//   // console.log('dashboard', dashboard);
//   // console.log('transactions', transactions);
//   const [routes] = React.useState([
//     { key: 'ExpanceCharts', title: 'Expance Charts' },
//     { key: 'MoneyFlowCharts', title: 'Money Flow Charts' },
//   ]);

//   const renderScene = SceneMap({
//     ExpanceCharts: ExpanceCharts,
//     MoneyFlowCharts: MoneyFlowCharts,
//   });
//   const pageSettings = dashboard.pageSettings;
//   const index = pageSettings.activeTabIndex;
//   const initialLayout = { width: 100 };
//   const HandleChangeTabIndex = (index) => {
//     dispatch(dashboardActions.setPageSettingsIndex(index))
//   };

//   return (
//     <View style={{flex: 1}}>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={HandleChangeTabIndex}
//         initialLayout={initialLayout}
//       />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
  },
});

const DashboardStack = createMaterialTopTabNavigator(
  {
    ExpanceCharts: {
      screen: ExpanceCharts,
      navigationOptions: {
        title: 'Expance Charts'
      }
      // group: 'Weakly',
    },
    MoneyFlowCharts: {
      screen: MoneyFlowCharts,
      navigationOptions: {
        title: 'Money Flow Charts'

      }
      // group: 'Monthly',
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#009acc',
      pressOpacity: true,
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 140,
      },
      style: {
        backgroundColor: 'blue',
      },
    },
    // initialRouteName: 'ExpanceCharts',
    // tabBarComponent: Header,
    // tabBarComponent: BottomTransactionsStack,
    activeColor: '#f0edf6',
    inactiveColor: '#fffff',
    tabBarPosition: 'bottom',
    lazy: true,
    // barStyle: {backgroundColor: '#694fad'},
  },
);

export default DashboardStack;

// const mapStateToProps = state => {
//   return {settings: state.settings};
// };

// export default connect(
//   mapStateToProps,
//   {},
// )(Dashboard);
