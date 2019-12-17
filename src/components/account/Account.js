/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Picker, Item, StyleSheet, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import DatePicker from 'react-native-datepicker';
// import Picker from '@react-native-community/picker';

// import {rememberUser} from './../../Actions';
import Header from './../common/Header';
import * as actions from './accountActions';

class Account extends Component {
    getRememberedUser = async () => {
        try {
            const uid = await AsyncStorage.getItem('digiwalletUserUID');
            console.log(uid);
            this.props.changeUserFieldValue('uid', uid);
            return uid;
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    };

    componentDidMount() {
        this.getRememberedUser();

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
        arr.push(<Picker.Item key={i} label={i.toString()} value={i} />);
      }
      return arr;
    };

    const onNextStep = next => {
      handleStep(next);
    };
    // console.log(this.props);
    // console.log(this.props.navigation.getParam('uid'));
    // console.log(this.props.navigation.getParam('type'));

    return (
      <KeyboardAvoidingView style={styles.containerStyle}>
        <Header navigation={this.props.navigation} title="Account" />
        <ScrollView style={styles.scrollerWrapper}>
          <View style={styles.wrapper}>
            <ProgressSteps style={styles.progressbar} activeStep={pageSettings.step}>
              <ProgressStep
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
                      style={{height: 50, width: 100, width: '50%'}}
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
                    onPress={() => handleRegisterAccount(this.props.account, this.props.account.user.uid, this.props.navigation)}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonStyle}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
        </ScrollView>
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
    marginTop: 40,
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
    borderWidth: 2,
    backgroundColor: 'green',
  },
  innerTabWrapper: {
    flexDirection: 'column',
    // height: '100%',
    marginBottom: 30,
    borderWidth: 2,
  },
  inputRowContainer: {
    padding: 8,
    paddingLeft: 20,
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
