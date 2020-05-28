import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Easing, ScrollView, Animated} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {connect, useSelector, useDispatch} from 'react-redux';
import SwipeableViews from 'react-swipeable-views-native';
import Dots from 'react-native-dots-pagination';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs';
import Panel from './../common/Panel';
import ExpanceCharts from './ExpancesChartsTab';
import MoneyFlowCharts from './MoneyFlowChartsTab';
import BalanceCharts from './BalanceChartsTab';
import * as dashboardActions from './dashboardActions';
import * as transactionsActions from './../transactions/transactionsActions';
import * as homePageActions from './../homePage/homePageActions';
import Fab from './../common/Fab';

var ScrollableTabView = require('react-native-scrollable-tab-view');

function PanelContent(props) {
  let now = new Date();
  const initialState = {
    range: {from: now, to: now},
    lastPeriod: {selected: ''},
    period: {type: 'This Month', previosPeriodCount: 0}
  };
  const [state, setState] = useState(initialState);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [activeContentTab, setActiveContentTab] = useState(0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChangeData = (e, tab, field) => {
    let updatedState = state;
    const options = ['This Year', 'This Month', 'This Week', 'Today'];

    var dt = new Date();
    console.log(e);
    if (field = 'type') {
      switch (field) {
        case 'This Year':
          updatedState[tab][field] = e;
          if (updatedState.period.previosPeriodCount > 0) {
            var year = dt.getFullYear() - updatedState.period.previosPeriodCount;
            updatedState.period.type = year;
          }

          if (updatedState.period.previosPeriodCount <= 0) {
            updatedState.period.type = 'This Year';
            updatedState.period.previosPeriodCount = 0;
          }
          break;
        case 'This Month':
          break;
        case 'This Week':
          break;
        case 'Today':
          break;
        default:
          break;
      }
    }
    // updatedState[tab][field] = e;

    // console.log(updatedState);
    setState({...updatedState});
    // setState({...state,  period: {
    //   type: options[e]
    // }})
    // console.log(e);
  };
  console.log('state', state);
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <SwipeableViews style={styles.slideContainer} onChangeIndex={(index) => setActiveContentTab(index)}>
        <View style={[styles.slide, styles.slide1]}>
          <Button
            onPress={e => onChangeData(state.period.previosPeriodCount + 1, 'period', 'previosPeriodCount')}
            buttonStyle={{width:50, height: 30, borderWidth: 2, borderColor: '#f0f8ff'}}
            icon={<AntDesign name="caretleft" size={15} color="#f0f8ff" />}
            type="outline"/>
          <ModalDropdown
            showsVerticalScrollIndicator={false}
            // defaultIndex={'1'}
            defaultValue={state.period.type}
            value={state.period.type}
            textStyle={{height: 30, padding: 5}}
            onSelect={(e) => onChangeData(e, 'period','type')}
            style={{width: 200, borderTopWidth: 2, borderBottomWidth: 2, height: 30, borderColor: '#f0f8ff' }}
            dropdownStyle={{height: 80, width: 200, zIndex: 4000, position: 'relative'}}
            options={['This Year', 'This Month', 'This Week', 'Today']}/>
          <Button
            onPress={e => onChangeData(state.period.previosPeriodCount - 1, 'period','previosPeriodCount')}
            buttonStyle={{width:50, height: 30, borderWidth: 2, borderColor: '#f0f8ff'}}
            icon={<AntDesign name="caretright" size={15} color="#f0f8ff" />}
            type="outline"/>
        </View>
        <View style={[styles.slide, styles.slide2]}>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Button onPress={showTimepicker} title="Show time picker!" />
        {show && <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={e => onChangeData(e, 'period','type')}
        />}
        </View>
        <View style={[styles.slide, styles.slide3]}>
          <Text style={styles.text}>
            slide n°3
          </Text>
        </View>
      </SwipeableViews>
      <View style={{backgroundColor: '#187b72', height: 23, marginBottom: 35, padding: 4}}>
        <Dots
          length={3}
          width={250}
          paddingHorizontal={10}
          paddingVertical={4}
          activeDotWidth={12}
          activeDotHeight={12}
          activeColor="#0981def2"
          passiveColor="#80c3f7eb"
          passiveDotWidth={9}
          passiveDotHeight={9}
          active={activeContentTab} />
      </View>
    </View>
  );
}

