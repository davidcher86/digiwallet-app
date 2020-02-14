/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Button, Input, ButtonGroup, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SocialIcon } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs, Text as BaseText,TabHeading } from 'native-base';
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import * as fb from 'react-native-firebase';

import {startLoading, endLoading} from './../systemControl/systemControlActions';
import * as loginActions from './loginActions';
import {getRememberedUser} from './../common/Actions';
import { BACKGROUND_COLOR, DARK_MODE } from './../Styles';

class LoginForm extends Component {
  constructor() {
    super();
    this.fieldValidation = this.fieldValidation.bind(this);
  }

  componentDidMount() {
    this.props.startLoading();
    getRememberedUser()
      .then(uid => {
        if (uid !== null) {
          this.props.setIdentity(uid);
          var lastConnected = new Date();
          const updateRef = firebase.database().ref(`/users/${uid}/account`);

          updateRef.update({lastConnected}).then(async res => {
            await this.props.fetchData(uid, this.props.navigation);
          });
        } else {
          this.props.endLoading();
        }
      })
      .catch(r => {
        console.log('Error:', r);
        this.props.endLoading();
      });
  }

  fieldValidation(field, value) {
    var {setErrors, login} = this.props;
    var errors = login.errors;

    const isValideEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    switch (field) {
      case 'email':
        if (!isValideEmail(value)) {
          errors.email = 'Email format error';
          setErrors(errors);
          return false;
        }
        delete errors.email;
        setErrors(errors);
        return true;
      case 'newEmail':
        if (!isValideEmail(value)) {
          errors.newEmail = 'Email format error';
          setErrors(errors);
          return false;
        }
        delete errors.newEmail;
        setErrors(errors);
        return true;
      case 'newPassword':
        if (value.length < 6) {
          errors.newPassword = 'Password must be at least 6 chars';
          setErrors(errors);
          return false;
        }
        delete errors.newPassword;
        setErrors(errors);
        return true;
      case 'reEnteredPassword':
        if (login.newPassword !== value) {
          errors.reEnteredPassword = 'Not Identical Password';
          setErrors(errors);
          return false;
        }
        delete errors.reEnteredPassword;
        setErrors(errors);
        return true;
      default:
        return true;
    }
  }

