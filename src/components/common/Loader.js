import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Animated, View} from 'react-native';
import {LineDotsLoader, TextLoader} from 'react-native-indicator';

class Loader extends Component {
  constructor () {
    super()
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  animateDetail = () => {
    console.log('running animate Detail');
    Animated.timing(this.state.fadeAnim, {
        toValue: 0.8, // Animate to opacity: 1 (opaque)
        duration: 2000, // Make it take a while
        delay: 2000,
        // useNativeDriver: true
    }).start(console.log);
  };

  animateDetail2 = () => {
    console.log('running animate Detail');
    Animated.timing(this.state.fadeAnim, {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 2000 // Make it take a while
        // useNativeDriver: true
    }).start(console.log);
  };
  render() {
    return (
      <Animated.View style={[styles.containerStyle, (this.props.systemControl.appControl.loaderOn ? {height: '100%'} : {height: '0%'})]}>
        {this.props.systemControl.appControl.loaderOn && <Animated.View style={[styles.loaderContainerStyle, {opactiy: this.animateDetail()}]}>
            <LineDotsLoader size={15} color={'#f7f9f7'} betweenSpace={6} />
            <TextLoader text="Loading" />
          </Animated.View>}
      </Animated.View>
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
    backgroundColor: 'rgb(9, 74, 26)',
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
