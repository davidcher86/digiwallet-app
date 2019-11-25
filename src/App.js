import React, {Component} from 'react';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {StyleSheet, View, Modal} from 'react-native';
import {connect} from 'react-redux';

import reducers from './redux';
import AppNavigator from './navigation/AppNavigation';
import NewTransactionModal from './components/common/newTransactionModal/NewTransactionModal';
import {onLoginPress} from './components/systemControl/systemControlActions.js';
// import {FAB} from 'react-native-paper';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // console.log(onLoginPress);
    return (
      <Provider store={store}>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}> */}
        <NewTransactionModal />
        {/* </Modal> */}
        <View style={{flex: 1}}>
          <AppNavigator style={{height: '40'}} />
          {/* <FAB style={styles.fab} small icon="plus" onPress={onLoginPress()} /> */}
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

// const mapStateToProps = state => {
//   return {systemControl: state.systemControl};
// };

// export default connect(
// mapStateToProps,
//   actions,
// )(App);
export default App;
