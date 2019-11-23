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
import { FAB } from 'react-native-paper';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator style={{height: '40'}}/>
          <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={() => console.log('Pressed')}/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {},
  headerStyle: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  fab: {
    height: 50,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686cc3',
  },
});

export default App;
