import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Animated, View, Easing, Image} from 'react-native';
import {LineDotsLoader, TextLoader} from 'react-native-indicator';

class Loader extends Component {
  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
  }

  fadeIn = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0.8,
      duration: 300,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();
  };

  componentDidUpdate() {
    if (this.props.systemControl.appControl.loaderOn) {
      this.fadeIn();
    } else if (!this.props.systemControl.appControl.loaderOn) {
      this.fadeOut();
    }
  }

  render() {
    return (
      <Animated.View
        pointerEvents={
          this.props.systemControl.appControl.loaderOn ? 'auto' : 'none'
        }
        style={[styles.containerStyle, {opacity: this.state.fadeAnim}]}>
        <Animated.View style={[styles.loaderContainerStyle]}>
          <View style={styles.mainIconContainerStyle}>
            <Image
              style={{width: 130, height: 130}}
              source={require('./../../img/login-main-icn-2.png')}
            />
          </View>
          <LineDotsLoader size={15} color={'#f7f9f7'} betweenSpace={6} />
          <TextLoader text="Loading" />
        </Animated.View>
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
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 60,
    height: '100%',
    backgroundColor: '#12844a',
  },
  mainIconContainerStyle: {

  }
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
