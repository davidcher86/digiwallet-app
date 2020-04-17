import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
import {FAB} from 'react-native-paper';
import {Input, Icon} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Accordion} from 'react-native-accordion';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
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
  Easing,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Platform,
} from 'react-native';
import Account from './../components/account/Account';
import HomePage from './../components/homePage/HomePage';
import Dashboard from './../components/dashboard/Dashboard';
import Transactions from './../components/transactions/Transactions';
import Settings from './../components/settings/Settings';
import BottomTransactionsStack from './BottomTransactionNav';
import {removeUID} from './../components/common/Actions';
import TransactionsStack from './BottomTransactionNav';
import Header from './../components/common/Header';
import {DARK_MODE} from './../components/Styles';

// var Accordion = require('react-native-accordion');

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemTransactionsOpen: false,
      itemTransactionsHeight: new Animated.Value(0),
      itemDashboardOpen: false,
      itemDashboardHeight: new Animated.Value(0),
      dashboardIconRotation: new Animated.Value(0),
      transactionsIconRotation: new Animated.Value(0)
    };

    this.expandItem = this.expandItem.bind(this);
    this.closeItem = this.closeItem.bind(this);
    this.toggleTransactionExpand = this.toggleTransactionExpand.bind(this);
    this.toggleDashboardExpand = this.toggleDashboardExpand.bind(this);
    this.rotateDown = this.rotateDown.bind(this);
    this.rotateUp = this.rotateUp.bind(this);
  }

  rotateDown = (type) => {
    switch (type) {
      case 'TRANSACTION':
        Animated.timing(this.state.transactionsIconRotation, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear
        }).start();
        break;
      case 'DASHBOARD':
        Animated.timing(this.state.dashboardIconRotation, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear
        }).start();
        break;
    }
  };

  rotateUp = (type) => {
    // console.log(type);
    switch (type) {
      case 'TRANSACTION':
        Animated.timing(this.state.transactionsIconRotation, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start();
        break;
      case 'DASHBOARD':
        Animated.timing(this.state.dashboardIconRotation, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear
        }).start();
        break;
    }
  };

  expandItem = (type) => {
    switch (type) {
      case 'TRANSACTION':
        Animated.timing(this.state.itemTransactionsHeight, {
          toValue: 170,
          duration: 400,
          easing: Easing.linear,
          // useNativeDriver: true
        }).start();
        break;
      case 'DASHBOARD':
        Animated.timing(this.state.itemDashboardHeight, {
          toValue: 120,
          duration: 400,
          easing: Easing.linear,
          // useNativeDriver: true
        }).start();
        break;
    }
  };

  closeItem = (type) => {
    switch (type) {
      case 'TRANSACTION':
        Animated.timing(this.state.itemTransactionsHeight, {
          toValue: 0,
          duration: 400,
          easing: Easing.linear,
          // useNativeDriver: true
        }).start();
        break;
      case 'DASHBOARD':
        Animated.timing(this.state.itemDashboardHeight, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          // useNativeDriver: true
        }).start();
        break;
    }
  };

  toggleDashboardExpand() {
    if (this.state.itemDashboardOpen) {
      this.setState({itemDashboardOpen: false});
      this.closeItem('DASHBOARD');
      this.rotateUp('DASHBOARD');
    } else {
      this.setState({itemDashboardOpen: true});
      this.expandItem('DASHBOARD');
      this.rotateDown('DASHBOARD');
    }
  }

  toggleTransactionExpand() {
    if (this.state.itemTransactionsOpen) {
      this.setState({itemTransactionsOpen: false});
      this.closeItem('TRANSACTION');
      this.rotateUp('TRANSACTION');
    } else {
      this.setState({itemTransactionsOpen: true});
      this.expandItem('TRANSACTION');
      this.rotateDown('TRANSACTION');
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    var rotateDashboardProp = this.state.dashboardIconRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    })

    var rotateTransactionsProp = this.state.transactionsIconRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    })

    const data = [
      {
          header: 'sectionHeader',
          member: [
              {
                  title: 'memberTitle',
                  content: 'content',
              },
          ]
      },
  ]

  const accountIcon = <MaterialCommunityIcons name="account" style={{marginRight: 7}} size={21} color="#4F8EF7" />;
  const expanceChartsIcon = <MaterialCommunityIcons name="view-dashboard" style={{marginRight: 7}} size={21} color="#4F8EF7" />;
  const moneyFlowChartsIcon = <MaterialCommunityIcons name="view-dashboard" style={{marginRight: 7}} size={21} color="#4F8EF7" />;
  const transactionsIcon = <Ionicons name="ios-wallet" style={{marginRight: 11}} size={21} color="#4F8EF7"/>
  const dashboardIcon = <MaterialCommunityIcons name="view-dashboard" style={{marginRight: 7}} size={21} color="#4F8EF7"/>;
  const homepageIcon = <MaterialCommunityIcons name="home" style={{marginRight: 7}} size={21} color="#4F8EF7"/>
  // console.log(this.state);
  const renderNavButton = (route, title, icon, hiddenBtn, type = null, group = null) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(route, {type: 'EDIT', group: group})}
        style={(hiddenBtn ? styles.containerHiddenItem : styles.containerBottomItem)}>
        <View style={styles.button}>
          {icon}
          <Text style={styles.txtBottom}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNavHeader = (title, icon, action, rotateIcon) => {
    return (
      <TouchableHighlight
        style={styles.containerBottomItem}
        onPress={action}>
        <View style={styles.button}>
            {icon}
          <Text style={styles.txtBottom}>{title}</Text>
          <Animated.View style={{transform: [{rotateX: rotateIcon}], alignSelf: 'flex-end' }}>
              <Ionicons name="ios-arrow-down" size={30} color={DARK_MODE.COLORS.ICON_COLOR} />
          </Animated.View>
        </View>
      </TouchableHighlight>
    );
  };

    return (
      <View style={styles.container}>
        <View style={styles.containertopRow}>
          <Image
            style={styles.imageTopRow}
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2014/04/05/12/20/man-316917_960_720.jpg',
            }} />
        </View>
        <View>
          <View style={styles.headerBorderItem}>
            {renderNavButton('HomePage', 'Home Page', homepageIcon, false)}
          </View>
          <Animated.View style={styles.headerBorderItem}>
            {renderNavHeader('Dashboard', dashboardIcon, () => this.toggleDashboardExpand(), rotateDashboardProp)}
            <Animated.View style={[styles.itemHiddenSection, {height: this.state.itemDashboardHeight}]}>
              {renderNavButton('ExpanceCharts', 'Expances', expanceChartsIcon, true)}
              {renderNavButton('MoneyFlowCharts', 'Money Flow', moneyFlowChartsIcon, true)}
              {renderNavButton('BalanceCharts', 'Balance', moneyFlowChartsIcon, true)}
            </Animated.View>
          </Animated.View>

          <View style={styles.headerBorderItem}>
            {renderNavButton('AccountEdit', 'Account', accountIcon, false, 'EDIT')}
          </View>

          <Animated.View style={styles.headerBorderItem}>
            {renderNavHeader('Transactions', transactionsIcon, () => this.toggleTransactionExpand(), rotateTransactionsProp)}
              <Animated.View style={[styles.itemHiddenSection, {height: this.state.itemTransactionsHeight}]}>
                {renderNavButton('Daily', 'Daily', expanceChartsIcon, true, null, 'Daily')}
                {renderNavButton('Weakly', 'Weakly', moneyFlowChartsIcon, true, null, 'Weakly')}
                {renderNavButton('Monthly', 'Monthly', expanceChartsIcon, true, null, 'Monthly')}
                {renderNavButton('Yearly', 'Yearly', transactionsIcon, true, null, 'Yearly')}
              </Animated.View>
          </Animated.View>
        </View>

        <View style={styles.containerLogout}>
          <TouchableOpacity
            onPress={() => navigate('Settings')}
            style={styles.containerBottomItemLogout}>
            <View style={styles.button}>
              <Feather name="settings" size={21} color="#4F8EF7" />
              <Text style={styles.txtBottom}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              removeUID();
              firebase.auth().signOut().then(function() {
                navigate('Login');
              }).catch(function(error) {
                // An error happened.
              });
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

