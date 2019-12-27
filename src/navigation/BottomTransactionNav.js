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
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => navigate('Daily')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>daily</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => navigate('Weekly')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>Weekly</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => navigate('monthly')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>monthly</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => navigate('Other')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>Other</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const TransactionsStack = createBottomTabNavigator(
  {
    Daily: {screen: Transactions},
    Weekly: {screen: Transactions},
    Monthly: {screen: Transactions},
    Other: {screen: Transactions},
  },
  {
    initialRouteName: 'Daily',
    tabBarComponent: BottomTransactionsStack,
    activeColor: '#f0edf6',
    inactiveColor: '#fffff',
    // barStyle: {backgroundColor: '#694fad'},
  },
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#17BED0',
    zIndex: 50,    
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    width: '25%',
  },
  button: {
    alignSelf: 'center',
    borderWidth: 2
  }
});
export default TransactionsStack;
