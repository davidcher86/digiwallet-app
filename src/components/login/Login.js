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

  // renderButton(props) {
  //   return (
  //     <View style={styles.buttonContainerStyle}>
  //       {this.props.pageSettings.selectedTab === 0 && (
  //         <TouchableOpacity
  //           style={styles.buttonContainer}
  //           onPress={() =>
  //             props.onLoginPress(
  //               props.login.email,
  //               props.login.password,
  //               this.props.navigation,
  //             )
  //           }>
  //           <Text style={styles.buttonStyle}>LOGIN</Text>
  //         </TouchableOpacity>
  //       )}
  //       {this.props.pageSettings.selectedTab === 1 && (
  //         <View>
  //           <SocialIcon
  //                 title='Sign In With Facebook'
  //                 button
  //                 onPress={() => props.onFacebookRegister(this.props.navigation)}
  //                 type='facebook' />
  //           {/* <TouchableOpacity
  //             style={styles.buttonContainer}
  //             onPress={() => props.onFacebookRegister(this.props.navigation)}>
  //               <SocialIcon
  //                 title='Sign In With Facebook'
  //                 button
  //                 onPress={() => console.log('herer')}
  //                 type='facebook' />
  //             <Text style={styles.buttonStyle}>facebook</Text>
  //           </TouchableOpacity> */}
  //           <TouchableOpacity
  //             style={styles.buttonContainer}
  //             // onPress={() => this.props.navigation.navigate('Account', {type: 'NEW', data: props.login})}>
              // onPress={() => props.onRegister(
              //                 props.login.newEmail,
              //                 props.login.newPassword,
              //                 this.props.navigation)}>
  //             <Text style={styles.buttonStyle}>SIGN IN</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )}
  //     </View>
  //   );
  // }

  render() {
    const {login, pageSettings, validationErrors} = this.props;
    const {changeTab} = this.props;

    // console.log(this.props);
    const loginComponent = () => {
      return (
        <KeyboardAvoidingView style={styles.tabContainerStyle}>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Email"
              style={styles.inputStyle}
              autoCorrect={false}
              value={login.email}
              inputStyle={{color: '#f5f5f5'}}
              onChangeText={text => this.props.changeFieldValue('email', text)}
              leftIcon={<MaterialCommunityIcons name="email" size={30} color="#4F8EF7" style={{marginRight: 7}}/>}
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
              inputStyle={{color: '#f5f5f5'}}
              onChangeText={text =>
                this.props.changeFieldValue('password', text)
              }
              leftIcon={<MaterialCommunityIcons name="onepassword" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
              errorStyle={{color: 'red'}}
              // label="Password"
              errorMessage={this.props.login.error}
              secureTextEntry={true}
              placeholderTextColor="rgba(225,225,225,0.7)" />
          </View>
          <View style={styles.buttonContainerStyle}>
            <View style={{paddingLeft: 7, paddingRight: 7}}>
              <Button
                title="Login"
                onPress={() =>
                  this.props.onLoginPress(
                  this.props.login.email,
                  this.props.login.password,
                  this.props.navigation,
                )}
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
              value={login.newEmail}
              inputStyle={{color: '#f5f5f5'}}
              onChangeText={text =>
                this.props.changeFieldValue('newEmail', text)
              }
              leftIcon={<MaterialCommunityIcons name="email" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
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
              inputStyle={{color: '#f5f5f5'}}
              onChangeText={text =>
                this.props.changeFieldValue('newPassword', text)
              }
              leftIcon={<MaterialCommunityIcons name="textbox-password" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
              errorStyle={{color: 'red'}}
              // label="Enter New Password"
              errorMessage={validationErrors.newPassError}
              secureTextEntry={true}
              placeholderTextColor="rgba(225,225,225,0.7)"/>
          </View>
          <View style={styles.inputConntainerStyle}>
            <Input
              placeholder="Re-Enter Password"
              style={styles.inputStyle}
              value={login.reEnteredPassword}
              inputStyle={{color: '#f5f5f5'}}
              onChangeText={text =>
                this.props.changeFieldValue('reEnteredPassword', text)
              }
              leftIcon={<MaterialCommunityIcons name="textbox-password" size={30} color="#4F8EF7" style={{marginRight: 7}} />}
              errorStyle={{color: 'red'}}
              errorMessage={validationErrors.newReEnteredPassError}
              // label="Re-Enter Password"
              secureTextEntry={true}
              placeholderTextColor="rgba(225,225,225,0.7)"/>
          </View>
          <View style={styles.buttonContainerStyle}>
            <View style={{paddingLeft: 7, paddingRight: 7}}>
              <Button
                title="Register"
                onPress={() => this.props.onRegister(
                  this.props.login.newEmail,
                  this.props.login.newPassword,
                  this.props.navigation)}
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
    pageSettings: state.login.pageSettings,
    validationErrors: state.login.validationErrors,
  };
};

export default connect(
  mapStateToProps,
  Object.assign({}, loginActions, {startLoading, endLoading})
)(LoginForm);
