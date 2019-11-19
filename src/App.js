/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import reducers from './redux';
import AppNavigator from './navigation/AppNavigation';
import PrimaryNav from './navigation/PrimaryNav';
import HomePage from './components/homePage/HomePage';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    const styles = {
      containerStyle: {},
      headerStyle: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        background: 'green'
      }
    };

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    console.log('sdvsdvds');

    // console.log(PrimaryNav);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
        {/* <Text>fsdfsdf</Text> */}
          {/* <MyApp style={{ height: '40' }}/> */}
          <AppNavigator style={{height: '40'}}/>
        </View>
      </Provider>
    );
  }
}

export default App;
