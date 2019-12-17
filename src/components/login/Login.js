/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as loginActions from './loginActions';
import {getRememberedUser} from './../common/Actions';
// import {setIdentity} from './../identity/identityActions';

class LoginForm extends Component {
  componentDidMount() {
    getRememberedUser()
      .then(res => {
        if (res !== null) {
          this.props.setIdentity(res);
          this.props.navigation.navigate('PrimaryNav');
        }
      });
  }

  renderButton(props) {
    if (props.login.loading) {
      return (
        <View style={styles.buttonContainerStyle}>
          <Button style={styles.buttonStyle} title="Loading button" loading />
        </View>
      );
    }

    return (
      <View style={styles.buttonContainerStyle}>
        {this.props.pageSettings.selectedTab === 'login' && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              props.onLoginPress(
                props.login.email,
                props.login.password,
                this.props.navigation,
              )
            }>
            <Text style={styles.buttonStyle}>LOGIN</Text>
          </TouchableOpacity>
        )}
        {this.props.pageSettings.selectedTab === 'signIn' && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => props.onSignInPress(
                            props.login.newEmail,
                            props.login.newPassword,
                            this.props.navigation)}>
            <Text style={styles.buttonStyle}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    // console.log(this.props);
    const {login, pageSettings, validationErrors} = this.props;
    const {changeTab} = this.props;

    return (
      <KeyboardAvoidingView style={styles.containerStyle}>
        <ScrollView style={styles.scrollerWrapper}>
          <View style={styles.wrapper}>
            <View style={styles.mainIconContainerStyle}>
              <Image
                style={{width: 100, height: 100}}
                source={require('./../../img/login-main-icn.png')}/>
            </View>
            <View style={styles.tabContainerStyle}>
              <Text
                onPress={() => changeTab('login')}
                style={[
                  styles.tabStyle,
                  pageSettings.selectedTab === 'login'
                    ? styles.selectedTabStyle
                    : {},
                ]}>
                Login
              </Text>
              <Text
                onPress={() => changeTab('signIn')}
                style={[
                  styles.tabStyle,
                  pageSettings.selectedTab === 'signIn'
                    ? styles.selectedTabStyle
                    : {},
                ]}>
                Sign In
              </Text>
            </View>
            {pageSettings.selectedTab === 'login' && (
              <KeyboardAvoidingView style={styles.loginContainerStyle}>
                <View style={styles.inputConntainerStyle}>
                  <Input
                    placeholder="Email"
                    style={styles.inputStyle}
                    autoCorrect={false}
                    value={login.email}
                    onChangeText={text => this.props.changeFieldValue('email', text)}
                    leftIcon={{name: 'mail'}}
                    autoCapitalize="none"
                    errorStyle={{color: 'red'}}
                    // label="Email"
                    placeholderTextColor="rgba(225,225,225,0.7)" />
                </View>
                <View style={styles.inputConntainerStyle}>
                  <Input
                    placeholder="Password"
                    style={styles.inputStyle}
                    value={login.password}
                    onChangeText={text =>
                      this.props.changeFieldValue('password', text)
                    }
                    leftIcon={{name: 'mail'}}
                    errorStyle={{color: 'red'}}
                    // label="Password"
                    errorMessage={this.props.login.error}
                    secureTextEntry={true} />
                </View>
              </KeyboardAvoidingView>
            )}
            {pageSettings.selectedTab === 'signIn' && (
              <View style={styles.signInContainerStyle}>
                <View style={styles.inputConntainerStyle}>
                  <Input
                    placeholder="Enter Email"
                    style={styles.inputStyle}
                    autoCorrect={false}
                    value={login.newEmail}
                    onChangeText={text =>
                      this.props.changeFieldValue('newEmail', text)
                    }
                    leftIcon={{name: 'mail'}}
                    autoCapitalize="none"
                    errorStyle={{color: 'red'}}
                    errorMessage={validationErrors.newEmailError}
                    // label="Enter Email"
                    placeholderTextColor="rgba(225,225,225,0.7)"/>
                </View>
                <View style={styles.inputConntainerStyle}>
                  <Input
                    placeholder="Enter New Password"
                    style={styles.inputStyle}
                    value={login.newPassword}
                    onChangeText={text =>
                      this.props.changeFieldValue('newPassword', text)
                    }
                    leftIcon={{name: 'mail'}}
                    errorStyle={{color: 'red'}}
                    // label="Enter New Password"
                    errorMessage={validationErrors.newPassError}
                    secureTextEntry={true}/>
                </View>
                <View style={styles.inputConntainerStyle}>
                  <Input
                    placeholder="Re-Enter Password"
                    style={styles.inputStyle}
                    value={login.reEnteredPassword}
                    onChangeText={text =>
                      this.props.changeFieldValue('reEnteredPassword', text)
                    }
                    leftIcon={{name: 'mail'}}
                    errorStyle={{color: 'red'}}
                    errorMessage={validationErrors.newReEnteredPassError}
                    // label="Re-Enter Password"
                    secureTextEntry={true}/>
                </View>
              </View>
            )}
            <View>{this.renderButton(this.props)}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#00868b',
  },
  scrollerWrapper: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollViewWrapper: {
    borderWidth: 2,
    paddingTop: 300,
    // margin: 10,
    // flex: 1,
  },
  mainIconContainerStyle: {
    opacity: 0.4,
    justifyContent: 'center',
    height: 270,
    alignItems: 'center',
  },
  labelStyle: {},
  inputStyle: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    paddingTop: 20,
    padding: 10,
    borderWidth: 2,
    color: '#fff',
  },
  tabContainerStyle: {
    flexDirection: 'row',
  },
  tabStyle: {
    flex: 2,
    opacity: 0.8,
    textAlign: 'center',
    padding: 7,
    justifyContent: 'space-between',
    backgroundColor: '#6bcfe8',
  },
  selectedTabStyle: {
    borderBottomColor: '#316b79',
    borderBottomWidth: 5,
  },
  selectedArrowStyle: {},
  loginContainerStyle: {
    flexDirection: 'column',
    paddingTop: 30,
  },
  buttonContainerStyle: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginTop: 30,
  },
  inputConntainerStyle: {
    marginTop: 5,
    marginBottom: 5,
  },
  buttonStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
const mapStateToProps = state => {
  return {
    login: state.login,
    pageSettings: state.login.pageSettings,
    validationErrors: state.login.validationErrors,
  };
};

export default connect(
  mapStateToProps,
  loginActions,
)(LoginForm);
