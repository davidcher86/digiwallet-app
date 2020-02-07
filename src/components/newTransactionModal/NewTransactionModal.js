/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
} from 'react-native';
import {Button, Input, Icon, Overlay} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';

import * as actions from './newTransactionModalActions';
import { DARK_MODE } from './../Styles';

class NewTransactionModal extends Component {
  toggleNewTransModal = () => {
    return console.log('sdfsdfssdfsdf');
  };

  componentDidUpdate(prevProp) {
    if (this.props.profile.creditCardList.length > 0 && this.props.profile.creditCardList.length === prevProp.profile.creditCardList.length && this.props.newTransaction.selectedCreditCard === null) {
      this.props.changeSelectedCeridetCard(this.props.profile.creditCardList[0]);
    }
  }

  componentWillUnmount() {
    this.props.changePageSettings('activeTab', 'amount');
  }

  render() {
    const {isModalOpen, categoryList, subCategory} = this.props.newTransaction;
    const {
      newTransaction,
      paymentDetails,
      changePaymentDetailsFieldValue,
      handleAddNewTransactionAccount,
      toggleNewTransactionModal,
      changeFieldValue,
      changePageSettings,
      closeNewTransactionModal,
      identity,
      profile,
      onFabPress,
      pageSettings,
    } = this.props;

    const renderMainCategories = () => {
      var mainCategories = [];

      for (let category in categoryList) {
        mainCategories.push(<Picker.Item key={category} label={category} value={category} />);
      }

      return mainCategories;
    };

    const renderSubCategories = () => {
      var subCategories = [];
      let mainCategory = newTransaction.mainCategory;

      if (mainCategory !== null && mainCategory !== '') {
        newTransaction.categoryList[mainCategory].forEach(category => {
          subCategories.push(<Picker.Item key={category} label={category} value={category} />);
        });
      }

      return subCategories;
    };
    var date = new Date();
    var maxDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const creditCardList = profile.creditCards;

    if (creditCardList !== undefined && creditCardList.length > 0 && newTransaction.selectedCreditCard !== null) {
      newTransaction.creditCardId = newTransaction.selectedCreditCard.id;
    }

    const transTypeRow = () => {
      return (
        <View>
            <View style={styles.inputContainer}>
              <Text style={styles.pickerLabel}>Transaction Type</Text>
              <Picker
              on
                selectedValue={newTransaction.transactionType}
                // onBlur={changePageSettings('activeTab', 'amount')}
                onValueChange={itemValue => {
                  changeFieldValue('transactionType', itemValue);
                  changePageSettings('activeTab', 'amount');
                }}
                style={styles.pickerInput}>
                <Picker.Item label="Expense" value="expense" />
                <Picker.Item label="Income" value="income" />
              </Picker>
            </View>
        </View>
      );
    };

    const dateRow = () => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.pickerLabel}>Date</Text>
          <DatePicker
            style={styles.pickerInput}
            date={newTransaction.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD H:mm"
            minDate="1916-05-01"
            maxDate={maxDate}
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
            onDateChange={itemValue => changeFieldValue('date', itemValue)}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
          />
        </View>
      );
    };

    const descriptionRow = () => {
      return (
        <View style={styles.inputContainer}>
          <Input
            style={{width: '100%'}}
            autoCorrect={false}
            placeholder="Description"
            inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
            value={newTransaction.description}
            onChangeText={text => changeFieldValue('description', text)}
            // leftIcon={{ name: 'mail' }}
            autoCapitalize="none"
            errorStyle={{color: 'red'}}
            // errorMessage={validationErrors.firstNameError}
            placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
        </View>
      );
    };

    const amountTab = () => {
      return (
        <View>
            <View style={DARK_MODE.inputRowContainer}>
              <Input
                style={{width: '100%'}}
                autoCorrect={false}
                onBlur={() => changePageSettings('activeTab', 'category')}
                placeholder="Amount"
                keyboardType="numeric"
                inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                value={(newTransaction.amount === 0 ? '' : newTransaction.amount.toString())}
                onChangeText={text => changeFieldValue('amount', text)}
                // leftIcon={{ name: 'mail' }}
                autoCapitalize="none"
                errorStyle={{color: 'red'}}
                // errorMessage={validationErrors.firstNameError}
                // label="First Name"
                placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
            </View>
        </View>
      );
    };

    const categoryTab = () => {
      return (
        <View>
            <View style={styles.inputContainer}>
              <Text style={styles.pickerLabel}>Main Category</Text>
              <Picker
                selectedValue={newTransaction.mainCategory}
                onValueChange={itemValue => {
                  changeFieldValue('mainCategory', itemValue);
                  changePageSettings('activeTab', 'subCategory');
                }}
                style={styles.pickerInput}>
                  {renderMainCategories()}
              </Picker>
            </View>
        </View>
      );
    };

    const subCategoryTab = () => {
      return (
        <View>
            <View style={styles.inputContainer}>
              <Text style={styles.pickerLabel}>Sub Category</Text>
              <Picker
                selectedValue={newTransaction.subCategory}
                style={styles.pickerInput}
                onValueChange={itemValue => {
                  changeFieldValue('subCategory', itemValue);
                  changePageSettings('activeTab', 'paymentType');
                }}>
                  <Picker.Item label="" value="" />
                  {renderSubCategories()}
              </Picker>
            </View>
        </View>
      );
    };

    const paymentTypeTab = () => {
      return (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.pickerLabel}>Payment Type</Text>
            <Picker
              selectedValue={newTransaction.paymentType}
              style={styles.pickerInput}
              onValueChange={itemValue =>
                changeFieldValue('paymentType', itemValue)
              }>
              <Picker.Item label="Cash" value="cash" />
              <Picker.Item label="Credit" value="credit" />
            </Picker>
          </View>
        </View>
      );
    };

    const creditPaymentDetailsTab = () => {
      return (
        <View style={[styles.inputContainer, {flexDirection: 'column'}]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.pickerLabel, {alignSelf: 'center'}]}>Choose Card</Text>
            <Picker
              selectedValue={creditCardList}
              onValueChange={(itemValue, itemIndex) => changeFieldValue('selectedCreditCard', itemValue)}
              style={{width: '50%'}} >
                {creditCardList.map(item => <Picker.Item key={item.id} label={item.name} value={item.id} />)}
            </Picker>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {/* <Text style={{width: '50%', paddingLeft: 8}}>Card Type</Text> */}
            <Text style={[styles.pickerLabel, {width: '50%'}]}>Number of Payments</Text>
            <View style={{width: '50%'}}>
              <TextInput
                placeholder="#"
                keyboardType="numeric"
                value={newTransaction.paymentAmount}
                onChangeText={text => changeFieldValue('paymentAmount', text)}
                // leftIcon={{ name: 'maijl' }}
                // errorMessage={validationErrors.lastNameError}
                // label="Number of Payments"
                errorStyle={{color: 'red'}} />
            </View>
          </View>
        </View>
      );
    };

    const buttonsTab = () => {
      return (
        <View>
          <View style={styles.bottomBtnContainer}>
            <Button
              title="ADD"
              buttonStyle={styles.bottomBtn}
              onPress={() => handleAddNewTransactionAccount(newTransaction, identity.uid)}
              type="outline" />
            <Button
              title="CANCEL"
              buttonStyle={styles.bottomBtn}
              onPress={() => {
                closeNewTransactionModal();
                changePageSettings('activeTab', 'transType');
              }}
              type="outline" />
          </View>
        </View>
      );
    };
    console.log(this.props);
    return (
      <Overlay
        isVisible={isModalOpen}
        windowBackgroundColor="rgba(255, 255, 255, 0.5)"
        // overlayBackgroundColor="red"
        overlayStyle={styles.containerStyle}
        width={350}
        height="auto" >
              {transTypeRow()}
              {dateRow()}
              <View style={styles.inputContainer}>
                <Text style={styles.pickerLabel}>Amount</Text>
                <Text style={styles.pickerInput}>
                  {newTransaction.amount}
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.pickerLabel}>Category</Text>
                {/* <Text style={styles.pickerInput}>
                  {newTransaction.mainCategory} - {newTransaction.subCategory}
                </Text> */}
              </View>

              {newTransaction.paymentType === 'credit' && (
                <View style={{flexDirection: 'column'}}>
                  <Text style={{width: '100%'}}>'Payment Details'</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{width: '25%'}}>{'Credit Card:'}</Text>
                    <Text style={{width: '20%', marginLeft: 5}}>{newTransaction.selectedCreditCard.name}</Text>
                    <Text style={{width: '25%'}}>{'# payments:'}</Text>
                    <Text style={{width: '20%', marginLeft: 5}}>{newTransaction.paymentsAmount}</Text>
                  </View>
                </View>
              )}

              {descriptionRow()}
              <View style={styles.tabWrapper}>
                  {pageSettings.activeTab === 'amount' && amountTab()}
                  {pageSettings.activeTab === 'category' && categoryTab()}
                  {/* {pageSettings.activeTab === 'subCategory' && subCategoryTab()}
                  {pageSettings.activeTab === 'paymentType' && paymentTypeTab()}
                  {pageSettings.activeTab === 'creditPaymentDetails' && creditPaymentDetailsTab()}
                  {pageSettings.activeTab === 'final' && buttonsTab()} */}
              </View>
              <View style={styles.bottomBtnContainer}>
                  <Button
                    title="ADD"
                    buttonStyle={styles.bottomBtn}
                    onPress={() => handleAddNewTransactionAccount(newTransaction, identity.uid)}
                    type="outline" />
                  <Button
                    title="CANCEL"
                    buttonStyle={styles.bottomBtn}
                    onPress={() => closeNewTransactionModal()}
                    type="outline" />
              </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    position: 'absolute',
    // width: '100%',
    // height: '100%',
    backgroundColor: DARK_MODE.COLORS.BACKGROUND_COLOR,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // zIndex: 40,
  },
  tabWrapper: {
    height: 120,
  },
  buttonContainerStyle: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  modalInnerContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    // height: '95%',
    marginRight: 30,
    marginLeft: 30,
    // backgroundColor: '#ede3f2',
    backgroundColor: '#aff0ffcc',
    borderRadius: 15,
    // borderWidth: 0.5,
    marginTop: 35,
    marginBottom: 75,
    opacity: 0.9,
    padding: 8,
  },
  inputContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 4,
    // borderRadius: 10,
    backgroundColor: DARK_MODE.COLORS.BACKGROUND_COLOR,
    marginBottom: 7,
  },
  bottomBtnContainer: {
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // height: 30,
  },
  bottomBtn: {
    marginTop: 6,
    marginBottom: 11,
  },
  inputStyle: {
    // borderWidth: 2,
  },
  pickerInput: {
    // height: 50,
    width: '50%',
  },
  pickerLabel: {
    // fontStyle: 'bold',
    borderWidth: 2,
    paddingLeft: 6,
    // justifyContent: 'center',
    width: '50%',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: 'green',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 15,
    padding: 8,
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    newTransaction: state.newTransactionModal,
    systemControl: state.systemControl,
    identity: state.identity,
    profile: state.profile,
    pageSettings: state.newTransactionModal.pageSettings,
    paymentDetails: state.newTransactionModal.paymentDetails,
    creditCardList: state.profile.creditCardList,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(NewTransactionModal);
