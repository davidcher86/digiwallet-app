/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Picker, Item, StyleSheet, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import DatePicker from 'react-native-datepicker';
// import Picker from '@react-native-community/picker';

import * as actions from './accountActions';
import Header from './../common/Header';
import Fab from './../common/Fab';

class Account extends Component {
  getRememberedUser = async () => {
      try {
          const uid = await AsyncStorage.getItem('digiwalletUserUID');
          // console.log(uid);
          this.props.changeUserFieldValue('uid', uid);
          return uid;
      } catch (error) {
          console.log(error);
          // Error retrieving data
      }
  };

  componentDidMount() {
      // this.getRememberedUser();
      if (this.props.navigation.state.params.type === 'edit'
          && this.props.identity.uid !== undefined
          && this.props.identity.uid !== null) {
            // console.log(this.props);
            this.props.fetchAccount(this.props.identity.uid);
            // console.log(this.props);
      }
      // getRememberedUser()
      //   .then(res => {
      //     if (res !== null) {
      //       this.props.setIdentity(res);
      //       this.props.navigation.navigate('PrimaryNav');
      //     }
      //   });
  }


  render() {
    const {
      user,
      pageSettings,
      account,
      validationErrors,
      type,
      creditCards,
      sallary,
    } = this.props;

    const {
      changeTab,
      handleStep,
      changeUserFieldValue,
      changeSallaryFieldValue,
      handleRegisterAccount,
      handlePickerChange,
      handleUpdaeAccount,
      changeAccountFieldValue,
      changeCreditFieldValue,
    } = this.props;

    const renderDays = () => {
      var arr = [];
      for (var i = 1; i <= 31; i++) {
        arr.push(<Picker.Item key={i} label={i.toString()} value={i} />);
      }
      return arr;
    };

    const onNextStep = next => {
      handleStep(next);
    };
    console.log('props:', user);
    return (
      <KeyboardAvoidingView style={styles.containerStyle}>
        {this.props.navigation.state.params.type === 'edit' && <Header navigation={this.props.navigation} title="Account" />}
        <ScrollView style={styles.scrollerWrapper}>
          <View style={styles.wrapper}>
            <ProgressSteps previousBtnStyle={{color: '#007aff', fontSize: 18}} nextBtnTextStyle={{color: '#007aff', fontSize: 18}} style={styles.progressbar}>
              <ProgressStep
                nextBtnTextStyle={{color: '#ccfbf0', fontSize: 18}}
                previousBtnTextStyle={{color: '#ccfbf0', fontSize: 18}}
                previousBtnDisabled={true}
                onNext={() => onNextStep(2)}
                style={styles.innerTabContainer}
                label="First Step">
                <View style={styles.innerTabWrapper}>
                  <View style={styles.inputRowContainer}>
                    <Text>Personal Data</Text>
                  </View>
                  <View style={styles.inputRowContainer}>
                    <Input
                      style={styles.inputStyle}
                      autoCorrect={false}
                      placeholder="First Name"
                      value={user.firstName}
                      onChangeText={text => changeUserFieldValue('firstName', text)}
                      // leftIcon={{ name: 'mail' }}
                      autoCapitalize="none"
                      errorStyle={{color: 'red'}}
                      errorMessage={validationErrors.firstNameError}
                      // label="First Name"
                      placeholderTextColor="rgba(225,225,225,0.7)"/>
                  </View>
                  <View style={styles.inputRowContainer}>
                    <Input
                      placeholder="Last Name"
                      style={styles.inputStyle}
                      value={user.lastName}
                      onChangeText={text => changeUserFieldValue('lastName', text)}
                      // leftIcon={{ name: 'maijl' }}
                      errorStyle={{color: 'red'}}
                      // label="Last Name"
                      errorMessage={validationErrors.lastNameError}/>
                  </View>
                  <View style={{padding: 8, paddingLeft: 28, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{width: '50%'}}>Gender</Text>
                    <Picker
                      selectedValue={user.gender}
                      style={{height: 50, width: '50%'}}
                      onValueChange={itemValue => changeUserFieldValue(itemValue)}>
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                    </Picker>
                  </View>
                  <View style={{padding: 8, paddingRight: 18, paddingLeft: 28, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '50%'}}>Date of Birth</Text>
                    <DatePicker
                      style={{width: '50%'}}
                      date={user.birthDate}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="1916-05-01"
                      maxDate="2019-06-01"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                      onDateChange={itemValue =>
                        changeUserFieldValue('birthDate', itemValue)
                      }
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"/>
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                nextBtnTextStyle={{color: '#ccfbf0', fontSize: 18}}
                previousBtnTextStyle={{color: '#ccfbf0', fontSize: 18}}
                onNext={() => onNextStep(3)}
                onPrevious={() => onNextStep(1)}
                style={styles.innerTabContainer}
                label="Second Step">
                <View style={styles.innerTabWrapper}>
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.inputRowContainer}>
                      <Text>Credit Card Details</Text>
                    </View>
                    <View style={[styles.inputRowContainer,{flexDirection: 'row', alignItems: 'center'}]}>
                      <Text style={{width: '50%'}}>Card Type</Text>
                      <Picker
                        selectedValue={creditCards[0].cardType}
                        style={{height: 50, width: '50%'}}
                        onValueChange={itemValue => changeCreditFieldValue('cardType', itemValue, 0)}>
                        <Picker.Item label="Visa" value="visa" />
                        <Picker.Item label="Mastercard" value="mastercard" />
                      </Picker>
                    </View>
                    <View style={[styles.inputRowContainer,{flexDirection: 'row', alignItems: 'center'}]}>
                      <Text style={{width: '50%'}}>Billing Date</Text>
                      <Picker
                        selectedValue={creditCards[0].billingDate}
                        style={{height: 50, width: '50%'}}
                        onValueChange={itemValue =>
                          changeCreditFieldValue('billingDate', itemValue, 0)
                        }>
                        {renderDays()}
                      </Picker>
                    </View>
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                nextBtnTextStyle={{color: '#ccfbf0', fontSize: 18}}
                previousBtnTextStyle={{color: '#ccfbf0', fontSize: 18}}
                onPrevious={() => onNextStep(2)}
                finishBtnText={this.props.navigation.state.params.type === 'new' ? 'Submit' : 'Edit'}
                onSubmit={() => {
                  if (this.props.navigation.state.params.type === 'new') {
                    handleRegisterAccount(this.props.account, this.props.identity.uid, this.props.navigation);
                  } else if (this.props.navigation.state.params.type === 'edit') {
                    handleUpdaeAccount(this.props.account, this.props.identity.uid);
                  }
                }}
                errors={false}
                label="Third Step">
                <View style={styles.innerTabWrapper}>
                  <View style={{alignItems: 'center'}}>
                    <View style={styles.inputRowContainer}>
                      <Text style={{width: '50%'}}>{'Sallary & Assets Details'}</Text>
                    </View>
                    <View style={[styles.inputRowContainer,{flexDirection: 'row', alignItems: 'center'}]}>
                      <Input
                        style={styles.inputStyle}
                        autoCorrect={false}
                        value={account.assets.toString()}
                        placeholder="Initial Amount"
                        // onChangeText={text => this.props.changeUsername(text)}
                        onChangeText={text => changeAccountFieldValue('assets', Number(text))}
                        leftIcon={{name: 'mail'}}
                        autoCapitalize="none"
                        errorStyle={{color: 'red'}}
                        errorMessage={this.props.validationErrors.firstNameError}
                        // label="Initial Amount"
                        placeholderTextColor="rgba(225,225,225,0.7)"/>
                    </View>
                    <View style={styles.inputRowContainer}>
                      <Input
                        style={styles.inputStyle}
                        autoCorrect={false}
                        value={sallary.amount.toString()}
                        placeholder="Sallary Amount"
                        // onChangeText={text => this.props.changeUsername(text)}
                        onChangeText={text => changeSallaryFieldValue('amount', Number(text))}
                        leftIcon={{name: 'mail'}}
                        autoCapitalize="none"
                        errorStyle={{color: 'red'}}
                        errorMessage={this.props.validationErrors.firstNameError}
                        // label="Sallary Amount"
                        placeholderTextColor="rgba(225,225,225,0.7)"/>
                    </View>
                    <View style={[styles.inputRowContainer,{flexDirection: 'row', alignItems: 'center'}]}>
                      <Text style={{width: '50%'}}>Sallary pay Day</Text>
                      <Picker
                        selectedValue={sallary.paymentDate}
                        style={{height: 50, width: 100}}
                        onValueChange={itemValue =>
                          changeSallaryFieldValue('paymentDate', itemValue)
                        }>
                        {renderDays()}
                      </Picker>
                    </View>
                  </View>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
        </ScrollView>
        <Fab />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  // containerStyle: {
  //   padding: 20,
  //   flexDirection: 'column',
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  containerStyle: {
    flex: 1,
    backgroundColor: '#00868b',
  },
  scrollerWrapper: {
  },
  wrapper: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  progressbar: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
  },
  innerTabContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  innerTabWrapper: {
    flexDirection: 'column',
    height: 300,
    marginBottom: 20,
    // borderWidth: 2,
  },
  inputRowContainer: {
    justifyContent: 'center',
    width: '100%',
    padding: 8,
    paddingLeft: 20,
    // borderWidth: 2,
  },
  buttonContainerStyle: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  btnNxtContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  btnPrvContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputStyle: {
    width: '100%',
    // height: 40,
    // backgroundColor: 'rgba(225,225,225,0.2)',
    // marginBottom: 10,
    // padding: 10,
    // color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    account: state.account,
    creditCards: state.account.creditCards,
    identity: state.identity,
    pageSettings: state.account.pageSettings,
    user: state.account.user,
    sallary: state.account.sallary,
    validationErrors: state.account.validationErrors,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(Account);
