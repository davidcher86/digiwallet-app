/* eslint-disable prettier/prettier */
import {firebaseAction} from './../../Api';

export const setTransactions = (transactions) => {
  return {
    type: 'SET_TRANSACTIONS_LIST',
    transactions,
  };
};


const fetch = async uid => {
  try {
    return await firebaseAction(uid, 'transactions', 'read', null);
  } catch (error) {
    console.log('error while setting AsyncStorage item', error);
  }
}

export const fetchTransactions = (uid) => {
    var newTransactionList = [];
    return dispatch => {
        var data = fetch(uid);
        console.log('d:', data)
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                newTransactionList.push(data[item]);
            }
        }
        // console.log('newTransactionList', newTransactionList);
        dispatch(setTransactions(newTransactionList));
    };
};

