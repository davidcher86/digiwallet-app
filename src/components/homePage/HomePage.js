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
        this.props.fetchData(this.props.identity.uid, this.props.navigation);
    }

    render() {
        const {profile} = this.props;
        var totalCreditDebt = 0;

        console.log('-----------------');
        // for (var cardId in mapCards) {
        var mapCredit = profile.credit;
        console.log('profile', profile);
        var cardsList = profile.creditCards;
        // console.log('cardsList', cardsList);
        for (var i = 0; i < cardsList.length; i++) {
            var cardToHandle = null;
            var creditCardDebtDt = cardsList[i].nextDebtDate;
            // console.log('creditCardDebtDt', creditCardDebtDt);
            if (new Date() > new Date(creditCardDebtDt)) {
                cardToHandle = cardsList[i].id;
            }
            // console.log('cardToHandle', cardToHandle);
            if (cardToHandle !== null) {
                for (var item in mapCredit) {
                    // console.log('lastUpdated', new Date(mapCredit[item].lastUpdated));
                    // console.log('creditCardDebtDt', new Date(creditCardDebtDt));
                    // console.log(new Date(mapCredit[item].lastUpdated) < new Date(creditCardDebtDt));
                    // console.log(cardToHandle === mapCredit[item].creditCardId);
                    // console.log('item', mapCredit[item]);
                    if (cardToHandle === mapCredit[item].creditCardId && new Date(mapCredit[item].lastUpdated) < new Date(creditCardDebtDt)) {
                    // if (cardToHandle === mapCredit[item].creditCardId && new Date(mapCredit[item].lastUpdated) < creditCardDebtDt) {
                        var creditItem = cardsList[i];
                        totalCreditDebt += creditItem.monthlyPayment;
                        // console.log('totalCreditDebt ', totalCreditDebt);
                        if (mapCredit[item].paymentsRemain - 1 > 0) {
                            let dt = new Date();
                            mapCredit[item].paymentsRemain = creditItem.paymentsRemain - 1;
                            mapCredit[item].amountRemain = creditItem.amountRemain - creditItem.monthlyPayment;
                            mapCredit[item].lastUpdated = dt.toISOString();
                            console.log('Updated item ', mapCredit[item]);
                        } else {
                            console.log('Deleted item ', mapCredit[item]);
                            delete mapCredit[item];
                        }
                    }
                }
            }
            console.log('Monthly credit of ' + totalCreditDebt + ' reduced from total assets');
            console.log('Updated credit list:', mapCredit);
            console.log('-----------------');
        }
        // for (const item of map.values()) {
        //     console.log(item);
        // }
        // map.forEach(item => {
        //     console.log(item);
        // });mapcards
        return (
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} title="Home"/>
                <View style={styles.containerStyle}>
                    <View style={styles.rowContainer}>
                        <Text>{'Current Assets - '}</Text>
                        <Text>{profile.assets}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{'Current Month Debt - '}</Text>
                        <Text>{profile.currentMonthDebt}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text>{'Total Debt - '}</Text>
                        <Text>{profile.totalDebt}</Text>
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
        profile: state.profile,
        identity: state.identity,
     };
};

export default connect(mapStateToProps, actions)(HomePage);
