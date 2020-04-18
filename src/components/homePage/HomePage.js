/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Animated, Text, StyleSheet, Easing, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Button, Input, PricingCard } from 'react-native-elements';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import { Circle  } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import * as actions from './homePageActions';
import Header from './../common/Header';
import Fab from './../common/Fab';
import { DARK_MODE } from './../Styles';

class CreditItem extends Component {
    constructor() {
      super();

      this.state = {
        itemHeight: new Animated.Value(0),
        itemPadding: new Animated.Value(0),
        iconRotation: new Animated.Value(0),
      };
      this.rotation = new Animated.Value(0)
      this.expandItem = this.expandItem.bind(this);
      this.closeItem = this.closeItem.bind(this);
      this.toggleItemExpand = this.toggleItemExpand.bind(this);
      this.rotateDown = this.rotateDown.bind(this);
      this.rotateUp = this.rotateUp.bind(this);
    }

    rotateDown = () => {
        Animated.timing(this.state.iconRotation, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
        }).start();
    };

    rotateUp = () => {
        Animated.timing(this.state.iconRotation, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start();
    };

    expandItem = () => {
        Animated.timing(this.state.itemHeight, {
          toValue: 80,
          duration: 400,
          easing: Easing.linear,
        }).start();

        Animated.timing(this.state.itemPadding, {
          toValue: 6,
          duration: 100,
          easing: Easing.linear,
        }).start();
    };

    closeItem = () => {
        Animated.timing(this.state.itemHeight, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
        }).start();

        Animated.timing(this.state.itemPadding, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
        }).start();
    };

    toggleItemExpand(uid) {
        this.props.pageSettings.isOpenIndex === uid
        ? this.props.openCredit(null)
        : this.props.openCredit(uid);
    }

    componentDidUpdate() {
        if (this.props.pageSettings.isOpenIndex === this.props.creditItem.uid) {
            this.expandItem();
            this.rotateDown();
          } else {
            this.rotateUp();
            this.closeItem();
          }
    }

    render(){
        const {
            pageSettings,
            identity,
            creditItem,
          } = this.props;

        var rotateProp = this.state.iconRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"]
        })
        // console.log(this.props.pageSettings);
        // console.log(this.state.iconRotation === 0);
        return (
            <Animated.View
                key={creditItem.uid}
                style={styles.creditListItemStyle}>
                <View style={styles.vissibleItemStyle}>
                    <View style={styles.itemColumn}>
                        <Text>{creditItem.mainCategory} -</Text>
                        <Text>{creditItem.mainCategory}</Text>
                    </View>
                    <View style={styles.itemColumn}>
                        <Text>{creditItem.amount}/{creditItem.amountRemain}</Text>
                    </View>
                    <View style={styles.itemColumn}>
                        <Text>{creditItem.paymentsAmount}/{creditItem.paymentsRemain}</Text>
                    </View>
                    <View style={styles.itemActionColumn}>
                        <TouchableOpacity
                            transparent
                            onPress={() => this.toggleItemExpand(creditItem.uid)}
                            style={styles.openBtn}>
                            <Animated.View style={{transform: [{rotateX: rotateProp}] }}>
                                <Ionicons name="ios-arrow-down" size={30} color={DARK_MODE.COLORS.ICON_COLOR} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View style={[styles.hiddenItemStyle, {height: this.state.itemHeight, padding: this.state.itemPadding}]}>
                    <Text>fsd</Text>
                </Animated.View>
            </Animated.View>
        );
    }
}

class HomePage extends Component {
    static navigationOptions = {
        drawerLabel: 'Screen One',
    }

