/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button, Input, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {FAB} from 'react-native-paper';

import * as actions from './homePageActions';
import Header from './../common/Header';

class HomePage extends Component {
    static navigationOptions = {
        drawerLabel: 'Screen One',
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} title="Home"/>
                <View style={styles.containerStyle}>
                    <Text>{'HomePage'}</Text>
                </View>
                {/* <FAB style={styles.fab} small icon="plus" onPress={onLoginPress()} /> */}
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
    return { homePage: state.homePage };
};

export default connect(mapStateToProps, actions)(HomePage);
