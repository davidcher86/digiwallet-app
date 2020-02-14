import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist'
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';
import { Container, Left, Right, Header as BaseHeader, Content, List, ListItem, Text as BaseText } from 'native-base';

import Header from './../common/Header';
import * as actions from './settingsActions';
import {DARK_MODE} from './../Styles';

// const exampleData = [...Array(20)].map((d, index) => ({
//   key: `item-${index}`, // For example only -- don't use index as your key!
//   label: index,
//   backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
// }))

const exampleData = {
  car: ['Gas', 'license Renewel', 'Insuranes'],
  'house Hold': ['Electric Bill', 'Water Bill', 'Gas Bill'],
};

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: exampleData.car,
    };
  }

  render() {
    const { navigation } = this.props;

    const renderItem = ({ item, index, drag, isActive }) => {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onLongPress={drag} >
          <View style={styles.itemStyle}>
            <Text 
              style={{ 
                fontWeight: 'bold', 
                color: 'white',
                fontSize: 20,}}>
                  {item}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }

    // console.log(this.props.navigation);
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <List>
            <ListItem>
              <Left>
                <Text>Categories</Text>
              </Left>
              <Right>
                <Icon  onPress={() => navigation.navigate('MainCategories')} active name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

class MainCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: exampleData.car,
    };
  }
  render() {
    const renderItem = ({ item, index, drag, isActive }) => {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onLongPress={drag} >
          <View style={styles.itemStyle}>
          <Text style={{ 
            fontWeight: 'bold', 
            color: 'white',
            fontSize: 20,
          }}>{item}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{flex: 1}}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => this.setState({ data })}
        />
      </View>
    );
  }
}

class SubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: exampleData.car,
    };
  }
  render() {
    const renderItem = ({ item, index, drag, isActive }) => {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onLongPress={drag} >
          <View style={styles.itemStyle}>
          <Text style={{ 
            fontWeight: 'bold', 
            color: 'white',
            fontSize: 20,
          }}>{item}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{flex: 1}}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => this.setState({ data })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    height: 200,
    paddingTop: StatusBar.currentHeight + hp(2),
  },
  itemContainer: {
    // padding: 6,
    height: 40,
    width: '100%',
    borderBottomWidth: 2,
    // backgroundColor: 'green',
  },
  itemStyle: {
    padding: 6,
    height: 40,
    flex: 1,
    backgroundColor: '#1e446b',
  },
  CardText: {
    textAlign: 'center',
  },
  HeaderStyle: {
    paddingHorizontal: wp(4),
  },
});

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    settings: state.settings,
  };
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
        headerBackTitleVisible: true,
        // title: 'Settings',
        // header: ({navigation}) => (
        //   <Header navigation={navigation} title="Settings" />
        // ),
        // headerStatusBarHeight: 20,
        headerTitleAlign: 'center',
        // headerBackground: DARK_MODE.COLORS.HEADER_COLOR,
        headerStyle: {
          height: 40,
          backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
        },
        mode: 'modal',
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTruncatedBackTitle: 'back',
      },
    },
    MainCategories: {
      screen: MainCategories,
      navigationOptions: {
        headerShown: true,
        headerBackTitleVisible: true,
        // title: 'Settings',
        // header: ({navigation}) => (
        //   <Header navigation={navigation} title="Settings" />
        // ),
        headerTitleAlign: 'center',
        headerBackTitleStyle: {color: 'white'},
        headerTitleStyle: {color: 'white'},
        // headerBackground: DARK_MODE.COLORS.HEADER_COLOR,
        headerStyle: {
          height: 40,
          backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
        },
        mode: 'modal',
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTruncatedBackTitle: '<',
      },
    },
    SubCategories: {
      screen: SubCategories,
      navigationOptions: {
        headerShown: true,
        headerBackTitleVisible: true,
        // title: 'Settings',
        // header: ({navigation}) => (
        //   <Header navigation={navigation} title="Settings" />
        // ),
        headerTitleAlign: 'center',
        headerBackTitleStyle: {color: 'white'},
        headerTitleStyle: {color: 'white'},
        // headerBackground: DARK_MODE.COLORS.HEADER_COLOR,
        headerStyle: {
          height: 40,
          backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
        },
        mode: 'modal',
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTruncatedBackTitle: '<',
      },
    },
  },
  {
    // contentComponent: DrawerWithLogoutButton,
    mode: 'modal',
  },
);

export default Settings;
