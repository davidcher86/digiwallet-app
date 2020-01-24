/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Input, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './homePageActions';
import Header from './../common/Header';
import Fab from './../common/Fab';
import { BACKGROUND_COLOR, DARK_MODE } from './../Styles';

class HomePage extends Component {
    static navigationOptions = {
        drawerLabel: 'Screen One',
    }

    componentDidMount() {
        this.props.fetchData(this.props.identity.uid, this.props.navigation);
    }

    render() {
        const {profile} = this.props;
        // console.log('pre', profile);
        const getMonthsDiffrence = (firstDate, laterDate) => {            console.log('laterDate', laterDate);
            var date1 = new Date(firstDate);
            var date2 = new Date(laterDate);
            var diffYears = date2.getFullYear() - date1.getFullYear();
            var diffMonths = date2.getMonth() - date1.getMonth();
            var diffDays = date2.getDate() - date1.getDate();
          
            var months = (diffYears*12 + diffMonths);
            if (diffDays>0) {
                months += '.' + diffDays;
            } else if (diffDays < 0) {
                months--;
                months += '.'+(new Date(date2.getFullYear(),date2.getMonth(),0).getDate()+diffDays);
            }
            console.log(months);
            return Math.ceil(months);
        };

        var nowDt = new Date();
        console.log('before', profile);
        // console.log(nowDt > new Date(profile.sallary.paymentDate));
        if (profile.sallary && nowDt > new Date(profile.sallary.paymentDate) && new Date(profile.sallary.paymentDate) > new Date(profile.sallary.lastUpdated)) {
            var monthsAmount = getMonthsDiffrence(profile.sallary.paymentDate, nowDt);

            profile.assets += (monthsAmount * profile.sallary.amount);
            var payDayDt = new Date(profile.sallary.paymentDate)
            console.log('payDayDt pre', payDayDt);
            console.log('payDayDt pmonthsAmount', monthsAmount);
            payDayDt.setMonth(payDayDt.getMonth() + monthsAmount);
            console.log('payDayDt as ', payDayDt);
            profile.sallary.paymentDate = payDayDt.toISOString();
            profile.sallary.lastUpdated = nowDt.toISOString();
        }
        console.log('after', profile);

        return (
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} title="Home"/>
                <View style={[DARK_MODE.appContainer, {padding: 20}]}>
                    <View style={styles.h1rowContainer}>
                        <Text>{profile.assets}</Text>
                        <Text>{'Current Assets'}</Text>
                    </View>
                    <View style={styles.h2rowContainer}>
                        <View style={styles.h2RowItem}>
                            <Text>{profile.currentMonthCredit}</Text>
                            <Text>{'Current Month Debt'}</Text>
                        </View>
                        <View style={styles.h2RowItem}>
                            <Text>{profile.totalCredit}</Text>
                            <Text>{'Total Debt'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.creditListStyle}>
                <FlatList
                    data={profile.credit}
                    keyExtractor={(item, index) => 'key_' + index}
                    // keyExtractor={item => item.uid}
                    // renderItem={({item}) => (
                        // <TransactionItem
                        // key={item.uid}
                        // pageSettings={pageSettings}
                        // openTransaction={openTransaction}
                        // identity={identity}
                        // deleteTransaction={deleteTransaction}
                        // transactionItem={item}
                        // />
                        // )}
                    />
                <Fab />
            </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    // containerStyle: {
    //     padding: 20,
    //     flex: 1,
    //     backgroundColor: BACKGROUND_COLOR,
    // },
    h1rowContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 2,
        height: 60,
    },
    h2rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h2RowItem: {
        height: 60,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
    },
  });

const mapStateToProps = state => {
    return {
        profile: state.profile,
        identity: state.identity,
     };
};

export default connect(mapStateToProps, actions)(HomePage);
