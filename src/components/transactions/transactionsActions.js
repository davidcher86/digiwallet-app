/* eslint-disable prettier/prettier */
import {firebaseAction} from './../../Api';
import {startLoading, endLoading} from './../systemControl/systemControlActions';
import firebase from 'firebase';

export const setTransactions = (transactions) => {
  return {
    type: 'SET_TRANSACTIONS_LIST',
    transactions,
  };
};


const fetch = async uid => {
  try {
    const dataRef = firebase.database().ref(`/users/${uid}/account/transactions`);

    await dataRef.on('value', snapshot => {
      var res = snapshot.val();
      return res;
    });
  } catch (error) {
    console.log('error while setting AsyncStorage item', error);
  }
};

export const setOpenIndex = (uid) => {
  return {
    type: 'CHANGE_OPEN_INDEX',
    uid,
  };
};

export const openTransaction = (uid) => {
  return dispatch => {
    dispatch(setOpenIndex(uid));
  };
};

export const deleteTransaction = (transactionUID, userUID) => {
  return async dispatch => {
    dispatch(startLoading());
    await firebase.database().ref(`/users/${userUID}/account/transactions/${transactionUID}`).remove();
    dispatch(fetchTransactions(userUID));
    dispatch(endLoading());
    return null;
  };
};

// export const startLoading = () => {
//   return {
//     type: 'DISPLAY_LOADER',
//   };
// };

// export const endLoading = () => {
//   return {
//     type: 'HIDE_LOADER',
//   };
// };

export const fetchTransactions = (uid) => {
    return dispatch => {
      // firebaseAction(uid, 'transactions', 'read', null, setTransactions)
      // .then(res => {
      //   console.log(res);
      // })
      dispatch(startLoading());
      const dataRef = firebase.database().ref(`/users/${uid}/account/transactions`);
      dataRef.once('value').then(function(snapshot) {
        var res = snapshot.val();
        var fixedList = [];
        for (var item in res) {
          res[item].uid = item;
          fixedList.push(res[item]);
        }
        dispatch(setTransactions(fixedList));
        dispatch(endLoading());
      });
    };
};

