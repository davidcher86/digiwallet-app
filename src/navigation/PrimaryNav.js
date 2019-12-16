import {createDrawerNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {FAB} from 'react-native-paper';
import {Input, Icon} from 'react-native-elements';
import {
  ScrollView,
  DrawerItems,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

import Account from './../components/account/Account';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';
import Transactions from './../components/transactions/Transactions';
import {removeUID} from './../components/common/Actions';

const DrawerWithLogoutButton = props => (
  <View style={styles.navContainer}>
    <TouchableHighlight
      style={styles.navButton}
      onPress={() => props.navigation.navigate('HomePage')}>
      <Text>HomePage</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.navButton}
      onPress={() => props.navigation.navigate('Dashboard')}>
      <Text>Dashboard</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.navButton}
      onPress={() => props.navigation.navigate('Account')}>
      <Text>Account</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.navButton}
      onPress={() => props.navigation.navigate('Transactions')}>
      <Text>Transactions</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.logoutButton}
      onPress={() => {
        removeUID();
        props.navigation.navigate('Login');
      }}>
      <Text>Logout</Text>
    </TouchableHighlight>
  </View>
);

const PrimaryNav = createDrawerNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        drawerLabel: 'Home',
        headerTitle: 'iohoiuh',
        drawerLockMode: 'locked-closed',
        // drawerLabel: () => null, //hide header if not needed so whole screen slide
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
        drawerLabel: 'Account Details',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        headerRight: <Text>Info</Text>,
        drawerLabel: 'Dashboard',
        drawerLockMode: 'locked-closed',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Transactions: {
      screen: Transactions,
      navigationOptions: {
        drawerLabel: 'Transactions',
        drawerLockMode: 'locked-closed',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    contentComponent: DrawerWithLogoutButton,
    headerMode: 'none',
  },
);

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  navButton: {
    // marginBottom: 30,
    marginTop: 10,
    // flex: 1,
    padding: 4,
    width: '100%',
    // borderWidth: 2,
    height: 40,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    top: 0,
  },
  logoutButton: {
    // alignSelf: 'flex-end',
    // borderWidth: 2,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    // marginBottom: 30,
    // marginTop: 30,
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
  },
});

export default PrimaryNav;
