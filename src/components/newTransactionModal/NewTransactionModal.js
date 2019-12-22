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
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';

import * as actions from './newTransactionModalActions';

class NewTransactionModal extends Component {
  toggleNewTransModal = () => {
    return console.log('sdfsdfssdfsdf');
  };

  render() {
    const {isModalOpen, categoryList, subCategory} = this.props.newTransaction;
    const {
      newTransaction,
      paymentDetails,
      changePaymentDetailsFieldValue,
      handleAddNewTransactionAccount,
      toggleNewTransactionModal,
      changeFieldValue,
      closeNewTransactionModal,
      identity,
      onFabPress,
    } = this.props;
    // console.log('identity: ', identity);

    const renderDays = () => {
      var arr = [];
      for (var i = 1; i <= 31; i++) {
        arr.push(<Picker.Item key={i} label={i.toString()} value={i} />);
      }
      return arr;
    };

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
      // console.log('mainCategory', mainCategory);
      if (mainCategory !== null && mainCategory !== '') {
        newTransaction.categoryList[mainCategory].forEach(category => {
          subCategories.push(<Picker.Item key={category} label={category} value={category} />);
        });
      }
      // console.log('subCategories', subCategories);
      return subCategories;
    };
    var date = new Date();
    var maxDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    // console.log(maxDate);
    return (
      <KeyboardAvoidingView style={styles.containerStyle}>
        <View >
          <Modal
            animationType="slide"
            transparent={true}
            // visible={true}
            style={{padding: 10}}
            visible={isModalOpen}
            onRequestClose={() => closeNewTransactionModal()}>
            <ScrollView style={styles.modalInnerContainerStyle} showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <Text style={styles.pickerLabel}>Transaction Type</Text>
                <Picker
                  selectedValue={newTransaction.transactionType}
                  style={styles.pickerInput}
                  onValueChange={itemValue => changeFieldValue('transactionType', itemValue)}>
                  <Picker.Item label="Expense" value="expense" />
                  <Picker.Item label="Income" value="income" />
                </Picker>
              </View>

              <View style={styles.inputContainer}>
                <Input
                  placeholder="Amount"
                  style={styles.inputStyle}
                  value={newTransaction.amount.toString()}
                  onChangeText={text => changeFieldValue('amount', text)}
                  // leftIcon={{ name: 'maijl' }}
                  errorStyle={{color: 'red'}}
                  // errorMessage={validationErrors.lastNameError}
                  // label="Amount"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.pickerLabel}>Main Category</Text>
                <Picker
                  selectedValue={newTransaction.mainCategory}
                  style={styles.pickerInput}
                  onValueChange={itemValue => changeFieldValue('mainCategory', itemValue)}>
                    <Picker.Item key={'*'} label={''} value={''} />
                    {renderMainCategories()}
                </Picker>
              </View>

              {newTransaction.mainCategory !== '' && <View style={styles.inputContainer}>
                <Text style={styles.pickerLabel}>Sub Category</Text>
                <Picker
                  selectedValue={newTransaction.subCategory}
                  style={styles.pickerInput}
                  onValueChange={itemValue =>
                    changeFieldValue('subCategory', itemValue)
                  }>
                    {renderSubCategories()}
                </Picker>
              </View>}

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

              {newTransaction.paymentType === 'credit' && (
                <View style={[styles.inputContainer, {flexDirection: 'column'}]}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{width: '50%', paddingLeft: 8}}>Card Type</Text>
                    <Text style={{width: '50%', paddingLeft: 8}}>Number of Payments</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Picker
                      selectedValue={paymentDetails.cardType}
                      style={{width: '50%'}}
                      onValueChange={itemValue =>
                        changePaymentDetailsFieldValue('cardType', itemValue)
                      }>
                      <Picker.Item label="Visa" value="visa" />
                      <Picker.Item label="Mastercard" value="mastercard" />
                    </Picker>
                    <View style={{width: '50%'}}>
                      <Input
                        placeholder="#"
                        value={newTransaction.paymentAmount}
                        onChangeText={text => changePaymentDetailsFieldValue('paymentAmount', text)}
                        // leftIcon={{ name: 'maijl' }}
                        // errorMessage={validationErrors.lastNameError}
                        // label="Number of Payments"
                        errorStyle={{color: 'red'}} />
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.inputContainer}>
                <Input
                  placeholder="Description"
                  style={styles.inputStyle}
                  value={newTransaction.description}
                  onChangeText={text => changeFieldValue('description', text)}
                  // leftIcon={{ name: 'maijl' }}
                  errorStyle={{color: 'red'}}
                  // errorMessage={validationErrors.lastNameError}
                  // label="Description"
                />
              </View>

              <TouchableOpacity
                onPress={() => handleAddNewTransactionAccount(newTransaction, identity.uid)}
                // onPress={() => console.log(this.props.account)}
                style={styles.buttonContainer}>
                <Text style={styles.buttonStyle}>ADD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeNewTransactionModal()}
                // onPress={() => console.log(this.props.account)}
                style={styles.buttonContainer}>
                <Text style={styles.buttonStyle}>CANCEL</Text>
              </TouchableOpacity>
            </ScrollView>
          </Modal>
        </View>
        {/* <FAB style={styles.fab} small icon="plus" onPress={() => this.props.toggleNewTransactionModal()} /> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // zIndex: 40,
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: 'pink',
    marginBottom: 7,
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
    justifyContent: 'center',
    width: '40%',
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
    paymentDetails: state.newTransactionModal.paymentDetails,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(NewTransactionModal);
