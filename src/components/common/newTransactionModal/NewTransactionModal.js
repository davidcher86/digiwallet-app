import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Modal, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {FAB} from 'react-native-paper';

import * as actions from './newTransactionModalActions';

class NewTransactionModal extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalContainerStyle}>
            <Text>dvfsfdsf</Text>
          </View>
        </Modal>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#ede3f2',
  },
  modalContainerStyle: {
    height: '80%',
    margin: 30,
    backgroundColor: '#ede3f2',
    borderRadius: 15,
    borderWidth: 0.5,
    marginTop: 45,
    opacity: 0.8,
    padding: 8,
  },
  fab: {
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
  return {newTransaction: state.newTransactionModal};
};

export default connect(
  mapStateToProps,
  actions,
)(NewTransactionModal);
