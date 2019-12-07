import React, {Component} from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';

import {FAB} from 'react-native-paper';
import Header from './../common/Header';
import * as actions from './transactionsActions';

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
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

  componentDidMount() {
    this.props.fetchTransactions(this.props.identity.uid);
  }

  // renderTransactionsList = async () => {
  //   return(

  //   );
  // };

  render() {
    const {transactions, identity} = this.props;
    console.log('transactions: ', transactions);
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={transactions}
          renderItem={({item}) => <Item title={item.date} />}
          keyExtractor={item => item.id}
        />
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
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    identity: state.identity,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(Transactions);
