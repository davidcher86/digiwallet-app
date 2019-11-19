import {createDrawerNavigator, createAppContainer , createStackNavigator} from 'react-navigation';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';
import LoginStack from './LoginNav';
import PrimaryNav from './PrimaryNav';

const AppNavigator = createDrawerNavigator({
    Login: LoginStack,
    PrimaryNav: PrimaryNav,
});

export default createAppContainer(AppNavigator);