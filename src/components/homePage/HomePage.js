/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button, Input, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './homePageActions';
import Header from './../common/Header';
import Fab from './../common/Fab';

class HomePage extends Component {
    static navigationOptions = {
        drawerLabel: 'Screen One',
    }

    render() {
        // console.log(this.props.identity);
        return (
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} title="Home"/>
                <View style={styles.containerStyle}>
                    <Text>{'HomePage'}</Text>
                </View>
                <Fab />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1,
        // backgroundColor: 'yellow'
    },
  });

const mapStateToProps = state => {
    return {
        homePage: state.homePage,
        identity: state.identity,
     };
};

export default connect(mapStateToProps, actions)(HomePage);
