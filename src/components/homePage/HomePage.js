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
        // console.log('props:', this.props);
        // var mapCards = {'phfsdfsdVTk3kcz67689': '2020-01-07T17:52:58.429Z',
        //            'pSeEjU6uGVTk3kcz6099': '2020-02-13T17:52:58.429Z'};
        // var mapcardslist = mapcards
        var mapCards = {};
        var cardsList = [ { billingDate: 7,
            cardType: 'visa',
            id: 'pSeEjU6uGVTk3kcz6099',
            name: 'Card1',
            nextDebtDate: '2020-01-07T17:52:58.429Z' } ];

        for (var i = 0; i < cardsList.length; i++) {
            mapCards.set(cardsList[i].creditCardId, cardsList[i].nextDebtDate);
        }
        // Filter only relevant cards
        for (var item in mapCards) {
            if (new Date() > new Date(mapCards[item])) {
                delete mapCards[item];
            }
        }

        var mapCredit = { '-LyVJ8uZNFnxwFCqlmp8':
            { amount: '345',
                amountRemain: '345',
                creditCardId: 'pSeEjU6uGVTk3kcz6099',
                date: '2020-01-13T19:10:35.349Z',
                description: '',
                lastUpdated: '2020-01-13T19:10:38.761Z',
                mainCategory: '',
                monthlyPayment: 86.25,
                paymentType: 'credit',
                paymentsAmount: '4',
                paymentsRemain: '4',
                subCategory: '',
                transactionType: 'expense' },
            '-LyVJAOdYOIgYOTNGuDL':
            { amount: '34',
                amountRemain: '34',
                creditCardId: 'pSeEjU6uGVTk3kcz6099',
                date: '2020-01-13T19:10:41.434Z',
                description: '',
                lastUpdated: '2020-01-13T19:10:42.022Z',
                mainCategory: '',
                monthlyPayment: 8.5,
                paymentType: 'credit',
                paymentsAmount: '1',
                paymentsRemain: '4',
                subCategory: '',
                transactionType: 'expense' },
            '-LyVJC_DMqDAIFWr8NLv':
            { amount: '123',
                amountRemain: '41',
                creditCardId: 'pSeEjU6uGVTk3kcz6099',
                date: '2020-01-13T19:10:50.367Z',
                description: '',
                lastUpdated: '2020-01-13T19:10:51.072Z',
                mainCategory: '',
                monthlyPayment: 41,
                paymentType: 'credit',
                paymentsAmount: '3',
                paymentsRemain: '1',
                subCategory: '',
                transactionType: 'expense' } };
        var totalCreditDebt = 0;

        console.log('-----------------');
        for (var cardId in mapCards) {
            var creditCardDebtDt = new Date(mapCards[cardId]);
            for (var item in mapCredit) {
                if (cardId === mapCredit[item].creditCardId && new Date(mapCredit[item].lastUpdated) < creditCardDebtDt) {
                    var creditItem = mapCredit[item];
                    totalCreditDebt += Number(creditItem.monthlyPayment);
                    // console.log('totalCreditDebt ', totalCreditDebt);
                    if (Number(mapCredit[item].paymentsRemain) - 1 > 0) {
                        let dt = new Date();
                        mapCredit[item].paymentsRemain = (Number(creditItem.paymentsRemain) - 1).toString();
                        mapCredit[item].amountRemain = (Number(creditItem.amountRemain) - creditItem.monthlyPayment).toString();
                        mapCredit[item].lastUpdated = dt.toISOString();
                        console.log('Updated item ', mapCredit[item]);
                    } else {
                        console.log('Deleted item ', mapCredit[item]);
                        delete mapCredit[item];
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