    componentDidMount() {
        this.props.fetchProfileData(this.props.identity.uid, this.props.navigation);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.profile.assets !== prevProps.profile.assets) {
            this.props.fetchProfileData(this.props.identity.uid, this.props.navigation);
        }
    }

    render() {
        const {profile, pageSettings} = this.props;
        // console.log(this.props);
        // console.log('pre', DARK_MODE);
        // const getMonthsDiffrence = (firstDate, laterDate) => {
        //     // console.log('firstDate', firstDate);
        //     // console.log('laterDate', laterDate);
        //     var date1 = new Date(firstDate);
        //     var date2 = new Date(laterDate);
        //     var diffYears = date2.getFullYear() - date1.getFullYear();
        //     var diffMonths = date2.getMonth() - date1.getMonth();
        //     var diffDays = date2.getDate() - date1.getDate();

        //     var months = (diffYears*12 + diffMonths);
        //     if (diffDays>0) {
        //         months += '.' + diffDays;
        //     } else if (diffDays < 0) {
        //         months--;
        //         months += '.' + (new Date(date2.getFullYear(),date2.getMonth(),0).getDate()+diffDays);
        //     }

        //     return Math.ceil(months);
        // };

        // var nowDt = new Date();
        // console.log('before', profile);
        // console.log(nowDt > new Date(profile.sallary.paymentDate));
        if (profile.credit.length > 0) {
            // var mapCredit = profile.credit;
            // var creditDebt = profile.creditDebt;
            // console.log('creditCardDebtDt', creditCardDebtDt);
            // var cardToHandle = profile.creditCards[0].id;
            // var creditCardDebtDt = profile.creditCards[0].nextDebtDate;
            // var totalCreditDebt = 0;

            // for (var item in creditDebt) {
            //     console.log('item  ', creditDebt[item]);
            //     if (cardToHandle === creditDebt[item].creditCardId && new Date(creditDebt[item].lastUpdated) < new Date(creditCardDebtDt)) {
            //         var monthsAmount = getMonthsDiffrence(creditDebt[item].lastUpdated, nowDt.toISOString());
            //         var creditItem = creditDebt[item];
            //         totalCreditDebt += (creditDebt[item].paymentsRemain >= monthsAmount ? (monthsAmount * mapCredit[item].monthlyPayment) : (mapCredit[item].paymentsRemain * mapCredit[item].monthlyPayment));
            //         profile.assets -= totalCreditDebt;
            //         console.log('paymentsRemain ', creditDebt[item].paymentsRemain);
            //         console.log('monthsAmount ', monthsAmount);
            //         if (creditDebt[item].paymentsRemain - monthsAmount > 0) {
            //             let dt = new Date();
            //             creditDebt[item].paymentsRemain = creditItem.paymentsRemain - monthsAmount;
            //             creditDebt[item].amountRemain = creditItem.amountRemain - (creditItem.monthlyPayment * monthsAmount);
            //             creditDebt[item].lastUpdated = dt.toISOString();
            //         } else {
            //             delete creditDebt[item];
            //         }
            //     }
            // }
            // console.log('totalCreditDebt', totalCreditDebt);
            // var dt = new Date(creditCardDebtDt);
            // dt.setMonth(dt.getMonth() + 1);
            // profile.creditCards[0].nextDebtDate = dt;
          }
        // console.log('profile ', profile);
        const creditListHeader = () => {
            return (
                <View style={styles.creditListHeaderStyle}>
                    <View style={styles.itemColumn}>
                        <Text style={DARK_MODE.h4Label}>Type</Text>
                    </View>
                    <View style={styles.itemColumn}>
                        <Text style={DARK_MODE.h4Label}>Amount</Text>
                    </View>
                    <View style={styles.itemColumn}>
                        <Text style={DARK_MODE.h4Label}>Payments</Text>
                    </View>
                </View>
            );
        };

        var creditLimit = 0;
        profile.creditCardList.forEach(card => {
            creditLimit = creditLimit + card.creditLimit;
        });
        console.log(Math.round(profile.totalCredit/creditLimit * 100));
        console.log(profile);
        var secondaryColor = '#048822'
        var firstColor = '#08a52b';
        // if (Math.round(profile.totalCredit/creditLimit) > 0.85) {
            // secondaryColor = '#e21f00';
        // } else if (Math.round(profile.totalCredit/creditLimit) > 0.6) {
            secondaryColor = '#fdcf27';
            firstColor = '#529a2d'
        // }

        const upperComponent = () => {
            return (
                <View style={[DARK_MODE.appContainer, {padding: -20}]}>
                    <View style={styles.upperContainer}>
                        <View style={styles.h1rowContainer}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={DARK_MODE.h2}>{profile.assets.toFixed(2)}</Text>
                                <FontAwesome style={{marginLeft: 15}} name="dollar" size={20} color={DARK_MODE.COLORS.ICON_COLOR} />
                            </View>
                            <Divider style={{ backgroundColor: '#cbe3fb', width: 164, margin: 4 }} />
                            <Text style={DARK_MODE.h3}>{'Current Balance'}</Text>
                        </View>
                        <View style={styles.h2rowContainer}>
                            <View style={styles.h2RowItem}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={DARK_MODE.h2}>{profile.currentMonthCredit.toFixed(2)}</Text>
                                    <FontAwesome style={{marginLeft: 15}} name="dollar" size={20} color={DARK_MODE.COLORS.ICON_COLOR} />
                                </View>
                                <Divider style={{ backgroundColor: '#cbe3fb', width: 164, margin: 4 }} />
                                <Text style={DARK_MODE.h3}>{'Current Month Debt'}</Text>
                            </View>
                            <View style={styles.h2RowItem}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={DARK_MODE.h2}>{profile.totalCredit.toFixed(2)}</Text>
                                    <FontAwesome style={{marginLeft: 15}} name="dollar" size={20} color={DARK_MODE.COLORS.ICON_COLOR} />
                                </View>
                                <Divider style={{ backgroundColor: '#cbe3fb', width: 164,margin: 4 }} />
                                <Text style={DARK_MODE.h3}>Total Debt</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.creditListStyle}>
                    <Text style={[DARK_MODE.h2, DARK_MODE.title]}>Credit Status</Text>
                        <View style={styles.creditProgressContainer}>
                            <AnimatedCircularProgress
                                size={200}
                                width={18}
                                backgroundWidth={30}
                                fill={60}
                                // fill={Math.round(profile.totalCredit/creditLimit * 100)}
                                dashedTint={{ width: 20 }}
                                dashedBackground={{ width: 10 }}
                                // lineCap={'square'}
                                arcSweepAngle={180}
                                prefill={0}
                                duration={2000}
                                rotation={270}
                                tintTransparency={0.7}
                                tintColorSecondary={secondaryColor}
                                // tintColor={'#08a52b'}
                                tintColor={firstColor}
                                // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
                                backgroundColor="#3d5875">
                                {
                                    (fill) => (
                                    <Text>
                                        { creditLimit }
                                    </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                    {profile.credit.length > 0 && creditListHeader()}
                </View>
            );
        };

        return (
            <View nestedScrollEnabled={true} style={{flex: 1, height: '100%'}}>
                <View style={[DARK_MODE.appContainer]}>
                    <View style={{padding: 20, paddingBottom: 30}}>
                        <FlatList
                            data={profile.credit}
                            ListHeaderComponent={upperComponent()}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item.uid}
                            ListEmptyComponent={() => <Text style={[DARK_MODE.title, {fontSize: 15, color: '#6087b1'}]}>No Monthly Credit</Text>}
                            renderItem={({item}) => (
                                <CreditItem
                                    key={item.uid}
                                    pageSettings={profile.pageSettings}
                                    openCredit={this.props.openCredit}
                                    // openTransaction={openTransaction}
                                    // identity={identity}
                                    // deleteTransaction={deleteTransaction}
                                    creditItem={item}
                                />
                            )}
                            />
                    </View>
                </View>
                <Fab />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    creditListStyle: {
        padding: 15,
        // borderWidth: 2,
    },
    creditProgressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 150,
        padding: 15,
    },
    upperContainer: {
        // borderWidth: 1,
        // borderColor: '#fbf2d4',
        // shadowColor: '#fff',
        // shadowOffset: { width: 10, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        // elevation: 12,
        height: 180,
        marginBottom: 8,
    },
    creditListHeaderStyle: {
        flexDirection: 'row',
        padding: 5,
    },
    creditListItemStyle: {
        padding: 5,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    vissibleItemStyle: {
        flexDirection: 'row',
    },
    hiddenItemStyle: {
        overflow: 'hidden',
    },
    itemColumn: {
        width: '30%',
        flexDirection: 'column',
    },
    itemActionColumn: {
        width: '10%',
        flexDirection: 'column',
    },
    hiddenDisplayedItemStyle: {},
    h1rowContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4,
        paddingTop: 16,
        height: 90,
        borderColor: '#fbf2d4',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
    },
    h2rowContainer: {
        marginTop: 4,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
    },
    h2RowItem: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 6,
        // width: '50%',
        borderColor: '#fbf2d4',
        // shadowColor: '#cbd7f7',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
        elevation: 4,
    },
  });

const mapStateToProps = state => {
    return {
        profile: state.profile,
        identity: state.identity,
        newTransaction: state.newTransactionModal,
     };
};

export default connect(mapStateToProps, actions)(HomePage);
