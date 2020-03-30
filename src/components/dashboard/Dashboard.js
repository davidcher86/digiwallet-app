import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import {Card, Body, CardItem} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryContainer, VictoryTheme } from 'victory-native';

import ExpanceCharts from './ExpancesChartsTab';
import MoneyFlowCharts from './MoneyFlowChartsTab';
import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function Header(props) {
  const {navigate} = props.navigation;
  const transactions = useSelector(state => state.transactions);
  const identity = useSelector(state => state.identity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
  }, []);

  return (
    <View style={{height: 50, flexDirection: 'row'}}>
      <TouchableOpacity
        style={{width: 130}}
        onPress={() => navigate('ExpanceCharts')}>
        <Text>Expances</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 130}}
        onPress={() => navigate('MoneyFlowCharts')}>
        <Text>Money Flow</Text>
      </TouchableOpacity>
    </View>
  );
}

const graphicColor = ['tomato', 'orange', 'gold', 'cyan', 'navy']; // Colors
const wantedGraphicData = [{ y: 10, label: 'test 1' }, { y: 50, label: 'test 2' }, { y: 30, label: 'test 3' }, { y: 10, label: 'test 4' }];

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

// function ExpanceCharts(props) {
//   const transactions = useSelector(state => state.transactions);

//   const expanceChart1 = (data) => {
//     const transactionList = useSelector(state => state.transactions.transactions);
//     const dashboard = useSelector(state => state.dashboard);
//     const dispatch = useDispatch();
//     const mainCategoriesData = useSelector(state => state.dashboard.data.expances.mainCategoriesData);
//     useEffect(() => {
//       var data = groupToPie(transactionList, item => item.mainCategory);
//       // console.log('data', data);
//       dispatch(dashboardActions.updateData(data));
//     }, [transactionList]);
//     console.log('mainCategoriesData', mainCategoriesData);
//     return (
//       <Card style={styles.cardContainer}>
//         <CardItem header>
//           <Text>Expances</Text>
//         </CardItem>
//         <CardItem>
//           <View style={{flexDirection: 'row', width: '82%', justifyContent: 'center', margin: 30}}>
//               <VictoryPie
//                 // padding={100}
//                 height={260}
//                 labelComponent={<VictoryLabel dy={-10} dy={-10}/>}
//                 // labelRadius
//                 // padAngle={7}
//                 // padAngle={({ datum }) => datum.y}
//                 innerRadius={66}
//                 style={{backgroundColor: 'green'}}
//                 duration={2000}
//                 animate={{ duration: 2000, easing: 'linear' }}
//                 colorScale={graphicColor}
//                 data={mainCategoriesData} />
//           </View>
//         </CardItem>
//         <CardItem footer>
//           <Text>GeekyAnts</Text>
//         </CardItem>
//       </Card>
//     );
//   };

//   const expanceChart2 = (data) => {
//     const transactionList = useSelector(state => state.transactions.transactions);
//     const dashboard = useSelector(state => state.dashboard);
//     const dispatch = useDispatch();
//     const subCategoriesData = useSelector(state => state.dashboard.data.expances.subCategoriesData);

//     return (
//       <Card style={styles.cardContainer}>
//         <CardItem header>
//           <Text>NativeBase</Text>
//         </CardItem>
//         <CardItem>
//           <View style={{flexDirection: 'row', width: '82%', justifyContent: 'center', margin: 30}}>
//             <VictoryPie
//               // padding={100}
//               height={260}
//               labelComponent={<VictoryLabel dy={-10} dy={-10}/>}
//               // labelRadius
//               // padAngle={7}
//               // padAngle={({ datum }) => datum.y}
//               innerRadius={66}
//               style={{backgroundColor: 'green'}}
//               duration={2000}
//               animate={{ duration: 2000, easing: 'linear' }}
//               colorScale={graphicColor}
//               data={subCategoriesData} />
//           </View>
//         </CardItem>
//         <CardItem footer>
//           <Text>GeekyAnts</Text>
//         </CardItem>
//       </Card>
//     );
//   };

//   return (
//     <ScrollView style={styles.cardContainer}>
//       {expanceChart1({})}
//       {expanceChart2({})}
//       <Text>ExpanceCharts</Text>
//     </ScrollView>
//   );
// }

// function MoneyFlowCharts(props) {
//   const transactionList = useSelector(state => state.transactions.transactions);
//   // const state = useSelector(state => state);
//   const dashboard = useSelector(state => state.dashboard);
//   const dispatch = useDispatch();

//   var newData = {};
//   for (var i = 0; i < transactionList.length; i++) {
//     // if (transactionList[i]) {
//     //   newData[]
//     // }
//   }
//   // const newData = transactions.transactions.f;
//   useEffect(() => {
//     dispatch(dashboardActions.updateData(wantedGraphicData));
//   }, []);
//   console.log('newData', transactionList);
//   const moneyFlowChart1 = (data) => {
//     return (
//       <Card style={styles.cardContainer}>
//         <CardItem header>
//           <Text>NativeBase</Text>
//         </CardItem>
//         <CardItem>
//           <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', backgroundColor: 'yellow'}}>
//               <VictoryPie
//                 padding={100}
//                 // labelRadius
//                 // padAngle={7}
//                 // padAngle={({ datum }) => datum.y}
//                 innerRadius={68}
//                 style={{backgroundColor: 'green'}}
//                 duration={2000}
//                 animate={{ duration: 2000, easing: 'linear' }}
//                 colorScale={graphicColor}
//                 data={dashboard.data} />
//           </View>
//         </CardItem>
//         <CardItem footer>
//           <Text>GeekyAnts</Text>
//         </CardItem>
//       </Card>
//     );
//   };

//   const moneyFlowChart2 = (data) => {
//     return (
//       <Card style={styles.cardContainer}>
//         <CardItem header>
//           <Text>NativeBase</Text>
//         </CardItem>
//         <CardItem>
//           <Body>
//             <Text>
//               //Your text here
//             </Text>
//           </Body>
//         </CardItem>
//         <CardItem footer>
//           <Text>GeekyAnts</Text>
//         </CardItem>
//       </Card>
//     );
//   };

//   return (
//     <ScrollView>
//       {moneyFlowChart1({})}
//       {moneyFlowChart2({})}
//       <Text>MoneyFlowCharts</Text>
//     </ScrollView>
//   );
// }

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
    tabBarComponent: Header,
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
