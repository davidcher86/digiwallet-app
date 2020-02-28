import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  SectionList,
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
import { DARK_MODE, BACKGROUND_COLOR, LABEL_COLOR, INPUT_COLOR } from './../Styles';
import Feather from 'react-native-vector-icons/Feather';Entypo
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

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
    if (
      this.props.pageSettings.isOpenIndex !== this.props.transactionItem.uid
    ) {
      this.closeItem();
    }
  }

  render() {
    const {
      pageSettings,
      openTransaction,
      identity,
      profile,
      transactionItem,
      deleteTransaction,
    } = this.props;

    var isOpened = pageSettings.isOpenIndex === transactionItem.uid;
    const card = profile.creditCards.find(card => card.id === transactionItem.creditCardId);
    console.log(card);
    return (
      <Animated.View
        key={transactionItem.uid}
        style={styles.transactionItemContainer}
        thumbnail>
        <View style={styles.itemVissibleSection}>
          <View style={styles.left1Section}>
            <Entypo name="minus" size={25} color="#da3838" />
            {/* <Image
              style={{width: 20, height: 20}}
              source={require('./../../img/arrow-down-ico.png')}
            /> */}
          </View>
          <View style={styles.left2Section}>
            <Text note>{transactionItem.date}</Text>
          </View>
          <View style={styles.bodySection}>
            <Text note numberOfLines={1}>
              {transactionItem.amount}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <TouchableOpacity
              transparent
              onPress={() => this.toggleItemExpand(transactionItem.uid)}
              // onPress={() => openTransaction(transactionItem.uid)}
              style={styles.openBtn}>
              <Feather name="more-horizontal" size={30} color="#4F8EF7" />
              {/* <Image
                style={{width: 20, height: 20}}
                source={require('./../../img/more-icn.png')}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              transparent
              style={styles.deleteBtn}
              onPress={() =>
                deleteTransaction(transactionItem.uid, identity.uid)
              }>
              <MaterialIcons name="delete" size={25} color="#4F8EF7" />
              {/* <Image
                style={{width: 20, height: 20}}
                source={require('./../../img/remove-icn.png')}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={[
            styles.itemHiddenSection,
            {height: this.state.itemHeight, padding: this.state.itemPadding},
            // isOpened ? {height: 80, padding: 6} : {height: 0, padding: 0},
          ]}>
            {console.log(this.props)}
            {console.log(profile.creditCards.find(card => card.id === transactionItem.creditCardId))}
          <View style={styles.headerHiddenSection}>
        {/* <Text style={DARK_MODE.h5Label}>{'Payment - ' + transactionItem.paymentsAmount}</Text> */}
          </View>
          <View style={styles.upperHiddenSection}>
            <Text style={[DARK_MODE.h5Label, {width: '50%'}]}>
              {'Credit Card: ' + card.cardType + '-' + card.name}
            </Text>
            <Text style={[DARK_MODE.h5Label, {width: '50%'}]}>
              {'Amount of Payments: ' + transactionItem.paymentsAmount}
            </Text>
          </View>
          <View style={styles.bottomHiddenSection}>
            <Text style={DARK_MODE.h5Label}>Description:</Text>
            <Text>{transactionItem.description}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
    this.renderList = this.renderList.bind(this);
  }

  renderList(list, sort) {
    var monthsList = {};

    for (var i = 0; i < list.length; i++) {
      var dt = new Date(list[i].date);
      var key = '';
      switch (sort) {
        case 'Daily':
          key = dt.getDate() + ' ,' + monthNames[dt.getMonth()] + ' ,' + dt.getFullYear();
          break;
        case 'Weakly':
        case 'Monthly':
          key = monthNames[dt.getMonth()] + ' ,' + dt.getFullYear();
          break;
        case 'Yearly':
          key = dt.getFullYear();
          break;
      }
      // key = monthNames[dt.getMonth()] + ' ,' + dt.getFullYear();
      if (monthsList[key] === undefined) {
        monthsList[key] = [];
      }
      monthsList[key].push(list[i]);
    }

    var dataList = [];
    Object.keys(monthsList).forEach(function(key, index) {
      var data = [];
      for (var j = 0; j < monthsList[key].length; j++) {
        data.push(monthsList[key][j]);
      }
      dataList.push({title: key, data: data});
    });

    return dataList;
  }

  componentDidMount() {
    const {transactionsList, navigation} = this.props;
    var dataList = this.renderList(transactionsList, navigation.state.key);
    // this.props.setSortedTransactions(dataList);
    this.setState({list: dataList});
  }

  componentDidUpdate(prevProp, prevState) {
    const {transactionsList, navigation} = this.props;
    // console.log(transactionsList);
    if (prevProp.transactionsList.length !== this.props.transactionsList.length) {
      var dataList = this.renderList(transactionsList, navigation.state.key);
      this.setState({list: dataList});
      // this.props.setSortedTransactions(dataList);
    }
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
    );
  };

  render() {
    const {
      transactionsList,
      identity,
      transactionsListSorted,
      pageSettings,
      profile,
      openTransaction,
      deleteTransaction,
    } = this.props;
    // console.log(this.props);
    return (
      <View style={styles.transacionListContainer}>
        <SectionList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={(item, index) => 'key_' + index}
          renderSectionHeader={({section}) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({item}) => (
            <TransactionItem
              key={item.uid}
              pageSettings={pageSettings}
              openTransaction={openTransaction}
              identity={identity}
              profile={profile}
              deleteTransaction={deleteTransaction}
              transactionItem={item}
            />
          )}
          // sections={transactionsListSorted}
          sections={this.state.list} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transacionListContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: BACKGROUND_COLOR,
  },
  transactionItemContainer: {
    flexDirection: 'column',
  },
  SectionHeaderStyle: {
    backgroundColor: '#023d79',
    fontSize: 20,
    padding: 5,
    color: '#fff',
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
    backgroundColor: DARK_MODE.COLORS.LIST_HIDDEN_ITEM_COLOR,
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
    width: '25%',
    justifyContent: 'center',
    // height: 50,
    // borderColor: 'green',
    // paddingLeft: 10,
    // right: 0,
    // flex: 1,
  },
  left1Section: {
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-start',
    // flex: 2,
    // padding: 10,
    // borderWidth: 2,
    width: '10%',
    // height: 50,
  },
  left2Section: {
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-start',
    // flex: 2,
    // padding: 10,
    // borderWidth: 2,
    width: '45%',
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
    transactionsListSorted: state.transactions.sortedTransaction,
    transactionsList: state.transactions.transactions,
    pageSettings: state.transactions.pageSettings,
    profile: state.profile,
    identity: state.identity,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(Transactions);
