import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

import {FAB} from 'react-native-paper';
// import Header from './../common/Header';
import * as actions from './transactionsActions';

class TransactionItem extends Component {
  render() {
    const {
      pageSettings,
      openTransaction,
      key,
      identity,
      transactionItem,
      deleteTransaction,
    } = this.props;
    // console.log('pageSettings', pageSettings);
    return (
      <ListItem key={key} thumbnail>
        <Left>
          <Text>{transactionItem.amount}</Text>
        </Left>
        <Body>
          <Text>
            {pageSettings.isOpenIndex === transactionItem.uid
              ? 'Opened'
              : 'cled'}
          </Text>
          <Text note numberOfLines={1}>
            {transactionItem.date}
          </Text>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => openTransaction(transactionItem.uid)}>
            <Text>Open</Text>
          </Button>
          <Button
            transparent
            onPress={() => deleteTransaction(transactionItem.uid, identity.uid)}>
            <Text>DELETE</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

class Transactions extends Component {
  static navigationOptions = {
    title: 'Transactions',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log('oldProps', this.props.transactionsList.length);
  //   console.log('nextProps', nextProps.transactionsList.length);
  // }

  componentDidMount() {
    this.props.fetchTransactions(this.props.identity.uid);
  }

  render() {
    const {
      transactionsList,
      identity,
      pageSettings,
      openTransaction,
      deleteTransaction,
    } = this.props;
    // console.log('transactions: ', transactions);

    const renderTransactions = props => {
      var itemList = [];
      if (props.transactionsList.length > 0) {
        itemList = props.transactionsList.map((item, key) => (
          <TransactionItem
            key={key}
            pageSettings={pageSettings}
            openTransaction={openTransaction}
            identity={identity}
            deleteTransaction={deleteTransaction}
            transactionItem={item}
          />
        ));
      }

      return itemList;
    };
    // console.log('transactionsList', this.props.transactionsList);
    return (
      <View style={{flex: 1}}>
        <List>{renderTransactions(this.props)}</List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    width: 100,
    flex: 6,
    height: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const mapStateToProps = state => {
  return {
    trans: state.transactions,
    transactionsList: state.transactions.transactions,
    pageSettings: state.transactions.pageSettings,
    identity: state.identity,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(Transactions);
