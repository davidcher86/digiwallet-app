import {createDrawerNavigator} from 'react-navigation';
import React, {Component} from 'react';
import Account from './../components/account/Account';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';
import Transactions from './../components/transactions/Transactions';
import {Button, Input, Icon} from 'react-native-elements';
import {Text} from 'react-native';

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
    headerMode: 'none',
  },
);

export default PrimaryNav;
