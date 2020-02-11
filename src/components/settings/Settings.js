import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';
import * as actions from './settingsActions';
import { DARK_MODE } from './../Styles';

class SettingsContainer extends Component {
    static navigationOptions = {
      title: 'Dashboard',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  
    render() {
      const styles = {
        containerStyle: {
          padding: 20,
        },
      };
  
      return (
        <View style={{flex: 1}}>
          <View style={styles.containerStyle}>
            <Text>{'Settings'}</Text>
          </View>
        </View>
      );
    }
  }
  
  const mapStateToProps = state => {
    return {dashboard: state.dashboard};
  };
  
  const SettingsScreen = connect(
    mapStateToProps,
    actions,
  )(SettingsContainer);

const Settings = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        headerShown: true,
        // title: 'Settings',
        header: () => <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />,
        headerTitleAlign: 'center',
        // headerBackground: DARK_MODE.COLORS.HEADER_COLOR,
        headerStyle: {backgroundColor: DARK_MODE.COLORS.HEADER_COLOR},
        mode: 'modal',
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTruncatedBackTitle: 'back',
        headerLeft:{label: 'back'},
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
      },
    },
    
  },
  {
    // contentComponent: DrawerWithLogoutButton,
    mode: 'modal',
  },
);

export default Settings;
