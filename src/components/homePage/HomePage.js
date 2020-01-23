/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Input, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './homePageActions';
import Header from './../common/Header';
import Fab from './../common/Fab';
import { BACKGROUND_COLOR } from './../Styles';

class HomePage extends Component {
    static navigationOptions = {
        drawerLabel: 'Screen One',
    }

    componentDidMount() {
        this.props.fetchData(this.props.identity.uid, this.props.navigation);
    }

    render() {
        const {profile} = this.props;
        console.log('pre', profile);
        var nowDt = new Date();
        if (profile.sallary !== undefined) {
        while (nowDt > new Date(profile.sallary.paymentDate)) {
            profile.assets += profile.sallary.amount;
            var payDayDt = new Date(profile.sallary.paymentDate)
            payDayDt.setMonth(payDayDt.getMonth() + 1);
            profile.sallary.paymentDate = payDayDt.toISOString();
        }
    }
        console.log('after', profile);

        return (
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} title="Home"/>
                <View style={styles.containerStyle}>
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
    containerStyle: {
        padding: 20,
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
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
