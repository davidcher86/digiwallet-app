import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  List,
  ListItem,
  ScrollView,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

import * as actions from './transactionsActions';
import Fab from './../common/Fab';
import Header from './../common/Header';

class TransactionItem extends Component {
  render() {
    const {
      pageSettings,
      openTransaction,
      identity,
      transactionItem,
      deleteTransaction,
    } = this.props;
    console.log(transactionItem);
    var isOpened = pageSettings.isOpenIndex === transactionItem.uid;
    return (
      <View style={styles.transactionItemContainer} thumbnail>
        <View style={styles.itemVissibleSection}>
          <View style={styles.leftSection}>
            <Text>{transactionItem.date}</Text>
          </View>
          <View style={styles.bodySection}>
            <Text note numberOfLines={1}>
              {transactionItem.amount}
            </Text>
          </View>
          <View style={styles.rightSection}>
            {/* <Image
              style={{width: 20, height: 20}}
              source={{uri: './../../img/more-icn.png'}}/> */}
            <TouchableOpacity
              transparent
              style={styles.openBtn}
              onPress={() => openTransaction(transactionItem.uid)}>
              <Image
                style={{width: 20, height: 20}}
                source={require('./../../img/more-icn.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              transparent
              style={styles.deleteBtn}
              onPress={() => deleteTransaction(transactionItem.uid, identity.uid)}>
              <Image
                style={{width: 20, height: 20}}
                source={require('./../../img/remove-icn.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.itemHiddenSection,
            isOpened ? {height: 80, padding: 6} : {height: 0, padding: 0},
          ]}>
          <View style={styles.headerHiddenSection}>
            <Text>Payment - </Text>
          </View>
          <View style={styles.upperHiddenSection}>
            <Text>
              {'Credit Card: ' + transactionItem.paymentDetails.cardType}
            </Text>
            <Text>
              {'Amount of Payments: ' +
                transactionItem.paymentDetails.paymentAmount}
            </Text>
          </View>
          <View style={styles.bottomHiddenSection}>
            <Text>Description:</Text>
            <Text>{transactionItem.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

class Transactions extends Component {
  // static navigationOptions = {
  //   title: 'Transactions',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  // };

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
      <View style={styles.transacionListContainer}>
        <Header navigation={this.props.navigation} title="Transaction" />
        <View>{renderTransactions(this.props)}</View>
        <Fab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transacionListContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  transactionItemContainer: {
    flexDirection: 'column',
    // padding: 4,
    // alignItems: 'stretch',
    // width: '100%',
    // flexDirection: 'column',
    // flex: 5,
    // height: 80,
    // flex: 1,
    // alignSelf: 'baseline',
    // marginTop: 10,
    // borderBottomWidth: 1,
    // borderColor: 'black',
    // marginVertical: 8,
    // marginHorizontal: 16,
    // backgroundColor: 'yellow',
  },
  itemVissibleSection: {
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#f9c2ff',
    // height: 80,
    padding: 6,
    // borderWidth: 2,
    // borderColor: 'black',
    // width: '100%',
    // alignItems: 'stretch',
  },
  itemHiddenSection: {
    // height: 0,
    overflow: 'hidden',
    // display: 'none',
    // flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    backgroundColor: 'yellow',
    // borderColor: 'black',
    // height: 20,
    width: '100%',
  },
  rightSection: {
    width: '20%',
    // height: 50,
    // padding: 10,
    // alignSelf: 'flex-end',
    // borderWidth: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    // justifyContent: 'right',
  },
  bodySection: {
    // borderWidth: 2,
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center',
    // height: 50,
    // borderColor: 'green',
    // paddingLeft: 10,
    // right: 0,
    // flex: 1,
  },
  leftSection: {
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-start',
    // flex: 2,
    // padding: 10,
    // borderWidth: 2,
    width: '30%',
    // height: 50,
  },
  openBtn: {
    marginLeft: 10,
    // width: 90,
    // height: 30,
    // borderWidth: 2,
  },
  deleteBtn: {
    marginRight: 10,
    // width: 90,
    // height: 30,
    // borderWidth: 2,
  },
  headerHiddenSection: {},
  upperHiddenSection: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomHiddenSection: {
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
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
