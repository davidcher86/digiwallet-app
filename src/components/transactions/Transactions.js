import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';

import Header from './../common/Header';
import * as actions from './transactionsActions';

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

  render() {
    const styles = {
      containerStyle: {
        padding: 20,
      },
    };

    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} title="Transactions" />
        <View style={styles.containerStyle}>
          <Text>{'Transactions'}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {financialActionsList: state.financialActions};
};

export default connect(
  mapStateToProps,
  actions,
)(Transactions);
