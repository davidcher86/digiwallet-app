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
    console.log(this.props);
    return (
      <ListItem>
        <Body>
          <Text>Sankhadeep</Text>
          <Text note numberOfLines={1}>
            Its time to build a difference . .
          </Text>
        </Body>
        <Right>
          <Button transparent>
            <Text>View</Text>
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

  componentDidMount() {
    this.props.fetchTransactions(this.props.identity.uid);
  }

  render() {
    const {transactions, identity} = this.props;
    // console.log('transactions: ', transactions);

    const renderTransactions = (props) => {
      console.log('props', props.transactions);
      var itemList = [];
      if (props.transactions.length > 0) {
        itemList = props.transactions.map(item => (
          <TransactionItem transactionItem={item} />
        ));
      }

      return itemList;
    };

    return (
      <View style={{flex: 1}}>
        <List>
          {renderTransactions(this.props)}
        </List>
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
    transactions: state.transactions,
    identity: state.identity,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(Transactions);
