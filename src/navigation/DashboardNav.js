import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Fab from '../components/common/Fab';
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

import {fetchTransactions} from '../components/transactions/transactionsActions';
import * as actions from '../components/dashboard/dashboardActions';
import Dashboard from '../components/dashboard/Dashboard';

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
      <View style={styles.container}>
        <View
          style={[
            styles.tabContainer,
            ifSelected('Daily') ? styles.selectedTab : '',
          ]}>
          <TouchableOpacity
            onPress={() => navigate('Categories')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={ifSelected('Categories') ? {color: 'red'} : {}}>
                Categories
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabContainer,
            ifSelected('IncomeOutcome') ? styles.selectedTab : '',
          ]}>
          <TouchableOpacity
            onPress={() => navigate('IncomeOutcome')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={ifSelected('IncomeOutcome') ? {color: 'red'} : {}}>
                IncomeOutcome
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Fab onPress={() => {console.log('sdfsdf')}} />
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
  Object.assign({}, actions, {fetchTransactions})
)(BottomTransactionsStack);

// const TransactionsStack = createBottomTabNavigator(
const DashboardStack = createMaterialTopTabNavigator(
  {
    Categories: {
      screen: Dashboard,
      // group: 'Weakly',
    },
    IncomeOutcome: {
      screen: Dashboard,
      // group: 'Monthly',
    },
  },
  {
    initialRouteName: 'categories',
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
export default DashboardStack;
