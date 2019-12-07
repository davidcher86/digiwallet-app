/* eslint-disable prettier/prettier */
import firebase from 'firebase';

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

