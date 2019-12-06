import {createDrawerNavigator} from 'react-navigation';
import React, {Component} from 'react';
import Account from './../components/account/Account';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';
import {AsyncStorage} from 'react-native';
import Transactions from './../components/transactions/Transactions';
import {Input, Icon} from 'react-native-elements';
import {
  ScrollView,
  DrawerItems,
  View,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import firebase from 'firebase';

const DrawerWithLogoutButton = props => (
  <View>
    <Button
      style={styles.logoutButton}
      title="Home Page"
      onPress={() => props.navigation.navigate('HomePage')}
    />
    <Button
      style={styles.logoutButton}
      title="Dashboard"
      onPress={() => props.navigation.navigate('Dashboard')}
    />
    <Button
      style={styles.logoutButton}
      title="Account"
      onPress={() => props.navigation.navigate('Account')}
    />
    <Button
      style={styles.logoutButton}
      title="Transactions"
      onPress={() => props.navigation.navigate('Transactions')}
    />
    <Button
      style={styles.logoutButton}
      title="Logout"
      onPress={() => {
        removeUID();
        props.navigation.navigate('Login');
      }}
    />
  </View>
);

const removeUID = async uid => {
  try {
    await AsyncStorage.removeItem('digiwalletUserUID');
  } catch (error) {
    console.log('error while removing AsyncStorage item ', error);
  }
};

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
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logoutButton: {
    marginBottom: 30,
    marginTop: 30,
    justifyContent: 'space-between',
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
  },
});

export default PrimaryNav;
