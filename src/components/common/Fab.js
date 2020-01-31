import {FAB} from 'react-native-paper';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {toggleNewTransactionModal} from './../newTransactionModal/newTransactionModalActions';

class Fab extends Component {
  render() {
    // console.log(this.props);
    return (
      <View style={styles.containerStyle}>
        <FAB
          style={[styles.fab, this.props.newTransaction.isModalOpen ? {opacity: 0.2} : {}]}
          small
          onPress={() => this.props.toggleNewTransactionModal()}
          icon="plus"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    // zIndex: 100000,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fab: {
    height: 50,
    zIndex: 10200,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686cc3',
    elevation: 1,
  },
});

const mapStateToProps = state => {
  return {
    newTransaction: state.newTransactionModal,
    systemControl: state.systemControl,
    identity: state.identity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNewTransactionModal: () => dispatch(toggleNewTransactionModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Fab);
