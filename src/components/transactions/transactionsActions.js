/* eslint-disable prettier/prettier */
import {firebaseAction} from './../../Api';
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
    await firebase.database().ref(`/users/${userUID}/account/transactions/${transactionUID}`).remove();
    dispatch(fetchTransactions(userUID));
    return null;
  };
};

export const fetchTransactions = (uid) => {
    return dispatch => {
      const dataRef = firebase.database().ref(`/users/${uid}/account/transactions`);
      dataRef.once('value').then(function(snapshot) {
        var res = snapshot.val();
        var fixedList = [];
        for (var item in res) {
          res[item].uid = item;
          fixedList.push(res[item]);
        }
        dispatch(setTransactions(fixedList));
      });
    };
};

