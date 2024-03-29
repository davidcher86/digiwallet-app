import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Fab from './../components/common/Fab';
import {connect} from 'react-redux';

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import * as actions from './../components/transactions/transactionsActions';
import Transactions from './../components/transactions/Transactions';

class BottomTransactionsStack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTransactions(this.props.identity.uid);
  }

  render() {
    const {navigate} = this.props.navigation;

    const ifSelected = key => {
      const index = this.props.navigation.state.index;
      const keyName = this.props.navigation.state.routes[index].key;

      return keyName === key;
    };

    return (
      <View style={{flexDirection: 'row',
      width: '100%',
      height: 60,
      backgroundColor: '#17BED0',
      zIndex: 50,
      justifyContent: 'center',
      alignItems: 'center'}}>
        <View style={styles.container}>
        <View
          style={[
            styles.tabContainer,
            ifSelected('Daily') ? styles.selectedTab : '',
          ]}>
          <TouchableOpacity
            onPress={() => navigate('Daily', {group: 'Daily'})}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={ifSelected('Daily') ? {color: 'red'} : {}}>
                Daily
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabContainer,
            ifSelected('Weakly') ? styles.selectedTab : '',
          ]}>
          <TouchableOpacity
            onPress={() => navigate('Weakly', {group: 'Weakly'})}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={ifSelected('Weakly') ? {color: 'red'} : {}}>
                Weakly
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabContainer,
            ifSelected('Monthly') ? styles.selectedTab : '',
          ]}>
          <TouchableOpacity
            onPress={() => navigate('Monthly', {group: 'Monthly'})}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={ifSelected('Monthly') ? {color: 'red'} : {}}>
                Monthly
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabContainer,
            ifSelected('Yearly') ? styles.selectedTab : '',
          ]}>
          <TouchableOpacity
            onPress={() => navigate('Yearly', {group: 'Yearly'})}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={ifSelected('Yearly') ? {color: 'red'} : {}}>
              Yearly
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabContainer,
            ifSelected('All') ? styles.selectedTab : '',
          ]}>
          <TouchableOpacity
            onPress={() => navigate('All', {group: 'All'})}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={ifSelected('All') ? {color: 'red'} : {}}>
                All
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{position: 'relative', width: 100, height: 100, bottom: 10, overflow: 'hidden', elevation: 10, right: 20}} >
          <Fab onPress={() => {console.log('sdfsdf')}} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    trans: state.transactions,
    transactionsList: state.transactions.transactions,
    pageSettings: state.transactions.pageSettings,
    identity: state.identity,
  };
};

const BottomTransactionsNav = connect(
  mapStateToProps,
  actions,
)(BottomTransactionsStack);

// const TransactionsStack = createBottomTabNavigator(
const TransactionsStack = createMaterialTopTabNavigator(
  {
    Daily: {
      screen: Transactions,
      // group: 'Daily',
    },
    Weakly: {
      screen: Transactions,
      // group: 'Weakly',
    },
    Monthly: {
      screen: Transactions,
      // group: 'Monthly',
    },
    Yearly: {
      screen: Transactions,
      // group: 'Yearly',
    },
    All: {
      screen: Transactions,
      // group: 'All',
    },
  },
  {
    // initialRouteName: 'Daily',
    tabBarComponent: BottomTransactionsNav,
    // tabBarComponent: BottomTransactionsStack,
    activeColor: '#f0edf6',
    inactiveColor: '#fffff',
    tabBarPosition: 'bottom',
    lazy: true,
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
    height: '100%',
  },
  selectedTab: {
    color: 'red',
    // backgroundColor: 'red',
    borderBottomWidth: 5,
    borderBottomColor: 'red',
  },
  button: {
    alignSelf: 'center',
    // borderWidth: 2
  },
});

// const mapStateToProps = state => {
//   return {
//     trans: state.transactions,
//     transactionsList: state.transactions.transactions,
//     pageSettings: state.transactions.pageSettings,
//     identity: state.identity,
//   };
// };

// export default connect(
//   mapStateToProps,
//   actions,
// )(TransactionsStack);
export default TransactionsStack;