  render() {
    const {login, pageSettings, onLoginPress, onRegister, validationErrors, navigation} = this.props;
    const {changeTab} = this.props;

    const loginComponent = () => {
      return (
        <KeyboardAvoidingView style={styles.tabContainerStyle}>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Email"
              style={styles.inputStyle}
              autoCorrect={false}
              value={login.email}
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              onChangeText={text => {
                this.props.changeFieldValue('email', text);
                this.fieldValidation('email', text);
              }}
              leftIcon={<MaterialCommunityIcons name="email" size={30} color="#4F8EF7" style={{marginRight: 7}}/>}
              autoCapitalize="none"
              errorStyle={{color: 'red'}}
              errorMessage={login.errors.email}
              // label="Email"
              placeholderTextColor={DARK_MODE.COLORS.placeholderTextColor} />
          </View>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Password"
              style={styles.inputStyle}
              value={login.password}
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              onChangeText={text => this.props.changeFieldValue('password', text)}
              leftIcon={<MaterialCommunityIcons name="onepassword" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
              errorStyle={{color: 'red'}}
              // label="Password"
              errorMessage={this.props.login.error}
              secureTextEntry={true}
              placeholderTextColor={DARK_MODE.COLORS.placeholderTextColor} />
          </View>
          <View style={styles.buttonContainerStyle}>
            <View style={{paddingLeft: 7, paddingRight: 7}}>
              <Button
                title="Login"
                onPress={() => onLoginPress(login.email, login.password, navigation)}
                disabled={(login.email === '' ||  login.password === '')}
                type="outline" />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
              <SocialIcon
                title='Facebook'
                style={styles.socailIcon}
                type='facebook'/>
              <SocialIcon
                title='Google'
                style={styles.socailIcon}
                type='google'/>
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    };

    const registerComponent = () => {
      return (
        <KeyboardAvoidingView style={styles.tabContainerStyle}>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Enter Email"
              style={styles.inputStyle}
              autoCorrect={false}
              // onBlur={() => this.fieldValidation('newEmail')}
              value={login.newEmail}
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              onChangeText={text => {
                this.props.changeFieldValue('newEmail', text);
                this.fieldValidation('newEmail', text);
              }}
              leftIcon={<MaterialCommunityIcons name="email" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
              autoCapitalize="none"
              errorStyle={{color: 'red'}}
              errorMessage={login.errors.newEmail}
              // label="Enter Email"
              placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR}/>
          </View>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Enter New Password"
              style={styles.inputStyle}
              value={login.newPassword}
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              onChangeText={text => {
                this.props.changeFieldValue('newPassword', text);
                this.fieldValidation('newPassword', text);
              }}
              leftIcon={<MaterialCommunityIcons name="textbox-password" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
              errorStyle={{color: 'red'}}
              // label="Enter New Password"
              errorMessage={login.errors.newPassword}
              secureTextEntry={true}
              placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR}/>
          </View>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Re-Enter Password"
              style={styles.inputStyle}
              value={login.reEnteredPassword}
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              onChangeText={text => {
                this.props.changeFieldValue('reEnteredPassword', text);
                this.fieldValidation('reEnteredPassword', text);
              }}
              leftIcon={<MaterialCommunityIcons name="textbox-password" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
              errorStyle={{color: 'red'}}
              errorMessage={login.errors.reEnteredPassword}
              // label="Re-Enter Password"
              secureTextEntry={true}
              placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR}/>
          </View>
          <View style={styles.buttonContainerStyle}>
            <View style={{paddingLeft: 7, paddingRight: 7}}>
              <Button
                title="Register"
                disabled={login.newEmail === '' ||  login.newPassword === '' || login.reEnteredPassword === '' || Object.keys(login.errors).length > 0}
                onPress={() => onRegister(login.newEmail, login.newPassword, navigation)}
                type="outline" />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
              <SocialIcon
                title='Facebook'
                // onPress={() => this.props.onFacebookRegister(this.props.navigation)}
                style={styles.socailIcon}
                type='facebook'/>
              <SocialIcon
                title='Google'
                style={styles.socailIcon}
                type='google'/>
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    };

    return (
      <KeyboardAvoidingView style={DARK_MODE.appContainer}>
        <ScrollView style={styles.scrollerWrapper}>
          <View style={styles.wrapper}>
            <View style={styles.mainIconContainerStyle}>
              <Image
                style={{width: 130, height: 130}}
                source={require('./../../img/login-main-icn-2.png')}/>
            </View>
            <Tabs>
              <Tab
                heading={<TabHeading style={styles.tabHeader}>
                          <SimpleLineIcons color="#4F8EF7" size={18} name="login" style={{marginRight: 5}} />
                          <BaseText style={{fontSize: 18}}>Login</BaseText>
                        </TabHeading>}>
                {loginComponent()}
              </Tab>
              <Tab
                heading={<TabHeading style={styles.tabHeader}>
                          <MaterialCommunityIcons color="#4F8EF7" size={23} style={{marginRight: 5}} name="account-plus-outline" />
                          <BaseText style={{fontSize: 18}}>Register</BaseText>
                        </TabHeading>}>
                {registerComponent()}
              </Tab>
            </Tabs>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  scrollerWrapper: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainIconContainerStyle: {
    opacity: 0.4,
    justifyContent: 'center',
    height: 220,
    alignItems: 'center',
  },
  inputStyle: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    paddingTop: 20,
    padding: 10,
    borderWidth: 2,
  },
  socailIcon: {
    width: 170,
    borderRadius: 5,
    elevation: 0,
  },
  tabHeader: {
    backgroundColor: '#0054a3',
  },
  tabStyle: {
    flex: 2,
    opacity: 0.8,
    textAlign: 'center',
    padding: 7,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#6bcfe8',
  },
  selectedTabStyle: {
    borderBottomColor: '#316b79',
    borderBottomWidth: 5,
  },
  tabContainerStyle: {
    flexDirection: 'column',
    paddingTop: 30,
    backgroundColor: '#0f344c',
    height: '100%',
  },
  buttonContainerStyle: {
    marginTop: 30,
  },
  inputConntainerStyle: {
    marginTop: 5,
    marginBottom: 5,
  },
});

const mapStateToProps = state => {
  return {
    login: state.login,
    errors: state.login.errors,
    pageSettings: state.login.pageSettings,
    validationErrors: state.login.validationErrors,
  };
};

export default connect(
  mapStateToProps,
  Object.assign({}, loginActions, {startLoading, endLoading})
)(LoginForm);
