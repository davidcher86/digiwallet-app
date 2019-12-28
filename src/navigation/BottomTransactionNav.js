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

    const ifSelected = (key) => {
      const index = this.props.navigation.state.index;
      const keyName = this.props.navigation.state.routes[index].key
      
      return keyName === key;
    }

    return (
      <View style={styles.container}>
        <View style={[styles.tabContainer, (ifSelected('Daily') ? styles.selectedTab : '')]}>
          <TouchableOpacity
            onPress={() => navigate('Daily')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>Daily</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.tabContainer, (ifSelected('Weekly') ? styles.selectedTab : '')]}>
          <TouchableOpacity
            onPress={() => navigate('Weekly')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>Weekly</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.tabContainer, (ifSelected('Monthly') ? styles.selectedTab : '')]}>
          <TouchableOpacity
            onPress={() => navigate('Monthly')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>Monthly</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.tabContainer, (ifSelected('Other') ? styles.selectedTab : '')]}>
          <TouchableOpacity
            onPress={() => navigate('Other')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>Other</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.tabContainer, (ifSelected('Total') ? styles.selectedTab : '')]}>
          <TouchableOpacity
            onPress={() => navigate('Total')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text>Total</Text>
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
    Total: {screen: Transactions},
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
    justifyContent: 'center',
    width: '20%',
    height: '100%'
  },
  selectedTab:{
    color: 'red',
    // backgroundColor: 'red',
    borderBottomWidth: 5,
    borderBottomColor: 'red'
  },
  button: {
    alignSelf: 'center',
    // borderWidth: 2
  }
});
export default TransactionsStack;
