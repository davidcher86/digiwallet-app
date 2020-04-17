/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Picker, Item, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import DatePicker from 'react-native-datepicker';
// import Picker from '@react-native-community/picker';
import {Radio} from 'native-base';
import * as actions from './accountActions';
import Header from './../common/Header';
import {randomString} from './../common/Actions';
import { DARK_MODE, BACKGROUND_COLOR, LABEL_COLOR, INPUT_COLOR } from './../Styles';

const EDIT = 'EDIT';
const NEW = 'NEW';

class Account extends Component {
  constructor() {
    super();
    this.fieldValidation = this.fieldValidation.bind(this);
  }

  fieldValidation(field) {
    var {newTransaction, setErrors, user, account} = this.props;
    var errors = account.errors;

    switch (field) {
      case 'firstName':
        if (user.firstName === '') {
          errors.firstName = 'First name is mandatory';
          setErrors(errors);
          return false;
        } else if (user.firstName.length > 20) {
          errors.firstName = 'First name can\'t be more than 20 chars';
          setErrors(errors);
          return false;
        }
        delete errors.firstName;
        setErrors(errors);
        return true;
      case 'lastName':
        if (user.lastName === '') {
          errors.lastName = 'Last name is mandatory';
          setErrors(errors);
          return false;
        } else if (user.lastName.length > 20) {
          errors.lastName = 'Last name can\'t be more than 20 chars';
          setErrors(errors);
          return false;
        }
        delete errors.lastName;
        setErrors(errors);
        return true;
      case 'creditCardName':
        var cardName = account.creditCards[0].name;
        if (cardName === '') {
          errors.creditCardName = 'Credit card name is mandatory';
          setErrors(errors);
          return false;
        } else if (cardName.length > 20) {
          errors.creditCardName = 'Credit card can\'t be more than 20 chars';
          setErrors(errors);
          return false;
        }
        delete errors.creditCardName;
        setErrors(errors);
        return true;
      default:
        return true;
    }
  }

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

  // componentWillUpdate() {
  //   console.log('componentWillUpdate', this.props.navigation.getParam('type'));
  // }

