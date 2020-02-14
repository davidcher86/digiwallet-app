import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';

import Header from './../common/Header';
import * as actions from './settingsActions';
import {DARK_MODE} from './../Styles';

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListData: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      ItemsSelected: [],
    };
  }

  onItemPress(item) {
    Alert.alert(
      'Alert',
      item + ' Pressed',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {
        cancelable: true,
      },
    );
  }

  onSelectionChanged(selectedItems) {
    this.setState({ItemsSelected: selectedItems});
  }

  onSort(newListDataArray) {
    this.setState({ListData: newListDataArray});
  }

  render() {
    // const styles = {
    //   containerStyle: {
    //     padding: 20,
    //   },
    // };

    return (
      <View style={{flex: 1}}>
        {/* <MultiSelectSortableFlatlist
          data={this.state.ListData}
          keyExtractor={(item, index) => item}
          onSort={data => this.onSort(data)}
          renderItem={({item, index, selected}) => (
            //Note: To view selection changes, your component should take a prop that will render changes based on "selected" bool
            // <View style={{width: '100%', backgroundColor: 'yellow'}}>
            <View style={styles.itemContainer}>
              <View
                style={[
                  styles.containerStyle,
                  {
                    flex: 1,
                    borderColor: selected ? 'blue' : 'white',
                    borderWidth: selected ? 1.5 : 0,
                  },
                ]}>
                <Text style={styles.CardText}>{item}</Text>
              </View>
            </View>
          )}
        /> */}
        <MultiSelectSortableFlatlist
          ref={MultiSelectSortableFlatlist =>
            (this.MultiSelectSortableFlatlist = MultiSelectSortableFlatlist)
          }
          contentContainerStyle={styles.ListContainer}
          ListHeaderComponentStyle={styles.HeaderStyle}
          // ListHeaderComponent={
          //   <Header
          //     SelectAll={() => this.MultiSelectSortableFlatlist.SelectAll()}
          //     DeselectAll={() => this.MultiSelectSortableFlatlist.DeselectAll()}
          //   />
          // }
          data={this.state.ListData}
          keyExtractor={(item, index) => item}
          onItemTap={({item, index}) => this.onItemPress(item)}
          onItemSelected={({selectedItems, item, index}) =>
            this.onSelectionChanged(selectedItems)
          }
          onItemDeselected={({selectedItems, item, index}) =>
            this.onSelectionChanged(selectedItems)
          }
          onSort={data => this.onSort(data)}
          renderItem={({item, index, selected}) => (
            //Note: To view selection changes, your component should take a prop that will render changes based on "selected" bool
            <View style={styles.itemContainer} Selected={selected}>
              <Text style={styles.CardText}>{item}</Text>
            </View>
          )}
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
    padding: 6,
    height: 40,
    width: 100,
    backgroundColor: 'yellow',
  },
  CardText: {
    textAlign: 'center',
  },
  HeaderStyle: {
    paddingHorizontal: wp(4),
  },
});

const mapStateToProps = state => {
  return {dashboard: state.dashboard};
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
        // title: 'Settings',
        header: ({navigation}) => (
          <Header navigation={navigation} title="Settings" />
        ),
        headerTitleAlign: 'center',
        // headerBackground: DARK_MODE.COLORS.HEADER_COLOR,
        headerStyle: {
          height: 20,
          backgroundColor: DARK_MODE.COLORS.HEADER_COLOR,
        },
        mode: 'modal',
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTruncatedBackTitle: 'back',
      },
    },
  },
  {
    // contentComponent: DrawerWithLogoutButton,
    mode: 'modal',
  },
);

export default Settings;
