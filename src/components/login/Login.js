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
import { BACKGROUND_COLOR } from './../Styles';

class LoginForm extends Component {
  componentDidMount() {
    this.props.startLoading();
    getRememberedUser()
      .then(uid => {
        console.log(uid);
        if (uid !== null) {
          this.props.setIdentity(uid);
          var lastConnected = new Date();
          const updateRef = firebase.database().ref(`/users/${uid}/account`);

          updateRef.update({lastConnected}).then(async res => {
            await this.props.fetchData(uid, this.props.navigation);
            this.props.navigation.navigate('PrimaryNav');
            this.props.endLoading();
            return res;
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

  renderButton(props) {
    return (
      <View style={styles.buttonContainerStyle}>
        {this.props.pageSettings.selectedTab === 0 && (
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
        {this.props.pageSettings.selectedTab === 1 && (
          <View>
            <SocialIcon
                  title='Sign In With Facebook'
                  button
                  onPress={() => props.onFacebookRegister(this.props.navigation)}
                  type='facebook' />
            {/* <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => props.onFacebookRegister(this.props.navigation)}>
                <SocialIcon
                  title='Sign In With Facebook'
                  button
                  onPress={() => console.log('herer')}
                  type='facebook' />
              <Text style={styles.buttonStyle}>facebook</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.buttonContainer}
              // onPress={() => this.props.navigation.navigate('Account', {type: 'NEW', data: props.login})}>
              onPress={() => props.onRegister(
                              props.login.newEmail,
                              props.login.newPassword,
                              this.props.navigation)}>
              <Text style={styles.buttonStyle}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  render() {
    // console.log(this.props);
    const {login, pageSettings, validationErrors} = this.props;
    const {changeTab} = this.props;

    const loginTab = () => {
      return (
        <Text
          onPress={() => changeTab(0)}
          style={[
            styles.tabStyle,
            pageSettings.selectedTab === 0
              ? styles.selectedTabStyle
              : {},
          ]}>
          Login
        </Text>
      );
    };
    const registerTab = () => {
      return (
        <Text
          onPress={() => changeTab(1)}
          style={[
            styles.tabStyle,
            pageSettings.selectedTab === 1
              ? styles.selectedTabStyle
              : {},
          ]}>
          Sign In
        </Text>
      );
    };

    const buttons = [{ element: loginTab }, { element: registerTab }];
    // console.log(this.props);
    const loginComponent = () => {
      return (
        <KeyboardAvoidingView style={styles.loginContainerStyle}>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Email"
              style={styles.inputStyle}
              autoCorrect={false}
              value={login.email}
              onChangeText={text => this.props.changeFieldValue('email', text)}
              leftIcon={<MaterialCommunityIcons name="email" size={30} color="#4F8EF7" />}
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
              leftIcon={<MaterialCommunityIcons name="onepassword" size={30} color="#4F8EF7" />}
              errorStyle={{color: 'red'}}
              // label="Password"
              errorMessage={this.props.login.error}
              secureTextEntry={true} />
          </View>
        </KeyboardAvoidingView>
      );
    };

    const registerComponent = () => {
      return (
        <KeyboardAvoidingView style={styles.loginContainerStyle}>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Enter Email"
              style={styles.inputStyle}
              autoCorrect={false}
              value={login.newEmail}
              onChangeText={text =>
                this.props.changeFieldValue('newEmail', text)
              }
              leftIcon={<MaterialCommunityIcons name="email" size={30} color="#4F8EF7" />}
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
              leftIcon={<MaterialCommunityIcons name="textbox-password" size={30} color="#4F8EF7" />}
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
              leftIcon={<MaterialCommunityIcons name="textbox-password" size={30} color="#4F8EF7" />}
              errorStyle={{color: 'red'}}
              errorMessage={validationErrors.newReEnteredPassError}
              // label="Re-Enter Password"
              secureTextEntry={true}/>
          </View>
        </KeyboardAvoidingView>
      );
    };

    return (
      <KeyboardAvoidingView style={styles.containerStyle}>
        <ScrollView style={styles.scrollerWrapper}>
          <View style={styles.wrapper}>
            <View style={styles.mainIconContainerStyle}>
              <Image
                style={{width: 130, height: 130}}
                source={require('./../../img/login-main-icn-2.png')}/>
            </View>
            {/* <View style={styles.tabContainerStyle}> */}
            <Tabs>
              <Tab
                heading={<TabHeading style={styles.tabHeader}>
                          <SimpleLineIcons size={20} name="login" />
                          <BaseText>Login</BaseText>
                        </TabHeading>}>
                {loginComponent()}
              </Tab>
              <Tab
                heading={<TabHeading style={styles.tabHeader}>
                          <MaterialCommunityIcons size={24} name="account-plus-outline" />
                          <BaseText>Register</BaseText>
                        </TabHeading>}>
                {registerComponent()}
              </Tab>
            </Tabs>
            {/* <ButtonGroup
              selectedTextStyle={{color: 'red'}}
              selectedIndex={1}
              buttons={buttons}
              containerStyle={styles.tabContainerStyle} />
            {pageSettings.selectedTab === 0 && loginComponent()}
            {pageSettings.selectedTab === 1 && registerComponent()}
            <View>{this.renderButton(this.props)}</View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    // backgroundColor: '#00868b',
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
  selectedArrowStyle: {},
  loginContainerStyle: {
    flexDirection: 'column',
    paddingTop: 30,
    backgroundColor: '#0f344c',
    height: '100%',
  },
  buttonContainerStyle: {
    // backgroundColor: '#2980b6',
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
  Object.assign({}, loginActions, {startLoading, endLoading})
)(LoginForm);
