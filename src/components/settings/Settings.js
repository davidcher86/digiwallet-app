import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  StatusBar,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
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
  Input as InputHeader,
  Button as BaseBtn,
  ListItem,
  Text as BaseText,
} from 'native-base';

import * as actions from './settingsActions';
import {DARK_MODE} from './../Styles';

class SettingsContainer extends Component {
  componentDidMount() {
    this.props.setValue('categoryData', this.props.profile.categoryData);
  }

  render() {
    const {navigation} = this.props;
    // console.log(this.props.settings);
    return (
      <Container>
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
            <ListItem itemDivider>
              <Text>Disaplay</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Dark Mode</Text>
              </Left>
              <Right>
                <Switch
                  // style={{ marginTop: 30 }}
                  onValueChange={() => this.props.setValue('darkMode', !this.props.settings.darkMode)}
                  value={this.props.settings.darkMode}
                />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

class MainCategoriesContainer extends Component {
  constructor(props) {
    super(props);

    // this.onItemPress = this.onItemPress.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  // onItemPress(item) {
  //   Alert.alert('Alert', item + ' Pressed', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
  //     cancelable: true,
  //   });
  // }
  componentDidMount() {
    var mainCategories = [];

    for (var key in this.props.profile.categoryData) {
      mainCategories.push(key);
    }

    this.props.setValue('newCategory', '');
    this.props.setValue('mainCategoryList', mainCategories);
  }

  onSelectionChanged(selectedItems) {
    this.props.setValue('mainCategoryList', selectedItems);
  }

  onSort(newListDataArray) {
    this.props.setValue('mainCategoryList', newListDataArray);
  }

  onDeleteItem(key) {
    var categoryData = this.props.settings.categoryData;
    delete categoryData[key];
    var mainCategories = [];
    for (var index in categoryData) {
      mainCategories.push(index);
    }

    this.props.setValue('mainCategoryList', mainCategories);
    this.props.setValue('categoryData', categoryData);
    this.props.handleUpdaeCategories(categoryData, this.props.identity.uid);
  }

  onAddItem(item) {
    if (item !== '') {
      var categoryData = this.props.settings.categoryData;
      var mainCategoryList = this.props.settings.mainCategoryList;

      categoryData[item] = ['other'];
      mainCategoryList.push(item);

      this.props.setValue('mainCategoryList', mainCategoryList);
      this.props.setValue('categoryData', categoryData);
      this.props.setValue('newCategory', '');
      this.props.handleUpdaeCategories(categoryData, this.props.identity.uid);
    }
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
            <View onPress={() => console.log('sdsfsdf')} style={{width: '100%', height: 40, alignItems: 'flex-end', padding: 0}}>
              <MaterialCommunityIcons
                onPress={() => this.onDeleteItem(item)}
                name="delete-circle-outline"
                size={30}
                color="#4F8EF7"
                style={{marginRight: 15, marginTop: 4}}/>
            </View>
            <View style={{width: '100%', height: 40, flexDirection: 'row', backgroundColor: 'yellow'}}>
              {/* <View style={{flex: 1, padding: 0, height: 20}}> */}
              <List style={{flex: 1, backgroundColor: 'green', padding: 0, height: 40}}>
                <ListItem style={{padding: 0, height: 40}}>
                  <Left>
                    <View style={{textAlign: 'right', paddingLeft: 12}}>
                      <Text onLongPress={() => drag()} style={{position: 'relative', left: -15}}>
                        <MaterialIcons name="more-vert" size={30} color="#4F8EF7"/>
                      </Text>
                    </View>
                    {/* <MaterialIcons name="more-vert" size={30} color="#4F8EF7" style={{marginRight: 7}}/> */}
                    <Text style={{marginTop: 7}} onLongPress={() => drag()}>{item}</Text>
                  </Left>
                  <Right>
                    <Icon
                      onPress={() => navigation.navigate('SubCategories', {category: item})}
                      active
                      name="arrow-forward"
                    />
                  </Right>
                </ListItem>
              </List>
              {/* </View> */}
              {/* <Text onLongPress={() => drag()} style={{marginLeft: 6}}>{'item'}</Text>
              <Text style={{marginLeft: 6}}>{item}</Text> */}
            </View>
          </SwipeRow>
        </View>
      );
    };
    // console.log(this.props.profile);

    const Header = () => {
      return (
        <View style={{width: '100%', height: 40, backgroundColor: 'yellow', flexDirection: 'row'}}>
          <MaterialIcons style={{marginTop: 15, marginLeft: 17, marginRight: 7, width: '5%'}} name="create" size={20} color="#4F8EF7"/>
          <InputHeader
            style={{width: '85%', marginBottom: 15}}
            placeholder="Create Categry"
            value={this.props.settings.newCategory}
            onChangeText={(e) => this.props.setValue('newCategory', e)} />
          <Entypo
            style={{width: '10%', marginTop: 15}}
            onPress={() => this.onAddItem(this.props.settings.newCategory)}
            name="add-to-list"
            size={20}
            color="#4F8EF7"/>
        </View>
      );
    };
    // console.log(this.props);
    return (
      <View style={{flex: 1}}>
        {Header()}
        <MultiSelectSortableFlatlist
          ref={MultiSelectSortableFlatlist => (this.MultiSelectSortableFlatlist = MultiSelectSortableFlatlist)}
          contentContainerStyle={{paddingTop: 0}}
          // ListHeaderComponentStyle={{padding: 0, margin: 0}}
          // ListHeaderComponent={() => Header()}
          // ListHeaderComponent={
          //   <BaseHeader
          //     SelectAll={() => this.MultiSelectSortableFlatlist.SelectAll()}
          //     DeselectAll={() => this.MultiSelectSortableFlatlist.DeselectAll()}
          //   />
          // }
          // style={{paddingTop: 0, borderWidth: 2}}
          mode="manual"
          data={this.props.settings.mainCategoryList}
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

class SubCategoriesContainer extends Component {
  constructor(props) {
    super(props);

    // this.onItemPress = this.onItemPress.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  componentDidMount() {
    var mainCategory = this.props.navigation.getParam('category');
    this.props.setValue('newCategory', '');
    this.props.setValue('subCategoryList', this.props.settings.categoryData[mainCategory]);
  }

  onSelectionChanged(selectedItems) {
    this.setState({ data: selectedItems });
  }

  onSort(newListDataArray) {
    this.props.setValue('subCategoryList', newListDataArray);
    this.setState({ data: newListDataArray });
  }

  onDeleteItem(index) {
    var mainCategory = this.props.navigation.getParam('category');
    var newListDataArray = this.props.settings.categoryData[mainCategory];
    var categoryData = this.props.settings.categoryData;
    newListDataArray.splice(index, 1);
    categoryData[mainCategory] = newListDataArray;
    this.props.setValue('subCategoryList', newListDataArray);
    this.props.setValue('categoryData', categoryData);
    this.props.handleUpdaeCategories(categoryData, this.props.identity.uid);
  }

  onAddItem(item) {
    if (item !== '') {
      var mainCategory = this.props.navigation.getParam('category');
      var categoryData = this.props.settings.categoryData;
      var newList = categoryData[mainCategory];

      newList.push(item);
      categoryData[mainCategory] = newList;

      this.props.setValue('newCategory', '');
      this.props.setValue('subCategoryList', newList);
      this.props.setValue('categoryData', categoryData);
      this.props.handleUpdaeCategories(categoryData, this.props.identity.uid);
    }
  }

  render() {
    const Item = (item, index, selected, drag) => {
      return (
        <View style={{borderWidth: 1, height: 40}} Selected={selected}>
          <SwipeRow
            // onLongPress={() => console.log('sdsfsdf')}
            disableRightSwipe={true}
            rightOpenValue={-75} >
            <View onPress={() => console.log('sdsfsdf')} style={{width: '100%', height: 40, alignItems: 'flex-end', padding: 0}}>
              <MaterialCommunityIcons
                onPress={() => this.onDeleteItem(index)}
                name="delete-circle-outline"
                size={30}
                color="#4F8EF7"
                style={{marginRight: 15, marginTop: 4}}/>
            </View>
            <View style={{width: '100%', height: 40, flexDirection: 'row', backgroundColor: 'yellow'}}>
              <List style={{flex: 1, backgroundColor: 'green', padding: 0, height: 40}}>
                <ListItem style={{padding: 0, height: 40}}>
                  <Left>
                    <View style={{textAlign: 'right', paddingLeft: 12}}>
                      <Text onLongPress={() => drag()} style={{position: 'relative', left: -15}}>
                        <MaterialIcons name="more-vert" size={30} color="#4F8EF7"/>
                      </Text>
                    </View>
                    {/* <MaterialIcons name="more-vert" size={30} color="#4F8EF7" style={{marginRight: 7}}/> */}
                    <Text style={{marginTop: 7}} onLongPress={() => drag()}>{item}</Text>
                  </Left>
                </ListItem>
              </List>
            </View>
          </SwipeRow>
        </View>
      );
    };

    const Header = () => {
      return (
        <View style={{width: '100%', height: 40, backgroundColor: 'yellow', flexDirection: 'row'}}>
          <MaterialIcons style={{marginTop: 15, marginLeft: 17, marginRight: 7, width: '5%'}} name="create" size={20} color="#4F8EF7"/>
          <InputHeader
            style={{width: '85%', marginBottom: 15}}
            placeholder="Create Categry"
            value={this.props.settings.newCategory}
            onChangeText={(e) => this.props.setValue('newCategory', e)} />
          <Entypo
            style={{width: '10%', marginTop: 15}}
            onPress={() => this.onAddItem(this.props.settings.newCategory)}
            name="add-to-list"
            size={20}
            color="#4F8EF7"/>
        </View>
      );
    };

    return (
      <View style={{flex: 1}}>
        {Header()}
        <MultiSelectSortableFlatlist
          ref={MultiSelectSortableFlatlist => (this.MultiSelectSortableFlatlist = MultiSelectSortableFlatlist)}
          contentContainerStyle={{paddingTop: 0}}
          ListHeaderComponentStyle={styles.HeaderStyle}
          // ListHeaderComponent={
          //   <Header
          //     SelectAll={() => this.MultiSelectSortableFlatlist.SelectAll()}
          //     DeselectAll={() => this.MultiSelectSortableFlatlist.DeselectAll()}
          //   />
          // }
          mode="manual"
          data={this.props.settings.subCategoryList}
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

let mapStateToProps = state => {
  return {
    settings: state.settings,
    profile: state.profile,
    identity: state.identity,
  };
};

const SettingsScreen = connect(
  mapStateToProps,
  actions,
)(SettingsContainer);

const MainCategories = connect(
  mapStateToProps,
  actions,
)(MainCategoriesContainer);

const SubCategories = connect(
  mapStateToProps,
  actions,
)(SubCategoriesContainer);

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
