import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  Container,
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

import * as actions from './transactionsActions';
import Fab from './../common/Fab';
import Header from './../common/Header';

class TransactionItem extends Component {
  constructor() {
    super();
    this.state = {
      itemHeight: new Animated.Value(0),
      itemPadding: new Animated.Value(0),
    };
    this.expandItem = this.expandItem.bind(this);
    this.closeItem = this.closeItem.bind(this);
    this.toggleItemExpand = this.toggleItemExpand.bind(this);
  }

  expandItem = () => {
    Animated.timing(this.state.itemHeight, {
      toValue: 80,
      duration: 400,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();

    Animated.timing(this.state.itemPadding, {
      toValue: 6,
      duration: 100,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();
  };

  closeItem = () => {
    Animated.timing(this.state.itemHeight, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();

    Animated.timing(this.state.itemPadding, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();
  };

  toggleItemExpand(uid) {
    if (this.props.pageSettings.isOpenIndex === uid) {
      this.props.openTransaction(null);
      this.closeItem();
    } else {
      this.props.openTransaction(uid);
      this.expandItem();
    }
  }

  componentDidUpdate() {
    if (this.props.pageSettings.isOpenIndex !== this.props.transactionItem.uid) {
      this.closeItem();
    }
  }

  render() {
    const {
      pageSettings,
      openTransaction,
      identity,
      transactionItem,
      deleteTransaction,
    } = this.props;

    var isOpened = pageSettings.isOpenIndex === transactionItem.uid;
    return (
      <Animated.View style={styles.transactionItemContainer} thumbnail>
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
              onPress={() => this.toggleItemExpand(transactionItem.uid)}
              // onPress={() => openTransaction(transactionItem.uid)}
              style={styles.openBtn}>
              <Image
                style={{width: 20, height: 20}}
                source={require('./../../img/more-icn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              transparent
              style={styles.deleteBtn}
              onPress={() =>
                deleteTransaction(transactionItem.uid, identity.uid)
              }>
              <Image
                style={{width: 20, height: 20}}
                source={require('./../../img/remove-icn.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={[
            styles.itemHiddenSection,
            {height: this.state.itemHeight, padding: this.state.itemPadding},
            // isOpened ? {height: 80, padding: 6} : {height: 0, padding: 0},
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
        </Animated.View>
      </Animated.View>
    );
  }
}

class Transactions extends Component {
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

    return (
      <View style={styles.transacionListContainer}>
        <Header navigation={this.props.navigation} title="Transaction" />
        <FlatList
          data={transactionsList}
          keyExtractor={item => item.uid}
          renderItem={({item}) => (
            <TransactionItem
              // key={key}
              pageSettings={pageSettings}
              openTransaction={openTransaction}
              identity={identity}
              deleteTransaction={deleteTransaction}
              transactionItem={item}
            />
          )}
        />
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
