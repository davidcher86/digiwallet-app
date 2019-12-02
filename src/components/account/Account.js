/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Picker, Item, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import DatePicker from 'react-native-datepicker';
// import Picker from '@react-native-community/picker';

import * as actions from './accountActions';

class Account extends Component {
  render() {
    const {
      user,
      pageSettings,
      account,
      validationErrors,
      creditCard,
      sallary,
    } = this.props;
    const {
      changeTab,
      handleStep,
      changeUserFieldValue,
      changeSallaryFieldValue,
      handleRegisterAccount,
      handlePickerChange,
      changeAccountFieldValue,
      changeCreditFieldValue,
    } = this.props;

    const renderDays = () => {
      var arr = [];
      for (var i = 1; i <= 31; i++) {
        arr.push(<Picker.Item label={i.toString()} value={i} />);
      }
      return arr;
    };

    const onNextStep = next => {
      handleStep(next);
    };

    return (
      <View style={styles.containerStyle}>
        <ProgressSteps activeStep={pageSettings.step}>
          <ProgressStep
            previousBtnDisabled={true}
            onNext={() => onNextStep(2)}
            label="First Step">
            <View style={{alignItems: 'center'}}>
              <Text>Personal Data</Text>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                value={user.firstName}
                onChangeText={text => changeUserFieldValue('firstName', text)}
                // leftIcon={{ name: 'mail' }}
                autoCapitalize="none"
                errorStyle={{color: 'red'}}
                errorMessage={validationErrors.firstNameError}
                placeholderTextColor="rgba(225,225,225,0.7)"
                label="First Name"
              />
              <Input
                placeholder="123456"
                style={styles.inputStyle}
                value={user.lastName}
                onChangeText={text => changeUserFieldValue('lastName', text)}
                // leftIcon={{ name: 'maijl' }}
                errorStyle={{color: 'red'}}
                errorMessage={validationErrors.lastNameError}
                label="Last Name"
              />
              <Picker
                selectedValue={user.gender}
                style={{height: 50, width: 100}}
                onValueChange={itemValue => changeUserFieldValue(itemValue)}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
              <DatePicker
                style={{width: 200}}
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
                cancelBtnText="Cancel"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            onNext={() => onNextStep(3)}
            onPrevious={() => onNextStep(1)}
            label="Second Step">
            <View style={{alignItems: 'center'}}>
              <Text>Credit Card Details</Text>
              <Text>Card Type</Text>
              <Picker
                selectedValue={creditCard.cardType}
                style={{height: 50, width: 100}}
                onValueChange={itemValue => changeCreditFieldValue('cardType', itemValue)}>
                <Picker.Item label="Visa" value="visa" />
                <Picker.Item label="Mastercard" value="mastercard" />
              </Picker>
              <Text>Billing Date</Text>
              <Picker
                selectedValue={creditCard.billingDate}
                style={{height: 50, width: 100}}
                onValueChange={itemValue =>
                  changeCreditFieldValue('billingDate', itemValue)
                }>
                {renderDays()}
              </Picker>
            </View>
          </ProgressStep>
          <ProgressStep
            onPrevious={() => onNextStep(2)}
            nextBtnDisabled={true}
            label="Third Step">
            <View style={{alignItems: 'center'}}>
              <Text>Sallary Details</Text>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                value={account.assets.toString()}
                // onChangeText={text => this.props.changeUsername(text)}
                onChangeText={text => changeAccountFieldValue('assets', Number(text))}
                leftIcon={{name: 'mail'}}
                autoCapitalize="none"
                errorStyle={{color: 'red'}}
                errorMessage={this.props.validationErrors.firstNameError}
                placeholderTextColor="rgba(225,225,225,0.7)"
                label="Initial Amount"
              />
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                value={sallary.amount.toString()}
                // onChangeText={text => this.props.changeUsername(text)}
                onChangeText={text => changeSallaryFieldValue('amount', Number(text))}
                leftIcon={{name: 'mail'}}
                autoCapitalize="none"
                errorStyle={{color: 'red'}}
                errorMessage={this.props.validationErrors.firstNameError}
                placeholderTextColor="rgba(225,225,225,0.7)"
                label="Sallary Amount"
              />
              <Text>Sallary pay Day</Text>
              <Picker
                selectedValue={sallary.paymentDate}
                style={{height: 50, width: 100}}
                onValueChange={itemValue =>
                  changeSallaryFieldValue('paymentDate', itemValue)
                }>
                {renderDays()}
              </Picker>
              <TouchableOpacity
                onPress={() => handleRegisterAccount(this.props.account)}
                style={styles.buttonContainer}>
                <Text style={styles.buttonStyle}>ADD</Text>
              </TouchableOpacity>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
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
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    account: state.account,
    creditCard: state.account.creditCard,
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
