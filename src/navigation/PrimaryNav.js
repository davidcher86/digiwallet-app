import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
import {FAB} from 'react-native-paper';
import {Input, Icon} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   ScrollView,
//   DrawerItems,
//   View,
//   Button,
//   StyleSheet,
//   TouchableHighlight,
//   Text,
// } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Account from './../components/account/Account';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';
import Transactions from './../components/transactions/Transactions';
import BottomTransactionsStack from './BottomTransactionNav';
import {removeUID} from './../components/common/Actions';
import TransactionsStack from './BottomTransactionNav';

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.containertopRow}>
          <Image
            style={styles.imageTopRow}
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2014/04/05/12/20/man-316917_960_720.jpg',
            }}
          />
        </View>
        <View style={styles.containerBottom}>
          <TouchableOpacity
            onPress={() => navigate('HomePage')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={styles.txtBottom}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Dashboard')}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={styles.txtBottom}>Dashboard</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Account', {type: 'EDIT'})}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={styles.txtBottom}>Account</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Transactions', {group: 'Daily'})}
            style={styles.containerBottomItem}>
            <View style={styles.button}>
              <Text style={styles.txtBottom}>Transactions</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerLogout}>
          <TouchableOpacity
            onPress={() => {
              navigate('Settings');
            }}
            style={styles.containerBottomItemLogout}>
            <View style={styles.button}>
              <Feather name="settings" size={21} color="#4F8EF7" />
              <Text style={styles.txtBottom}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              removeUID();
              navigate('Login');
            }}
            style={styles.containerBottomItemLogout}>
            <View style={styles.button}>
              <AntDesign name="logout" size={21} color="#4F8EF7" />
              <Text style={styles.txtBottom}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// class NavigationDrawerStructure extends Component {
//   //Structure for the navigatin Drawer
//   toggleDrawer = () => {
//     //Props to open/close the drawer
//     this.props.navigationProps.toggleDrawer();
//   };
//   render() {
//     return (
//       <View style={{flexDirection: 'row'}}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           {/*Donute Button Image */}
//           <Text>dsdg</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

const HomePage_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: HomePage,
    navigationOptions: ({navigation}) => ({
      title: 'Demo Screen 1',
      headerShown: false,
    }),
  },
});

const Dashboard_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: Dashboard,
    navigationOptions: ({navigation}) => ({
      title: 'Demo Screen 2',
      headerShown: false,
    }),
  },
});

const EDIT = 'EDIT';
const Account_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: Account,
    params: {type: EDIT},
    navigationOptions: ({route, navigation}) => ({
      title: 'Demo Screen 2',
      headerShown: false,
    }),
  },
});

const Transactions_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: BottomTransactionsStack,
    // screen: Transactions,
    navigationOptions: ({navigation}) => ({
      title: 'Demo Screen 2',
      headerShown: false,
    }),
  },
});

const PrimaryNav = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    HomePage: {
      //Title
      screen: HomePage_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 1',
      },
    },
    Dashboard: {
      //Title
      screen: Dashboard_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    Account: {
      //Title
      screen: Account_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    Transactions: {
      //Title
      screen: Transactions_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
  },
  {
    // contentComponent: DrawerWithLogoutButton,
    initialRouteName: 'HomePage',
    contentComponent: DrawerContainer,
    edgeWidth: 25,
    headerMode: 'none',
    unmountInactiveRoutes: true,
  },
);

// const PrvimaryNav = createDrawerNavigator(
//   {
//     HomePage: {
//       screen: HomePage,
//       navigationOptions: {
//         drawerLabel: 'Home',
//         headerTitle: 'iohoiuh',
//         drawerLockMode: 'locked-closed',
//         // drawerLabel: () => null, //hide header if not needed so whole screen slide
//       },
//     },
//     Account: {
//       screen: Account,
//       navigationOptions: {
//         drawerLockMode: 'locked-closed',
//         drawerLabel: 'Account Details',
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       },
//     },
//     Dashboard: {
//       screen: Dashboard,
//       navigationOptions: {
//         headerRight: <Text>Info</Text>,
//         drawerLabel: 'Dashboard',
//         drawerLockMode: 'locked-closed',
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       },
//     },
//     Transactions: {
//       // screen: Transactions,
//       screen: TransactionsStack,
//       navigationOptions: {
//         drawerLabel: 'HomePage',
//         drawerLockMode: 'locked-closed',
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       },
//     },
//   },
//   {
//     // contentComponent: DrawerWithLogoutButton,
//     initialRouteName: 'HomePage',
//     drawerType: 'slide',
//     drawerWidth: 100,
//     contentComponent: DrawerContainer,
//     headerMode: 'none',
//     unmountInactiveRoutes: true,
//   },
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17BED0',
    zIndex: 500,
  },
  containertopRow: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBottom: {
    marginLeft: 10,
    color: '#E6FAFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '100',
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2,
      },
      android: {
        borderRadius: 80,
      },
    }),
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  containertopRowText: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  containerBottom: {
    backgroundColor: '#17BED0',
  },
  containerBottomItem: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: '#E6FAFF',
    borderBottomWidth: 0.5,
  },
  containerLogout: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  containerBottomItemLogout: {
    padding: 10,
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    borderBottomColor: '#E6FAFF',
    borderBottomWidth: 0.5,
  },
});

export default PrimaryNav;