  componentDidMount() {
    // AsyncStorage.clear();
    // console.log('navigation', this.props.navigation.getParam('type'));
      switch (this.props.navigation.getParam('type')) {
        case EDIT:
          if (this.props.identity.uid !== undefined && this.props.identity.uid !== null) {
            this.props.changeAccountFieldValue('formType', EDIT);
            this.props.fetchAccount(this.props.identity.uid);
          }
          break;
        case NEW:
          // this.props.changeAccountFieldValue('formType', NEW);
          if (this.props.navigation.getParam('firstName') !== undefined) {
            this.props.changeUserFieldValue('firstName', this.props.navigation.getParam('firstName'));
          }
          if (this.props.navigation.getParam('lastName') !== undefined) {
            this.props.changeUserFieldValue('lastName', this.props.navigation.getParam('lastName'));
          }
          break;
      }
      // if (this.props.navigation.state.params.type === EDIT
      //     && this.props.identity.uid !== undefined
      //     && this.props.identity.uid !== null) {
      //       this.props.fetchAccount(this.props.identity.uid);
      // }
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
      errors,
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

    const personalData = () => {
      return (
        <ProgressStep
          nextBtnTextStyle={styles.prevNextBtn}
          previousBtnTextStyle={styles.prevNextBtn}
          previousBtnDisabled={true}
          onNext={() => onNextStep(2)}
          nextBtnDisabled={Object.keys(account.errors).length > 0}
          style={styles.innerTabContainer}
          label="First Step">
          <View style={styles.innerTabWrapper}>
            <View style={DARK_MODE.inputRowContainer}>
              <Text style={DARK_MODE.h2}>Personal Data</Text>
            </View>
            <View style={DARK_MODE.inputRowContainer}>
              <Input
                style={{width: '100%'}}
                autoCorrect={false}
                placeholder="First Name"
                inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                value={user.firstName}
                onChangeText={text => {
                  changeUserFieldValue('firstName', text);
                  this.fieldValidation('firstName');
                }}
                // leftIcon={{ name: 'mail' }}
                autoCapitalize="none"
                errorStyle={{color: 'red'}}
                errorMessage={errors.firstName}
                placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
            </View>
            <View style={DARK_MODE.inputRowContainer}>
              <Input
                placeholder="Last Name"
                style={{width: '100%'}}
                inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                value={user.lastName}
                onChangeText={text => {
                  changeUserFieldValue('lastName', text);
                  this.fieldValidation('lastName');
                }}
                // leftIcon={{ name: 'maijl' }}
                errorStyle={{color: 'red'}}
                errorMessage={errors.lastName}
                placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
            </View>
            <View style={DARK_MODE.inputSelectionRowContainer}>
              <View style={{width: '46%'}}>
                <Text style={DARK_MODE.inputLabel}>Gender</Text>
              </View>
              <View style={{width: '54%', flexDirection: 'row'}}>
                <Radio
                  onPress={() => changeUserFieldValue('gender', 'male')}
                  style={{width: '14%', marginRight: 7}}
                  color="#a1c5ec"
                  selectedColor={DARK_MODE.COLORS.INPUT_TEXT_COLOR}
                  selected={user.gender === 'male'} />
                <Text style={[DARK_MODE.inputLabel, {width: '26%'}]}>Male</Text>
                <Radio
                  onPress={() => changeUserFieldValue('gender', 'female')}
                  style={{width: '14%', marginLeft: 7}}
                  color="#a1c5ec"
                  selectedColor={DARK_MODE.COLORS.INPUT_TEXT_COLOR}
                  selected={user.gender === 'female'} />
                <Text style={[DARK_MODE.inputLabel, {width: '36%'}]}>Female</Text>
              </View>
            </View>
            <View style={DARK_MODE.inputSelectionRowContainer}>
              <View style={{width: '46%'}}>
                <Text style={DARK_MODE.inputLabel}>Date of Birth</Text>
              </View>
              <DatePicker
                style={{width: '54%'}}
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
                  dateText: {
                    color: INPUT_COLOR,
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
      );
    };

    const creditCardsData = () => {
      return (
        <ProgressStep
          nextBtnTextStyle={styles.prevNextBtn}
          previousBtnTextStyle={styles.prevNextBtn}
          onNext={() => onNextStep(3)}
          onPrevious={() => onNextStep(1)}
          nextBtnDisabled={Object.keys(account.errors).length > 0}
          previousBtnDisabled={Object.keys(account.errors).length > 0}
          style={styles.innerTabContainer}
          label="Second Step">
          <View style={styles.innerTabWrapper}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.inputRowContainer}>
                <Text style={DARK_MODE.h2}>Credit Card Details</Text>
                <Input
                  placeholder="Name"
                  style={{width: '70%'}}
                  inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                  value={creditCards[0].name}
                  onChangeText={text => {
                    changeCreditFieldValue('name', text, 0);
                    this.fieldValidation('creditCardName');
                  }}
                  // leftIcon={{ name: 'maijl' }}
                  errorStyle={{color: 'red'}}
                  // label="Last Name"
                  errorMessage={errors.creditCardName}
                  placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
              </View>
              <View style={DARK_MODE.inputSelectionRowContainer}>
                <View style={{width: '50%'}}>
                  <Text style={DARK_MODE.inputLabel}>Card Type</Text>
                </View>
                <Picker
                  selectedValue={creditCards[0].cardType}
                  style={{height: 50, width: '50%', color: INPUT_COLOR}}
                  onValueChange={itemValue => changeCreditFieldValue('cardType', itemValue, 0)}>
                  <Picker.Item label="Visa" value="visa" />
                  <Picker.Item label="Mastercard" value="mastercard" />
                </Picker>
              </View>
              <View style={DARK_MODE.inputSelectionRowContainer}>
                <View style={{width: '50%'}}>
                  <Text style={DARK_MODE.inputLabel}>Billing Date</Text>
                </View>
                <Picker
                  selectedValue={creditCards[0].billingDate}
                  style={{height: 50, width: '50%', color: INPUT_COLOR}}
                  onValueChange={itemValue => changeCreditFieldValue('billingDate', itemValue, 0)}>
                  {renderDays()}
                </Picker>
              </View>
              {console.log(creditCards[0])}
              <View style={[styles.inputRowContainer,{flexDirection: 'row', alignItems: 'center'}]}>
                <Input
                  style={{width: '100%'}}
                  autoCorrect={false}
                  value={creditCards[0].creditLimit.toString()}
                  // value={'0'}
                  placeholder="Credit Limit"
                  inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                  // onChangeText={text => this.props.changeUsername(text)}
                  onChangeText={text => changeCreditFieldValue('creditLimit', Number(text), 0)}
                  leftIcon={{name: 'mail'}}
                  autoCapitalize="none"
                  errorStyle={{color: 'red'}}
                  errorMessage={errors.initialAssets}
                  // label="Initial Amount"
                  placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
              </View>
            </View>
          </View>
        </ProgressStep>
      );
    };

    const sallaryData = () => {
      return (
        <ProgressStep
          nextBtnTextStyle={styles.prevNextBtn}
          previousBtnTextStyle={styles.prevNextBtn}
          onPrevious={() => onNextStep(2)}
          finishBtnText={account.formType === NEW ? 'Submit' : 'Edit'}
          nextBtnDisabled={Object.keys(account.errors).length > 0}
          previousBtnDisabled={Object.keys(account.errors).length > 0}
          onSubmit={() => {
            if (account.formType === NEW) {
              handleRegisterAccount(this.props.account, this.props.identity.uid, this.props.navigation);
            } else if (account.formType === EDIT) {
              // console.log(this.props.account);
              handleUpdaeAccount(this.props.account, this.props.identity.uid, this.props.navigation);
            }
          }}
          errors={false}
          label="Third Step">
          <View style={styles.innerTabWrapper}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.inputRowContainer}>
                <Text style={DARK_MODE.h2}>{'Sallary & Assets Details'}</Text>
              </View>
              <View style={[styles.inputRowContainer,{flexDirection: 'row', alignItems: 'center'}]}>
                <Input
                  style={{width: '100%'}}
                  autoCorrect={false}
                  value={account.assets.toString()}
                  placeholder="Initial Amount"
                  inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                  // onChangeText={text => this.props.changeUsername(text)}
                  onChangeText={text => {
                    changeAccountFieldValue('assets', Number(text))
                  }}
                  leftIcon={{name: 'mail'}}
                  autoCapitalize="none"
                  errorStyle={{color: 'red'}}
                  errorMessage={errors.initialAssets}
                  // label="Initial Amount"
                  placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
              </View>
              <View style={styles.inputRowContainer}>
                <Input
                  style={{width: '100%'}}
                  autoCorrect={false}
                  value={sallary.amount.toString()}
                  placeholder="Sallary Amount"
                  inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                  // onChangeText={text => this.props.changeUsername(text)}
                  onChangeText={text => {
                    changeSallaryFieldValue('amount', Number(text));
                  }}
                  leftIcon={{name: 'mail'}}
                  autoCapitalize="none"
                  errorStyle={{color: 'red'}}
                  errorMessage={errors.sallaryAmount}
                  // label="Sallary Amount"
                  placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
              </View>
              <View style={DARK_MODE.inputSelectionRowContainer}>
                <View style={{width: '50%'}}>
                  <Text style={DARK_MODE.inputLabel}>Sallary pay Day</Text>
                </View>
                <Picker
                  selectedValue={sallary.paymentDate}
                  style={{height: 50, width: '50%', color: INPUT_COLOR}}
                  onValueChange={itemValue =>
                    changeSallaryFieldValue('paymentDate', itemValue)
                  }>
                  {renderDays()}
                </Picker>
              </View>
            </View>
          </View>
        </ProgressStep>
      );
    };
    // console.log(this.props.navigation.getParam('firstName'));
    // console.log(this.props.navigation.getParam('lastName'));
    return (
      <KeyboardAvoidingView style={styles.containerStyle}>
        {/* {account.formType === EDIT && <Header navigation={this.props.navigation} title="Account" />} */}
        <ScrollView style={styles.scrollerWrapper}>
          <View style={styles.wrapper}>
            <ProgressSteps
              previousBtnStyle={styles.prevNextBtn}
              disabledStepIconColor="#989898"
              progressBarColor="#808080"
              activeStepNumColor="#0070ea"
              activeStepIconColor="#a8d4ff"
              activeLabelColor="#a8d4ff"
              nextBtnTextStyle={styles.prevNextBtn}
              style={styles.progressbar}>
                {personalData()}
                {creditCardsData()}
                {sallaryData()}
            </ProgressSteps>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  prevNextBtn: {
    color: '#007aff',
    fontSize: 18,
  },
  // containerStyle: {
  //   padding: 20,
  //   flexDirection: 'column',
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  containerStyle: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    // backgroundColor: '#00868b',
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
  h2: {
    color: LABEL_COLOR,
    marginTop: 20,
    marginBottom: 20,
  },
  textLabels: {
    color: LABEL_COLOR,
  },
  inputStyle: {
    // width: '100%',
    color: INPUT_COLOR,
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
    errors: state.account.errors,
    sallary: state.account.sallary,
    validationErrors: state.account.validationErrors,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(Account);
