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

export const setSortedTransactions = (transactions) => {
  return {
    type: 'SET_SORTED_TRANSACTIONS_LIST',
    transactions,
  };
};

export const setOpenIndex = (uid) => {
  return {
    type: 'CHANGE_OPEN_TRANSACTION_INDEX',
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

export const fetchTransactions = (uid) => {
    return dispatch => {
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

