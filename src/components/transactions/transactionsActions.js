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
    var data = await firebaseAction(uid, 'transactions', 'read', null);
    return data;
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

export const fetchTransactions = (uid) => {
    var newTransactionList = [];
    return dispatch => {
        // var data = fetch(uid);
        // console.log('d:', data);
        const dataRef = firebase.database().ref(`/users/${uid}/account/transactions`);
        dataRef.on('value', function(snapshot) {
          var res = snapshot.val();
          console.log(res);
          var fixedList = [];
          for (var item in res) {
            res[item].uid = item;
            fixedList.push(res[item]);
          }
          dispatch(setTransactions(fixedList));
          return res;
        });
        // for (var item in data) {
        //     if (data.hasOwnProperty(item)) {
        //         newTransactionList.push(data[item]);
        //     }
        // }
        // console.log('newTransactionList', newTransactionList);
        dispatch(setTransactions(newTransactionList));
    };
};