function Header(props) {
  const {navigation} = props;
  const [open, setOpen] = useState(false);
  const transactions = useSelector(state => state.transactions);
  const profile = useSelector(state => state.profile);
  const identity = useSelector(state => state.identity);
  const dashboard = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  // console.log(navigate);
  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions(identity.uid));
    dispatch(homePageActions.fetchProfileData(identity.uid, props.navigation));
  }, []);

  const panelHeight = new Animated.Value(0);
  const panelPadding = new Animated.Value(0);

  const expandPanel = () => {
    Animated.timing(panelHeight, {
      toValue: 80,
      duration: 300,
      easing: Easing.linear,
    }).start();

    Animated.timing(panelPadding, {
      toValue: 6,
      duration: 100,
      easing: Easing.linear,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(panelHeight, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start();

    Animated.timing(panelPadding, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
    }).start();
  };
  // useEffect(() => {
  //   console.log("afsf");
  // }, [navigation]);
  // console.log(Drawer);
  const dropdownData = [{
    value: 'Banana',
  }, {
    value: 'Mango',
  }, {
    value: 'Pear',
  }];

  return (
    <View style={{flexDirection: 'column'}}>
      {/* {Panel()} */}
      {/* <Panel content={MyComponent()}/> */}
      <Panel content={PanelContent()}/>
      <View style={{flexDirection: 'row', width: '100%', bottom: 0, position:'absolute', backgroundColor: "#08191f"}}>
        <TouchableOpacity
          style={{height: 50, width: 130, flexDirection: 'column', alignSelf: "center"}}
          onPress={() => {
            // dispatch(dashboardActions.resetFlow());
            navigation.navigate('ExpanceCharts', {type: 'ReplaceCurrentScreen'})
            }}>
          <Text style={(navigation.state.index === 0
                        ? {color: "#7ed3e0", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                        : {color: "#a0a0a0", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Expances</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 50, width: 130, flexDirection: 'column', alignSelf: "center"}}
          onPress={() => {
            // dispatch(dashboardActions.reset());
            navigation.navigate('MoneyFlowCharts', {type: 'ReplaceCurrentScreen'})
          }}>
          <Text style={(navigation.state.index === 1
                        ? {color: "#7ed3e0", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                        : {color: "#a0a0a0", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Money Flow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 50, width: 130, flexDirection: 'column', alignSelf: "center"}}
          onPress={() => {
            // dispatch(dashboardActions.reset());
            navigation.navigate('BalanceCharts', {type: 'ReplaceCurrentScreen'})
          }}>
          <Text style={(navigation.state.index === 2
                        ? {color: "#7ed3e0", fontSize: 18, alignSelf: "center", flex: 1, textAlignVertical: "center"}
                        : {color: "#a0a0a0", alignSelf: "center", flex: 1, textAlignVertical: "center"})}>Balance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    // flex: 1,
    // padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
    // padding: 10,
  },
  cardContainer: {
    // width: '90%',
    // height: 400,
    margin: 15,
  },

  slideContainer: {
    height: 40,
  },
  slide: {
    padding: 15,
    height: 100,
  },
  slide1: {
    backgroundColor: '#187b72',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
    // backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#187b72'
    // backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#187b72'
    // backgroundColor: '#6AC0FF',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

const DashboardStack = createMaterialTopTabNavigator(
// const DashboardStack = createBottomTabNavigator(
  {
    ExpanceCharts: {
      screen: ExpanceCharts,
      navigationOptions: {
        mode: 'modal',
        title: 'Expance Charts'
      }
      // group: 'Weakly',
    },
    MoneyFlowCharts: {
      screen: MoneyFlowCharts,
      navigationOptions: {
        mode: 'modal',
        title: 'Money Flow Charts'

      }
      // group: 'Monthly',
    },
    BalanceCharts: {
      screen: BalanceCharts,
      navigationOptions: {
        mode: 'modal',
        title: 'Balance Charts'

      }
      // group: 'Monthly',
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#009acc',
      pressOpacity: true,
      mode: 'modal',
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 140,
      },
      style: {
        backgroundColor: 'blue',
      },
    },
    // initialRouteName: 'ExpanceCharts',
    tabBarComponent: Header,
    swipeEnabled: false,
    activeColor: '#f0edf6',
    inactiveColor: '#fffff',
    tabBarPosition: 'bottom',
    resetOnBlur: true,
    lazy: true,
    // barStyle: {backgroundColor: '#694fad'},
  },
);

export default DashboardStack;
