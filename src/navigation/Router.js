/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import Dashboard from './../components/dashboard/Dashboard';
import SignIn from './screens/SignIn';

import { StackNavigator, TabNavigator } from 'react-navigation';

// ...

import Home from './screens/Home';
import Profile from './screens/Profile';

export const SignedIn = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='home' size={30} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user" size={30} color={tintColor} />
      )
    }
  }
});