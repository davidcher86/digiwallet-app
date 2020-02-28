import {
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';
import LoginStack from './LoginNav';
import PrimaryNav from './PrimaryNav';

const AppNavigator = createSwitchNavigator({
  Login: LoginStack,
  PrimaryNav: PrimaryNav,
  // navigationOptions: ({navigation}) => ({
  //   headerMode: 'screen',
  // }),
  }
);

export default createAppContainer(AppNavigator);
