/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, AsyncStorage} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import * as loginActions from './loginActions';
import {getRememberedUser} from './../common/Actions';
// import {setIdentity} from './../identity/identityActions';

class LoginForm extends Component {
  componentDidMount() {
    this.getRememberedUser();

    // getRememberedUser()
    //   .then(res => {
    //     if (res !== null) {
    //       this.props.setIdentity(res);
    //       this.props.navigation.navigate('PrimaryNav');
    //     }
    //   });
  }

  getRememberedUser = async () => {
    try {
      const uid = await AsyncStorage.getItem('digiwalletUserUID');
      if (uid !== null) {
        this.props.setIdentity(uid);
        this.props.navigation.navigate('PrimaryNav');
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderButton(props) {
    const styles = {
      buttonContainerStyle: {
        backgroundColor: '#2980b6',
        paddingVertical: 15,
      },
      buttonStyle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
      },
    };

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
                            this.props.navigation)}
            // onPress={() => props.navigation.navigate('Account', {name: 'Jane'})}
            >
            <Text style={styles.buttonStyle}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    const styles = {
      containerStyle: {
        padding: 20,
      },
      labelStyle: {},
      inputStyle: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',
      },
      tabContainerStyle: {
        flexDirection: 'row',
      },
      tabStyle: {
        flex: 2,
        textAlign: 'center',
        padding: 7,
        justifyContent: 'space-between',
        backgroundColor: 'yellow',
      },
      selectedTabStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      },
      selectedArrowStyle: {},
      loginContainerStyle: {},
    };
    // console.log(this.props);
    const {login, pageSettings, validationErrors} = this.props;
    const {changeTab} = this.props;

    return (
      <View style={styles.containerStyle}>
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
          <View style={styles.loginContainerStyle}>
            <Input
              placeholder="user@gmail.com"
              style={styles.inputStyle}
              autoCorrect={false}
              value={login.email}
              // onChangeText={text => this.props.changeUsername(text)}
              onChangeText={text => this.props.changeFieldValue('email', text)}
              leftIcon={{name: 'mail'}}
              autoCapitalize="none"
              errorStyle={{color: 'red'}}
              placeholderTextColor="rgba(225,225,225,0.7)"
              label="Email"
            />
            <Input
              placeholder="123456"
              style={styles.inputStyle}
              value={login.password}
              // onChangeText={text => this.props.changePassword(text)}
              onChangeText={text =>
                this.props.changeFieldValue('password', text)
              }
              leftIcon={{name: 'mail'}}
              errorStyle={{color: 'red'}}
              errorMessage={this.props.login.error}
              secureTextEntry={true}
              label="Password"
            />
          </View>
        )}
        {pageSettings.selectedTab === 'signIn' && (
          <View style={styles.signInContainerStyle}>
            <Input
              placeholder="user@gmail.com"
              style={styles.inputStyle}
              autoCorrect={false}
              value={login.newEmail}
              // onChangeText={text => this.props.changeUsername(text)}
              onChangeText={text =>
                this.props.changeFieldValue('newEmail', text)
              }
              leftIcon={{name: 'mail'}}
              autoCapitalize="none"
              errorStyle={{color: 'red'}}
              errorMessage={validationErrors.newEmailError}
              placeholderTextColor="rgba(225,225,225,0.7)"
              label="Enter Email"
            />
            <Input
              placeholder="123456"
              style={styles.inputStyle}
              value={login.newPassword}
              // onChangeText={text => this.props.changePassword(text)}
              onChangeText={text =>
                this.props.changeFieldValue('newPassword', text)
              }
              leftIcon={{name: 'mail'}}
              errorStyle={{color: 'red'}}
              errorMessage={validationErrors.newPassError}
              secureTextEntry={true}
              label="Enter New Password"
            />
            <Input
              placeholder="123456"
              style={styles.inputStyle}
              value={login.reEnteredPassword}
              // onChangeText={text => this.props.changePassword(text)}
              onChangeText={text =>
                this.props.changeFieldValue('reEnteredPassword', text)
              }
              leftIcon={{name: 'mail'}}
              errorStyle={{color: 'red'}}
              errorMessage={validationErrors.newReEnteredPassError}
              secureTextEntry={true}
              label="Re-Enter Password"
            />
          </View>
        )}
        <View>{this.renderButton(this.props)}</View>
      </View>
    );
  }
}

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
