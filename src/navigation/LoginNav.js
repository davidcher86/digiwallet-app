import {createStackNavigator} from 'react-navigation-stack';
import LoginForm from './../components/login/Login';
import Account from './../components/account/Account';

const LoginStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginForm,
      navigationOptions: {
        headerShown: false,
        // title: 'Authentication',
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        headerShown: false,
        // title: 'Regiter Account',
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
  // {
  //   headerMode: 'float',
  //   initialRouteName: 'LoginScreen',
  //   navigationOptions: {
  //     headerStyle: {backgroundColor: '#E73536'},
  //     title: 'You are not logged in',
  //     headerTintColor: 'white',
  //   },
  // },
);

export default LoginStack;
