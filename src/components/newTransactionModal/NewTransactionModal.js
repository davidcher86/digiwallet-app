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
import {FAB} from 'react-native-paper';
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
      console.log('mainCategory', mainCategory);
      if (mainCategory !== null && mainCategory !== '') {
        newTransaction.categoryList[mainCategory].forEach(category => {
          subCategories.push(<Picker.Item key={category} label={category} value={category} />);
        });
      }
      console.log('subCategories', subCategories);
      return subCategories;
    };

    return (
      <KeyboardAvoidingView style={styles.containerStyle} behavior="padding" enabled>
        <Modal
          animationType="slide"
          transparent={true}
          // visible={true}
          visible={isModalOpen}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <ScrollView style={styles.modalInnerContainerStyle}>
            <View>
              <Text>Transaction Type</Text>
              <Picker
                selectedValue={newTransaction.transactionType}
                style={{height: 50, width: 100}}
                onValueChange={itemValue =>
                  changeFieldValue('transactionType', itemValue)
                }>
                <Picker.Item label="Expense" value="expense" />
                <Picker.Item label="Income" value="income" />
              </Picker>
            </View>

            <View>
              <Input
                placeholder="123456"
                style={styles.inputStyle}
                value={newTransaction.amount}
                onChangeText={text => changeFieldValue('amount', text)}
                // leftIcon={{ name: 'maijl' }}
                errorStyle={{color: 'red'}}
                // errorMessage={validationErrors.lastNameError}
                label="Amount"
              />
            </View>

            <View>
              <Text>Main Category</Text>
              <Picker
                selectedValue={newTransaction.mainCategory}
                style={{height: 50, width: 100}}
                onValueChange={itemValue => changeFieldValue('mainCategory', itemValue)}>
                  <Picker.Item key={'*'} label={''} value={''} />
                  {renderMainCategories()}
              </Picker>
            </View>

            {newTransaction.mainCategory !== '' && <View>
              <Text>Sub Category</Text>
              <Picker
                selectedValue={newTransaction.subCategory}
                style={{height: 50, width: 100}}
                onValueChange={itemValue =>
                  changeFieldValue('subCategory', itemValue)
                }>
                  {renderSubCategories()}
              </Picker>
            </View>}

            <View>
              <Text>Date</Text>
              <DatePicker
                style={{width: 200}}
                date={newTransaction.date}
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
                onDateChange={itemValue => changeFieldValue('date', itemValue)}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
              />
            </View>

            <View>
              <Text>Payment Type</Text>
              <Picker
                selectedValue={newTransaction.paymentType}
                style={{height: 50, width: 100}}
                onValueChange={itemValue =>
                  changeFieldValue('paymentType', itemValue)
                }>
                <Picker.Item label="Cash" value="cash" />
                <Picker.Item label="Credit" value="credit" />
              </Picker>
            </View>

            {newTransaction.paymentType === 'credit' && (
              <View>
                <Text>Card Type</Text>
                <Picker
                  selectedValue={paymentDetails.cardType}
                  style={{height: 50, width: 100}}
                  onValueChange={itemValue =>
                    changePaymentDetailsFieldValue('cardType', itemValue)
                  }>
                  <Picker.Item label="Visa" value="visa" />
                  <Picker.Item label="Mastercard" value="mastercard" />
                </Picker>
              </View>
            )}

            <View>
              <Input
                placeholder="123456"
                style={styles.inputStyle}
                value={newTransaction.description}
                onChangeText={text => changeFieldValue('description', text)}
                // leftIcon={{ name: 'maijl' }}
                errorStyle={{color: 'red'}}
                // errorMessage={validationErrors.lastNameError}
                label="Description"
              />
            </View>

            <TouchableOpacity
              onPress={() => handleAddNewTransactionAccount(newTransaction, identity.uid)}
              // onPress={() => console.log(this.props.account)}
              style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>ADD</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
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
    flexDirection: 'column',
  },
  buttonContainerStyle: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  // containerInnerStyle: {
  //   flexDirection: 'column',
  //   backgroundColor: 'yellow',
  //   // justifyContent: 'center',
  //   margin: 30,
  //   flex: 1,
  // },
  modalInnerContainerStyle: {
    height: '80%',
    margin: 30,
    backgroundColor: '#ede3f2',
    borderRadius: 15,
    borderWidth: 0.5,
    marginTop: 45,
    opacity: 0.8,
    padding: 8,
  },
  fabContainerStyle: {
    height: '20%',
    width: '100%',
    backgroundColor: 'yellow',
  },
  fab: {
    // flex: 1,
    // borderRadius: 200,
    // position: 'absolute',
    // bottom: 20,
    // right: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#686cc3',
    height: 50,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686cc3',
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
