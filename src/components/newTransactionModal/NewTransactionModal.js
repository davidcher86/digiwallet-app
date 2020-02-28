/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
} from 'react-native';
import {Button, Input, Icon, Overlay, Divider, ButtonGroup} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as actions from './newTransactionModalActions';
import { DARK_MODE } from './../Styles';

class NewTransactionModal extends Component {
  constructor() {
    super();
    this.fieldValidation = this.fieldValidation.bind(this);
  }

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

  fieldValidation(field) {
    var {newTransaction, setErrors} = this.props;
    var errors = newTransaction.errors;
    // console.log(newTransaction);
    switch (field) {
      case 'amount':
        if (!/^\d+$/.test(newTransaction[field])) {
          errors.amount = 'Only digits allowed';
          setErrors(errors);
          return false;
        }
        delete errors.amount;
        setErrors(errors);
        return true;
      case 'paymentsAmount':
        if (!/^\d+$/.test(newTransaction[field])) {
          errors.paymentsAmount = 'Only digits allowed';
          setErrors(errors);
          return false;
        }
        delete errors.paymentsAmount;
        setErrors(errors);
        return true;
      default:
        return true;
    }
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
      const buttons = ['EXPANSE', 'INCOME'];

      return (
        <View style={styles.inputContainer}>
          <View style={DARK_MODE.buttonGroupContainer}>
            <TouchableOpacity
              style={[
                // styles.btnGroup,
                DARK_MODE.btnGroup,
                (newTransaction.transactionType === 'EXPANSE' ? DARK_MODE.btnGroupActive : {}),
                {borderTopLeftRadius: 4, borderBottomLeftRadius: 4}
              ]}
              onPress={() => changeFieldValue('transactionType', 'EXPANSE')}>
                <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: (newTransaction.transactionType === 'EXPANSE' ? '#006bb7' : '#a1c5ec'),
                        fontWeight: '600'}}>
                          EXPANSE
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                // styles.btnGroup,
                DARK_MODE.btnGroup,
                (newTransaction.transactionType === 'INCOME' ? DARK_MODE.btnGroupActive : {}),
                {borderTopRightRadius: 4, borderBottomRightRadius: 4}
              ]}
              onPress={() => changeFieldValue('transactionType', 'INCOME')}>
                <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: (newTransaction.transactionType === 'INCOME' ? '#006bb7' : '#a1c5ec'),
                        fontWeight: '600'}}>
                          INCOME
                </Text>
            </TouchableOpacity>
          </View>
          {/* <ButtonGroup
            onPress={(itemValue) => changeFieldValue('transactionType', buttons[itemValue])}
            selectedIndex={buttons.indexOf(newTransaction.transactionType)}
            buttons={buttons}
            containerStyle={{height: 40, flex: 1}} /> */}

          {/* <Text style={[styles.pickerLabel, DARK_MODE.h3Label]}>Transaction Type</Text>
          <Picker
            selectedValue={newTransaction.transactionType}
            mode="dropdown"
            onValueChange={itemValue => {
              changeFieldValue('transactionType', itemValue);
              changePageSettings('activeTab', 'amount');
            }}
            style={{width: '55%', color: DARK_MODE.COLORS.LABEL_COLOR, marginBottom: 8}}>
            <Picker.Item label="Expense" value="expense" />
            <Picker.Item label="Income" value="income" />
          </Picker> */}
        </View>
      );
    };

    const dateRow = () => {
      return (
        <View style={styles.inputContainer}>
          <Text style={[styles.pickerLabel, DARK_MODE.h3Label]}>Date</Text>
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
          {/* <DatePicker
            style={{width: '50%', marginBottom: 8}}
            value={new Date(date)}
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
            onChange={itemValue => changeFieldValue('date', itemValue)}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel" /> */}
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
            inputStyle={DARK_MODE.h3Label}
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
        <View style={[{width: '100%'}, DARK_MODE.inputRowContainer]}>
          <Text style={[styles.pickerLabel, DARK_MODE.h3Label]}>Amount</Text>
          <Input
            style={{width: '100%'}}
            autoCorrect={false}
            onBlur={() => {
              if (this.fieldValidation('amount')) {
                changePageSettings('activeTab', 'category');
              }
            }}
            placeholder="#"
            keyboardType="numeric"
            inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
            value={(newTransaction.amount === 0 ? '' : newTransaction.amount.toString())}
            onChangeText={text => changeFieldValue('amount', text)}
            // leftIcon={{ name: 'mail' }}
            autoCapitalize="none"
            errorStyle={{color: 'red'}}
            errorMessage={newTransaction.errors.amount}
            // label="First Name"
            placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR}/>
        </View>
      );
    };

    const getMainCategoryItems = () => {
      const {sortedMainCategories} = this.props.profile;
      var itemList = [];
      var categoryList = JSON.parse(sortedMainCategories);

      for (let key in JSON.parse(sortedMainCategories)) {
        itemList.push(<TouchableOpacity style={{minWidth: 50, margin: 4}} >
                          <Button
                            onPress={() => {
                              changeFieldValue('mainCategory', categoryList[key]);
                              changePageSettings('activeTab', 'subCategory')
                            }}
                            buttonStyle={{borderColor: '#40c56c', height: 30}}
                            type="outline"
                            titleStyle={{color: '#40c56c', fontSize: 14}}
                            title={categoryList[key]}/>
                        </TouchableOpacity>);
      }
      return itemList;
    };

    const categoryTab = (navigation) => {
      return (
        <View style={DARK_MODE.inputRowContainer}>
          <View style={{flexDirection: 'row', paddingTop: 4}}>
            <Text style={[DARK_MODE.h3, {width: '85%'}]}>Main Category</Text>
            <FontAwesome
              style={{marginTop: 2, marginLeft: 17, width: '10%'}}
              onPress={() => navigation.navigate('MainCategories')}
              name="edit"
              size={23}
              color={DARK_MODE.COLORS.ICON_COLOR} />
          </View>
          <ScrollView style={{flexDirection: 'column', marginBottom: 15}}>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {getMainCategoryItems()}
            </View>
          </ScrollView>
        </View>
      );
    };

    const getSubCategoryItems = () => {
      var itemList = [];
      for (let key in this.props.profile.categoryData[this.props.newTransaction.mainCategory]) {
        itemList.push(<TouchableOpacity style={{minWidth: 50, margin: 4}} >
                        <Button
                          onPress={() => {
                            changeFieldValue('subCategory', this.props.profile.categoryData[this.props.newTransaction.mainCategory][key]);
                            changePageSettings('activeTab', 'paymentType')
                          }}
                          buttonStyle={{borderColor: '#40c56c', height: 30}}
                          type="outline"
                          titleStyle={{color: '#40c56c', fontSize: 14}}
                          title={this.props.profile.categoryData[this.props.newTransaction.mainCategory][key]}/>
                      </TouchableOpacity>);
      }
      return itemList;
    };

    const subCategoryTab = () => {
      return (
        <View style={DARK_MODE.inputRowContainer}>
          <Text style={DARK_MODE.h3}>Sub Category</Text>
          <ScrollView style={{flexDirection: 'column', marginBottom: 15}}>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {getSubCategoryItems()}
            </View>
          </ScrollView>
        </View>
      );
    };

    const paymentTypeTab = () => {
      const buttons = ['CREDIT', 'CASH', 'CHECK'];

      return (
        <View style={DARK_MODE.inputRowContainer}>
        <Text style={DARK_MODE.h3}>Payment Type</Text>
        <View style={{height: 40}}>
          <View style={DARK_MODE.buttonGroupContainer}>
            <TouchableOpacity
              style={[
                // styles.btnGroup,
                DARK_MODE.btnGroup,
                (newTransaction.transactionType === 'CREDIT' ? DARK_MODE.btnGroupActive : {}),
                {borderTopLeftRadius: 4, borderBottomLeftRadius: 4, width: '33%'}
              ]}
              onPress={() => {
                changeFieldValue('paymentType', 'CREDIT');
                changePageSettings('activeTab', 'creditPaymentDetails')
              }}>
                <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: (newTransaction.paymentType === 'CREDIT' ? '#006bb7' : '#a1c5ec'),
                        fontWeight: '600'}}>
                          CREDIT
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                // styles.btnGroup,
                DARK_MODE.btnGroup,
                (newTransaction.transactionType === 'CASH' ? DARK_MODE.btnGroupActive : {}),
                {borderLeftWidth: 1, width: '33%'}
              ]}
              onPress={() => changeFieldValue('paymentType', 'CASH')}>
                <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: (newTransaction.paymentType === 'CASH' ? '#006bb7' : '#a1c5ec'),
                        fontWeight: '600'}}>
                          CASH
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                // styles.btnGroup,
                DARK_MODE.btnGroup,
                (newTransaction.transactionType === 'CHECK' ? DARK_MODE.btnGroupActive : {}),
                {borderTopRightRadius: 4, borderBottomRightRadius: 4, borderLeftWidth: 1, width: '33%'}
              ]}
              onPress={() => changeFieldValue('paymentType', 'CHECK')}>
                <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: (newTransaction.paymentType === 'CHECK' ? '#006bb7' : '#a1c5ec'),
                        fontWeight: '600'}}>
                          CHECK
                </Text>
            </TouchableOpacity>
          </View>
          {/* <ButtonGroup
            onPress={(itemValue) => {
              changeFieldValue('paymentType', buttons[itemValue]);
              if (buttons[itemValue] === 'CREDIT') {
                changePageSettings('activeTab', 'creditPaymentDetails');
              }
          }}
            selectedIndex={buttons.indexOf(newTransaction.paymentType)}
            buttons={buttons}
            containerStyle={{height: 80, flex: 1}} /> */}
          </View>
          {/* <Picker
            selectedValue={newTransaction.paymentType}
            style={styles.pickerInput}
            mode="dropdown"
            onValueChange={itemValue => {
              changeFieldValue('paymentType', itemValue);
              changePageSettings('activeTab', 'creditPaymentDetails');
            }}>
            <Picker.Item label="CASH" value="CASH" />
            <Picker.Item label="CREDIT" value="CREDIT" />
            <Picker.Item label="CHECK" value="CHECK" />
          </Picker> */}
        </View>
      );
    };

    const creditPaymentDetailsTab = () => {
      return (
        <View style={DARK_MODE.inputRowContainer}>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {/* <Text style={{width: '50%', paddingLeft: 8}}>Card Type</Text> */}
            <Text style={[DARK_MODE.h3, {width: '100%'}]}>Number of Payments</Text>
            <Input
              autoCorrect={false}
              // onBlur={() => {
              //   if (this.fieldValidation('paymentsAmount')) {
              //     changePageSettings('activeTab', 'final');
              //   }
              // }}
              placeholder="#"
              keyboardType="numeric"
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              defaultValue={newTransaction.paymentsAmount.toString()}
              value={newTransaction.paymentsAmount.toString()}
              onChangeText={text => {
                changeFieldValue('paymentsAmount', text);
                this.fieldValidation('paymentsAmount');
              }}
              // leftIcon={{ name: 'mail' }}
              autoCapitalize="none"
              errorStyle={{color: 'red'}}
              errorMessage={newTransaction.errors.paymentsAmount}
              // label="First Name"
              placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR} />
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
            disabled={Object.keys(newTransaction.errors).length > 0}
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

    var invalidTransaction = (
      newTransaction.amount === 0 ||
      Object.entries(newTransaction.errors).length === 0 ||
      newTransaction.mainCategory === '' ||
      newTransaction.subCategory === '');
      // console.log(this.props);
    return (
      <Overlay
        isVisible={isModalOpen}
        windowBackgroundColor="rgba(255, 255, 255, 0.5)"
        // overlayBackgroundColor="red"
        overlayStyle={styles.containerStyle}
        width={350}
        height="auto" >
          <View>
            {transTypeRow()}
            {dateRow()}
            <TouchableOpacity style={styles.inputContainer} onPress={() => changePageSettings('activeTab', 'amount')}>
              <Text style={[styles.pickerLabel, DARK_MODE.h3Label, {color: (newTransaction.errors.amount !== undefined ? 'red' : DARK_MODE.h3Label.color)}]}>Amount</Text>
              <Text style={[styles.pickerInput, {marginBottom: 8}, {color: (newTransaction.errors.amount !== undefined ? 'red' : DARK_MODE.COLORS.LABEL_COLOR)}]}>
                {newTransaction.amount}
              </Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={{width: '45%', paddingLeft: 6}}
                onPress={() => changePageSettings('activeTab', 'category')}>
                  <Text style={DARK_MODE.h3Label}>Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '30%'}}
                onPress={() => changePageSettings('activeTab', 'category')}>
                <Text style={{color: DARK_MODE.COLORS.LABEL_COLOR, marginBottom: 8}}>{newTransaction.mainCategory}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '25%'}}
                onPress={() => changePageSettings('activeTab', 'subCategory')}>
                <Text style={{color: DARK_MODE.COLORS.LABEL_COLOR, marginBottom: 8}}>{newTransaction.subCategory}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.inputContainer} onPress={() => changePageSettings('activeTab', 'paymentType')}>
              <Text style={[styles.pickerLabel, DARK_MODE.h3Label]}>Payment Type</Text>
              <Text style={[styles.pickerInput, {color: DARK_MODE.COLORS.LABEL_COLOR, marginBottom: 8}]}>
                {newTransaction.paymentType}
              </Text>
            </TouchableOpacity>

            {newTransaction.paymentType === 'CREDIT' && (
              <View style={{flexDirection: 'column', backgroundColor: '#1c3c61'}}>
                <TouchableOpacity style={[ DARK_MODE.h3Label, {width: '100%', paddingLeft: 6}]} onPress={() => changePageSettings('activeTab', 'paymentType')}>
                  <Text style={[DARK_MODE.h3Label, {color: '#979ca0'}]}>{'Payment Details - ' + newTransaction.paymentType}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', padding: 6}} onPress={() => changePageSettings('activeTab', 'creditPaymentDetails')}>
                  <Text style={[DARK_MODE.h4Label, {width: '28%', color: '#979ca0'}]}>{'Credit Card:'}</Text>
                  <Text style={[DARK_MODE.h3Label, {width: '25%', marginLeft: 5, color: DARK_MODE.COLORS.LABEL_COLOR}]}>{newTransaction.selectedCreditCard.name}</Text>
                  <Text style={[DARK_MODE.h4Label, {width: '28%', color: (newTransaction.errors.paymentsAmount !== undefined ? 'red' : '#979ca0')}]}>{'# payments:'}</Text>
                  <Text style={[DARK_MODE.h4Label, {width: '15%', marginLeft: 5, color: (newTransaction.errors.paymentsAmount !== undefined ? 'red' : DARK_MODE.COLORS.LABEL_COLOR)}]}>{newTransaction.paymentsAmount}</Text>
                </TouchableOpacity>
              </View>
            )}

            {descriptionRow()}
            {/* <Divider style={{ backgroundColor: '#cbe3fb', width: '100%',margin: 4 }} /> */}
            {pageSettings.activeTab !== 'final' && <View style={styles.tabWrapper}>
                {pageSettings.activeTab === 'amount' && amountTab()}
                {pageSettings.activeTab === 'category' && categoryTab()}
                {pageSettings.activeTab === 'subCategory' && subCategoryTab()}
                {pageSettings.activeTab === 'paymentType' && paymentTypeTab()}
                {pageSettings.activeTab === 'creditPaymentDetails' && creditPaymentDetailsTab()}
            </View>}
            {pageSettings.activeTab === 'final' && buttonsTab()}
            <View style={styles.bottomBtnContainer}>
                <Button
                  title="ADD"
                  // style={{flex: 1}}
                  disabled={invalidTransaction}
                  buttonStyle={[styles.bottomBtn, {width: 130}]}
                  onPress={() => handleAddNewTransactionAccount(newTransaction, identity.uid)}
                  type="outline" />
                <Button
                  title="CANCEL"
                  // style={{flex: 1}}
                  buttonStyle={[styles.bottomBtn, {width: 130}]}
                  onPress={() => {
                    closeNewTransactionModal();
                    resetNewTransactionForm();
                  }}
                  type="outline" />
            </View>
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
    flexDirection: 'row',
    width: '100%',
    // borderWidth: 2,
    justifyContent: 'space-around',
    // height: 30,
  },
  bottomBtn: {
    marginTop: 8,
    marginBottom: 8,
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
    width: '45%',
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
  buttonGroupContainer: {
    flexDirection: 'row',
    margin: 3,
  },
  btnGroup: {
    width: '50%',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#61bcfd',
    padding: 5,
  },
  btnGroupActive: {
    backgroundColor: '#b4e0ff',
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
