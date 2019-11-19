import {createStackNavigator} from 'react-navigation';
import LoginForm from './../components/login/Login';
import Account from './../components/account/Account';

const LoginStack = createStackNavigator({
        LoginScreen: {screen: LoginForm},
        Account: {screen: Account}
    },
    {
        headerMode: 'float',
        initialRouteName: 'LoginScreen',
        navigationOptions: {
            headerStyle: {backgroundColor: '#E73536'},
            title: 'You are not logged in',
            headerTintColor: 'white'
    }
  })
  
export default LoginStack;
