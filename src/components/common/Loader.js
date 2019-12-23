import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {LineDotsLoader, TextLoader} from 'react-native-indicator';

class Loader extends Component {
  render() {
    return (
      <View style={[styles.containerStyle, (this.props.systemControl.appControl.loaderOn ? {height: '100%'} : {height: '0%'})]}>
        {this.props.systemControl.appControl.loaderOn && <View style={styles.loaderContainerStyle}>
            <LineDotsLoader size={15} color={'#1e90ff'} betweenSpace={6} />
            <TextLoader text="Loading" />
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    position: 'absolute',
    zIndex: 60,
    width: '100%',
    height: '100%',
  },
  loaderContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(212, 212, 212, 0.8)',
  },
});

const mapStateToProps = state => {
  return {
    systemControl: state.systemControl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // toggleNewTransactionModal: () => dispatch(toggleNewTransactionModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);
