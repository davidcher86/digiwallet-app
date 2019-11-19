import {createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Account from './../components/account/Account';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';

const PrimaryNav = createStackNavigator({
  HomePage: { screen: HomePage },
  Account: { screen: Account },
  Dashboard: { screen: Dashboard }
});

export default PrimaryNav;
