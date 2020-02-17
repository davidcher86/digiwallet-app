import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Container,
  Left,
  Right,
  Header as BaseHeader,
  Content,
  List,
  // SwipeRow,
  Button as BaseBtn,
  ListItem,
  Text as BaseText,
} from 'native-base';

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
  shopping: ['groceries', 'cloths', 'food'],
};

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: exampleData.car,
    };
  }

  render() {
    const {navigation} = this.props;

    const renderItem = ({item, index, drag, isActive}) => {
      return (
        <TouchableOpacity style={styles.itemContainer} onLongPress={drag}>
          <View style={styles.itemStyle}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 20,
              }}>
              }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    // console.log(this.props.navigation);
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>User Preference</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Categories</Text>
              </Left>
              <Right>
                <Icon
                  onPress={() => navigation.navigate('MainCategories')}
                  active
                  name="arrow-forward"
                />
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
      ListData: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      ItemsSelected: [],
    };

    // this.onItemPress = this.onItemPress.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  // onItemPress(item) {
  //   Alert.alert('Alert', item + ' Pressed', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
  //     cancelable: true,
  //   });
  // }
  componentDidMount() {
    var mainCategories = [];
    for (var key in exampleData) {
      mainCategories.push(key);
    }

    this.setState({ data: mainCategories });
  }

  onSelectionChanged(selectedItems) {
    this.setState({ data: selectedItems });
  }

  onSort(newListDataArray) {
    this.setState({ data: newListDataArray });
  }

  render() {
    const {navigation} = this.props;
    const Item = (item, index, selected, drag) => {
      return (
        <View style={{borderWidth: 1, height: 40}} Selected={selected}>
          <SwipeRow
            // onLongPress={() => console.log('sdsfsdf')}
            disableRightSwipe={true}
            rightOpenValue={-75} >
            <View onPress={() => console.log('sdsfsdf')} style={{padding: 5, width: '100%', height: 20, alignItems: 'flex-end'}}>
              <MaterialCommunityIcons name="delete-circle-outline" size={30} color="#4F8EF7" style={{marginRight: 7}}/>
            </View>
            <View style={{width: '100%', height: '100%', flexDirection: 'row', backgroundColor: 'yellow'}}>
              <View style={{flex: 1, paddingTop: 0}}>
                <List>
                  <ListItem style={{paddingTop: 0}}>
                    <Left>
                      <View style={{textAlign: 'right', paddingLeft: 12}}>
                        <Text onLongPress={() => drag()} style={{position: 'relative', left: -15, top: 3}}>
                          <MaterialIcons name="more-vert" size={30} color="#4F8EF7"/>
                        </Text>
                      </View>
                      {/* <MaterialIcons name="more-vert" size={30} color="#4F8EF7" style={{marginRight: 7}}/> */}
                      <Text style={{marginTop: 7}} onLongPress={() => drag()}>{item}</Text>
                    </Left>
                    <Right style={{marginTop: 7}}>
                      <Icon
                        onPress={() => navigation.navigate('SubCategories', {category: item})}
                        active
                        name="arrow-forward"
                      />
                    </Right>
                  </ListItem>
                </List>
              </View>
              {/* <Text onLongPress={() => drag()} style={{marginLeft: 6}}>{'item'}</Text>
              <Text style={{marginLeft: 6}}>{item}</Text> */}
            </View>
          </SwipeRow>
        </View>
      );
    };
    // console.log(this.state.data);
    return (
      <View style={{flex: 1}}>
        <MultiSelectSortableFlatlist
          ref={MultiSelectSortableFlatlist => (this.MultiSelectSortableFlatlist = MultiSelectSortableFlatlist)}
          contentContainerStyle={styles.ListContainer}
          ListHeaderComponentStyle={styles.HeaderStyle}
          // ListHeaderComponent={
          //   <Header
          //     SelectAll={() => this.MultiSelectSortableFlatlist.SelectAll()}
          //     DeselectAll={() => this.MultiSelectSortableFlatlist.DeselectAll()}
          //   />
          // }
          mode="manual"
          data={this.state.data}
          keyExtractor={(item, index) => item}
          // onItemTap={({ item, index }) => this.onItemPress(item)}
          onItemSelected={({ selectedItems, item, index, drag }) => this.onSelectionChanged(selectedItems)}
          onItemDeselected={({ selectedItems, item, index, drag }) => this.onSelectionChanged(selectedItems)}
          onSort={data => this.onSort(data)}
          renderItem={({ item, index, selected, drag }) => Item(item, index, selected, drag)}
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

    // this.onItemPress = this.onItemPress.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    var mainCategories = [];
    var mainCategory = this.props.navigation.getParam('category');
    for (var key in exampleData) {
      if (key === mainCategory) {
        for (let item in exampleData[key]) {
          mainCategories.push(exampleData[key][item]);
        }
      }
    }
    // console.log('category', this.props.navigation.getParam('category'));
    this.setState({ data: mainCategories });
  }

  onSelectionChanged(selectedItems) {
    this.setState({ data: selectedItems });
  }

  onSort(newListDataArray) {
    this.setState({ data: newListDataArray });
  }

  render() {
    const Item = (item, index, selected, drag) => {
      return (
        <View style={{borderWidth: 1, height: 40}} Selected={selected}>
          <SwipeRow
            // onLongPress={() => console.log('sdsfsdf')}
            disableRightSwipe={true}
            rightOpenValue={-75} >
            <View onPress={() => console.log('sdsfsdf')} style={{padding: 5, width: '100%', height: 20, alignItems: 'flex-end'}}>
              <MaterialCommunityIcons name="delete-circle-outline" size={30} color="#4F8EF7" style={{marginRight: 7}}/>
            </View>
            <View style={{width: '100%', height: '100%', flexDirection: 'row', backgroundColor: 'yellow'}}>
              <View style={{flex: 1, paddingTop: 0}}>
                <List>
                  <ListItem style={{paddingTop: 0}}>
                    <Left onLongPress={() => drag()}>
                      <View style={{textAlign: 'right', paddingLeft: 12}}>
                        <Text onLongPress={() => drag()} style={{position: 'relative', left: -15, top: 3}}>
                          <MaterialIcons name="more-vert" size={30} color="#4F8EF7"/>
                        </Text>
                      </View>
                      {/* <MaterialIcons name="more-vert" size={30} color="#4F8EF7" style={{marginRight: 7}}/> */}
                      <Text style={{paddingTop: 8}}>{item}</Text>
                    </Left>
                  </ListItem>
                </List>
              </View>
              {/* <Text onLongPress={() => drag()} style={{marginLeft: 6}}>{'item'}</Text>
              <Text style={{marginLeft: 6}}>{item}</Text> */}
            </View>
          </SwipeRow>
        </View>
      );
    };

    return (
      <View style={{flex: 1}}>
        <MultiSelectSortableFlatlist
          ref={MultiSelectSortableFlatlist => (this.MultiSelectSortableFlatlist = MultiSelectSortableFlatlist)}
          contentContainerStyle={styles.ListContainer}
          ListHeaderComponentStyle={styles.HeaderStyle}
          // ListHeaderComponent={
          //   <Header
          //     SelectAll={() => this.MultiSelectSortableFlatlist.SelectAll()}
          //     DeselectAll={() => this.MultiSelectSortableFlatlist.DeselectAll()}
          //   />
          // }
          mode="manual"
          data={this.state.data}
          keyExtractor={(item, index) => item}
          // onItemTap={({ item, index }) => this.onItemPress(item)}
          onItemSelected={({ selectedItems, item, index, drag }) => this.onSelectionChanged(selectedItems)}
          onItemDeselected={({ selectedItems, item, index, drag }) => this.onSelectionChanged(selectedItems)}
          onSort={data => this.onSort(data)}
          renderItem={({ item, index, selected, drag }) => Item(item, index, selected, drag)}
        />
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
        headerTruncatedBackTitle: 'back',
      },
    },
    MainCategories: {
      screen: MainCategories,
      navigationOptions: {
        headerShown: true,
        headerBackTitleVisible: true,
        title: 'Main Categories',
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
        // headerTruncatedBackTitle: '<',
      },
    },
    SubCategories: {
      screen: SubCategories,
      navigationOptions: {
        headerShown: true,
        headerBackTitleVisible: true,
        title: 'Sub Categories',
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
        // headerTruncatedBackTitle: '<',
      },
    },
  },
  {
    // initialRouteName: SubCategories,
    mode: 'modal',
  },
);

export default Settings;
