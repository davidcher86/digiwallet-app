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
import {Button, Input, Icon, Overlay, Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      resetNewTransactionForm,
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
              <Text style={[styles.pickerLabel, DARK_MODE.h3Label]}>Transaction Type</Text>
              <Picker
                selectedValue={newTransaction.transactionType}
                // onBlur={changePageSettings('activeTab', 'amount')}
                onValueChange={itemValue => {
                  changeFieldValue('transactionType', itemValue);
                  changePageSettings('activeTab', 'amount');
                }}   
                style={[styles.pickerInput, {color:  DARK_MODE.COLORS.LABEL_COLOR}]}>
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
          <Text style={[styles.pickerLabel, DARK_MODE.h3Label]}>Date</Text>
          <DatePicker
            style={[styles.pickerInput, {color: DARK_MODE.COLORS.LABEL_COLOR}]}
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
            inputStyle={{color: DARK_MODE.h3Label}}
            value={newTransaction.description}
            onChangeText={text => changeFieldValue('description', text)}
            // leftIcon={{ name: 'mail' }}
            autoCapitalize="none"
            errorStyle={{color: 'red'}}
            // errorMessage={validationErrors.firstNameError}
            placeholderTextColor={{color: DARK_MODE.COLORS.PLACE_HOLDER_COLOR}} />
        </View>
      );
    };

    const amountTab = () => {
      return (
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
            placeholderTextColor={{color: DARK_MODE.COLORS.PLACE_HOLDER_COLOR}}/>
        </View>
      );
    };

    const categoryTab = () => {
      return (
        <View style={DARK_MODE.inputRowContainer}>
          <Text style={[DARK_MODE.h3, {width: '50%'}]}>Main Category</Text>
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
      );
    };

    const subCategoryTab = () => {
      return (
        <View style={DARK_MODE.inputRowContainer}>
          <Text style={DARK_MODE.h3}>Sub Category</Text>
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
      );
    };

    const paymentTypeTab = () => {
      return (
        <View style={DARK_MODE.inputRowContainer}>
          <Text style={DARK_MODE.h3}>Payment Type</Text>
          <Picker
            selectedValue={newTransaction.paymentType}
            style={styles.pickerInput}
            onValueChange={itemValue => {
              changeFieldValue('paymentType', itemValue);
              changePageSettings('activeTab', 'creditPaymentDetails');
            }}>
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Credit" value="credit" />
          </Picker>
        </View>
      );
    };

    const creditPaymentDetailsTab = () => {
      return (
        <View style={[DARK_MODE.inputRowContainer, {flexDirection: 'column'}]}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {/* <Text style={{width: '50%', paddingLeft: 8}}>Card Type</Text> */}
            <Text style={[DARK_MODE.h3, {width: '70%'}]}>Number of Payments</Text>
            <View style={{width: '20%'}}>
              <Input
                style={{width: '100%'}}
                autoCorrect={false}
                onBlur={() => changePageSettings('activeTab', 'final')}
                placeholder="#"
                keyboardType="numeric"
                inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
                defaultValue={newTransaction.paymentsAmount.toString()}
                value={newTransaction.paymentsAmount.toString()}
                onChangeText={text => changeFieldValue('paymentsAmount', text)}
                // leftIcon={{ name: 'mail' }}
                autoCapitalize="none"
                errorStyle={{color: 'red'}}
                // errorMessage={validationErrors.firstNameError}
                // label="First Name"
                placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
              {/* <TextInput
                placeholder="#"
                onBlur={() => changePageSettings('activeTab', 'final')}
                keyboardType="numeric"
                value={newTransaction.paymentsAmount}
                onChangeText={text => changeFieldValue('paymentsAmount', text)}
                // leftIcon={{ name: 'maijl' }}
                // errorMessage={validationErrors.lastNameError}
                // label="Number of Payments"
                errorStyle={{color: 'red'}} /> */}
            </View>
          </View>
        </View>
      );
    };

    const buttonsTab = () => {
      return (
        <View style={DARK_MODE.inputRowContainer}>
          <Button
            title={<MaterialIcons name="done" size={25} color="#4F8EF7" />}
            buttonStyle={styles.bottomBtn}
            onPress={() => handleAddNewTransactionAccount(newTransaction, identity.uid)}
            type="outline" />
          {/* <Button
            title="CANCEL"
            buttonStyle={styles.bottomBtn}
            onPress={() => {
              closeNewTransactionModal();
              resetNewTransactionForm();
              changePageSettings('activeTab', 'transType');
            }}
            type="outline" /> */}
        </View>
      );
    };
    // console.log(this.props);
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
              <TouchableOpacity style={styles.inputContainer} onPress={() => changePageSettings('activeTab', 'amount')}>
                <Text style={[styles.pickerLabel, DARK_MODE.h3Label]}>Amount</Text>
                <Text style={[styles.pickerInput, {color: DARK_MODE.COLORS.LABEL_COLOR}]}>
                  {newTransaction.amount}
                </Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TouchableOpacity 
                  style={styles.pickerLabel} 
                  onPress={() => changePageSettings('activeTab', 'category')}>
                    <Text style={DARK_MODE.h3Label}>Category</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.pickerLabel} 
                  onPress={() => changePageSettings('activeTab', 'category')}>
                  <Text style={{color: DARK_MODE.COLORS.LABEL_COLOR}}>{newTransaction.mainCategory + ' - '}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.pickerLabel} 
                  onPress={() => changePageSettings('activeTab', 'subCategory')}>
                  <Text style={{color: DARK_MODE.COLORS.LABEL_COLOR}}>{newTransaction.subCategory}</Text>
                </TouchableOpacity>
              </View>

              {newTransaction.paymentType === 'credit' && (
                <View style={{flexDirection: 'column', backgroundColor: '#1c3c61'}}>
                  <TouchableOpacity style={[ DARK_MODE.h3Label, {width: '100%', paddingLeft: 6}]} onPress={() => changePageSettings('activeTab', 'paymentType')}>
                    <Text>{'Payment Details - ' + newTransaction.paymentType}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection: 'row', padding: 6}} onPress={() => changePageSettings('activeTab', 'creditPaymentDetails')}>
                    <Text style={[DARK_MODE.h4Label, {width: '28%'}]}>{'Credit Card:'}</Text>
                    <Text style={{width: '15%', marginLeft: 5}}>{newTransaction.selectedCreditCard.name}</Text>
                    <Text style={[DARK_MODE.h4Label, {width: '28%'}]}>{'# payments:'}</Text>
                    <Text style={{width: '15%', marginLeft: 5}}>{newTransaction.paymentsAmount}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {descriptionRow()}
              {/* <Divider style={{ backgroundColor: '#cbe3fb', width: '100%',margin: 4 }} /> */}
              <View style={styles.tabWrapper}>
                  {pageSettings.activeTab === 'amount' && amountTab()}
                  {pageSettings.activeTab === 'category' && categoryTab()}
                  {pageSettings.activeTab === 'subCategory' && subCategoryTab()}
                  {pageSettings.activeTab === 'paymentType' && paymentTypeTab()}
                  {pageSettings.activeTab === 'creditPaymentDetails' && creditPaymentDetailsTab()}
                  {pageSettings.activeTab === 'final' && buttonsTab()}
              </View>
              <View style={styles.bottomBtnContainer}>
                  {/* <Button
                    title="ADD"
                    buttonStyle={styles.bottomBtn}
                    onPress={() => handleAddNewTransactionAccount(newTransaction, identity.uid)}
                    type="outline" /> */}
                  <Button
                    title="CANCEL"
                    buttonStyle={styles.bottomBtn}
                    onPress={() => {
                      closeNewTransactionModal();
                      resetNewTransactionForm();
                    }}
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
    borderRadius: 5,
    // zIndex: 40,
  },
  tabWrapper: {
    height: 150,
    // borderWidth: 2,
    borderColor: '#fbf2d4',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
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
    marginTop: 3,
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
    // borderWidth: 2,
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