const HomePage_StackNavigator = createStackNavigator({
  First: {
    screen: HomePage,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        height: 20, // Specify the height of your custom header
      },
      header: ({navigation}) => <Header navigation={navigation} title="Home Page" />,
    }),
  },
});

const Dashboard_StackNavigator = createStackNavigator({
  Second: {
    screen: Dashboard,
    navigationOptions: ({navigation}) => ({
      header: ({navigation}) => <Header navigation={navigation} title="Dashboard" />,
    }),
  },
});

const EDIT = 'EDIT';
const Account_StackNavigator = createStackNavigator({
  Second: {
    screen: Account,
    params: {type: EDIT},
    navigationOptions: ({route, navigation}) => ({
      header: ({navigation}) => <Header navigation={navigation} title="Account" accountFormType="EDIT" />,
    }),
  },
});

const Transactions_StackNavigator = createStackNavigator({
  Second: {
    screen: BottomTransactionsStack,
    // screen: Transactions,
    headerStyle: {height: 20},
    navigationOptions: ({navigation}) => ({
      header: ({navigation}) => <Header navigation={navigation} title="Transactions" />,
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
    AccountEdit: {
      //Title
      screen: Account_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    Settings: {
      //Title
      screen: Settings,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
        headerBackTitleVisible: true,
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
    initialRouteName: 'HomePage',
    // initialRouteName: 'Settings',
    contentComponent: DrawerContainer,
    edgeWidth: 25,
    headerMode: 'none',
    drawerWidth: '57%',
    drawerType: 'slide',
    unmountInactiveRoutes: true,
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#17BED0',
    backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
    zIndex: 500,
  },
  containertopRow: {
    // borderBottomWidth: 1,
    // borderColor: '#ddd',
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBottom: {
    width: '73%',
    marginLeft: 10,
    color: '#E6FAFF',
    textAlign: 'left',
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
  itemHiddenSection: {
    overflow: 'hidden',
    // justifyContent: 'center',
    // borderBottomWidth: 1,
    // borderStyle: 'dotted',
    backgroundColor: DARK_MODE.COLORS.LIST_HIDDEN_ITEM_COLOR,
    width: '100%',
  },
  containerHiddenItem: {
    padding: 10,
    paddingLeft: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
    // borderBottomColor: '#E6FAFF',
    // borderBottomWidth: 0.6,
  },
  headerBorderItem: {
    borderBottomColor: '#E6FAFF',
    borderBottomWidth: 0.6,
  },
  containerHiddenHeaderItem: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
    // borderBottomColor: '#E6FAFF',
    // borderBottomWidth: 0.6,
  },
  containerBottomItem: {
    padding: 10,
    // alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
    // borderBottomColor: '#E6FAFF',
    // borderBottomWidth: 0.6,
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
    // borderBottomColor: '#E6FAFF',
    // borderBottomWidth: 0.5,
  },
});

export default PrimaryNav;
