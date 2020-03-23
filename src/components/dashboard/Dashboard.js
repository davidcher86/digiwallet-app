import React, {Component, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect, useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';

import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function ExpanceCharts(props) {
  return (
    <View>
      <Text>dsfsd</Text>
    </View>
  );
}

function Dashboard(props) {
  const dashboard = useSelector(state => state.dashboard);
  const transactions = useSelector(state => state.transactions);
  const identity = useSelector(state => state.identity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
  }, []);

  console.log('dashboard', dashboard);
  console.log('transactions', transactions);
  return (
    <View style={{flex: 1}}>
      <ScrollableTabView>
        <ExpanceCharts />
      </ScrollableTabView>
      <Fab />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
  },
});

const mapStateToProps = state => {
  return {settings: state.settings};
};

export default connect(
  mapStateToProps,
  {},
)(Dashboard);
