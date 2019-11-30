import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Modal, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {FAB} from 'react-native-paper';

import * as actions from './newTransactionModalActions';

class NewTransactionModal extends Component {
  toggleNewTransModal = () => {
    return console.log('sdfsdfssdfsdf');
  };

  render() {
    const {isModalOpen} = this.props.newTransaction;
    const {toggleNewTransactionModal, onFabPress} = this.props;
    // console.log(toggleNewTransactionModal());
    return (
      <View style={styles.containerStyle}>
        <Modal
          animationType="slide"
          transparent={true}
          // visible={true}
          visible={isModalOpen}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalInnerContainerStyle}>
            <Input
              placeholder="123456"
              style={styles.inputStyle}
              value={user.lastName}
              onChangeText={text => changeUserFieldValue('lastName', text)}
              // leftIcon={{ name: 'maijl' }}
              errorStyle={{color: 'red'}}
              errorMessage={validationErrors.lastNameError}
              label="Last Name" />
          </View>
          <Text>Card Type</Text>
              <Picker
                selectedValue={creditCard.cardType}
                style={{height: 50, width: 100}}
                onValueChange={itemValue => changeCreditFieldValue('cardType', itemValue)}>
                <Picker.Item label="Visa" value="visa" />
                <Picker.Item label="Mastercard" value="mastercard" />
              </Picker>
        </Modal>
      </View>
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
  };
};

export default connect(
  mapStateToProps,
  actions,
)(NewTransactionModal);
