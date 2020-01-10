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

    componentDidMount() {
        this.props.fetchData(this.props.identity.uid);
    }

    render() {
        const {homePage} = this.props;
        console.log('props:', this.props);
        return (
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} title="Home"/>
                <View style={styles.containerStyle}>
                    <View style={styles.rowContainer}>
                        <Text>{'Current Assets - '}</Text>
                        <Text>{homePage.assets}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{'Current Month Debt - '}</Text>
                        <Text>{homePage.currentMonthDebt}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{'Total Debt - '}</Text>
                        <Text>{homePage.totalDebt}</Text>
                    </View>
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
    rowContainer: {

    },
  });

const mapStateToProps = state => {
    return {
        homePage: state.homePage,
        identity: state.identity,
     };
};

export default connect(mapStateToProps, actions)(HomePage);
