/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {StyleSheet, View, Modal, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';

import reducers from './redux';
import AppNavigator from './navigation/AppNavigation';
import NewTransactionModal from './components/newTransactionModal/NewTransactionModal';
import {onLoginPress} from './components/systemControl/systemControlActions';
import {FAB} from 'react-native-paper';
import firebase from 'firebase';
import {toggleNewTransactionModal} from './components/newTransactionModal/newTransactionModalActions';

class App extends Component {
  componentDidMount() {
    console.log('firebase initilised');
    firebase.initializeApp({
      apiKey: 'AIzaSyBuhrwvn0lV7B-ugmVEmEXYHsIa_8e-mko',
      authDomain: 'authproj-3e757.firebaseapp.com',
      databaseURL: 'https://authproj-3e757.firebaseio.com',
      projectId: 'authproj-3e757',
      storageBucket: 'authproj-3e757.appspot.com',
      messagingSenderId: '107699463403',
      appId: '1:107699463403:web:4ed1a7a0fb64e596684aae',
      measurementId: 'G-B372DNG4CY',
    });
  };
    
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // console.log(store.getState());
    var state = store.getState();
    const {systemControl} = state;
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <Provider store={store}>
          <NewTransactionModal onFabPress={onLoginPress()} />
          <View style={{flex: 1}}>
            <AppNavigator style={{height: '40'}} />
            <FAB style={styles.fab} small icon="plus" onPress={() => store.dispatch(toggleNewTransactionModal())} />
          </View>
        </Provider>
      </KeyboardAvoidingView>
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

// const mapStateToProps = state => {
//   return {systemControl: state.systemControl};
// };

// export default connect(
// mapStateToProps,
//   actions,
// )(App);
export default App;
