import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';

import * as actions from './dashboardActions';
import Header from './../common/Header';
import {FAB} from 'react-native-paper';

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Dashboard',
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
        <Header navigation={this.props.navigation} title="Dashboard" />
        <View style={styles.containerStyle}>
          <Text>{'Dashboard'}</Text>
        </View>
        {/* <FAB style={styles.fab} small icon="plus" onPress={onLoginPress()} /> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {dashboard: state.dashboard};
};

export default connect(
  mapStateToProps,
  actions,
)(Dashboard);
