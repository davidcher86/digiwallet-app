import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

import Header from './../common/Header';
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
      <Container style={DARK_MODE.appContainer}>
        {/* <Header/> */}
        <Content>
          <List>
            <ListItem style={{backgroundColor: DARK_MODE.COLORS.BACKGROUND_COLOR}} itemDivider>
              <Text style={DARK_MODE.h3}>User Preference</Text>
            </ListItem>
            <ListItem style={{marginLeft: 0, paddingLeft: 35, backgroundColor: DARK_MODE.COLORS.LIST_ITEM_HEADER_COLOR}}>
              <Left>
                <Text style={DARK_MODE.h4}>Categories</Text>
              </Left>
              <Right>
                <Icon
                  onPress={() => navigation.navigate('MainCategories')}
                  active
                  color={DARK_MODE.COLORS.LABEL_COLOR}
                  name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem style={{backgroundColor: DARK_MODE.COLORS.BACKGROUND_COLOR}} itemDivider>
              <Text style={DARK_MODE.h3}>Disaplay</Text>
            </ListItem>
            <ListItem style={{marginLeft: 0, paddingLeft: 35, backgroundColor: DARK_MODE.COLORS.LIST_ITEM_HEADER_COLOR}}>
              <Left>
                <Text style={DARK_MODE.h4}>Dark Mode</Text>
              </Left>
              <Right>
                <Switch
                  // style={{ marginTop: 30 }}
                  onValueChange={() => this.props.setValue('darkMode', !this.props.settings.darkMode)}
                  value={this.props.settings.darkMode} />
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
    var mainCategories = JSON.parse(this.props.profile.sortedMainCategories);

    this.props.setValue('newCategory', '');
    this.props.setValue('mainCategoryList', mainCategories);
  }

  onSelectionChanged(selectedItems) {
    this.props.setValue('mainCategoryList', selectedItems);
  }

  onSort(newListDataArray) {
    this.props.setValue('mainCategoryList', newListDataArray);
    this.props.handleUpdaeSortedCategories(newListDataArray, this.props.identity.uid);
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
        <View style={{eight: 40}} Selected={selected}>
          <SwipeRow
            // onLongPress={() => console.log('sdsfsdf')}
            disableRightSwipe={true}
            rightOpenValue={-75} >
            <View
              onPress={() => console.log('sdsfsdf')}
              style={{width: '100%', height: 40, alignItems: 'flex-end', padding: 0, backgroundColor: DARK_MODE.COLORS.LIST_HIDDEN_ITEM_COLOR}}>
              <MaterialCommunityIcons
                onPress={() => this.onDeleteItem(item)}
                name="delete-circle-outline"
                size={30}
                color={DARK_MODE.COLORS.ICON_COLOR}
                style={{marginRight: 15, marginTop: 4}}/>
            </View>
            <View style={{width: '100%', height: 40, flexDirection: 'row'}}>
              {/* <View style={{flex: 1, padding: 0, height: 20}}> */}
              <List style={{flex: 1, backgroundColor: DARK_MODE.COLORS.LIST_ITEM_COLOR, padding: 0, height: 40}}>
                <ListItem style={{padding: 0, height: 40, marginLeft: 0}}>
                  <Left>
                    <View style={{textAlign: 'right', paddingLeft: 12}}>
                      <Text onLongPress={() => drag()} style={{position: 'relative'}}>
                        <MaterialIcons name="more-vert" size={30} color={DARK_MODE.COLORS.LIST_ITEM_ICON_COLOR}/>
                      </Text>
                    </View>
                    {/* <MaterialIcons name="more-vert" size={30} color="#4F8EF7" style={{marginRight: 7}}/> */}
                    <Text style={[DARK_MODE.h4, {marginTop: 7, marginLeft: 15}]} onLongPress={() => drag()}>{item}</Text>
                  </Left>
                  <Right>
                    <Icon
                      color={DARK_MODE.COLORS.LIST_ITEM_ICON_COLOR}
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
        <View style={{width: '100%', paddingTop: 5, height: 40, backgroundColor: DARK_MODE.COLORS.LIST_INPUT_BACKGROUND, flexDirection: 'row'}}>
          <MaterialIcons
            style={{marginTop: 7, marginLeft: 17, marginRight: 7, width: '5%'}}
            name="create"
            size={20}
            color={DARK_MODE.COLORS.ICON_COLOR}/>
          <View style={{width: '78%'}}>
            <Input
              style={{width: '45%'}}
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              placeholder="Create Categry"
              placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR}
              value={this.props.settings.newCategory}
              onChangeText={(e) => this.props.setValue('newCategory', e)} />
          </View>
          <Entypo
            style={{width: '10%', marginTop: 9}}
            onPress={() => this.onAddItem(this.props.settings.newCategory)}
            name="add-to-list"
            size={20}
            color={DARK_MODE.COLORS.ICON_COLOR}/>
        </View>
      );
    };
    // console.log(this.props);
    return (
      <View style={DARK_MODE.appContainer}>
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
    var mainCategory = this.props.navigation.getParam('category');
    var categoryData = this.props.settings.categoryData;
    categoryData[mainCategory] = newListDataArray;
    this.props.setValue('subCategoryList', newListDataArray);
    this.setState({ data: newListDataArray });
    this.props.handleUpdaeCategories(categoryData, this.props.identity.uid);
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
        <View style={{height: 40, backgroundColor: DARK_MODE.COLORS.LIST_ITEM_COLOR}} Selected={selected}>
          <SwipeRow
            // onLongPress={() => console.log('sdsfsdf')}
            disableRightSwipe={true}
            rightOpenValue={-75} >
            <View onPress={() => console.log('sdsfsdf')} style={{width: '100%', height: 40, alignItems: 'flex-end', padding: 0, backgroundColor: DARK_MODE.COLORS.LIST_HIDDEN_ITEM_COLOR}}>
              <MaterialCommunityIcons
                onPress={() => this.onDeleteItem(index)}
                name="delete-circle-outline"
                size={30}
                color={DARK_MODE.COLORS.ICON_COLOR}
                style={{marginRight: 15, marginTop: 4}}/>
            </View>
            <View style={{width: '100%', height: 40, flexDirection: 'row', backgroundColor: 'yellow'}}>
              <List style={{flex: 1, backgroundColor: DARK_MODE.COLORS.LIST_ITEM_COLOR, padding: 0, height: 40}}>
                <ListItem style={{padding: 0, height: 40, marginLeft: 0}}>
                  <Left>
                    <View style={{textAlign: 'right', paddingLeft: 12}}>
                      <Text onLongPress={() => drag()} style={{position: 'relative'}}>
                        <MaterialIcons name="more-vert" size={30} color={DARK_MODE.COLORS.LIST_ITEM_ICON_COLOR} />
                      </Text>
                    </View>
                    {/* <MaterialIcons name="more-vert" size={30} color="#4F8EF7" style={{marginRight: 7}}/> */}
                    <Text style={[DARK_MODE.h4, {marginTop: 7, marginLeft: 15}]} onLongPress={() => drag()}>{item}</Text>
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
        <View style={{width: '100%', paddingTop: 5, height: 40, backgroundColor: DARK_MODE.COLORS.LIST_INPUT_BACKGROUND, flexDirection: 'row'}}>
          <MaterialIcons
            style={{marginTop: 7, marginLeft: 17, marginRight: 7, width: '5%'}}
            name="create"
            size={20}
            color={DARK_MODE.COLORS.ICON_COLOR} />
          <View style={{width: '78%'}}>
            <Input
              style={{width: '85%', marginBottom: 15}}
              inputStyle={{color: DARK_MODE.COLORS.INPUT_TEXT_COLOR}}
              placeholder="Create Categry"
              placeholderTextColor={DARK_MODE.COLORS.PLACE_HOLDER_COLOR}
              value={this.props.settings.newCategory}
              onChangeText={(e) => this.props.setValue('newCategory', e)} />
          </View>
          <Entypo
            style={{width: '10%', marginTop: 9}}
            onPress={() => this.onAddItem(this.props.settings.newCategory)}
            name="add-to-list"
            size={20}
            color="#4F8EF7"/>
        </View>
      );
    };

    return (
      <View style={DARK_MODE.appContainer}>
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
      navigationOptions: ({ navigation }) => ({
        // headerShown: true,
        headerLeft: () =>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
                <Ionicons
                  name="ios-arrow-back"
                  size={20}
                  color={DARK_MODE.COLORS.ICON_COLOR}
                  style={{marginLeft: 15, marginTop: 4}}/>
          </TouchableOpacity>,
        // headerBackTitleVisible: true,
        // title: 'Settings',
        // header: ({navigation}) => ({
        //   return (
              // <Button
              //   title="Back"
              //   onPress={ () => navigation.goBack() }
              // />
        //     )
        // }),
        // headerStatusBarHeight: 20,
        headerTitleAlign: 'center',
        // headerBackground: DARK_MODE.COLORS.HEADER_COLOR,
        headerStyle: {
          height: 40,
          backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
        },
        mode: 'modal',
        headerMode: 'screen',
        // headerTruncatedBackTitle: 'back',
      }),
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
      navigationOptions: ({ navigation }) => ({
        headerShown: true,
        headerBackTitleVisible: true,
        // title: navigation,
        title: navigation.getParam('category'),
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
      }),
    },
  },
  {
    // initialRouteName: SubCategories,
    mode: 'modal',
  },
);

export default Settings;
