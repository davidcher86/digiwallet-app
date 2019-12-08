/* eslint-disable prettier/prettier */
import firebase from 'firebase';
import {firebaseAction} from './../../Api';

export const setTransactions = (transactions) => {
  return {
    type: 'SET_TRANSACTIONS_LIST',
    transactions,
  };
};

export const fetchTransactions = (uid) => {
  var transactionsRef = firebase.database().ref(`users/${uid}/account/transactions`);
  var newTransactionList = [];
  return dispatch => {
    // firebaseAction(uid, 'transactions', 'read', data)
    //   .then(res => {
    //     var payload = res;
    //     for (var transaction in payload) {
    //       if (payload.hasOwnProperty(transaction)) {
    //           newTransactionList.push(payload[transaction]);
    //     }
    //   }

    //   dispatch(setTransactions(newTransactionList));
    //   });

    transactionsRef.on('value', function(snapshot) {
        var payload = snapshot.val();

        for (var transaction in payload) {
            if (payload.hasOwnProperty(transaction)) {
                newTransactionList.push(payload[transaction]);
            }
        }

        dispatch(setTransactions(newTransactionList));
    });
  };
};

