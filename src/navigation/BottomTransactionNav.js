import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Transactions from './../components/transactions/Transactions';

class BottomTransactionsStack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>daily</Text>
        <Text>monthly</Text>
        <Text>yearly</Text>
      </View>
    );
  }
}

// const TransactionsStack = createBottomTabNavigator(
//   {
//     Album: {screen: Transactions},
//     Library: {screen: Transactions},
//     History: {screen: Transactions},
//     Cart: {screen: Transactions},
//   },
//   {
//     initialRouteName: 'Album',
//     tabBarComponent: <BottomStackContainer />,
//     // activeColor: '#f0edf6',
//     // inactiveColor: '#3e2465',
//     // barStyle: {backgroundColor: '#694fad'},
//   },
// );

const TransactionsStack = createBottomTabNavigator(
  {
    Album: {screen: Transactions},
    Library: {screen: Transactions},
    History: {screen: Transactions},
    Cart: {screen: Transactions},
  },
  {
    // initialRouteName: 'Album',
    tabBarComponent: BottomTransactionsStack,
    activeColor: '#f0edf6',
    inactiveColor: '#fffff',
    // barStyle: {backgroundColor: '#694fad'},
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 40,
    backgroundColor: '#17BED0',
    zIndex: 50,
  },
});
export default TransactionsStack;
// const LoginStack = createStackNavigator(
//   {
//     LoginScreen: {
//       screen: LoginForm,
//       navigationOptions: {
//         header: null,
//         // title: 'Authentication',
//         // headerStyle: {
//         //   backgroundColor: '#f4511e',
//         // },
//         // headerTintColor: '#fff',
//         // headerTitleStyle: {
//         //   fontWeight: 'bold',
//         // },
//       },
//     },
//     Account: {
//       screen: Account,
//       navigationOptions: {
//         header: null,
//         // title: 'Regiter Account',
//         // headerStyle: {
//         //   backgroundColor: '#f4511e',
//         // },
//         // headerTintColor: '#fff',
//         // headerTitleStyle: {
//         //   fontWeight: 'bold',
//         // },
//       },
//     },
//   },
//   // {
//   //   headerMode: 'float',
//   //   initialRouteName: 'LoginScreen',
//   //   navigationOptions: {
//   //     headerStyle: {backgroundColor: '#E73536'},
//   //     title: 'You are not logged in',
//   //     headerTintColor: 'white',
//   //   },
//   // },
// );

// export default LoginStack;
